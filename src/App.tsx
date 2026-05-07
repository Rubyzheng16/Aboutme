import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  X, 
  ExternalLink,
  ChevronRight,
  Briefcase,
  Layers,
  Heart,
  FileText,
  Megaphone,
  Music,
  Palette,
  Camera,
  Star
} from 'lucide-react';
import { resumeData, hobbyData } from './data';

type FolderId = 'PROFILE_EDU' | 'EXPERIENCE' | 'PROJECTS' | 'HOBBIES';

const FOLDERS: { id: FolderId; label: string; color: string; hoverColor: string; tabOffset: string; icon: any }[] = [
  { id: 'PROFILE_EDU', label: '01_概览', color: 'bg-[#E3D9C6]', hoverColor: 'group-hover:bg-[#D4C4A8]', tabOffset: 'ml-2 md:ml-4', icon: FileText },
  { id: 'EXPERIENCE', label: '02_经历', color: 'bg-[#D6E0D4]', hoverColor: 'group-hover:bg-[#BACCB7]', tabOffset: 'ml-20 md:ml-32', icon: Briefcase },
  { id: 'PROJECTS', label: '03_作品', color: 'bg-[#D4DEE5]', hoverColor: 'group-hover:bg-[#B8C8D4]', tabOffset: 'ml-[144px] md:ml-64', icon: Layers },
  { id: 'HOBBIES', label: '04_爱好', color: 'bg-[#E5D4DE]', hoverColor: 'group-hover:bg-[#D4B8C8]', tabOffset: 'ml-[220px] md:ml-96', icon: Heart },
];

const HobbyIcons: Record<string, any> = { Megaphone, Music, Palette, Camera };

export default function App() {
  const [activeFolderId, setActiveFolderId] = useState<FolderId | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [detailPhase, setDetailPhase] = useState<'extract' | 'flip' | 'fixed'>('extract');

  useEffect(() => {
    if (!activeFolderId) return;
    setDetailPhase('extract');
    const flipTimer = window.setTimeout(() => setDetailPhase('flip'), 260);
    const fixedTimer = window.setTimeout(() => setDetailPhase('fixed'), 860);

    return () => {
      window.clearTimeout(flipTimer);
      window.clearTimeout(fixedTimer);
    };
  }, [activeFolderId]);

  const getFolderTop = (index: number) => {
    const baseGap = window.innerWidth < 768 ? 45 : 65;
    const hoverGap = window.innerWidth < 768 ? 160 : 320; // How much it expands
    
    let top = (FOLDERS.length - 1 - index) * baseGap;
    
    // Shift down if a folder ABOVE this one is hovered
    if (hoveredIdx !== null && index < hoveredIdx) {
      top += hoverGap;
    }
    
    return top;
  };

  return (
    <div className="min-h-screen bg-archive-bg flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-orange-200 overflow-hidden wireframe-grid relative">
      {/* Background Depth Shadow Overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%] pointer-events-none" />
      
      {/* Header */}
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
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-archive-border/60 text-[10px] md:text-xs">Professional Personal Archive</span>
              <span className="w-12 h-[1px] bg-archive-border/30" />
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tighter mb-4 uppercase">
              郑好个人简历
            </h1>
            <p className="text-[10px] md:text-sm font-mono text-archive-border/60 uppercase tracking-widest leading-relaxed">
              {resumeData.location} // {resumeData.phone}<br />
              {resumeData.email}
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Stack Container */}
      <div className="relative w-full max-w-5xl h-[450px] md:h-[650px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!activeFolderId ? (
            <motion.div 
              key="stack"
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {FOLDERS.map((folder, index) => (
                <motion.div 
                  key={folder.id}
                  layoutId={folder.id}
                  onClick={() => setActiveFolderId(folder.id)}
                  onHoverStart={() => setHoveredIdx(index)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  className="absolute w-[92%] md:w-[680px] cursor-pointer group left-1/2 -ml-[46%] md:-ml-[340px] folder-3d-depth"
                  animate={{
                    top: getFolderTop(index),
                    zIndex: FOLDERS.length - index,
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Folder Tab */}
                  <div className={`w-32 md:w-56 h-10 ${folder.color} border-t-2 border-l-2 border-r-2 border-black/10 folder-tab ${folder.tabOffset} text-[9px] md:text-sm flex items-center px-4 md:px-8 font-mono text-black/60 font-black uppercase transition-all duration-300 group-hover:brightness-105 paper-grain overflow-hidden`}>
                    <span className="relative z-10">{folder.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                  </div>

                  {/* Folder Body */}
                  <div className={`w-full h-64 md:h-[420px] ${folder.color} border-2 border-black/10 shadow-[20px_20px_60px_rgba(0,0,0,0.15)] p-8 md:p-14 flex flex-col justify-between transition-all duration-500 paper-grain relative overflow-hidden rounded-r-sm rounded-bl-sm`}>
                    {/* Metal eyelet decoration */}
                    <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border border-black/20 shadow-inner flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    </div>

                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 opacity-30">
                           <div className="w-2 h-2 rounded-full bg-black" />
                           <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Fragment_{index+1}</p>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-black/70">{folder.label}</h3>
                      </div>
                      <div className="p-4 bg-black/5 rounded-2xl group-hover:bg-white/40 transition-colors">
                        <folder.icon size={44} strokeWidth={1} className="text-black/30 group-hover:text-black/70 transition-all" />
                      </div>
                    </div>

                    <div className="flex justify-between items-end pb-4 relative z-10 border-t border-black/5 pt-8">
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono opacity-30 block tracking-[0.4em] uppercase font-black">Archive_Sequence</span>
                        <div className="flex items-center gap-4">
                           <span className="text-sm md:text-lg font-mono font-bold tracking-tighter uppercase text-black/40 italic">BUREAU_ZH//0{index+1}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-black/5 flex items-center justify-center group-hover:bg-black transition-all">
                        <ChevronRight size={20} className="text-black/30 group-hover:text-white transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Visual Thickness beneath the body */}
                  <div className="folder-thickness rounded-r-sm rounded-bl-sm" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center bg-[#1a1a1a]/98 overflow-hidden pt-10 md:pt-20"
            >
              <div className="relative w-full max-w-7xl flex flex-col items-center">
                
                {/* Close Button UI - Fixed position */}
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setActiveFolderId(null)}
                  className="fixed top-6 right-6 md:top-12 md:right-12 p-4 bg-white/5 rounded-full text-white hover:bg-white/20 transition-all z-[120] flex items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <X size={28} strokeWidth={1} />
                </motion.button>

                {detailPhase !== 'extract' && <DossierPage activeFolderId={activeFolderId} />}
                <PageFlipTransition detailPhase={detailPhase} activeFolderId={activeFolderId} />

                {/* Disabled: previous fixed reader experiment kept out of the render path. */}
                {false && (() => {
                  const currentFolder = FOLDERS.find(f => f.id === activeFolderId);
                  const currentFolderLabel = currentFolder?.label?.replace('_', ' ') ?? 'Document';
                  return (
                    <motion.div
                      layoutId={activeFolderId}
                      className="detail-shell px-3 md:px-8"
                      initial={{ opacity: 0, y: 90, scale: 0.76 }}
                      animate={{
                        opacity: 1,
                        y: detailPhase === 'extract' ? 42 : 0,
                        scale: detailPhase === 'extract' ? 0.84 : detailPhase === 'flip' ? 0.92 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div key={detailPhase} className={`detail-fixed-board ${detailPhase === 'fixed' ? 'detail-fixed-board--fixed' : ''}`}>
                        {detailPhase === 'fixed' ? (
                          <>
                            <div className="detail-left-empty" />
                            <div className="detail-right-scroll custom-scrollbar-minimal">
                              <div className="mb-10 md:mb-14">
                                <p className="text-xs font-mono tracking-[0.34em] uppercase text-black/40 mb-3">File {currentFolderLabel}</p>
                                <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-3">Unverified</h2>
                                <p className="text-black/55 leading-relaxed">右页展示简历内容，左页保持空白。翻页结束后进入固定阅读模式，鼠标滚动可继续查看下方内容。</p>
                              </div>

                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeFolderId}
                                  initial={{ opacity: 0, y: 24 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                  className="resume-flow"
                                >
                                  {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                                  {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                                  {activeFolderId === 'PROJECTS' && <ProjectsView />}
                                  {activeFolderId === 'HOBBIES' && <HobbiesView />}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </>
                        ) : (
                          <div className="pageflip-host">
                            <div className="pageflip-page pageflip-page--blank" />
                            <div className="pageflip-page pageflip-page--resume custom-scrollbar-minimal">
                              <div className="mb-10 md:mb-14">
                                <p className="text-xs font-mono tracking-[0.34em] uppercase text-black/40 mb-3">File {currentFolderLabel}</p>
                                <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-3">Unverified</h2>
                                <p className="text-black/55 leading-relaxed">翻页阶段：左页为空白纸张，右页为简历内容。</p>
                              </div>
                              <div className="resume-flow">
                                {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                                {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                                {activeFolderId === 'PROJECTS' && <ProjectsView />}
                                {activeFolderId === 'HOBBIES' && <HobbiesView />}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistence Footer */}
      <AnimatePresence>
        {!activeFolderId && (
          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <a 
              href="https://github.com/ln-dev7/square-ui" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 group px-4 py-2 border border-archive-border/10 hover:border-archive-border/40 transition-all rounded-full bg-white/40"
            >
              <Github size={20} strokeWidth={1.5} />
              <span className="text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity">/ln-dev7/square-ui</span>
            </a>
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">
              ZHENG HAO Archive System · 版权所有 © 2026
            </p>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}

function DraggableNote({ text, color, initPos, rotate = 0 }: { id: string; text: string; color: string; initPos?: { x: number; y: number }, rotate?: number }) {
   return (
      <motion.div
         drag
         dragMomentum={false}
         initial={initPos ? { x: initPos.x, y: initPos.y, opacity: 0, rotate } : { opacity: 0, rotate }}
         animate={{ opacity: 1 }}
         whileDrag={{ scale: 1.05, zIndex: 100 }}
         className={`pointer-events-auto absolute p-4 md:p-6 w-40 md:w-48 aspect-square ${color} border border-archive-border/10 shadow-[4px_4px_10px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing z-40 transition-shadow hover:shadow-xl group`}
      >
         <div className="w-full h-full flex flex-col">
            <div className="flex gap-1.5 mb-3 items-center">
               <div className="w-1.5 h-1.5 rounded-full bg-archive-border/30" />
               <div className="w-4 h-[1px] bg-archive-border/5" />
            </div>
            <p className="text-[10px] md:text-xs font-semibold leading-relaxed font-sans text-archive-border/90">
               {text}
            </p>
            <div className="mt-auto pt-2 border-t border-black/5 flex justify-between items-center">
               <span className="text-[7px] font-mono opacity-30 uppercase tracking-widest">Note_Ref</span>
               <div className="w-1.5 h-1.5 rounded-full border border-archive-border/10" />
            </div>
         </div>
      </motion.div>
   );
}

function DetailItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 opacity-50">
        <Icon size={12} />
        <span className="text-[9px] font-mono uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xs font-semibold">{value}</span>
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
          <motion.div
            className="book-open-stage"
            initial={{ y: 40, scale: 0.995 }}
            animate={{
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="book-open-spread"
            >
              <motion.div
                className="book-open-right-cover"
                initial={{ opacity: 1 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.01 }}
              >
                <PageIntro activeFolderId={activeFolderId} className="book-open-right-intro" />
              </motion.div>
              <motion.div
                className={`book-open-turning-cover ${folder.color}`}
                animate={{
                  width: "50%",
                  left: isOpen ? "calc(50% - 2px)" : "50%",
                  rotateY: isOpen ? -156 : 0,
                }}
                transition={{ duration: 0.58, ease: [0.18, 0.92, 0.2, 1] }}
              >
                <div className={`book-open-cover-front ${folder.color}`}>
                  <div className={`book-open-tab ${folder.color} folder-tab`}>
                    {folder.label}
                  </div>
                </div>
                <div className={`book-open-cover-back ${folder.color}`}>
                  <div className={`book-open-tab ${folder.color} folder-tab`}>
                    {folder.label}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PageIntro({ activeFolderId, className = "" }: { activeFolderId: FolderId; className?: string }) {
  const currentFolder = FOLDERS.find(f => f.id === activeFolderId);
  const title = currentFolder?.label.split('_')[1] || currentFolder?.label;

  return (
    <div className={className}>
      <div className="flex items-center gap-6 mb-12 opacity-20">
        <div className="w-16 h-[2px] bg-black" />
        <span className="text-xs font-mono tracking-[0.5em]">CERTIFIED_DOC</span>
      </div>
      <h3 className="text-7xl md:text-[120px] font-serif italic tracking-tighter text-black/95 mb-16 capitalize leading-[0.8]">
        {title}
      </h3>
      <p className="text-2xl md:text-3xl text-black/40 leading-relaxed font-serif max-w-2xl">
        Part of the unindexed materials recovered from the {title} bureau. Authenticated via standard protocols.
      </p>
    </div>
  );
}

function DossierPage({ activeFolderId }: { activeFolderId: FolderId }) {
  const currentFolder = FOLDERS.find(f => f.id === activeFolderId);

  return (
    <motion.div
      layoutId={activeFolderId}
      className={`relative w-full md:w-[100%] h-[calc(100vh-2.5rem)] md:h-[calc(100vh-5rem)] ${currentFolder?.color || 'bg-[#B08D57]'} flex flex-col md:flex-row z-50 origin-center paper-grain overflow-visible`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      style={{ perspective: "2500px" }}
    >
      {/* LEFT PANEL: Flip Animation Blank Page */}
      <motion.div
        initial={{ rotateY: 0, originX: "100%" }}
        animate={{ rotateY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }}
        className="w-full md:w-1/2 h-[45vh] md:h-full shrink-0 sticky top-0 z-20 overflow-visible border-b md:border-b-0 md:border-r border-black/10 shadow-[20px_0_50px_rgba(0,0,0,0.2)] transform-gpu"
      >
        <div className={`${currentFolder?.color || 'bg-[#B08D57]'} folder-tab final-folder-tab`}>
          {currentFolder?.label}
        </div>
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 to-transparent z-30" />
        <div className="absolute right-10 top-0 bottom-0 flex flex-col items-center justify-around py-20 pointer-events-none opacity-5">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-black shadow-inner mb-40" />)}
        </div>
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />
      </motion.div>

      {/* RIGHT CONTENT: Infinite Roll Portal */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto custom-scrollbar-minimal bg-white relative flex flex-col z-10 document-infinite-roll border-l border-black/5 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
        <div className="absolute left-10 top-0 bottom-0 flex flex-col items-center justify-around py-20 pointer-events-none opacity-5">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-black shadow-inner mb-40" />)}
        </div>

        <div className="p-12 md:p-32 space-y-48">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-12 opacity-20">
              <div className="w-16 h-[2px] bg-black" />
              <span className="text-xs font-mono tracking-[0.5em]">CERTIFIED_DOC</span>
            </div>
            <h3 className="text-7xl md:text-[120px] font-serif italic tracking-tighter text-black/95 mb-16 capitalize leading-[0.8]">
              {currentFolder?.label.split('_')[1] || currentFolder?.label}
            </h3>
            <p className="text-2xl md:text-3xl text-black/40 leading-relaxed font-serif max-w-2xl">
              Part of the unindexed materials recovered from the {currentFolder?.label.split('_')[1]} bureau. Authenticated via standard protocols.
            </p>
          </div>

          <div className="w-full h-px bg-black/5" />

          <div className="min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFolderId}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                {activeFolderId === 'PROJECTS' && <ProjectsView />}
                {activeFolderId === 'HOBBIES' && <HobbiesView />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-32 border-t-4 border-double border-black/10 flex justify-between items-baseline opacity-30 font-mono text-[9px] font-black uppercase tracking-[0.5em]">
            <div className="flex gap-12">
              <span>Verified_Record</span>
              <span>Bureau_ZH</span>
            </div>
            <span>End_Of_Document</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function CombinedView() {
  return (
    <div className="space-y-16">
      <section>
        <SectionHeader title="档案主角 | 优势陈述" />
        <div className="grid gap-8">
          {resumeData.advantages.map((adv, i) => (
            <div key={i} className="flex gap-8 items-start group">
              <span className="text-3xl font-mono text-archive-border/10 font-black group-hover:text-archive-border/30 transition-colors">0{i+1}</span>
              <p className="text-base md:text-lg leading-relaxed text-archive-border/80 border-b border-archive-border/5 pb-6 flex-1">
                {adv}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="教育背景 | 学术档案" />
        <div className="space-y-8">
          {resumeData.education.map((edu, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-archive-border/10 bg-gray-50/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-archive-border/20 group-hover:bg-archive-border transition-colors" />
              <div>
                <h4 className="text-2xl font-bold mb-2">{edu.school}</h4>
                <p className="text-base text-archive-border/60">{edu.major} · {edu.degree}</p>
              </div>
              <div className="mt-4 md:mt-0 text-xs font-mono bg-archive-border text-white px-4 py-2 uppercase tracking-widest">
                {edu.period}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="space-y-16">
      {resumeData.experiences.map((exp, i) => (
        <div key={i} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-archive-border pb-4 gap-4">
            <div>
              <p className="text-xs font-mono opacity-50 uppercase tracking-widest mb-2">Company / Organization</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">{exp.company}</h4>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mb-1">Timeframe</p>
              <span className="text-sm font-bold bg-archive-bg px-3 py-1 border border-archive-border/10">{exp.period}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <p className="text-sm font-mono text-archive-border uppercase tracking-widest">职位：{exp.role}</p>
            <ul className="space-y-6">
              {exp.highlights.map((h, j) => (
                <li key={j} className="text-base leading-relaxed flex gap-6 group">
                  <span className="text-archive-border/30 font-mono mt-1 group-hover:text-archive-border transition-colors">▸</span>
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

function ProjectsView() {
  return (
    <div className="grid gap-16 md:grid-cols-2">
      {resumeData.projects.map((proj) => (
        <div key={proj.id} className="group flex flex-col bg-white border border-archive-border/10 p-8 shadow-sm hover:shadow-xl hover:border-archive-border transition-all duration-500">
          <div className="aspect-video bg-gray-200 mb-8 overflow-hidden relative border border-archive-border/5">
            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="p-4 bg-white rounded-full translate-y-4 group-hover:translate-y-0 transition-transform">
                 <ExternalLink size={24} className="text-archive-border" />
               </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h4 className="text-2xl font-bold tracking-tight">{proj.title}</h4>
            <p className="text-sm leading-relaxed text-archive-border/60">{proj.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-10">
            {proj.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono border border-archive-border/20 px-3 py-1 uppercase tracking-widest group-hover:bg-archive-border group-hover:text-white transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HobbiesView() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {hobbyData.map((hobby, i) => {
        const Icon = HobbyIcons[hobby.icon];
        return (
          <div key={i} className="p-10 bg-archive-bg/20 border border-archive-border/10 hover:border-archive-border hover:bg-white transition-all group flex flex-col items-center text-center">
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
    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-archive-border/40 mb-10 flex items-center gap-6">
      {title}
      <span className="flex-1 h-[1px] bg-archive-border/10" />
    </h3>
  );
}
