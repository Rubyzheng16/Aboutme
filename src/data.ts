export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  detailImages?: string[];
  detailIntro?: string;
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
  internship: string;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: {
    frontend: string[];
    backend: string[];
    other: string[];
  };
  skillTags: string[];
  advantages: string[];
  awards: string[];
  photos: {
    portrait: string;
    daily: string[];
  };
}

export const resumeData: ResumeData = {
  name: "郑好",
  phone: "18820992331",
  email: "1173089979@qq.com",
  location: "深圳市",
  birth: "2005.02",
  internship: "可长期实习",
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
      role: "前端开发实习生 / 商务产品代表",
      period: "2025.12 - 2026.03",
      highlights: [
        "参与公司官方网站与产品展示页面开发，使用 Vue3、HTML5、CSS3 完成页面搭建与交互实现。",
        "负责 PC/H5 多端适配与展示细节优化，提升产品信息在不同设备上的可读性与稳定性。",
        "作为商务产品代表赴日本参加 International SparkLink 产业论坛，协助进行产品讲解、方案展示与现场沟通。"
      ]
    },
    {
      company: "中国科学院深圳先进院",
      role: "鲍进组实验室助理（实验游戏重构）",
      period: "2025.07 - 2025.08",
      highlights: [
        "基于 Unity 重构 Y-navigation task 行为实验程序，将实验流程拆解为可维护的交互模块。",
        "实现点阵任务、回合控制、完成统计与结束反馈等核心逻辑，支持实验数据记录与后续分析。",
        "结合论文任务范式与实验需求进行功能复现，优化程序稳定性、可扩展性与实验复用效率。"
      ]
    }
  ],
  projects: [
    {
      id: "emotion-cookie",
      title: "情绪饼干屋（微信小程序）",
      description: "一款将碎碎念、计划和情绪陪伴变成小饼干的小程序，包含饼干日记、四象限记录、AI 日记、幸运饼干、糖果罐计划拆解与个人词条等模块。",
      tags: ["微信小程序", "UX/UI", "AI 日记", "情绪陪伴"],
      image: "/assets/cookie-cover.jpg",
      detailIntro: "负责从产品概念、视觉包装到小程序页面实现的完整流程，把目标管理、情绪记录和 AI 反馈包装成更轻、更可爱的陪伴体验。",
      detailImages: [
        "/assets/cookie-detail-01.jpg",
        "/assets/cookie-detail-02.jpg",
        "/assets/cookie-detail-03.jpg",
        "/assets/cookie-detail-04.jpg",
        "/assets/cookie-detail-05.jpg",
        "/assets/cookie-detail-06.jpg"
      ]
    },
    {
      id: "eagle-drive",
      title: "Eagle Drive 企业官网",
      description: "独立负责 News、Products 等核心页面开发，适配 PC/H5 双端，优化加载速度与交互流畅度。",
      tags: ["Vue.js", "响应式", "性能优化"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
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
    frontend: ["HTML/CSS/JavaScript", "Vue3", "H5", "微信小程序"],
    backend: ["Java", "C#", "SQLite3", "Python"],
    other: ["Unity", "数据采集", "效果分析", "自媒体运营"]
  },
  skillTags: [
    "Vue3 / JS / H5",
    "小程序与网页 Demo",
    "Unity 交互开发",
    "Python 数据分析",
    "AI 产品效果分析",
    "7k 粉丝自媒体运营"
  ],
  advantages: [
    "软件工程专业在读，具备小程序、网页 Demo 与 Unity 项目实践经验，能在前端页面搭建、交互实现与多端适配中快速交付。",
    "熟悉 Vue3、JavaScript、H5、CSS，具备 Java、C#、SQLite3 与 Python 基础，能够配合完成从页面实现到数据处理的完整开发流程。",
    "在自研 AI 小程序中负责全链路数据采集与效果分析，围绕用户行为、完成率、AI 反馈等指标复盘产品表现，并沉淀优化方向。",
    "运营 7k 粉丝自媒体账号，擅长从数据表现中提炼内容策略，兼具用户视角、内容表达与长期执行能力。"
  ],
  awards: [
    "全国大学生科技翻译大赛 国家级英译汉一等奖",
    "“联合国采购杯”全国大学生英语阅读大赛 二等奖",
    "全国大学生数学创新思维挑战赛 线性代数一等奖"
  ],
  photos: {
    portrait: "/assets/portrait-id.png",
    daily: ["/assets/portrait-id.png", "/assets/daily-boat-close.jpg", "/assets/daily-harbor.jpg"]
  }
};

export const hobbyData = [
  {
    title: "自媒体运营",
    desc: "专注科技与设计相关内容输出，具备敏锐的数据触觉与排版审美。",
    icon: "Megaphone"
  },
  {
    title: "大型舞台活动",
    desc: "具备活动统筹经验，曾参与策划并执行多次校园及外部大型演出。",
    icon: "Music"
  },
  {
    title: "粘土艺术",
    desc: "业余手工创作者，擅长通过粘土捏合色彩与形状，探索三维空间的触感对比。",
    icon: "Palette"
  },
  {
    title: "旅行活动",
    desc: "通过镜头视角记录不同城市的设计风格与风土人情。",
    icon: "Camera"
  }
];
