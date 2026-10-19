export type OssIconType = 'globe' | 'cpu' | 'terminal' | 'package' | 'puzzle' | 'code';

export interface ProjectBadge {
  src: string;
  alt: string;
  url: string;
}

export interface ProjectItem {
  title: string;
  emoji?: string;
  url: string;
  description: string;
  badges?: ProjectBadge[];
  isSmall?: boolean;
  iconUrl?: string;
  category?: string;
  isAAdsMaximizing?: boolean;
  status?: string;
  webUrl?: string;
  youtubeUrl?: string;
  bubblegeeName?: string;
  released?: string;
}

export interface ProjectSection {
  id: string;
  navLabel?: string; // If set, automatically appears in the Navbar
  emoji: string;
  title: string;
  shortTitle: string; // Used in the Open Source Banner mini-chips
  subtitle: string;
  icon: OssIconType;
  minHeight: number;
  items: ProjectItem[];
}

// ============================================================================
// 1. FEATURED CORE PROJECTS (Closed-source flagships)
// ============================================================================
export const featuredProjects: ProjectItem[] = [
  {
    title: 'Mindcontroller Studio',
    emoji: '🌐',
    url: 'https://mindcontroller.studio',
    description:
      'All-in-one modular digital OS & SaaS/WaaS ecosystem for modern cafes, hospitality, and independent retail.',
    category: 'Hospitality SaaS',
    webUrl: 'https://mindcontroller.studio',
    bubblegeeName: 'Mindcontroller Studio',
    isAAdsMaximizing: false,
    status: 'Active',
  },
  {
    title: 'My Daily To Do',
    emoji: '☑️',
    url: 'https://www.mydailytodo.com/',
    description:
      'All-in-one daily operating system & task powerhouse for shift workers, creators, and indie hackers.',
    category: 'Productivity',
    webUrl: 'https://www.mydailytodo.com/',
    bubblegeeName: 'My Daily To Do',
    isAAdsMaximizing: false,
    status: 'Active',
  },
  {
    title: 'Leetcode Unlocked',
    emoji: '🔓',
    url: 'https://www.leetcodeunlocked.com/',
    description:
      'Full Leetcode ecosystem with daily video solutions, unlocked editorial explanations, and algorithmic code walkthroughs.',
    iconUrl:
      'https://yt3.googleusercontent.com/gmgry3wm9NMOg1KzaXHK-fr27SD22z-Kt5Af8eXwRWwLhKPxOEq8TkM8JKt-Ey4eD8xUguFS=s160-c-k-c0x00ffffff-no-rj',
    category: 'Education & Ads',
    webUrl: 'https://www.leetcodeunlocked.com/',
    youtubeUrl: 'https://www.youtube.com/@LeetcodeDaily-ama',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'Bubblegee',
    emoji: '🫧',
    url: 'https://bubblegee.com',
    description:
      'Unified social-first creation network where users publish natively to feeds while exporting cross-platform short-form content.',
    category: 'Social Media',
    bubblegeeName: 'Bubblegee',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'Wrestling Promotions',
    emoji: '🏟️',
    url: 'https://wrestlingpromotions.com',
    description:
      'Dedicated wrestling encyclopedia: promotion histories, top weekly moments, spoiler-free cards, and viewing schedules.',
    category: 'Sports Media',
    webUrl: 'https://wrestlingpromotions.com',
    bubblegeeName: 'Wrestling Promotions',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'Biolinkt',
    emoji: '🌲',
    url: 'https://www.djmalona.com/',
    description:
      'Custom link-tree and client booking engine connecting social media audiences to services, apps, and digital paywalls.',
    category: 'Creator WaaS',
    webUrl: 'https://www.djmalona.com/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'WindowZones',
    emoji: '📐',
    url: 'https://windowzones.com',
    description:
      'High-performance native Windows snapping and workspace tiling manager designed for power users.',
    category: 'Desktop Utility',
    webUrl: 'https://windowzones.com',
    bubblegeeName: 'WindowZones',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'Buy Me a Boba',
    emoji: '🧋',
    url: 'https://www.buymeaboba.com/',
    description:
      'Clean tipping & micro-donation platform for creators with 1% penetration pricing, personalized URLs, and dynamic themes.',
    category: 'Monetization',
    webUrl: 'https://www.buymeaboba.com/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
  {
    title: 'Coin Flip Chess',
    emoji: '♟️',
    url: 'https://coin-flip-chess.vercel.app/',
    description:
      'Chaotic speed chess variant where every turn is decided by a 50/50 coin flip. King-take sudden death rules.',
    category: 'Gaming & Ads',
    webUrl: 'https://coin-flip-chess.vercel.app/',
    isAAdsMaximizing: true,
    status: 'A-Ads Maximizing',
  },
];

// ============================================================================
// 2. OPEN SOURCE SECTIONS (Single Source of Truth — Reorder freely!)
// ============================================================================
export const openSourceSections: ProjectSection[] = [
  {
    id: 'web-apps',
    navLabel: 'Web Apps',
    emoji: '🌐',
    title: 'Web Applications',
    shortTitle: 'Web Apps',
    subtitle: 'Open-source browser utilities, transit systems, and game sandboxes',
    icon: 'globe',
    minHeight: 320,
    items: [
      {
        title: 'FocusDJ',
        emoji: '🎧',
        url: 'https://focusdj.vercel.app/',
        description: 'Pomodoro timer with YouTube playlist integration and dynamic dark theming.',
        category: 'Web App',
      },
      {
        title: 'PolyPlaylist',
        emoji: '🌍',
        url: 'https://www.polyplaylist.com/',
        description: 'Language Learning website achieved via sentence mining!',
        category: 'Education',
      },
      {
        title: 'DJ Malona',
        emoji: '🎵',
        url: 'https://www.djmalona.com/',
        description: 'Custom biotool web experience tailored for audio workflow distribution.',
        category: 'Bio Tool',
      },
      {
        title: 'Untitled Grappling Game',
        emoji: '🪝',
        url: 'https://untitled-grappling-game.vercel.app',
        description: 'Physics-based 2D swinging and momentum grappling game sandbox.',
        category: 'Web Game',
      },
    ],
  },
  {
    id: 'desktop-apps',
    navLabel: 'Desktop Apps',
    emoji: '💻',
    title: 'Desktop Applications',
    shortTitle: 'Desktop',
    subtitle: 'Open-source local dev servers and desktop automation utilities',
    icon: 'cpu',
    minHeight: 280,
    items: [
      {
        title: 'Cline X',
        emoji: '⚡',
        url: 'https://github.com/AMAMazing/cline-x',
        description: 'API server bridging Cline with AI models featuring modern web control panel.',
        category: 'Desktop AI',
      },
      {
        title: 'VSCode Hub',
        emoji: '🚀',
        url: 'https://github.com/AMAMazing/VSCode-Hub',
        description: 'Command center for Visual Studio Code providing project management.',
        category: 'Desktop Tool',
      },
    ],
  },
  {
    id: 'packages',
    navLabel: 'Packages',
    emoji: '🐍',
    title: 'Python Packages',
    shortTitle: 'PyPI',
    subtitle: 'Open-source libraries published on PyPI for developers',
    icon: 'terminal',
    minHeight: 360,
    items: [
      {
        title: 'talktollm',
        emoji: '🤖',
        url: 'https://pypi.org/project/talktollm/',
        description: 'A Python utility for interacting with large language models (LLMs) via web automation',
        category: 'LLM Automation',
        released: 'Sep 16, 2026',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/talktollm',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/talktollm',
          },
        ],
      },
      {
        title: 'optimisewait',
        emoji: '👁️',
        url: 'https://pypi.org/project/optimisewait/',
        description: 'A Python utility for automated image detection and clicking',
        category: 'Computer Vision',
        released: 'Sep 16, 2026',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/optimisewait',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/optimisewait',
          },
        ],
      },
      {
        title: 'upload-socials',
        emoji: '📹',
        url: 'https://pypi.org/project/upload-socials/',
        description: 'A Python library to automate video uploads to YouTube.',
        category: 'YouTube API',
        released: 'Jun 19, 2026',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/upload-socials',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/upload-socials',
          },
        ],
      },
      {
        title: 'smartzoom',
        emoji: '🔍',
        url: 'https://pypi.org/project/smartzoom/',
        description:
          'A Python utility to automatically apply a smooth, continuous zoom to a video, perfectly framing its content.',
        category: 'Video Utility',
        released: 'Jul 13, 2025',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/smartzoom',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/smartzoom',
          },
        ],
      },
      {
        title: 'smartpaste',
        emoji: '📋',
        url: 'https://pypi.org/project/smartpaste/',
        description: 'Reliable cross-platform clipboard pasting for Python.',
        category: 'Clipboard Tool',
        released: 'Apr 10, 2025',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/smartpaste',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/smartpaste',
          },
        ],
      },
      {
        title: 'pacetype',
        emoji: '⌨️',
        url: 'https://pypi.org/project/pacetype/',
        description: 'Type text and emojis character-by-character using clipboard paste.',
        category: 'Input Automation',
        released: 'Apr 5, 2025',
        badges: [
          {
            src: 'https://static.pepy.tech/badge/pacetype',
            alt: 'PyPI Downloads',
            url: 'https://pepy.tech/projects/pacetype',
          },
        ],
      },
    ],
  },
  {
    id: 'extensions',
    navLabel: 'Extensions',
    emoji: '🧩',
    title: 'Chrome Extensions',
    shortTitle: 'Chrome Ext',
    subtitle: 'Productivity, AI workflow, and utility browser extensions',
    icon: 'puzzle',
    minHeight: 320,
    items: [
      {
        title: 'AI Studio Auto Rerun',
        emoji: '🔄',
        url: 'https://chromewebstore.google.com/detail/ai-studio-auto-rerun',
        description:
          'Automatically reruns queries and retries prompt generation seamlessly in Google AI Studio.',
        category: 'Chrome Extension',
        status: 'v1.0',
      },
      {
        title: 'AI Studio Scroll Button',
        emoji: '⬇️',
        url: 'https://chromewebstore.google.com/detail/ai-studio-scroll-button',
        description:
          'Adds convenient quick-scroll buttons to smoothly navigate long chat threads and prompts in Google AI Studio.',
        category: 'Chrome Extension',
        status: 'v1.0',
      },
      {
        title: 'Gemini Copy button',
        emoji: '📋',
        url: 'https://chromewebstore.google.com/detail/gemini-copy-button',
        description:
          'Adds a convenient one-click copy button to easily grab responses and code blocks directly in Google Gemini.',
        category: 'Chrome Extension',
        status: 'v5.3.0',
      },
      {
        title: 'Minesweeper Fullscreen Button',
        emoji: '⛶',
        url: 'https://chromewebstore.google.com/detail/minesweeper-fullscreen-button',
        description:
          'Expands Google Minesweeper into a clean, distraction-free fullscreen playing view.',
        category: 'Chrome Extension',
        status: 'v1.0',
      },
      {
        title: 'Google Keep Tab Titles',
        emoji: '🏷️',
        url: 'https://chromewebstore.google.com/detail/google-keep-tab-titles',
        description:
          'Dynamically renames your browser tab to match the currently opened note for effortless Google Keep tab management.',
        category: 'Chrome Extension',
        status: 'v1.1',
      },
    ],
  },
  {
    id: 'vscode-extensions',
    navLabel: 'VS Code',
    emoji: '💠',
    title: 'VS Code Extensions',
    shortTitle: 'VS Code Ext',
    subtitle: 'Visual Studio Code extensions for GitHub Codespaces, snippet management, and workspace launching',
    icon: 'code',
    minHeight: 280,
    items: [
      {
        title: 'Codespace Assistant',
        emoji: '☁️',
        url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.codespace-assistant',
        description: 'A VSCode extension to let you code easier with GitHub codespaces.',
        category: 'VS Code Extension',
      },
      {
        title: 'Sidebar Snippets',
        emoji: '📎',
        url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.sidebar-snippets',
        description:
          'A VS Code extension for keeping a persistent list of snippets in your sidebar, ready to be copied with a single click.',
        category: 'VS Code Extension',
      },
      {
        title: 'VS Code Hub',
        emoji: '🚀',
        url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.vscode-hub',
        description: 'Visual Studio Code Project Launcher Extension.',
        category: 'VS Code Extension',
      },
    ],
  },
  {
    id: 'npm-packages',
    navLabel: 'NPM',
    emoji: '📦',
    title: 'NPM Packages',
    shortTitle: 'NPM',
    subtitle: 'Developer scaffolding and starter CLI boilerplates',
    icon: 'package',
    minHeight: 240,
    items: [
      {
        title: 'create-ama-stack',
        emoji: '📦',
        url: 'https://www.npmjs.com/package/create-ama-stack',
        description:
          'CLI generator to scaffold complete modern TypeScript, Expo, and full-stack applications.',
        category: 'NPM Package',
      },
    ],
  },
];

// ============================================================================
// 3. DERIVED NAVIGATION & HELPERS (Auto-generated from openSourceSections)
// ============================================================================
export const navigationItems = [
  { name: 'Featured', href: '#featured', id: 'featured' },
  { name: 'Open Source', href: '#open-source', id: 'open-source' },
  ...openSourceSections
    .filter((section) => Boolean(section.navLabel))
    .map((section) => ({
      name: section.navLabel!,
      href: '#' + section.id,
      id: section.id,
    })),
  { name: 'Stats & Activity', href: '#github-stats', id: 'github-stats' },
];

export const totalOssCount = openSourceSections.reduce(
  (sum, section) => sum + section.items.length,
  0
);

export const generateMarkdown = (): string => {
  const tick = String.fromCharCode(96);
  // Matches GitHub's exact heading-to-anchor slug rules
  const toGitHubAnchor = (headingText: string) =>
    headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

  const renderTable = (items: ProjectItem[]) => {
    const hasAnyBadges = items.some((p) => p.badges && p.badges.length > 0);
    const rows = items
      .map((p) => {
        const project = (p.emoji ? p.emoji + ' ' : '') + '[**' + p.title + '**](' + p.url + ')';
        // Uses non-breaking spaces so category badges stay on a single clean line
        const category = p.category ? tick + p.category.replace(/ /g, '\u00A0') + tick : '—';
        if (hasAnyBadges) {
          const badgeMd =
            p.badges && p.badges.length > 0
              ? p.badges.map((b) => '[![' + b.alt + '](' + b.src + ')](' + b.url + ')').join(' ')
              : '—';
          return '| ' + project + ' | ' + category + ' | ' + badgeMd + ' | ' + p.description + ' |';
        }
        return '| ' + project + ' | ' + category + ' | ' + p.description + ' |';
      })
      .join('\n');

    if (hasAnyBadges) {
      return [
        '| Project | Category | Downloads | Description |',
        '| :--- | :--- | :--- | :--- |',
        rows,
      ].join('\n');
    }

    return [
      '| Project | Category | Description |',
      '| :--- | :--- | :--- |',
      rows,
    ].join('\n');
  };

  // 1. Dynamic Navigation Bar
  const featuredHeading = '🌟 Featured Core Projects';
  const statsHeading = '🔥 GitHub Stats & Streak';
  const navLinks = [
    '[🌟 Featured](#' + toGitHubAnchor(featuredHeading) + ')',
    ...openSourceSections.map((s) => {
      const heading = s.emoji + ' ' + s.title;
      return '[' + s.emoji + ' ' + s.shortTitle + '](#' + toGitHubAnchor(heading) + ')';
    }),
    '[🔥 GitHub Stats & Streak](#' + toGitHubAnchor(statsHeading) + ')',
  ].join(' • ');

  // 2. Featured Core Projects Section
  const featuredMd = [
    '## ' + featuredHeading,
    '',
    renderTable(featuredProjects),
  ].join('\n');

  // 3. Open Source Sections
  const ossMd = openSourceSections
    .map((section) =>
      [
        '### ' + section.emoji + ' ' + section.title,
        '> *' + section.subtitle + '*',
        '',
        renderTable(section.items),
      ].join('\n')
    )
    .join('\n\n---\n\n');

  // 4. GitHub Stats & Activity Section
  const statsMd = [
    '## ' + statsHeading,
    '',
    '<div align="center">',
    '',
    '[![AMAMazing GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=AMAMazing&theme=dark&hide_border=true&background=14181c&ring=818cf8&fire=818cf8&currStreakLabel=a5b4fc)](https://github.com/AMAMazing)',
    '',
    '[![AMAMazing GitHub Stats](https://github-readme-stats.vercel.app/api?username=AMAMazing&show_icons=true&theme=dark&hide_border=true&bg_color=14181c&title_color=818cf8&text_color=cbd5e1&icon_color=34d399&include_all_commits=true&count_private=true)](https://github.com/AMAMazing)',
    '',
    '</div>',
  ].join('\n');

  // 5. Final GitHub README with Hero Portfolio Showcase
  return [
    '<div align="center">',
    '',
    '# ⚡ AMA Mazing',
    '',
    '',
    '[![Visit AMAMazing.dev](https://img.shields.io/badge/🌐_LIVE_PORTFOLIO-AMAMazing.dev-6366f1?style=for-the-badge&labelColor=0f172a)](https://www.amamazing.dev/)',
    '',
    '**' + featuredProjects.length + ' Featured Flagships** • **' + totalOssCount + ' Open Source Contributions**',
    '',
    navLinks,
    '',
    '</div>',
    '',
    '---',
    '',
    featuredMd,
    '',
    '---',
    '',
    '## 🚀 Open Source Contributions (' + totalOssCount + ')',
    '',
    ossMd,
    '',
    '---',
    '',
    statsMd,
    '',
    '---',
    '',
    '<div align="center">',
    '',
    '### ⚡ [**www.amamazing.dev**](https://www.amamazing.dev/)',
    '',
    '</div>',
  ].join('\n');
};