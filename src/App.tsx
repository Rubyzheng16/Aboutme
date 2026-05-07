import { useState } from 'react';
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
                  className="absolute w-[92%] md:w-[600px] cursor-pointer group left-1/2 -ml-[46%] md:-ml-[300px]"
                  style={{
                    zIndex: FOLDERS.length - index,
                    top: `${(FOLDERS.length - 1 - index) * (window.innerWidth < 768 ? 40 : 60)}px`,
                  }}
                  whileHover={{ 
                    y: window.innerWidth < 768 ? -80 : -120,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Staggered Folder Tab */}
                  <div className={`w-28 md:w-48 h-8 ${folder.color} border-t border-l border-r border-archive-border/50 folder-tab ${folder.tabOffset} text-[9px] md:text-xs flex items-center px-3 md:px-6 font-mono text-archive-border/80 font-bold uppercase transition-colors group-hover:brightness-95`}>
                    {folder.label}
                  </div>
                  {/* Folder Body */}
                  <div className={`w-full h-56 md:h-96 ${folder.color} border border-archive-border/50 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] p-6 md:p-12 flex flex-col justify-between transition-all duration-300 ${folder.hoverColor}`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <p className="text-[10px] md:text-xs font-mono opacity-60 uppercase tracking-widest border-b border-archive-border/20 pb-2">Record Status: CLASSIFIED</p>
                        <h3 className="text-2xl md:text-4xl font-black italic">{folder.label}</h3>
                      </div>
                      <folder.icon size={32} strokeWidth={1} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex justify-between items-end border-t border-archive-border/20 pt-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono opacity-40 block tracking-widest uppercase">Index_Ref</span>
                        <span className="text-xs font-mono font-bold tracking-tighter">ZH_2026/0{index+1}</span>
                      </div>
                      <ChevronRight size={24} className="opacity-40 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/95 p-4 md:p-8 overflow-hidden"
            >
              <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
                
                {/* Close Button UI - Visible on all screens */}
                <motion.button 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setActiveFolderId(null)}
                  className="absolute top-2 right-2 md:-top-16 md:right-0 p-3 bg-white/10 md:bg-transparent rounded-full md:rounded-none text-white hover:text-white/70 transition-colors z-[120] flex items-center gap-2 group backdrop-blur-sm md:backdrop-blur-none"
                >
                  <div className="flex flex-col items-end hidden md:flex">
                    <span className="text-[10px] font-mono leading-none opacity-40 group-hover:opacity-100">EXIT_ARCHIVE</span>
                    <span className="text-xl font-serif italic tracking-tighter">Close Dossier</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors bg-black/20 md:bg-transparent">
                    <X size={20} strokeWidth={1.5} />
                  </div>
                </motion.button>

                {/* The Dossier Folder - Portrait Spread */}
                {(() => {
                  const currentFolder = FOLDERS.find(f => f.id === activeFolderId);
                  return (
                    <motion.div 
                      layoutId={activeFolderId}
                      className={`relative w-full md:w-[1000px] h-[85vh] md:h-[90vh] ${currentFolder?.color || 'bg-[#B08D57]'} border-[2px] border-black/10 shadow-[0_80px_200px_rgba(0,0,0,0.8)] flex flex-col md:flex-row rounded-sm z-50 origin-center overflow-hidden will-change-transform`}
                      initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      {/* Digital Scanner Light Effect */}
                      <div className="absolute inset-x-0 h-[300px] bg-gradient-to-b from-white/0 via-white/[0.1] to-white/0 z-[100] pointer-events-none scanner-ray -rotate-6" />

                      {/* LEFT WING: Open Cover (50%) */}
                      <motion.div 
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -10 }}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="w-full md:w-1/2 h-full relative z-20 border-r-2 border-black/10 origin-left hidden md:block overflow-hidden shadow-[20px_0_60px_rgba(0,0,0,0.3)]"
                      >
                        {/* Darker overlay for the cover inside */}
                        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                        <div className="absolute inset-0 opacity-[0.05] wireframe-grid" />
                        
                        <div className="p-10 h-full flex flex-col relative z-10">
                           <div className="mb-10 border-b border-black/10 pb-6">
                              <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-black/40 mb-4 whitespace-nowrap">Archives // ZH_SYSTEM_DOSS</h4>
                              <h2 className="text-5xl font-serif italic tracking-tighter text-black/80 leading-tight">Dossier_<span className="font-bold not-italic">PRO</span></h2>
                           </div>
                           
                           <div className="relative flex-1">
                              <DraggableNote 
                                id="memo-cover-final-v3"
                                text="[系统提示] 已检索到相关文档。该模块展示了高度抽象与极简主义的深度统合。"
                                color="bg-[#FFF9C4]"
                                initPos={{ x: 20, y: 30 }}
                                rotate={-3}
                              />
                              <motion.div
                                drag
                                dragMomentum={false}
                                className="absolute w-44 p-2 bg-white shadow-2xl rotate-[8deg] bottom-24 right-8 cursor-move z-30 ring-1 ring-black/5"
                              >
                                 <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover grayscale brightness-110" />
                                 </div>
                                 <div className="mt-2 text-[9px] font-mono text-center opacity-40 uppercase tracking-widest leading-none">Identity_Doc_ZH</div>
                              </motion.div>
                           </div>

                           <div className="mt-auto opacity-30 text-[9px] font-mono uppercase tracking-[0.4em] flex justify-between text-black">
                              <span>Verified_2026</span>
                              <span>BUREAU_ID_17B</span>
                           </div>
                        </div>
                      </motion.div>

                  {/* RIGHT PANEL: The Main Document Page (50%) */}
                  <div className={`flex-1 md:w-1/2 h-full relative flex flex-col z-10 shadow-inner overflow-hidden ${currentFolder?.color.replace('bg-', 'bg-opacity-5 bg-') || 'bg-[#FAFAFA]'}`}>
                    {/* Spine Transition Detail */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/15 to-transparent z-30" />

                    {/* Document Header */}
                    <div className={`px-12 md:px-16 pt-24 pb-12 border-b border-black/5 ${currentFolder?.color.replace('bg-', 'bg-opacity-10 bg-') || 'bg-[#F8F8F8]'}`}>
                        <div className="space-y-4">
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase opacity-40 italic">Document_Page // {activeFolderId}</span>
                              <div className="w-12 h-[1px] bg-archive-border/20" />
                           </div>
                           <h3 className="text-5xl md:text-6xl font-serif italic tracking-tighter text-archive-border capitalize">
                              {currentFolder?.label.split('_')[1] || currentFolder?.label}
                           </h3>
                        </div>
                    </div>

                    {/* Extraction Content Area */}
                    <div className="flex-1 p-12 md:px-16 md:py-16 overflow-y-auto custom-scrollbar-minimal scroll-smooth bg-white/95">
                       <AnimatePresence mode="wait">
                          <motion.div
                            key={activeFolderId}
                            initial={{ 
                               opacity: 0, 
                               y: 80, // Slide up extraction effect
                               rotateX: 15,
                               scale: 0.9 
                            }}
                            animate={{ 
                               opacity: 1, 
                               y: 0, 
                               rotateX: 0,
                               scale: 1 
                            }}
                            exit={{ 
                               opacity: 0, 
                               y: -40, 
                               rotateX: -15,
                               scale: 0.9 
                            }}
                            transition={{ 
                               duration: 0.7, 
                               ease: [0.22, 1, 0.36, 1] 
                            }}
                            className="origin-bottom"
                          >
                            {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                            {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                            {activeFolderId === 'PROJECTS' && <ProjectsView />}
                            {activeFolderId === 'HOBBIES' && <HobbiesView />}
                          </motion.div>
                       </AnimatePresence>
                    </div>

                    {/* Footer System Info */}
                    <div className="h-16 border-t border-black/5 bg-[#FDFDFD] flex items-center justify-between px-12 md:px-16 text-[9px] font-mono opacity-50 font-bold tracking-widest uppercase">
                       <span>Report_Frag // Dossier_Scan</span>
                       <span>P.0{FOLDERS.findIndex(f => f.id === activeFolderId) + 1}_OF_04</span>
                    </div>
                  </div>

                  {/* Metal Clamp Detail */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-10 bg-gradient-to-b from-[#B0BEC5] to-[#78909C] border-x border-[#546E7A] rounded-b-md z-[110] flex items-center justify-center shadow-lg">
                     <div className="w-20 h-2 bg-black/20 rounded-full" />
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
