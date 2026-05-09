import { useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  BarChart3,
  Briefcase,
  Camera,
  ChevronRight,
  Code2,
  Disc3,
  ExternalLink,
  FileText,
  GraduationCap,
  Heart,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Music,
  Palette,
  Phone,
  Play,
  Sparkles,
  Star,
  UserRound,
  X
} from 'lucide-react';
import { hobbyData, resumeData } from './data';
import type { Project } from './data';

type FolderId = 'PROFILE_EDU' | 'EXPERIENCE' | 'PROJECTS' | 'HOBBIES';

const FOLDERS: { id: FolderId; label: string; color: string; tabOffset: string; icon: any }[] = [
  { id: 'PROFILE_EDU', label: '01_概述', color: 'bg-[#E3D9C6]', tabOffset: 'ml-2 md:ml-4', icon: FileText },
  { id: 'EXPERIENCE', label: '02_经历', color: 'bg-[#D6E0D4]', tabOffset: 'ml-20 md:ml-32', icon: Briefcase },
  { id: 'PROJECTS', label: '03_作品', color: 'bg-[#D4DEE5]', tabOffset: 'ml-[144px] md:ml-64', icon: Layers },
  { id: 'HOBBIES', label: '04_爱好', color: 'bg-[#E5D4DE]', tabOffset: 'ml-[220px] md:ml-96', icon: Heart },
];

const HobbyIcons: Record<string, any> = { Megaphone, Music, Palette, Camera };

const FOLDER_BACKDROPS: Record<FolderId, string> = {
  PROFILE_EDU: '#302c22',
  EXPERIENCE: '#233025',
  PROJECTS: '#202b32',
  HOBBIES: '#32252d',
};

function OptimizedImage({
  loading = 'lazy',
  decoding = 'async',
  draggable = false,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return <img loading={loading} decoding={decoding} draggable={draggable} {...props} />;
}

export default function App() {
  const [activeFolderId, setActiveFolderId] = useState<FolderId | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [detailPhase, setDetailPhase] = useState<'extract' | 'flip' | 'fixed'>('extract');
  const [previewPhoto, setPreviewPhoto] = useState<{ src: string; title: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeFolderId) return;
    setDetailPhase('extract');
    setPreviewPhoto(null);
    setSelectedProjectId(null);
    const flipTimer = window.setTimeout(() => setDetailPhase('flip'), 260);
    const fixedTimer = window.setTimeout(() => setDetailPhase('fixed'), 860);

    return () => {
      window.clearTimeout(flipTimer);
      window.clearTimeout(fixedTimer);
    };
  }, [activeFolderId]);

  const getFolderTop = (index: number) => {
    const baseGap = window.innerWidth < 768 ? 45 : 65;
    const hoverGap = window.innerWidth < 768 ? 160 : 320;
    let top = (FOLDERS.length - 1 - index) * baseGap;
    if (hoveredIdx !== null && index < hoveredIdx) top += hoverGap;
    return top;
  };

  return (
    <div className="min-h-screen bg-archive-bg flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-orange-200 overflow-hidden wireframe-grid relative">
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%] pointer-events-none" />

      <AnimatePresence>
        {!activeFolderId && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="text-center mb-8 md:mb-16 z-0"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-12 h-[1px] bg-archive-border/30" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-archive-border/60">Professional Personal Archive</span>
              <span className="w-12 h-[1px] bg-archive-border/30" />
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight mb-4 uppercase">
              郑好个人简历
            </h1>
            <p className="text-[10px] md:text-sm font-mono text-archive-border/60 uppercase tracking-widest leading-relaxed">
              {resumeData.location} // {resumeData.phone}<br />
              {resumeData.email}
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-5xl h-[450px] md:h-[650px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!activeFolderId ? (
            <motion.div key="stack" className="relative w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {FOLDERS.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  layoutId={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  onHoverStart={() => setHoveredIdx(index)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  className={`absolute w-[92%] md:w-[680px] cursor-pointer group left-1/2 -ml-[46%] md:-ml-[340px] folder-3d-depth ${index === 0 ? '' : 'folder-slant-shadow'}`}
                  animate={{ top: getFolderTop(index), zIndex: FOLDERS.length - index }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-32 md:w-56 h-10 ${folder.color} border-t-2 border-l-2 border-r-2 border-black/10 folder-tab ${folder.tabOffset} text-[9px] md:text-sm flex items-center px-4 md:px-8 font-mono text-black/60 font-black uppercase transition-all duration-300 group-hover:brightness-105 paper-grain overflow-hidden`}>
                    <span className="relative z-10">{folder.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                  </div>

                  <div className={`w-full h-64 md:h-[420px] ${folder.color} border-2 border-black/10 p-8 md:p-14 flex flex-col justify-between transition-all duration-500 paper-grain relative overflow-hidden rounded-r-sm rounded-bl-sm`}>
                    <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border border-black/20 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    </div>

                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 opacity-30">
                          <div className="w-2 h-2 rounded-full bg-black" />
                          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Fragment_{index + 1}</p>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic tracking-tight text-black/70">{folder.label}</h3>
                      </div>
                      <div className="p-4 bg-black/5 rounded-lg group-hover:bg-white/40 transition-colors">
                        <folder.icon size={44} strokeWidth={1} className="text-black/30 group-hover:text-black/70 transition-all" />
                      </div>
                    </div>

                    <div className="flex justify-between items-end pb-4 relative z-10 border-t border-black/5 pt-8">
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono opacity-30 block tracking-[0.4em] uppercase font-black">Archive_Sequence</span>
                        <span className="text-sm md:text-lg font-mono font-bold tracking-tight uppercase text-black/40 italic">BUREAU_ZH//0{index + 1}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-black/5 flex items-center justify-center group-hover:bg-black transition-all">
                        <ChevronRight size={20} className="text-black/30 group-hover:text-white transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  {index !== 0 && <div className="folder-thickness rounded-r-sm rounded-bl-sm" />}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden pt-10 md:pt-20"
              style={{ backgroundColor: FOLDER_BACKDROPS[activeFolderId] }}
            >
              <div className="relative w-full max-w-7xl flex flex-col items-center">
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setActiveFolderId(null)}
                  className="fixed top-6 right-6 md:top-12 md:right-12 p-4 bg-white/5 rounded-full text-white hover:bg-white/20 transition-all z-[120] flex items-center justify-center backdrop-blur-md border border-white/10"
                  aria-label="关闭"
                >
                  <X size={28} strokeWidth={1} />
                </motion.button>

                {activeFolderId === 'PROJECTS' ? (
                  <FullCorkboardProjectsPage
                    selectedProjectId={selectedProjectId}
                    onProjectSelect={setSelectedProjectId}
                    onProjectClose={() => setSelectedProjectId(null)}
                    onPreviewPhoto={setPreviewPhoto}
                  />
                ) : activeFolderId === 'HOBBIES' ? (
                  <FullCdHobbiesPage onPreviewPhoto={setPreviewPhoto} />
                ) : (
                  <>
                    {detailPhase !== 'extract' && (
                      <DossierPage
                        activeFolderId={activeFolderId}
                        showLeftPage={detailPhase === 'fixed'}
                        onPreviewPhoto={setPreviewPhoto}
                        selectedProjectId={selectedProjectId}
                        onProjectSelect={setSelectedProjectId}
                        onProjectClose={() => setSelectedProjectId(null)}
                      />
                    )}
                    <PageFlipTransition detailPhase={detailPhase} activeFolderId={activeFolderId} />
                  </>
                )}
                <PhotoPreview preview={previewPhoto} onClose={() => setPreviewPhoto(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!activeFolderId && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">
              ZHENG HAO Archive System 路 2026
            </p>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageFlipTransition({
  detailPhase,
  activeFolderId,
}: {
  detailPhase: 'extract' | 'flip' | 'fixed';
  activeFolderId: FolderId;
}) {
  const isOpen = detailPhase === 'flip';
  const folder = FOLDERS.find(f => f.id === activeFolderId) ?? FOLDERS[0];

  return (
    <AnimatePresence>
      {detailPhase !== 'fixed' && (
        <motion.div
          className="book-open-transition-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.01 }}
        >
          <motion.div className="book-open-stage" initial={{ y: 40, scale: 0.995 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div className="book-open-spread">
              {isOpen && <div className="book-open-spine-shadow" />}
              <motion.div
                className={`book-open-turning-cover ${folder.color}`}
                animate={{
                  width: 'calc(50% + 10px)',
                  left: isOpen ? 'calc(50% - 10px)' : 'calc(50% - 2px)',
                  rotateY: isOpen ? -156 : 0,
                }}
                transition={{ duration: 0.58, ease: [0.18, 0.92, 0.2, 1] }}
              >
                <div className={`book-open-cover-front ${folder.color}`}>
                  <div className={`book-open-tab ${folder.color} folder-tab`}>{folder.label}</div>
                </div>
                <div className={`book-open-cover-back ${folder.color}`}>
                  <div className={`book-open-tab ${folder.color} folder-tab`}>{folder.label}</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DossierPage({
  activeFolderId,
  showLeftPage = true,
  onPreviewPhoto,
  selectedProjectId,
  onProjectSelect,
  onProjectClose,
}: {
  activeFolderId: FolderId;
  showLeftPage?: boolean;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectClose: () => void;
}) {
  const currentFolder = FOLDERS.find(f => f.id === activeFolderId);
  return (
    <motion.div
      layoutId={activeFolderId}
      className={`relative w-full md:w-[100%] h-[calc(100vh-2.5rem)] md:h-[calc(100vh-5rem)] ${showLeftPage ? currentFolder?.color || 'bg-[#B08D57]' : 'bg-transparent'} flex flex-col md:flex-row z-50 origin-center paper-grain overflow-visible`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      style={{ perspective: '2500px' }}
    >
      <motion.div
        initial={{ rotateY: 0, originX: '100%' }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`w-full md:w-1/2 h-[45vh] md:h-full shrink-0 sticky top-0 z-20 overflow-visible border-b md:border-b-0 md:border-r border-black/10 shadow-[20px_0_50px_rgba(0,0,0,0.2)] transform-gpu ${showLeftPage ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`${currentFolder?.color || 'bg-[#B08D57]'} folder-tab final-folder-tab`}>
          {currentFolder?.label}
        </div>
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 to-transparent z-30" />
        {showLeftPage && activeFolderId === 'PROFILE_EDU' && <LeftProfileBoard />}
        {showLeftPage && activeFolderId === 'EXPERIENCE' && <ExperiencePhotoBoard onPreviewPhoto={onPreviewPhoto} />}
      </motion.div>

      <div className="w-full md:w-[calc(50%+0.5rem)] md:-ml-2 h-full overflow-y-auto custom-scrollbar-minimal bg-white relative flex flex-col z-10 document-infinite-roll border-l border-black/5 shadow-[-8px_0_22px_rgba(0,0,0,0.045)]">
        <div className="p-8 md:p-20 lg:p-24 space-y-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-5 mb-8 opacity-25">
              <div className="w-14 h-[2px] bg-black" />
              <span className="text-xs font-mono tracking-[0.42em]">CERTIFIED_DOC</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-serif italic tracking-tight text-black/95 mb-8 leading-[0.9]">
              {currentFolder?.label.split('_')[1] || currentFolder?.label}
            </h3>
          </div>

          <div className="w-full h-px bg-black/5" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFolderId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
              {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
              {activeFolderId === 'PROJECTS' && (
                <CorkboardProjectsView
                  selectedProjectId={selectedProjectId}
                  onProjectSelect={onProjectSelect}
                  onProjectClose={onProjectClose}
                  onPreviewPhoto={onPreviewPhoto}
                />
              )}
              {activeFolderId === 'HOBBIES' && <HobbiesView />}
            </motion.div>
          </AnimatePresence>

          <div className="pt-20 border-t-4 border-double border-black/10 flex justify-between items-baseline opacity-30 font-mono text-[9px] font-black uppercase tracking-[0.5em]">
            <span>Verified_Record</span>
            <span>End_Of_Document</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CombinedView() {
  const basicInfo = [
    { icon: UserRound, label: '姓名', value: resumeData.name },
    { icon: Phone, label: '电话', value: resumeData.phone },
    { icon: Mail, label: '邮箱', value: resumeData.email },
    { icon: MapPin, label: '现居地', value: resumeData.location },
    { icon: Star, label: '鍑虹敓骞存湀', value: resumeData.birth },
    { icon: Sparkles, label: '实习状态', value: resumeData.internship },
  ];

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="overview-section">
        <SectionHeader title="基本信息" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {basicInfo.map(({ icon, label, value }) => (
            <div key={label}>
              <InfoCell icon={icon} label={label} value={value} />
            </div>
          ))}
        </div>
      </section>

      <section className="overview-section">
        <SectionHeader title="教育经历" />
        {resumeData.education.map((edu) => (
          <div key={edu.school} className="grid gap-4 md:grid-cols-[1fr_auto] items-end border border-archive-border/10 bg-[#f8f5ea]/80 p-5 md:p-6">
            <div>
              <div className="flex items-center gap-3 text-archive-border/50 mb-3">
                <GraduationCap size={18} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Education</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-black tracking-tight">{edu.school}</h4>
              <p className="mt-2 text-sm md:text-base text-archive-border/65">{edu.major} 路 {edu.degree}</p>
            </div>
            <div className="text-xs font-mono bg-archive-border text-white px-4 py-2 tracking-widest w-fit">
              {edu.period}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-6">
          <section className="overview-section">
            <SectionHeader title="技能总结词条" />
            <div className="grid gap-3 sm:grid-cols-2">
              {resumeData.skillTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-3 border border-archive-border/10 bg-white/80 px-4 py-3 shadow-sm"
                >
                  <Code2 size={16} className="text-archive-border/45 shrink-0" />
                  <span className="text-sm font-semibold text-archive-border/80">{tag}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="overview-section">
            <SectionHeader title="个人优势" />
            <div className="space-y-3">
              {resumeData.advantages.map((adv, i) => (
                <div key={adv} className="grid grid-cols-[34px_1fr] gap-4 border-b border-archive-border/10 pb-3">
                  <span className="text-lg font-mono text-archive-border/20 font-black">0{i + 1}</span>
                  <p className="text-sm md:text-base leading-relaxed text-archive-border/75">{adv}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="overview-section">
            <SectionHeader title="奖项荣誉" />
            <div className="grid gap-3">
              {resumeData.awards.map((award) => (
                <div key={award} className="flex gap-3 items-start bg-[#f7fbff] border border-[#9bb5c8]/30 px-4 py-3">
                  <Award size={18} className="text-[#4f748d] shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-semibold text-archive-border/80">{award}</span>
                </div>
              ))}
            </div>
          </section>
      </section>
    </div>
  );
}

function LeftProfileBoard() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[7%] top-[10%] w-[86%] max-w-[500px] min-h-[560px]"
        initial={{ opacity: 0, y: 110 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      >
        {resumeData.photos.daily.map((photo, index) => (
          <div key={photo}>
            <PhotoSticky
              src={photo}
              label={index === 0 ? 'ID PHOTO' : `DAILY 0${index}`}
              className={[
                'left-[7%] top-[2%] w-36 md:w-40 rotate-[-5deg] z-30',
                'left-[36%] top-[12%] w-44 md:w-52 rotate-[5deg] z-20',
                'left-[12%] top-[43%] w-48 md:w-56 rotate-[-3deg] z-10',
              ][index]}
              delay={0.14 + index * 0.12}
              imageClassName={index === 0 ? 'aspect-square object-cover object-center' : 'aspect-[4/5] object-cover object-center'}
            />
          </div>
        ))}
        <StationerySticker kind="paperclip" className="left-[2%] top-[5%] rotate-[-18deg] z-50" delay={0.42} />
        <StationerySticker kind="paperclip" className="left-[31%] top-[54%] rotate-[20deg] z-50" delay={0.5} />
        <StationerySticker kind="binder" className="left-[68%] top-[10%] rotate-[8deg] z-50" delay={0.46} />
        <StationerySticker kind="star-pin" className="left-[3%] top-[39%] rotate-[-10deg] z-50" delay={0.54} />
        <StationerySticker kind="star-pin" className="left-[75%] top-[47%] rotate-[12deg] z-50" delay={0.58} />
        <DraggableNote
          text="前端开发 / 数据分析 / AI 产品复盘 / 内容运营"
          color="bg-[#fff0a8]"
          initPos={{ x: 238, y: 348 }}
          rotate={-4}
        />
        <motion.div
          className="absolute left-[48%] top-[55%] w-44 bg-[#dff0e4] border border-archive-border/10 p-4 shadow-[5px_8px_18px_rgba(0,0,0,0.12)] rotate-[5deg] z-40"
          drag
          dragMomentum={false}
          initial={{ opacity: 0, y: 36, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ delay: 0.34, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          whileDrag={{ scale: 1.04, zIndex: 100 }}
        >
          <div className="flex items-center gap-2 text-archive-border/35 mb-3">
            <Sparkles size={14} />
            <span className="text-[8px] font-mono tracking-[0.28em] uppercase">Hello</span>
          </div>
          <p className="text-xs font-semibold leading-relaxed text-archive-border/80">
            可长期实习，能把页面实现、交互开发、数据观察和内容策略串起来。
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StationerySticker({
  kind,
  className,
  delay,
}: {
  kind: 'paperclip' | 'binder' | 'star-pin';
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileDrag={{ scale: 1.08, zIndex: 120 }}
      className={`stationery-sticker stationery-sticker--${kind} ${className}`}
      aria-hidden="true"
    >
      {kind === 'paperclip' && <span className="paperclip-shape" />}
      {kind === 'binder' && (
        <span className="binder-clip-shape">
          <i />
          <b />
        </span>
      )}
      {kind === 'star-pin' && (
        <span className="star-pin-shape">
          <Sparkles size={18} strokeWidth={2.3} />
        </span>
      )}
    </motion.div>
  );
}

function PhotoSticky({
  src,
  label,
  className,
  delay,
  imageClassName,
}: {
  src: string;
  label: string;
  className: string;
  delay: number;
  imageClassName: string;
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, y: 58 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      whileDrag={{ scale: 1.04, zIndex: 100 }}
      className={`absolute bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)] border border-black/10 cursor-grab active:cursor-grabbing ${className}`}
    >
      <div className="overflow-hidden bg-[#e8eef4] border border-black/5">
        <OptimizedImage src={src} alt={label} className={`w-full h-full ${imageClassName}`} />
      </div>
      <div className="pt-3 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.3em] text-archive-border/45">{label}</span>
        <BarChart3 size={15} className="text-archive-border/35" />
      </div>
    </motion.div>
  );
}

function DraggableNote({ text, color, initPos, rotate = 0 }: { text: string; color: string; initPos?: { x: number; y: number }, rotate?: number }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={initPos ? { x: initPos.x, y: initPos.y, opacity: 0, rotate } : { opacity: 0, rotate }}
      animate={{ opacity: 1 }}
      whileDrag={{ scale: 1.05, zIndex: 100 }}
      className={`pointer-events-auto absolute p-4 md:p-5 w-44 aspect-square ${color} border border-archive-border/10 shadow-[4px_4px_10px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing z-40 transition-shadow hover:shadow-xl group`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex gap-1.5 mb-3 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-archive-border/30" />
          <div className="w-4 h-[1px] bg-archive-border/10" />
        </div>
        <p className="text-xs font-semibold leading-relaxed text-archive-border/90">{text}</p>
        <div className="mt-auto pt-2 border-t border-black/5 flex justify-between items-center">
          <span className="text-[7px] font-mono opacity-30 uppercase tracking-widest">Drag_Note</span>
          <Sparkles size={12} className="opacity-35" />
        </div>
      </div>
    </motion.div>
  );
}

function ExperiencePhotoBoard({ onPreviewPhoto }: { onPreviewPhoto: (photo: { src: string; title: string }) => void }) {
  const groups = [
    {
      title: 'Japan Product Talk',
      subtitle: '商务代表 / 产品讲解',
      photos: [
        '/assets/exp-japan-01.jpg',
        '/assets/exp-japan-02.jpg',
        '/assets/exp-japan-03.jpg',
      ],
    },
    {
      title: 'SIAT Internship',
      subtitle: '中科院实习 / Unity 实验',
      photos: [
        '/assets/exp-siat-01.jpg',
        '/assets/exp-siat-dashboard.png',
        '/assets/exp-siat-03.jpg',
      ],
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[7%] top-[8%] w-[86%] max-w-[560px] space-y-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
      >
        {groups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + groupIndex * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="experience-photo-group"
          >
            <div className="experience-photo-caption">
              <span>{group.title}</span>
              <small>{group.subtitle}</small>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {group.photos.map((photo, index) => (
                <motion.button
                  key={photo}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPreviewPhoto({ src: photo, title: `${group.title} 0${index + 1}` })}
                  className="experience-photo-tile"
                >
                  <OptimizedImage src={photo} alt={`${group.title} ${index + 1}`} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function PhotoPreview({
  preview,
  onClose,
}: {
  preview: { src: string; title: string } | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          className="photo-preview-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="photo-preview-frame"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="photo-preview-header">
              <span>{preview.title}</span>
              <button type="button" onClick={onClose} aria-label="关闭图片预览">
                <X size={18} />
              </button>
            </div>
            <OptimizedImage src={preview.src} alt={preview.title} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoCell({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="border border-archive-border/10 bg-white/70 px-4 py-3">
      <div className="flex items-center gap-2 text-archive-border/45 mb-1">
        <Icon size={13} />
        <span className="text-[9px] font-mono uppercase tracking-[0.25em]">{label}</span>
      </div>
      <span className="text-sm md:text-base font-bold text-archive-border/85">{value}</span>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="space-y-9">
      {resumeData.experiences.map((exp) => (
        <div key={exp.company} className="border border-archive-border/10 bg-white/75 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-archive-border/15 pb-4 gap-3">
            <div>
              <p className="text-[10px] font-mono opacity-45 uppercase tracking-[0.28em] mb-2">Internship / Practice</p>
              <h4 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight">{exp.company}</h4>
              <p className="mt-2 text-sm font-semibold text-archive-border/65">{exp.role}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mb-1">Timeframe</p>
              <span className="text-sm font-bold bg-archive-bg px-3 py-1 border border-archive-border/10">{exp.period}</span>
            </div>
          </div>
          <div className="pt-5">
            <ul className="space-y-3">
              {exp.highlights.map((h) => (
                <li key={h} className="text-sm md:text-[15px] leading-relaxed flex gap-3 group text-archive-border/78">
                  <span className="text-archive-border/30 font-mono mt-1 group-hover:text-archive-border transition-colors">-</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsView({
  selectedProjectId,
  onProjectSelect,
  onProjectClose,
  onPreviewPhoto,
}: {
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectClose: () => void;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  const selectedProject = resumeData.projects.find((project) => project.id === selectedProjectId) ?? null;
  return (
    <div className="projects-panel-shell">
      {selectedProject && (
        <ProjectDetailSection
          project={selectedProject}
          onClose={onProjectClose}
          onPreviewPhoto={onPreviewPhoto}
        />
      )}

      <div className="projects-panel-list">
        {resumeData.projects.map((proj, index) => {
          const canOpenDetail = Boolean(proj.detailImages?.length);

          return (
            <button
              key={proj.id}
              type="button"
              onClick={() => canOpenDetail && onProjectSelect(proj.id)}
              className={`project-cute-card group ${index === 0 ? 'project-cute-card--featured' : ''}`}
              aria-label={canOpenDetail ? `查看${proj.title}详情` : proj.title}
            >
              <div className="project-cute-image">
                {proj.image ? (
                  <OptimizedImage src={proj.image} alt={proj.title} />
                ) : (
                  <div className="project-cute-image-fallback">
                    <Code2 size={34} />
                    <span>{proj.title}</span>
                  </div>
                )}
                {canOpenDetail && (
                  <div className="project-cute-hover">
                    <ExternalLink size={22} />
                  </div>
                )}
              </div>
              <div className="project-cute-body">
                <div>
                  <span className="project-cute-count">0{index + 1}</span>
                  <h4>{proj.title}</h4>
                </div>
                <p>{proj.description}</p>
              </div>
              <div className="project-cute-tags">
                {proj.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {canOpenDetail && (
                <div className="project-cute-open">
                  <span>查看小程序详情</span>
                  <ChevronRight size={16} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectDetailSection({
  project,
  onClose,
  onPreviewPhoto,
}: {
  project: Project;
  onClose: () => void;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  return (
    <motion.section
      className="project-detail-section"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-detail-toolbar">
        <span>Mini Program Detail</span>
        <button type="button" onClick={onClose}>返回作品列表</button>
      </div>

      <div className="project-detail-copy">
        <span className="project-detail-kicker">Cookie Diary</span>
        <h4>{project.title}</h4>
        <p>{project.detailIntro ?? project.description}</p>
        <div className="project-detail-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-detail-gallery">
        {project.detailImages?.map((image, index) => (
          <motion.button
            type="button"
            className="project-detail-thumb"
            key={image}
            onClick={() => onPreviewPhoto({ src: image, title: `${project.title}详情图 ${index + 1}` })}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.28 }}
            aria-label={`放大查看${project.title}详情图 ${index + 1}`}
          >
            <OptimizedImage src={image} alt={`${project.title}详情图 ${index + 1}`} />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}

function ProjectDetailFlipOverlay({
  project,
  onClose,
  onPreviewPhoto,
}: {
  project: Project | null;
  onClose: () => void;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-detail-flip-stage custom-scrollbar-minimal"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="project-detail-turning-page"
            initial={{ rotateY: 0, opacity: 1 }}
            animate={{ rotateY: -178, opacity: 0.96 }}
            exit={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.74, ease: [0.18, 0.92, 0.2, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="project-detail-page"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.38, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-detail-toolbar">
              <button type="button" onClick={onClose} aria-label="返回作品列表">
                <ArrowLeft size={18} />
                <span>返回作品</span>
              </button>
              <span>Mini Program File</span>
            </div>

            <section className="project-detail-hero">
              <div className="project-detail-copy">
                <span className="project-detail-kicker">Cookie Diary</span>
                <h4>{project.title}</h4>
                <p>{project.detailIntro ?? project.description}</p>
                <div className="project-detail-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="project-detail-gallery">
              {project.detailImages?.map((image, index) => (
                <motion.button
                  type="button"
                  className="project-detail-thumb"
                  key={image}
                  onClick={() => onPreviewPhoto({ src: image, title: `${project.title}详情图 ${index + 1}` })}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06, duration: 0.36 }}
                  aria-label={`放大查看${project.title}详情图 ${index + 1}`}
                >
                  <OptimizedImage src={image} alt={`${project.title}详情图 ${index + 1}`} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </motion.button>
              ))}
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FullCorkboardProjectsPage({
  selectedProjectId,
  onProjectSelect,
  onProjectClose,
  onPreviewPhoto,
}: {
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectClose: () => void;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  return (
    <motion.div
      layoutId="PROJECTS"
      className="project-cork-full-page"
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-[#D4DEE5] folder-tab final-folder-tab">
        03_作品
      </div>
      <div className="project-cork-full-frame">
        <div className="project-cork-full-surface custom-scrollbar-minimal">
          <div className="project-cork-label">
            <span>Project Corkboard</span>
            <button type="button" onClick={onProjectClose}>清空展开</button>
          </div>

          <motion.a
            href="https://xhslink.com/m/8aJr9Yj1r1A"
            target="_blank"
            rel="noopener noreferrer"
            className="xhs-cork-card"
            initial={{ opacity: 0, y: 18, rotate: -1.2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.2 }}
            transition={{ duration: 0.34, delay: 0.08 }}
            whileHover={{ y: -4, rotate: 0 }}
          >
            <span className="cork-pin xhs-cork-pin" aria-hidden="true" />
            <OptimizedImage src="/assets/ruby-xhs-qr.jpg" alt="Ruby 露比小红书二维码" />
            <div className="xhs-cork-copy">
              <span>小红书作品主页</span>
              <strong>Ruby 露比</strong>
              <p>@Ruby露比 在小红书收获了 3544 次赞与收藏，点进去查看更多作品。</p>
              <em>
                <ExternalLink size={14} />
                <span>查看 Ta 的主页</span>
              </em>
            </div>
          </motion.a>

          <div className="project-cork-column">
            {resumeData.projects.map((project, index) => {
              const isOpen = project.id === selectedProjectId;
              const projectImages = [
                ...(project.image ? [project.image] : []),
                ...(project.detailImages ?? []),
              ];
              const hasVideo = Boolean(project.video);

              return (
                <motion.section
                  key={project.id}
                  className={`project-cork-item project-cork-item--${index + 1} ${isOpen ? 'project-cork-item--open' : ''}`}
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.07, duration: 0.34 }}
                >
                  <motion.button
                    type="button"
                    className={`project-cork-ticket ${isOpen ? 'project-cork-ticket--active' : ''}`}
                    onClick={() => onProjectSelect(project.id)}
                    drag
                    dragMomentum={false}
                    whileDrag={{ scale: 1.03, zIndex: 100 }}
                  >
                    <span className="cork-pin" aria-hidden="true" />
                    <span className="cork-project-index">0{index + 1}</span>
                    <strong>{project.title}</strong>
                    <p>{project.description}</p>
                    <span className="project-cork-preview-hint">
                      {hasVideo ? '点击播放视频演示' : '点击图片预览详细'}
                    </span>
                    <em>{isOpen ? '已展开素材' : hasVideo ? '点击展开放映机' : '点击展开素材'}</em>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                    <motion.div
                      className="project-cork-open-area"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.26 }}
                    >
                      {project.video ? (
                        project.id === 'y-navigation' ? (
                          <div className="ccd-card">
                            <div className="ccd-screen">
                              <video src={project.video} controls preload="metadata" />
                            </div>
                            <OptimizedImage className="ccd-camera-shell" src="/assets/y-navigation-ccd-frame.png" alt="Canon CCD 相机外框" />
                          </div>
                        ) : (
                          <div className="circuit-video-card">
                            <div className="circuit-video-header">
                              <span>Playable Build Preview</span>
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={14} />
                                  <span>LDJam 页面</span>
                                </a>
                              )}
                            </div>
                            <div className="circuit-video-screen">
                              <video src={project.video} controls preload="metadata" />
                            </div>
                            <span className="circuit-chip circuit-chip--left" aria-hidden="true" />
                            <span className="circuit-chip circuit-chip--right" aria-hidden="true" />
                          </div>
                        )
                      ) : (
                        <div className="project-cork-photo-grid">
                          {projectImages.map((image, imageIndex) => (
                            <motion.button
                              key={`${project.id}-${image}`}
                              type="button"
                              drag
                              dragMomentum={false}
                              className="project-cork-photo project-cork-photo--grid"
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.92 }}
                              transition={{ delay: imageIndex * 0.035, duration: 0.22 }}
                              whileDrag={{ scale: 1.04, zIndex: 110 }}
                              onClick={() => onPreviewPhoto({ src: image, title: `${project.title} 图片 ${imageIndex + 1}` })}
                            >
                              <span className="cork-thumb-pin" aria-hidden="true" />
                              <OptimizedImage src={image} alt={`${project.title} 图片 ${imageIndex + 1}`} />
                              <span>{String(imageIndex + 1).padStart(2, '0')}</span>
                            </motion.button>
                          ))}
                        </div>
                      )}
                      {project.id === 'emotion-cookie' && (
                        <div className="project-cork-tech-stack">
                          <h4>技术栈介绍</h4>
                          <p><strong>前端：</strong>WXML / WXSS / JavaScript，Glass-Easel 组件框架、wx.request 调用。</p>
                          <p><strong>后端：</strong>Node.js、Express、TypeScript、better-sqlite3、CORS、模块化 services/utils，租用腾讯云进行储存。</p>
                        </div>
                      )}
                      {project.techStack && (
                        <div className="project-cork-tech-stack project-cork-tech-stack--unity">
                          <h4>{project.techStack.title}</h4>
                          <ul>
                            {project.techStack.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.section>
              );
            })}
          </div>

          <section className="more-projects-section">
            <div className="more-projects-heading">
              <span>更多作品</span>
              <small>Small Web Games</small>
            </div>
            <div className="more-projects-grid">
              {resumeData.moreProjects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-project-card"
                  initial={{ opacity: 0, y: 22, rotate: index === 0 ? -1.5 : 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: index === 0 ? -1.5 : 1.5 }}
                  transition={{ delay: 0.28 + index * 0.08, duration: 0.32 }}
                  whileHover={{ y: -6, rotate: 0 }}
                >
                  <span className="cork-thumb-pin" aria-hidden="true" />
                  <OptimizedImage src={project.image} alt={`${project.title}封面`} />
                  <div className="more-project-card-copy">
                    <div>
                      <strong>{project.title}</strong>
                      <p>{project.description}</p>
                    </div>
                    <span className="more-project-play">
                      <ExternalLink size={14} />
                      <span>打开游玩</span>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
function CorkboardProjectsView({
  selectedProjectId,
  onProjectSelect,
  onProjectClose,
  onPreviewPhoto,
}: {
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectClose: () => void;
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  const selectedProject = resumeData.projects.find((project) => project.id === selectedProjectId) ?? resumeData.projects[0];
  const scatteredImages = [
    ...(selectedProject.image ? [selectedProject.image] : []),
    ...(selectedProject.detailImages ?? []),
  ];
  const positions = [
    { left: '4%', top: '10%', rotate: -8 },
    { left: '57%', top: '5%', rotate: 6 },
    { left: '70%', top: '34%', rotate: -4 },
    { left: '9%', top: '45%', rotate: 5 },
    { left: '38%', top: '57%', rotate: -6 },
    { left: '58%', top: '66%', rotate: 4 },
    { left: '25%', top: '20%', rotate: 3 },
  ];

  return (
    <div className="cork-project-board">
      <div className="cork-board-frame">
        <div className="cork-board-surface">
          <div className="cork-board-title">
            <span>Project Corkboard</span>
            <button type="button" onClick={onProjectClose}>清空展开</button>
          </div>

          <div className="cork-note-stack">
            {resumeData.projects.map((project, index) => {
              const isActive = project.id === selectedProjectId;
              const canOpen = Boolean(project.image || project.detailImages?.length);

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`cork-project-note ${isActive ? 'cork-project-note--active' : ''}`}
                  onClick={() => canOpen && onProjectSelect(project.id)}
                  initial={{ opacity: 0, y: 24, rotate: -1 + index * 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -1 + index * 1.5 }}
                  transition={{ delay: index * 0.08, duration: 0.36 }}
                  style={{ zIndex: 40 + index }}
                >
                  <span className="cork-pin" aria-hidden="true" />
                  <span className="cork-project-index">0{index + 1}</span>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  <span className="cork-note-action">点击展开素材</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedProjectId && scatteredImages.map((image, index) => {
              const pos = positions[index % positions.length];
              return (
                <motion.button
                  key={`${selectedProjectId}-${image}`}
                  type="button"
                  drag
                  dragMomentum={false}
                  className="cork-polaroid-thumb"
                  style={{ left: pos.left, top: pos.top, rotate: `${pos.rotate}deg`, zIndex: 10 + index }}
                  initial={{ opacity: 0, scale: 0.72, x: '12%', y: '10%' }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.055, duration: 0.3 }}
                  whileDrag={{ scale: 1.04, zIndex: 90 }}
                  onClick={() => onPreviewPhoto({ src: image, title: `${selectedProject.title} 图片 ${index + 1}` })}
                  aria-label={`放大查看${selectedProject.title}图片 ${index + 1}`}
                >
                  <span className="cork-thumb-pin" aria-hidden="true" />
                  <OptimizedImage src={image} alt={`${selectedProject.title}图片 ${index + 1}`} />
                  <span className="cork-thumb-caption">{String(index + 1).padStart(2, '0')}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const HOBBY_CD_SCENES = [
  {
    code: 'TRACK 01',
    label: 'MEDIA LOG',
    image: '/assets/hobby-media-01.jpg',
    gallery: ['/assets/hobby-media-01.jpg', '/assets/hobby-media-02.jpg'],
    stickers: ['DATA', 'POST', '7K'],
  },
  {
    code: 'TRACK 02',
    label: 'STAGE MIX',
    image: '/assets/hobby-stage-01.jpg',
    gallery: ['/assets/hobby-stage-01.jpg', '/assets/hobby-stage-02.jpg', '/assets/hobby-stage-03.jpg', '/assets/hobby-stage-04.jpg'],
    stickers: ['LIVE', 'PLAN', 'SHOW'],
  },
  {
    code: 'TRACK 03',
    label: 'CLAY ART',
    image: '/assets/hobby-clay-01.jpg',
    gallery: ['/assets/hobby-clay-01.jpg', '/assets/hobby-clay-02.jpg', '/assets/hobby-clay-03.jpg', '/assets/hobby-clay-04.jpg'],
    stickers: ['HAND', 'COLOR', 'ART'],
  },
  {
    code: 'TRACK 04',
    label: 'TRAVEL FILM',
    image: '/assets/hobby-travel-01.jpg',
    gallery: ['/assets/hobby-travel-01.jpg', '/assets/hobby-travel-02.jpg', '/assets/hobby-travel-03.jpg', '/assets/hobby-travel-04.jpg'],
    stickers: ['CITY', 'SEA', 'SHOT'],
  },
];

function FullCdHobbiesPage({
  onPreviewPhoto,
}: {
  onPreviewPhoto: (photo: { src: string; title: string }) => void;
}) {
  const [activeHobbyIndex, setActiveHobbyIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const selectedHobby = hobbyData[activeHobbyIndex] ?? hobbyData[0];
  const selectedScene = HOBBY_CD_SCENES[activeHobbyIndex] ?? HOBBY_CD_SCENES[0];
  const SelectedIcon = HobbyIcons[selectedHobby.icon] ?? Heart;
  const activeImage = selectedScene.gallery[activeGalleryIndex] ?? selectedScene.image;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [activeHobbyIndex]);

  return (
    <motion.div
      layoutId="HOBBIES"
      className="hobby-cd-page"
      initial={{ opacity: 0, y: 34, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-[#E5D4DE] folder-tab final-folder-tab">
        04_爱好
      </div>

      <div className="hobby-cd-shell">
        <div className="hobby-cd-shelf custom-scrollbar-minimal" aria-label="爱好 CD 列表">
          {hobbyData.map((hobby, index) => {
            const Icon = HobbyIcons[hobby.icon] ?? Heart;
            const scene = HOBBY_CD_SCENES[index] ?? HOBBY_CD_SCENES[0];
            const isActive = index === activeHobbyIndex;

            return (
              <motion.button
                key={hobby.title}
                type="button"
                className={`hobby-cd-card hobby-cd-card--${index + 1} ${isActive ? 'hobby-cd-card--active' : ''}`}
                onClick={() => setActiveHobbyIndex(index)}
                initial={{ opacity: 0, x: -24, rotate: -2 + index }}
                animate={{ opacity: 1, x: 0, rotate: -2 + index }}
                transition={{ delay: index * 0.06, duration: 0.32 }}
                aria-label={`播放${hobby.title}`}
              >
                <span className="hobby-cd-case-shine" aria-hidden="true" />
                <span className="hobby-cd-spine" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="hobby-cd-disc" aria-hidden="true">
                  <span className="hobby-cd-disc-art">
                    <OptimizedImage src={scene.image} alt="" />
                  </span>
                  <span className="hobby-cd-hole" />
                </span>
                <span className="hobby-cd-copy">
                  <span>{scene.code}</span>
                  <strong>{hobby.title}</strong>
                  <small>{scene.label}</small>
                </span>
                <span className="hobby-cd-stickers" aria-hidden="true">
                  <span>{scene.stickers[0]}</span>
                  <span>{scene.stickers[1]}</span>
                  <span>{scene.stickers[2]}</span>
                </span>
                <span className="hobby-cd-mini-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="hobby-player-stage">
          <div className="hobby-player-head">
            <span>Portable DVD Studio</span>
            <div className="hobby-player-status">
              <span className="hobby-status-light" aria-hidden="true" />
              <span>{selectedScene.code}</span>
            </div>
          </div>

          <div className="hobby-screen-shell">
            <div className="hobby-speaker hobby-speaker--left" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHobby.title}
                className="hobby-player-window"
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 0.32 }}
              >
                <button
                  type="button"
                  className="hobby-player-preview"
                  onClick={() => onPreviewPhoto({ src: activeImage, title: `${selectedHobby.title} 图片 ${activeGalleryIndex + 1}` })}
                  aria-label={`放大查看${selectedHobby.title}主图`}
                >
                  <OptimizedImage src={activeImage} alt={selectedHobby.title} />
                </button>
              </motion.div>
            </AnimatePresence>

            <div className="hobby-speaker hobby-speaker--right" aria-hidden="true" />

            <div className="hobby-screen-brand" aria-hidden="true">
              <span>malata</span>
              <span>DVD / AV</span>
            </div>
          </div>

          <div className="hobby-console-panel">
            <div className="hobby-projector-body">
              <div className="hobby-projector-disc">
                <Disc3 size={118} strokeWidth={0.8} />
                <span className="hobby-projector-center">
                  <SelectedIcon size={26} strokeWidth={1.5} />
                </span>
              </div>

              <div className="hobby-projector-copy">
                <div>
                  <span>{selectedScene.code}</span>
                  <h4>{selectedHobby.title}</h4>
                </div>
                <p>{selectedHobby.desc}</p>
              </div>
            </div>

            <div className="hobby-console-meta" aria-hidden="true">
              <span>Dolby Digital</span>
              <span>{selectedScene.label}</span>
              <span>{String(activeGalleryIndex + 1).padStart(2, '0')}/{String(selectedScene.gallery.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="hobby-player-gallery">
            {selectedScene.gallery.map((image, index) => (
              <button
                key={`${selectedHobby.title}-${image}`}
                type="button"
                className={`hobby-film-thumb ${index === activeGalleryIndex ? 'hobby-film-thumb--active' : ''}`}
                onClick={() => setActiveGalleryIndex(index)}
                aria-label={`切换到${selectedHobby.title}图片 ${index + 1}`}
                aria-pressed={index === activeGalleryIndex}
              >
                <OptimizedImage src={image} alt={`${selectedHobby.title}图片 ${index + 1}`} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          <div className="hobby-sticker-row" aria-hidden="true">
            {selectedScene.stickers.map((sticker) => (
              <span key={sticker}>{sticker}</span>
            ))}
          </div>

          <div className="hobby-control-dock">
            <div className="hobby-control-cluster" aria-hidden="true">
              <span className="hobby-control-button" />
              <span className="hobby-control-button hobby-control-button--wide" />
              <span className="hobby-control-button" />
            </div>

            <button
              type="button"
              className="hobby-play-button"
              onClick={() => onPreviewPhoto({ src: activeImage, title: `${selectedHobby.title} 图片 ${activeGalleryIndex + 1}` })}
              aria-label={`放大播放${selectedHobby.title}`}
            >
              <Play size={18} fill="currentColor" />
              <span>放映</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HobbiesView() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {hobbyData.map((hobby) => {
        const Icon = HobbyIcons[hobby.icon];
        return (
          <div key={hobby.title} className="p-10 bg-archive-bg/20 border border-archive-border/10 hover:border-archive-border hover:bg-white transition-all group flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white border border-archive-border/10 flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-transform">
              <Icon size={32} strokeWidth={1} className="text-archive-border/60 group-hover:text-archive-border transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-4">{hobby.title}</h4>
            <p className="text-sm leading-relaxed text-archive-border/50 group-hover:text-archive-border/80 transition-colors">
              {hobby.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-archive-border/45 mb-5 flex items-center gap-5">
      {title}
      <span className="flex-1 h-[1px] bg-archive-border/10" />
    </h3>
  );
}
