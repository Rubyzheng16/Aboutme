export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  name: string;
  phone: string;
  email: string;
  location: string;
  birth: string;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
  advantages: string[];
}

export const resumeData: ResumeData = {
  name: "郑好 (Zheng Hao)",
  phone: "18820992331",
  email: "1173089979@qq.com",
  location: "深圳市",
  birth: "2005.02",
  education: [
    {
      school: "广东东软学院",
      major: "软件工程",
      degree: "本科",
      period: "2023.09 - 2027.07"
    }
  ],
  experiences: [
    {
      company: "鹰驾科技有限公司",
      role: "前端开发实习生",
      period: "2025.12 - 2026.03",
      highlights: [
        "协助开发公司官方网站，运用 Vue.js 框架结合 HTML5/CSS3 完成前端工作",
        "完成多端响应式适配，保障桌面端与移动端一致的用户体验",
        "作为产品代表赴日本参与研讨会议，进行产品宣讲与技术答疑"
      ]
    },
    {
      company: "中国科学院深圳先进院",
      role: "鲍进组实验室助理 (实验游戏重构)",
      period: "2025.07 - 2025.08",
      highlights: [
        "基于 Unity 引擎重新设计并开发 'Y-navigation task' 实验游戏",
        "拆解原实验游戏机制，优化地图生成与数据记录逻辑",
        "开展代码重构，提高实验程序的稳定性与扩展性"
      ]
    }
  ],
  projects: [
    {
      id: "eagle-drive",
      title: "Eagle Drive 企业官网",
      description: "独立负责 News、Products 核心页面开发，适配 PC/H5 双端，优化加载速度与交互流畅度。",
      tags: ["Vue.js", "响应式", "性能优化"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "emotion-cookie",
      title: "情绪饼干屋子 (微信小程序)",
      description: "全流程负责情绪陪伴类小程序开发，实现内容列表、卡片展示及多状态管理。",
      tags: ["微信小程序", "UX/UI", "生态开发"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "y-navigation",
      title: "Y-Navigation 行为实验",
      description: "基于 Unity 实现复杂实验流程与交互，支持点数高斯噪声处理及全量数据采集落盘。",
      tags: ["Unity", "C#", "科研实验"],
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800"
    }
  ],
  skills: {
    frontend: ["HTML/CSS/JS", "Vue.js", "React", "Tailwind CSS"],
    backend: ["Java", "C#", "SQLite3", "Python"],
    other: ["Unity Engine", "GitHub/Git", "响应式设计"]
  },
  advantages: [
    "具备全链路开发能力，从页面搭建到性能优化均有实际交付经验",
    "能够将标准化流程拆解为可执行模块，高效排查并处理技术问题",
    "具备良好的跨团队沟通与宣讲能力"
  ]
};

export const hobbyData = [
  {
    title: "自媒体运营",
    desc: "专注科技与设计领域内容输出，拥有敏锐的数据触觉与排版美学。",
    icon: "Megaphone"
  },
  {
    title: "大型舞台活动",
    desc: "具备丰富的活动统筹经验，曾参与策划并执行多次校园及外部大型演出。",
    icon: "Music"
  },
  {
    title: "粘土艺术",
    desc: "业余手工创作者，擅长通过粘土捏合色彩与形状，探索三维空间的触感对比。",
    icon: "Palette"
  },
  {
    title: "旅行活动",
    desc: "足迹遍布多个城市，通过镜头视角记录不同地域的设计风格与风土人情。",
    icon: "Camera"
  }
];
