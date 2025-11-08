'use client';
import React, { useState, useEffect } from 'react';
// Removed CircleUser, no longer needed
import { Github, ExternalLink, Code2, Globe, Box, Chrome, TerminalSquare, Rocket, Smartphone, ChevronUp, Coffee } from 'lucide-react';

// --- Data Source ---
// Mirroring the exact content from the README

const navigation = [
  // Removed the separate Portfolio link
  { name: 'Featured', href: '#featured', icon: Rocket },
  { name: 'Tech Stack', href: '#tech-stack', icon: Code2 },
  { name: 'Web Apps', href: '#web-apps', icon: Globe },
  { name: 'Packages', href: '#packages', icon: Box },
  { name: 'Extensions', href: '#extensions', icon: Chrome },
  { name: 'Stats', href: '#stats', icon: TerminalSquare },
];

const featuredProjects = [
  {
    title: 'FocusDJ',
    emoji: '🎵',
    url: 'https://focusdj.vercel.app/',
    description: 'A beautiful Pomodoro timer with YouTube playlist integration. Features dynamic theming, customizable playlists, break activity suggestions, and persistent data storage. Your perfect study companion.'
  },
  {
    title: 'Cline X',
    emoji: '🤖',
    url: 'https://github.com/AMAMazing/cline-x',
    description: 'Flask-based API server bridging Cline with multiple AI models (Gemini, DeepSeek, AIStudio). Includes a modern web control panel, smart notifications, and secure remote access via ngrok.'
  },
  {
    title: 'My Daily To Do',
    emoji: '✅',
    url: 'https://www.mydailytodo.com/',
    description: 'Your main dashboard for managing daily tasks. Track your wake-up goal, view your daily score, and organize tasks by sections.'
  },
  {
    title: 'Talktollm',
    emoji: '🐍',
    url: 'https://pypi.org/project/talktollm/',
    description: 'Python library for interacting with web-based LLM interfaces. Powers automation workflows with Deepseek and Gemini.',
    badges: [
      { src: 'https://static.pepy.tech/badge/talktollm', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/talktollm' },
      { src: 'https://badge.fury.io/py/talktollm.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/talktollm' }
    ]
  }
];

const webApps = [
  {
    title: 'Coin Flip Chess',
    emoji: '♟️',
    url: 'https://coin-flip-chess.vercel.app/',
    description: 'A chaotic chess variant where every turn is decided by a 50/50 coin flip. The only way to win is to capture the enemy king!'
  },
  {
    title: 'Thai Learning App',
    emoji: '🇹🇭',
    url: 'https://thailang.vercel.app/',
    description: 'A comprehensive platform to learn the Thai language effectively with interactive lessons and exercises.'
  },
  {
    title: 'Buy Me a Boba',
    emoji: '🧋',
    url: 'https://www.buymeaboba.com/',
    description: 'A fun and unique way to support my work—buy me boba instead of coffee!'
  },
  {
    title: 'DJ Malona',
    emoji: '🎧',
    url: 'https://www.djmalona.com/',
    description: 'A custom biotool with categorized links, designed specifically for one client\'s unique needs.'
  }
];

const pythonPackages = [
  {
    title: 'Optimisewait',
    url: 'https://pypi.org/project/optimisewait/',
    description: 'Automated image detection and clicking utility—perfect for GUI automation.',
    badges: [
      { src: 'https://static.pepy.tech/badge/optimisewait', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/optimisewait' },
      { src: 'https://badge.fury.io/py/optimisewait.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/optimisewait' }
    ]
  },
  {
    title: 'Smartpaste',
    url: 'https://pypi.org/project/smartpaste/',
    description: 'Paste anything, reliably. Cross-platform clipboard-based text input that handles emojis and complex characters perfectly.',
    badges: [
      { src: 'https://static.pepy.tech/badge/smartpaste', alt: 'PyPI Downloads', url: 'https://pepy.tech/projects/smartpaste' },
      { src: 'https://badge.fury.io/py/smartpaste.svg', alt: 'PyPI version', url: 'https://badge.fury.io/py/smartpaste' }
    ]
  },
  {
    title: 'Pacetype',
    url: 'https://pypi.org/project/pacetype/',
    description: 'Type text character-by-character using clipboard paste',
    isSmall: true
  },
  {
    title: 'Smartzoom',
    url: 'https://pypi.org/project/smartzoom/',
    description: 'Automatically apply smooth zoom to videos with FFmpeg',
    isSmall: true
  }
];

const chromeExtensions = [
  {
    title: 'Gemini Copy Button Mover',
    url: 'https://chromewebstore.google.com/detail/gemini-copy-button-mover/dhoblhgambngmgkijdjlgacgmeeeienm',
    description: 'Improves the Google AI Studio interface by repositioning the copy button for better accessibility.'
  },
  {
    title: 'Google Keep Tab Titles',
    url: 'https://chromewebstore.google.com/detail/google-keep-tab-titles/gecielikdjnhofjhodleiifihoolceij',
    description: 'Dynamically updates Google Keep tab titles to match the current note\'s title.'
  },
  {
    title: 'Minesweeper Fullscreen Button',
    url: 'https://chromewebstore.google.com/detail/minesweeper-fullscreen-button/oejbciagdejboemjkdhgbmogmogoioip',
    description: 'Adds a responsive fullscreen button to the Google Search Minesweeper game.'
  }
];

const vscodeExtensions = [
  {
    title: 'Sidebar Snippets',
    url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.sidebar-snippets',
    description: 'Keep a persistent list of code snippets in your VS Code sidebar, ready to be copied with a single click.'
  },
  {
    title: 'Codespace Assistant',
    url: 'https://marketplace.visualstudio.com/items?itemName=AMAMazing.codespace-assistant',
    description: 'A VS Code sidebar extension designed to make coding with GitHub Codespaces easier and more efficient.'
  }
];

const otherProjects = [
  {
    title: 'Leetcode Daily',
    url: 'https://www.youtube.com/@LeetcodeDaily-ama',
    description: 'YouTube channel where I regularly explain LeetCode\'s daily challenges with clear, step-by-step solutions.',
    badges: [
        { src: 'https://img.shields.io/youtube/channel/subscribers/UChH72SgqSYeGvOMAFij2JMg?style=social', alt: 'YouTube Subscribers', url: 'https://www.youtube.com/channel/UChH72SgqSYeGvOMAFij2JMg' }
    ]
  },
  {
    title: 'YT-Playlist-From-Tags',
    url: 'https://github.com/AMAMazing/YT-Playlist-From-Tags',
    description: 'Python GUI tool for YouTube creators to automatically create playlists based on their most-used video tags.'
  },
  {
    title: 'I got alot of photos',
    url: 'https://amamazing.github.io/igotalotofphotos-v3/',
    description: 'Modern redesign of Johanz\'s photo showcase',
    isSmall: true
  },
  {
    title: 'Spotify Song Search',
    url: 'https://github.com/AMAMazing/spotify-py-search/',
    description: 'Desktop app for searching and saving Spotify tracks',
    isSmall: true
  }
];


// --- Components ---

const SectionHeading = ({ emoji, title, id }: { emoji: string; title: string; id: string }) => (
  <div className="flex items-center gap-3 mb-8 scroll-mt-24" id={id}>
    <span className="text-3xl sm:text-4xl filter drop-shadow-lg">{emoji}</span>
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
      {title}
    </h2>
    <div className="h-px bg-slate-800 flex-grow ml-6 hidden sm:block"></div>
  </div>
);

const ProjectCard = ({ title, emoji, url, description, badges, isSmall }: { title: string; emoji?: string; url: string; description: string; badges?: { src: string; alt: string; url: string }[]; isSmall?: boolean }) => {
  if (isSmall) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-300"
      >
        <div>
            <h3 className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                {emoji && <span className="mr-2">{emoji}</span>} {title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 flex-shrink-0 ml-4" />
      </a>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {emoji && <span className="text-3xl filter drop-shadow">{emoji}</span>}
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-indigo-600 rounded-full transition-all duration-300"
          aria-label={`View ${title}`}
        >
           <ExternalLink className="w-5 h-5" />
        </a>
      </div>
      
      <p className="text-slate-400 leading-relaxed flex-grow relative z-10">
        {description}
      </p>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/50 relative z-10">
          {badges.map((badge, idx) => (
            <a key={idx} href={badge.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={badge.src} alt={badge.alt} className="h-5" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-300 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>
      <div className="fixed inset-0 bg-gradient-radial from-indigo-900/10 via-transparent to-transparent pointer-events-none z-0"></div>


      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1121]/80 border-b border-slate-800/50 supports-[backdrop-filter]:bg-[#0B1121]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* UPDATED: Header logo is now a subtle hyperlink */}
            <a href="https://amamazing.dev" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 font-bold text-xl text-slate-100 tracking-tighter hover:opacity-80 transition-opacity">
              AMA<span className="text-indigo-400">Mazing</span>
            </a>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-400 hover:text-white hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="md:hidden flex items-center">
               {/* Mobile nav placeholder if needed, keeping simple for now relying on scroll */}
               <span className="text-xs font-mono text-indigo-400/70">v1.0</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        
        {/* Hero Section */}
        <section className="pt-24 pb-20 text-center space-y-8">
          <div className="inline-block animate-wave origin-[70%_70%]">
             <span className="text-6xl sm:text-7xl">👋</span>
          </div>
          {/* UPDATED: Hero headline name is now an obvious hyperlink */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
            Hi there, I'm <a href="https://amamazing.dev" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:brightness-125 transition-all duration-300">AMAMazing</a>!
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Building tools that solve real problems—for myself and others.
          </p>

          <div className="pt-6 flex justify-center">
            <a 
              href="https://www.buymeaboba.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#ff69b4] hover:bg-[#ff5ca8] text-white font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-5px_#ff69b4] hover:-translate-y-1"
            >
              <Coffee className="w-5 h-5" />
              <span>Buy Me a Boba</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
            </a>
          </div>
        </section>


        <hr className="border-slate-800/50 my-16" />

        {/* Featured Projects */}
        <section id="featured">
          <SectionHeading emoji="🌍" title="Featured Projects" id="featured" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </section>


        {/* Tech Stack */}
        <section id="tech-stack" className="my-24 scroll-mt-24">
          <SectionHeading emoji="🛠️" title="Tech Stack" id="tech-stack" />
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 sm:p-12 flex justify-center items-center hover:border-indigo-500/20 transition-colors">
             {/* Using the exact same image source for fidelity */}
             <a href="https://go-skill-icons.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                 <img 
                   src="https://go-skill-icons.vercel.app/api/icons?i=js,ts,py,react,nextjs,tailwind,expo,flask,vscode,figma,ffmpeg,vercel,gemini" 
                   alt="Tech Stack Icons"
                   className="max-w-full"
                 />
             </a>
          </div>
        </section>


        {/* Web Applications */}
        <section id="web-apps" className="my-24">
          <SectionHeading emoji="🌐" title="Web Applications" id="web-apps" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webApps.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </section>


        {/* Python Packages */}
        <section id="packages" className="my-24">
          <SectionHeading emoji="🐍" title="Python Packages" id="packages" />
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pythonPackages.filter(p => !p.isSmall).map((project, idx) => (
                <ProjectCard key={idx} {...project} emoji="📦" />
                ))}
            </div>
            {/* Smaller packages list */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {pythonPackages.filter(p => p.isSmall).map((project, idx) => (
                <ProjectCard key={idx} {...project} isSmall />
                ))}
            </div>
          </div>
        </section>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-24">
            {/* Chrome Extensions */}
            <section id="extensions">
                <SectionHeading emoji="🪽" title="Chrome Extensions" id="extensions" />
                <div className="flex flex-col gap-4">
                    {chromeExtensions.map((project, idx) => (
                    <ProjectCard key={idx} {...project} isSmall emoji="🧩" />
                    ))}
                </div>
            </section>

            {/* VSCode Extensions */}
            <section>
                <SectionHeading emoji="👨‍💻" title="VSCode Extensions" id="vscode" />
                <div className="flex flex-col gap-4">
                    {vscodeExtensions.map((project, idx) => (
                    <ProjectCard key={idx} {...project} isSmall emoji="📝" />
                    ))}
                </div>
            </section>
         </div>


        {/* Other Projects */}
        <section id="other" className="my-24">
          <SectionHeading emoji="🚀" title="Other Projects" id="other" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             {otherProjects.filter(p => !p.isSmall).map((project, idx) => (
               <ProjectCard key={idx} {...project} />
             ))}
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherProjects.filter(p => p.isSmall).map((project, idx) => (
                <ProjectCard key={idx} {...project} isSmall />
                ))}
            </div>
        </section>

        {/* Mobile Apps (Coming Soon) */}
        <section className="my-24">
             <SectionHeading emoji="📱" title="Mobile Apps" id="mobile" />
             <div className="bg-slate-900/30 border border-dashed border-slate-700 rounded-2xl p-12 text-center">
                 <Smartphone className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                 <h3 className="text-xl font-semibold text-slate-300 mb-2">Coming soon!</h3>
                 <p className="text-slate-500">(Aiming for before 2026)</p>
             </div>
        </section>


        {/* Stats */}
        <section id="stats" className="my-24">
          <SectionHeading emoji="📊" title="GitHub Stats" id="stats" />
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="w-full transform hover:scale-[1.02] transition-transform duration-300">
               <a href="https://github.com/DenverCoder1/github-readme-streak-stats" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="https://github-readme-streak-stats-eight.vercel.app/?user=AMAMazing&theme=ocean-gradient&background=0B1121&border=1e293b" 
                    alt="Github Stats"
                    className="w-full h-auto rounded-xl shadow-2xl shadow-blue-500/5 border border-slate-800"
                  />
                </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-slate-800/50 bg-[#080c17] relative z-10">
        <div className="animate-pulse mb-4 text-2xl">✨</div>
        <p className="text-xl font-medium text-slate-300">
          Building tools that matter.
        </p>
        <p className="text-slate-600 mt-8 text-sm">
            &copy; {new Date().getFullYear()} AMAMazing. All rights reserved.
        </p>
      </footer>
      
      <ScrollToTop />

    </div>
  );
}