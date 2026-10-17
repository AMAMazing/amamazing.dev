export interface ProjectItem {
  title: string;
  emoji?: string;
  url: string;
  description: string;
  badges?: { src: string; alt: string; url: string }[];
  isSmall?: boolean;
  iconUrl?: string;
  category?: string;
}

export const navigationItems = [
  { name: 'Featured', href: '#featured', id: 'featured' },
  { name: 'Blog', href: '/blog', id: 'blog' },
  { name: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
  { name: 'Web Apps', href: '#web-apps', id: 'web-apps' },
  { name: 'Desktop Apps', href: '#desktop-apps', id: 'desktop-apps' },
  { name: 'Packages', href: '#packages', id: 'packages' },
  { name: 'Extensions', href: '#extensions', id: 'extensions' },
  { name: 'Stats', href: '#stats', id: 'stats' },
];

export const featuredProjects: ProjectItem[] = [
  {
    title: 'My Daily To Do',
    emoji: '📝',
    url: 'https://www.mydailytodo.com/',
    description: 'Your main dashboard for managing daily tasks. Track your wake-up goal, view your daily score, and organize tasks by sections.',
    category: 'Productivity'
  },
  {
    title: 'Buy Me a Boba',
    emoji: '🧋',
    url: 'https://www.buymeaboba.com/',
    description: 'A fun and unique way to support my work—buy me boba instead of coffee!',
    category: 'Sponsorship'
  },
  {
    title: 'Leetcode Daily',
    emoji: '📹',
    url: 'https://www.youtube.com/@LeetcodeDaily-ama',
    description: 'YouTube channel where I regularly explain LeetCode daily challenges with clear, step-by-step solutions.',
    iconUrl: 'https://yt3.googleusercontent.com/gmgry3wm9NMOg1KzaXHK-fr27SD22z-Kt5Af8eXwRWwLhKPxOEq8TkM8JKt-Ey4eD8xUguFS=s160-c-k-c0x00ffffff-no-rj',
    category: 'Education',
    badges: [
      { src: 'https://img.shields.io/youtube/channel/subscribers/UChH72SgqSYeGvOMAFij2JMg?style=social', alt: 'YouTube Subscribers', url: 'https://www.youtube.com/channel/UChH72SgqSYeGvOMAFij2JMg' }
    ]
  },
  {
    title: 'PolyPlaylist',
    emoji: '🌐',
    url: 'https://thailang.vercel.app/',
    description: 'A comprehensive platform for sentence mining with multiple supported languages to learn effectively.',
    iconUrl: 'https://www.polyplaylist.com/assets/assets/images/icon.fdcda0c5fa00c76d5895cd3f8d1b9693.svg',
    category: 'Language'
  }
];

export const webApps: ProjectItem[] = [
  {
    title: 'FocusDJ',
    emoji: '🎧',
    url: 'https://focusdj.vercel.app/',
    description: 'A beautiful Pomodoro timer with YouTube playlist integration. Features dynamic theming, customizable playlists, break activity suggestions, and persistent data storage.',
    category: 'Productivity'
  },
  {
    title: 'Coin Flip Chess',
    emoji: '♟️',
    url: 'https://coin-flip-chess.vercel.app/',
    description: 'A chaotic chess variant where every turn is decided by a 50/50 coin flip. The only way to win is to capture the enemy king!',
    category: 'Game'
  },
  {
    title: 'DJ Malona',
    emoji: '🎵',
    url: 'https://www.djmalona.com/',
    description: 'A custom biotool with categorized links, designed specifically for client-focused music workflows.',
    category: 'Showcase'
  }
];

export const desktopApps: ProjectItem[] = [
  {
    title: 'Cline X',
    emoji: '⚡',
    url: 'https://github.com/AMAMazing/cline-x',
    description: 'Flask-based API server bridging Cline with multiple AI models (Gemini, DeepSeek, AIStudio). Includes modern web control panel and ngrok tunneling.',
    category: 'AI Tooling'
  },
  {
    title: 'VSCode Hub',
    emoji: '🚀',
    url: 'https://github.com/AMAMazing/VSCode-Hub',
    description: 'A sleek, cross-platform GUI for quickly finding and launching your recent Visual Studio Code projects.',
    iconUrl: 'https://raw.githubusercontent.com/AMAMazing/VSCode-Hub/main/VSCode%20Hub_icon.ico',
    category: 'Developer Tool'
  },
  {
    title: 'DJ Playlist Sync',
    emoji: '🎚️',
    url: 'https://github.com/AMAMazing/DJ-Playlist-Sync',
    description: 'A desktop utility for synchronizing cloud-based playlist metadata with local DJ libraries with intelligent sorting.',
    iconUrl: 'https://raw.githubusercontent.com/AMAMazing/DJ-Playlist-Sync/refs/heads/main/Bridge_icon.ico',
    category: 'Audio Utility'
  },
  {
    title: 'Python Taskbar Pinner',
    emoji: '📌',
    url: 'https://github.com/AMAMazing/Python-Taskbar-Pinner',
    description: 'A Windows utility to create custom taskbar shortcuts for Python scripts, with the option to add your own image.',
    iconUrl: 'https://raw.githubusercontent.com/AMAMazing/Python-Taskbar-Pinner/main/main_icon.ico',
    category: 'Windows Utility'
  }
];

export const pythonPackages: ProjectItem[] = [
  {
    title: 'Talktollm',
    emoji: '🤖',
    url: 'https://pypi.org/project/talktollm/',
    description: 'Python library for interacting with web-based LLM interfaces. Powers automation workflows with DeepSeek and Gemini.',
    badges: [
      { src: 'https://static.pepy.tech/badge/talktollm', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/talktollm' },
      { src: 'https://badge.fury.io/py/talktollm.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/talktollm' }
    ]
  },
  {
    title: 'Optimisewait',
    emoji: '👁️',
    url: 'https://pypi.org/project/optimisewait/',
    description: 'Automated image detection and clicking utility—perfect for GUI and screen automation.',
    badges: [
      { src: 'https://static.pepy.tech/badge/optimisewait', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/optimisewait' },
      { src: 'https://badge.fury.io/py/optimisewait.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/optimisewait' }
    ]
  },
  {
    title: 'Smartpaste',
    emoji: '📋',
    url: 'https://pypi.org/project/smartpaste/',
    description: 'Paste anything, reliably. Cross-platform clipboard-based text input that handles emojis and complex characters perfectly.',
    badges: [
      { src: 'https://static.pepy.tech/badge/smartpaste', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/smartpaste' },
      { src: 'https://badge.fury.io/py/smartpaste.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/smartpaste' }
    ]
  },
  {
    title: 'Pacetype',
    emoji: '⌨️',
    url: 'https://pypi.org/project/pacetype/',
    description: 'Type text character-by-character using clipboard paste simulation.',
    isSmall: true
  },
  {
    title: 'Smartzoom',
    emoji: '🔍',
    url: 'https://pypi.org/project/smartzoom/',
    description: 'Automatically apply smooth zoom to videos using FFmpeg automation.',
    isSmall: true
  }
];

export const chromeExtensions: ProjectItem[] = [
  {
    title: 'Gemini Copy Button Mover',
    emoji: '✨',
    url: 'https://chromewebstore.google.com/detail/gemini-copy-button-mover/dhoblhgambngmgkijdjlgacgmeeeienm',
    description: 'Improves the Google AI Studio interface by repositioning the copy button for better accessibility.'
  },
  {
    title: 'Google Keep Tab Titles',
    emoji: '📑',
    url: 'https://chromewebstore.google.com/detail/google-keep-tab-titles/gecielikdjnhofjhodleiifihoolceij',
    description: 'Dynamically updates Google Keep tab titles to match the current note title.'
  },
  {
    title: 'Minesweeper Fullscreen Button',
    emoji: '💣',
    url: 'https://chromewebstore.google.com/detail/minesweeper-fullscreen-button/oejbciagdejboemjkdhgbmogmogoioip',
    description: 'Adds a responsive fullscreen button to Google Search Minesweeper game.'
  }
];

export const vscodeExtensions: ProjectItem[] = [
  {
    title: 'Sidebar Snippets',
    emoji: '📌',
    url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.sidebar-snippets',
    description: 'Keep a persistent list of code snippets in your VS Code sidebar, ready to be copied with a single click.'
  },
  {
    title: 'Codespace Assistant',
    emoji: '⚡',
    url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.codespace-assistant',
    description: 'A VS Code sidebar extension designed to make coding with GitHub Codespaces easier and more efficient.'
  }
];

export const otherProjects: ProjectItem[] = [
  {
    title: 'YT-Playlist-From-Tags',
    emoji: '📺',
    url: 'https://github.com/AMAMazing/YT-Playlist-From-Tags',
    description: 'Python GUI tool for YouTube creators to automatically create playlists based on their most-used video tags.'
  },
  {
    title: 'I got alot of photos',
    emoji: '📸',
    url: 'https://amamazing.github.io/igotalotofphotos-v3/',
    description: 'Modern redesign of Johanz photo showcase.',
    isSmall: true
  },
  {
    title: 'Spotify Song Search',
    emoji: '🎵',
    url: 'https://github.com/AMAMazing/spotify-py-search/',
    description: 'Desktop app for searching and saving Spotify tracks.',
    isSmall: true
  }
];

export const generateMarkdown = () => {
  const formatBadges = (badges?: { src: string; alt: string; url: string }[]) =>
    badges && badges.length > 0
      ? '\n<br>\n' + badges.map(b => `[![${b.alt}](${b.src})](${b.url})`).join('\n')
      : '';

  const formatProject = (p: ProjectItem) =>
    `**${p.emoji ? p.emoji + ' ' : ''}[${p.title}](${p.url})**\n<br>${p.description}${formatBadges(p.badges)}`;

  const formatSmallProject = (p: ProjectItem) =>
    `- **${p.emoji ? p.emoji + ' ' : ''}[${p.title}](${p.url})** - ${p.description}`;

  return `# 👋 Hi there, I'm [AMAMazing](https://amamazing.dev)!
<div align="center">

[![Support Me](https://img.shields.io/badge/Support%20Me-Buy%20Me%20a%20Boba-ff69b4?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeaboba.com/)

</div>

---

## 🚀 Featured Projects
${featuredProjects.map(formatProject).join('\n\n')}

---

## 🛠️ Tech Stack
<div align="center">
  <a href="https://go-skill-icons.vercel.app/">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=js,ts,py,react,nextjs,tailwind,expo,flask,vscode,figma,ffmpeg,vercel,gemini" />
  </a>
</div>

---

## 🌐 Web Applications
${webApps.map(formatProject).join('\n\n')}

---

## 💻 Desktop Applications
${desktopApps.map(formatProject).join('\n\n')}

---

## 📦 Python Packages
${pythonPackages.filter(p => !p.isSmall).map(formatProject).join('\n\n')}

**Other Packages**
${pythonPackages.filter(p => p.isSmall).map(formatSmallProject).join('\n')}

---

## 🧩 Extensions (Chrome & VSCode)
### Chrome
${chromeExtensions.map(formatSmallProject).join('\n')}

### VSCode
${vscodeExtensions.map(formatSmallProject).join('\n')}

---

## 🛠️ Other Projects
${otherProjects.filter(p => !p.isSmall).map(formatProject).join('\n\n')}

**Additional Projects**
${otherProjects.filter(p => p.isSmall).map(formatSmallProject).join('\n')}

---

## 📱 Mobile Apps
**Coming soon!** Built with Expo and React Native.

---

## 📊 GitHub Stats
<div align="center">
  <a href="https://github.com/DenverCoder1/github-readme-streak-stats" target="_blank">
    <img src="https://github-readme-streak-stats-eight.vercel.app/?user=AMAMazing&theme=ocean-gradient&background=121212&border=27272a" alt="Github Stats" />
  </a>
</div>

---

<div align="center">
**Building tools that matter.** 🚀
<br>
© ${new Date().getFullYear()} AMAMazing. All rights reserved.
</div>`;
};