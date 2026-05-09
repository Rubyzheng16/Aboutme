import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'public', 'assets');
const outputDir = path.join(rootDir, 'public', 'assets', 'optimized');
const args = new Set(process.argv.slice(2));
const videosOnly = args.has('--videos-only');
const imagesOnly = args.has('--images-only');
const bundledNodeModules = path.join(
  process.env.USERPROFILE ?? '',
  '.cache',
  'codex-runtimes',
  'codex-primary-runtime',
  'dependencies',
  'node',
  'node_modules',
);

const imageExtensions = new Set(['.jpg', '.jpeg', '.png']);
const videoExtensions = new Set(['.mp4', '.mov', '.webm']);

const imageSizes = [
  { suffix: 'thumb', width: 480, quality: 72 },
  { suffix: 'display', width: 960, quality: 78 },
  { suffix: 'large', width: 1440, quality: 82 },
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    const bundledSharp = path.join(bundledNodeModules, 'sharp', 'lib', 'index.js');
    if (existsSync(bundledSharp)) {
      return (await import(pathToFileURL(bundledSharp).href)).default;
    }
    throw new Error('Missing sharp. Run `npm install -D sharp`, then retry.');
  }
}

async function findFfmpeg() {
  const configuredPath = process.env.FFMPEG_PATH?.trim();
  const checked = [];
  if (configuredPath) {
    const candidates = [
      configuredPath,
      path.join(configuredPath, 'ffmpeg.exe'),
      path.join(configuredPath, 'bin', 'ffmpeg.exe'),
    ];

    for (const candidate of candidates) {
      checked.push(candidate);
      if (existsSync(candidate)) {
        try {
          await run(candidate, ['-version']);
          return { path: candidate, checked };
        } catch {
          // Keep looking in case FFMPEG_PATH pointed at the install folder.
        }
      }
    }
  }

  for (const command of ['ffmpeg', 'ffmpeg.exe']) {
    checked.push(command);
    try {
      await run(command, ['-version']);
      return { path: command, checked };
    } catch {
      // Keep looking.
    }
  }

  return { path: null, checked };
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'optimized') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function outputName(file, suffix, extension) {
  const parsed = path.parse(file);
  return path.join(outputDir, `${parsed.name}-${suffix}${extension}`);
}

async function optimizeImage(sharp, file) {
  const original = await sharp(file).metadata();
  const outputs = [];

  for (const size of imageSizes) {
    const targetWidth = Math.min(size.width, original.width ?? size.width);
    const output = outputName(file, size.suffix, '.webp');

    await sharp(file)
      .rotate()
      .resize({
        width: targetWidth,
        withoutEnlargement: true,
      })
      .webp({
        quality: size.quality,
        effort: 5,
        smartSubsample: true,
      })
      .toFile(output);

    outputs.push(output);
  }

  return outputs;
}

async function optimizeVideo(ffmpeg, file) {
  const parsed = path.parse(file);
  const output = path.join(outputDir, `${parsed.name}-compressed.mp4`);
  const poster = path.join(outputDir, `${parsed.name}-poster.webp`);

  await run(ffmpeg, [
    '-y',
    '-i', file,
    '-vf', 'scale=min(1280\\,iw):-2',
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '28',
    '-movflags', '+faststart',
    '-an',
    output,
  ]);

  await run(ffmpeg, [
    '-y',
    '-ss', '00:00:01',
    '-i', file,
    '-frames:v', '1',
    '-vf', 'scale=min(960\\,iw):-2',
    poster,
  ]);

  return [output, poster];
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function fileSize(file) {
  return (await stat(file)).size;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const files = await listFiles(assetsDir);
  const imageFiles = files.filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
  const videoFiles = files.filter((file) => videoExtensions.has(path.extname(file).toLowerCase()));

  const sharp = await loadSharp();
  const ffmpeg = await findFfmpeg();
  const results = [];

  if (!videosOnly) {
    console.log(`Optimizing ${imageFiles.length} image(s) into ${path.relative(rootDir, outputDir)}...`);
    for (const file of imageFiles) {
      const outputs = await optimizeImage(sharp, file);
      const originalSize = await fileSize(file);
      const outputSizes = await Promise.all(outputs.map(fileSize));
      results.push({
        source: path.relative(rootDir, file),
        originalSize,
        outputs: outputs.map((output, index) => ({
          file: path.relative(rootDir, output),
          size: outputSizes[index],
        })),
      });
    }
  }

  if (!imagesOnly && ffmpeg.path) {
    console.log(`Optimizing ${videoFiles.length} video(s) with ${ffmpeg.path}...`);
    for (const file of videoFiles) {
      const outputs = await optimizeVideo(ffmpeg.path, file);
      const originalSize = await fileSize(file);
      const outputSizes = await Promise.all(outputs.map(fileSize));
      results.push({
        source: path.relative(rootDir, file),
        originalSize,
        outputs: outputs.map((output, index) => ({
          file: path.relative(rootDir, output),
          size: outputSizes[index],
        })),
      });
    }
  } else if (!imagesOnly && videoFiles.length > 0) {
    console.log('Skipped video compression: ffmpeg was not found.');
    console.log(`Current FFMPEG_PATH: ${process.env.FFMPEG_PATH || '(not set)'}`);
    console.log('Checked candidates:');
    for (const candidate of ffmpeg.checked) {
      console.log(`- ${candidate}`);
    }
    console.log('Set FFMPEG_PATH to the full ffmpeg.exe path, then rerun `npm run optimize:videos`.');
  }

  console.log('\nAsset optimization summary:');
  for (const result of results) {
    console.log(`- ${result.source} (${formatBytes(result.originalSize)})`);
    for (const output of result.outputs) {
      console.log(`  -> ${output.file} (${formatBytes(output.size)})`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
