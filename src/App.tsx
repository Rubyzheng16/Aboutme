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
    <div className="min-h-screen bg-archive-bg flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-orange-200 overflow-hidden">
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
        <AnimatePresence>
          {!activeFolderId ? (
            <motion.div 
              key="stack"
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
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
                    y: window.innerWidth < 768 ? -100 : -160,
                    transition: { duration: 0.4, ease: "circOut" } 
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-archive-bg/95 backdrop-blur-sm px-4 py-8 md:p-12 overflow-hidden"
            >
              <div className="relative w-full max-w-7xl h-full flex flex-col items-center">
                
                {/* Fragment Style Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full flex justify-between items-end mb-8 border-b border-archive-border/10 pb-4"
                >
                  <div className="space-y-1">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tighter font-light">
                      Fragment <span className="font-bold italic">17B</span>
                    </h2>
                    <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Unindexed Materials / Professional Records</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-mono opacity-50 uppercase mb-1">Filed: Archive_ZH</p>
                    <p className="text-xs font-mono font-bold">{new Date().toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => setActiveFolderId(null)}
                    className="p-3 bg-white border border-archive-border hover:bg-black/5 transition-all flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest ml-4"
                  >
                    <X size={16} /> Close_Archive
                  </button>
                </motion.div>

                {/* The Unfolding Folder Spread */}
                <motion.div 
                  layoutId={activeFolderId}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ 
                    layout: { type: "spring", damping: 20, stiffness: 100 },
                    default: { duration: 0.5 }
                  }}
                  className="relative w-full h-full bg-[#E5DCC6] border border-archive-border shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row rounded-sm origin-center"
                >
                  {/* Spine Fold Visual */}
                  <div className="absolute left-[34%] top-0 bottom-0 w-[2px] bg-black/10 z-30 hidden md:block" />
                  <div className="absolute left-[34%] top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent z-20 pointer-events-none hidden md:block" />

                  {/* LEFT PANEL: Inside Cover / Attachments Area */}
                  <div className="w-full md:w-[35%] h-full bg-[#C9B99E]/50 relative z-10 p-10 hidden md:block overflow-hidden">
                    <div className="flex items-center gap-3 mb-12 opacity-50">
                      <div className="w-10 h-[1px] bg-archive-border" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Attachments & Memos</span>
                    </div>

                    <div className="relative h-full flex flex-col pointer-events-none">
                       {/* Draggable Note & Elements Context */}
                       <div className="absolute inset-0 pointer-events-auto">
                          <DraggableNote 
                            id="memo-1"
                            text="该候选人（郑好）展示了极强的业务逻辑梳理能力及代码稳定性。"
                            color="bg-[#FFF9C4]"
                            initPos={{ x: 20, y: 50 }}
                            rotate={-6}
                          />
                          <motion.div 
                            drag
                            dragMomentum={false}
                            className="absolute w-40 aspect-square bg-gray-100 border border-archive-border shadow-md right-4 top-40 rotate-[12deg] p-2 cursor-move z-40"
                          >
                             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover grayscale" />
                             <div className="mt-2 text-[8px] font-mono text-center uppercase tracking-tighter opacity-40 underline decoration-dotted">Subject_Photograph_Ref</div>
                          </motion.div>

                          <motion.div
                            drag
                            dragMomentum={false}
                            className="absolute w-48 p-6 bg-[#FFE0B2] border border-archive-border/30 shadow-sm -rotate-3 bottom-20 left-10 cursor-move z-40"
                          >
                            <div className="text-[8px] font-mono opacity-40 uppercase border-b border-black/5 mb-3">Office_Receipt_#882</div>
                            <p className="text-[11px] italic leading-tight">
                              "协助赴日参加宣讲，展示了优秀的跨技术栈沟通与英语应答能力。"
                            </p>
                            <div className="mt-4 flex justify-end">
                              <div className="w-8 h-8 rounded-full border-2 border-red-400/20 flex items-center justify-center text-[8px] text-red-500/30 font-bold -rotate-12">VERIFIED</div>
                            </div>
                          </motion.div>
                       </div>
                    </div>
                  </div>

                  {/* RIGHT PANEL: The Main Text/Document Panel */}
                  <div className="flex-1 h-full bg-white relative flex flex-col shadow-inner">
                    {/* Paper Hole Punch Effect */}
                    <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-around py-12 pointer-events-none opacity-20 hidden md:flex">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full border border-archive-border bg-gray-100" />
                      ))}
                    </div>

                    {/* Document Internal Header */}
                    <div className="px-12 md:px-20 pt-16 pb-12 flex justify-between items-start border-b border-archive-border/5">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-archive-border/50">
                           <span>File_PG_{FOLDERS.findIndex(f => f.id === activeFolderId) + 1}</span>
                           <span className="w-8 h-[1px] bg-archive-border/30" />
                           <span className="italic">Records_System_2026</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-serif italic tracking-tighter capitalize underline decoration-archive-border/5 decoration-4 underline-offset-8">
                          {FOLDERS.find(f => f.id === activeFolderId)?.label.split('_')[1]}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="w-16 h-16 border-2 border-archive-border/10 flex items-center justify-center text-[10px] font-mono opacity-20 rotate-12">SEAL</div>
                      </div>
                    </div>

                    <div className="flex-1 p-12 md:p-20 overflow-y-auto custom-scrollbar scroll-smooth">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeFolderId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                          {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                          {activeFolderId === 'PROJECTS' && <ProjectsView />}
                          {activeFolderId === 'HOBBIES' && <HobbiesView />}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Footer for the content page */}
                    <div className="bg-[#fcfcfc] border-t border-archive-border/5 px-12 md:px-20 py-8 flex justify-between items-center text-[10px] font-mono opacity-40 uppercase tracking-widest font-bold">
                       <span className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-archive-border" />
                          Authenticated_Data_Stream
                       </span>
                       <div className="flex gap-8">
                          <span className="cursor-pointer hover:text-black hover:opacity-100 transition-all">Download_Archive</span>
                          <span className="tabular-nums opacity-60">REF_ID: 2026_PRO_ZH</span>
                       </div>
                    </div>
                  </div>

                  {/* Tabs on the far right edge of the open folder */}
                  <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-center gap-4 bg-black/5 p-2 pointer-events-none hidden md:flex">
                     {FOLDERS.map((f) => (
                        <div 
                           key={f.id} 
                           className={`h-24 w-6 rounded-r-md border border-l-0 border-archive-border/20 transition-all ${activeFolderId === f.id ? f.color + ' opacity-100 scale-110 shadow-lg' : 'bg-gray-100 opacity-30 scale-100'}`}
                        >
                           <div className="rotate-90 origin-center whitespace-nowrap text-[8px] font-mono font-bold uppercase mt-8 -ml-3 tracking-widest">
                              {f.label}
                           </div>
                        </div>
                     ))}
                  </div>
                </motion.div>
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
         className={`pointer-events-auto absolute p-6 md:p-8 w-48 md:w-56 aspect-[5/4] ${color} border border-archive-border/10 shadow-[4px_4px_10px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing z-40 transition-shadow hover:shadow-xl group`}
      >
         <div className="w-full h-full flex flex-col animate-in fade-in duration-1000">
            <div className="flex gap-1.5 mb-4 items-center">
               <div className="w-1.5 h-1.5 rounded-full bg-archive-border/40" />
               <div className="w-8 h-[1px] bg-archive-border/10" />
            </div>
            <p className="text-xs md:text-sm font-medium leading-relaxed font-serif italic text-archive-border/90">
               "{text}"
            </p>
            <div className="mt-auto pt-4 border-t border-black/5 flex justify-between items-center">
               <span className="text-[8px] font-mono opacity-40 uppercase tracking-widest">Memo_ZH</span>
               <div className="w-2 h-2 rounded-full border border-archive-border/20 group-hover:bg-archive-border/40 transition-colors" />
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
