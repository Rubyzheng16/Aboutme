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
      {!activeFolderId && (
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
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

      {/* Main Stack Container */}
      <div className="relative w-full max-w-5xl h-[450px] md:h-[650px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!activeFolderId ? (
            <motion.div 
              key="stack"
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                    y: window.innerWidth < 768 ? -80 : -140,
                    transition: { duration: 0.4, ease: "circOut" } 
                  }}
                >
                  {/* Staggered Folder Tab */}
                  <div className={`w-24 md:w-48 h-8 ${folder.color} border-t border-l border-r border-archive-border/50 folder-tab ${folder.tabOffset} text-[9px] md:text-xs flex items-center px-3 md:px-6 font-mono text-archive-border/80 font-bold uppercase transition-colors group-hover:brightness-95`}>
                    {folder.label}
                  </div>
                  {/* Folder Body */}
                  <div className={`w-full h-56 md:h-96 ${folder.color} border border-archive-border/50 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] p-6 md:p-12 flex flex-col justify-between transition-all duration-300 ${folder.hoverColor}`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <p className="text-[10px] md:text-xs font-mono opacity-60 uppercase tracking-widest border-b border-archive-border/20 pb-2">Category: 秘密档案</p>
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight">{folder.label}</h3>
                      </div>
                      <folder.icon size={32} strokeWidth={1} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex justify-between items-end border-t border-archive-border/20 pt-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono opacity-40 block tracking-widest">RECORD_INDEX</span>
                        <span className="text-xs font-mono font-bold tracking-tighter">00{index+1}.LOG</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-archive-border/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all shadow-sm">
                        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-archive-bg/90 backdrop-blur-xl p-4 md:p-12"
            >
              <motion.div 
                layoutId={activeFolderId}
                className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white border border-archive-border shadow-2xl flex flex-col md:flex-row overflow-hidden overflow-y-auto md:overflow-hidden"
              >
                {/* Side Info Panel */}
                <div className="w-full md:w-[350px] bg-folder-beige/20 border-b md:border-b-0 md:border-r border-archive-border/10 p-10 flex flex-col">
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={14} className="fill-archive-border" />
                        <span className="text-[10px] font-mono uppercase tracking-widest font-bold">档案详情检索</span>
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight">{FOLDERS.find(f => f.id === activeFolderId)?.label}</h2>
                    </div>
                    <button 
                      onClick={() => setActiveFolderId(null)}
                      className="p-3 hover:bg-black/5 rounded-full transition-colors order-first md:order-last"
                    >
                      <X size={24} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-8">
                    <div className="p-6 border border-dashed border-archive-border/20 rounded-sm">
                       <p className="text-[10px] font-mono opacity-50 uppercase mb-4">Metadata Context</p>
                       <div className="space-y-4">
                         <DetailItem icon={Mail} label="邮箱交流" value={resumeData.email} />
                         <DetailItem icon={Phone} label="联系电话" value={resumeData.phone} />
                         <DetailItem icon={MapPin} label="现居地址" value={resumeData.location} />
                       </div>
                    </div>
                    <div className="opacity-60 space-y-4">
                      <p className="text-xs font-mono uppercase tracking-tighter leading-relaxed">
                        Security Notice: 本文件包含郑好个人隐私，仅限招聘方查阅。禁止未经授权的下载与传播。
                      </p>
                    </div>
                  </div>

                  <a 
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('简历下载中...'); }}
                    className="mt-10 w-full bg-archive-border text-white py-5 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <Download size={18} />
                    下载对应附件
                  </a>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 md:p-14 overflow-y-auto scroll-smooth custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFolderId}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {activeFolderId === 'PROFILE_EDU' && <CombinedView />}
                      {activeFolderId === 'EXPERIENCE' && <ExperienceView />}
                      {activeFolderId === 'PROJECTS' && <ProjectsView />}
                      {activeFolderId === 'HOBBIES' && <HobbiesView />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!activeFolderId && (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <a 
            href="https://github.com/ln-dev7/square-ui" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 group px-4 py-2 border border-archive-border/10 hover:border-archive-border/40 transition-all rounded-full"
          >
            <Github size={20} strokeWidth={1.5} />
            <span className="text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity">/ln-dev7/square-ui</span>
          </a>
          <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.4em]">
            ZHENG HAO Archive System · 版权所有 © 2026
          </p>
        </motion.footer>
      )}
    </div>
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
