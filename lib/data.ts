export interface ProjectItem {
  title: string;
  emoji?: string;
  url: string;
  description: string;
  badges?: { src: string; alt: string; url: string }[];
  isSmall?: boolean;
  iconUrl?: string;
  category?: string;
  isAAdsMaximizing?: boolean;
  status?: string;
  webUrl?: string;
  youtubeUrl?: string;
  bubblegeeName?: string;
}

export const navigationItems = [
  { name: 'Featured', href: '#featured', id: 'featured' },
  { name: 'Open Source', href: '#open-source', id: 'open-source' },
  { name: 'Web Apps', href: '#web-apps', id: 'web-apps' },
  { name: 'Desktop Apps', href: '#desktop-apps', id: 'desktop-apps' },
  { name: 'Packages', href: '#packages', id: 'packages' },
  { name: 'Extensions', href: '#extensions', id: 'extensions' },
  { name: 'Stats', href: '#stats', id: 'stats' },
];

// The 9 Featured Core Projects (Closed-source flagships)
export const featuredProjects: ProjectItem[] = [
  {
    title: 'Mindcontroller Studio',
    emoji: '🌐',
    url: 'https://mindcontroller.studio',
    description: 'All-in-one modular digital OS & SaaS/WaaS ecosystem for modern cafes, hospitality, and independent retail.',
    category: 'Hospitality SaaS',
    webUrl: 'https://mindcontroller.studio',
    bubblegeeName: 'Mindcontroller Studio',
    isAAdsMaximizing: false,
    status: 'Active'
  },
  {
    title: 'My Daily To Do',
    emoji: '☑️',
    url: 'https://www.mydailytodo.com/',
    description: 'All-in-one daily operating system & task powerhouse for shift workers, creators, and indie hackers.',
    category: 'Productivity',
    webUrl: 'https://www.mydailytodo.com/',
    bubblegeeName: 'My Daily To Do',
    isAAdsMaximizing: false,
    status: 'Active'
  },
  {
    title: 'Leetcode Unlocked',
    emoji: '🔓',
    url: 'https://www.youtube.com/@LeetcodeDaily-ama',
    description: 'Full Leetcode ecosystem with daily video solutions, unlocked editorial explanations, and algorithmic code walkthroughs.',
    iconUrl: 'https://yt3.googleusercontent.com/gmgry3wm9NMOg1KzaXHK-fr27SD22z-Kt5Af8eXwRWwLhKPxOEq8TkM8JKt-Ey4eD8xUguFS=s160-c-k-c0x00ffffff-no-rj',
    category: 'Education & Ads',
    youtubeUrl: 'https://www.youtube.com/@LeetcodeDaily-ama',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'Bubblegee Social Creation Network',
    emoji: '🫧',
    url: 'https://bubblegee.com',
    description: 'Unified social-first creation network where users publish natively to feeds while exporting cross-platform short-form content.',
    category: 'Social Media',
    bubblegeeName: 'Bubblegee',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'Wrestling Promotions',
    emoji: '🏟️',
    url: 'https://wrestlingpromotions.com',
    description: 'Dedicated wrestling encyclopedia: promotion histories, top weekly moments, spoiler-free cards, and viewing schedules.',
    category: 'Sports Media',
    webUrl: 'https://wrestlingpromotions.com',
    bubblegeeName: 'Wrestling Promotions',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'Biolinkt',
    emoji: '🌲',
    url: 'https://www.djmalona.com/',
    description: 'Custom link-tree and client booking engine connecting social media audiences to services, apps, and digital paywalls.',
    category: 'Creator WaaS',
    webUrl: 'https://www.djmalona.com/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'WindowZones',
    emoji: '📐',
    url: 'https://windowzones.com',
    description: 'High-performance native Windows snapping and workspace tiling manager designed for power users.',
    category: 'Desktop Utility',
    webUrl: 'https://windowzones.com',
    bubblegeeName: 'WindowZones',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'Buy Me a Boba',
    emoji: '🧋',
    url: 'https://www.buymeaboba.com/',
    description: 'Clean tipping & micro-donation platform for creators with 1% penetration pricing, personalized URLs, and dynamic themes.',
    category: 'Monetization',
    webUrl: 'https://www.buymeaboba.com/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  },
  {
    title: 'Coin Flip Chess',
    emoji: '♟️',
    url: 'https://coin-flip-chess.vercel.app/',
    description: 'Chaotic speed chess variant where every turn is decided by a 50/50 coin flip. King-take sudden death rules.',
    category: 'Gaming & Ads',
    webUrl: 'https://coin-flip-chess.vercel.app/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing'
  }
];

// Open Source Community Contributions
export const webApps: ProjectItem[] = [
  {
    title: 'FocusDJ',
    emoji: '🎧',
    url: 'https://focusdj.vercel.app/',
    description: 'Pomodoro timer with YouTube playlist integration and dynamic dark theming.',
    category: 'Web App'
  },
  {
    title: 'Coin Flip Chess Web',
    emoji: '♟️',
    url: 'https://coin-flip-chess.vercel.app/',
    description: 'Open source chess variant where turn initiative is governed by 50/50 flips.',
    category: 'Web Game'
  },
  {
    title: 'DJ Malona',
    emoji: '🎵',
    url: 'https://www.djmalona.com/',
    description: 'Custom biotool web experience tailored for audio workflow distribution.',
    category: 'Bio Tool'
  },
  {
    title: 'GTFS Victoria System',
    emoji: '🚆',
    url: 'https://github.com/AMAMazing',
    description: 'Public transport timetable parsing and real-time transit analysis for PTV.',
    category: 'Transit Web'
  },
  {
    title: 'Grappling Gary',
    emoji: '🪝',
    url: 'https://github.com/AMAMazing',
    description: 'Physics-based 2D swinging and momentum grappling game sandbox.',
    category: 'Web Game'
  }
];

export const desktopApps: ProjectItem[] = [
  {
    title: 'Cline X',
    emoji: '⚡',
    url: 'https://github.com/AMAMazing/cline-x',
    description: 'API server bridging Cline with AI models featuring modern web control panel.',
    category: 'Desktop AI'
  },
  {
    title: 'VSCode Hub',
    emoji: '🚀',
    url: 'https://github.com/AMAMazing/VSCode-Hub',
    description: 'Command center for Visual Studio Code providing project management.',
    category: 'Desktop Tool'
  }
];

export const pythonPackages: ProjectItem[] = [
  {
    title: 'yt-transcript',
    emoji: '📜',
    url: 'https://pypi.org/project/yt-transcript/',
    description: 'Lightweight CLI and Python library to download YouTube transcripts with timing.',
    category: 'Python Package'
  },
  {
    title: 'ama-code',
    emoji: '💻',
    url: 'https://pypi.org/project/ama-code/',
    description: 'Coding assistant CLI integrating with LLMs for real-time refactoring.',
    category: 'Python Package'
  }
];

export const npmPackages: ProjectItem[] = [
  {
    title: 'create-ama-stack',
    emoji: '📦',
    url: 'https://www.npmjs.com/package/create-ama-stack',
    description: 'CLI generator to scaffold complete modern TypeScript, Expo, and full-stack applications.',
    category: 'NPM Package'
  }
];

export const chromeExtensions: ProjectItem[] = [
  {
    title: 'Auto High: Google AI Studio',
    emoji: '⚡',
    url: 'https://chromewebstore.google.com/detail/auto-high-google-ai-studi/hjjplhjhgfpdflffadcdchghmfdcepgd',
    description: 'Automatically enables highest reasoning budget and optimal settings in Google AI Studio.',
    category: 'Chrome Extension'
  },
  {
    title: 'Better Fullscreen for TrillerTV',
    emoji: '🍿',
    url: 'https://chromewebstore.google.com/detail/better-fullscreen-for-tri/ffgijhblchdpeikmfaafgmbkbbmepofh',
    description: 'Seamless fullscreen experience on TrillerTV removing UI distractions.',
    category: 'Chrome Extension'
  },
  {
    title: 'Video Speed & Hotkeys TrillerTV',
    emoji: '🧩',
    url: 'https://chromewebstore.google.com/detail/video-speed-hotkeys-trill/llkpeobcjhllblnhljbbkgnkhghppjce',
    description: 'Custom playback speeds and hotkeys for wrestling stream analysis.',
    category: 'Chrome Extension'
  }
];

export const generateMarkdown = (): string => {
  return `# AMAMazing.Dev Portfolio

## Featured Projects (Core)
` + featuredProjects.map((p) => `- **${p.title}** (${p.category}): ${p.description} [Link](${p.url})`).join('\n') + `

## Open Source Contributions

### Web Applications
` + webApps.map((p) => `- **${p.title}**: ${p.description} [Link](${p.url})`).join('\n') + `

### Desktop Applications
` + desktopApps.map((p) => `- **${p.title}**: ${p.description} [Link](${p.url})`).join('\n') + `

### Python Packages
` + pythonPackages.map((p) => `- **${p.title}**: ${p.description} [Link](${p.url})`).join('\n') + `

### NPM Packages
` + npmPackages.map((p) => `- **${p.title}**: ${p.description} [Link](${p.url})`).join('\n') + `

### Chrome Extensions
` + chromeExtensions.map((p) => `- **${p.title}**: ${p.description} [Link](${p.url})`).join('\n');
};