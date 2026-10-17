# AMAMazing - Developer Portfolio (ExpoJS)

A high-performance, cross-platform developer portfolio and blog built with **Expo**, **Expo Router**, **React Native Web**, and **TypeScript**.

## 🎨 Theme & UI Enhancements
- **Dark Grey Palette**: Upgraded from dark blue (`#0B1121`) to modern deep charcoal / dark grey (`#121212`), with secondary containers (`#18181b`), elevated cards (`#1e1e24`), and refined borders (`#2e2e38`).
- **Interactive Markdown Exporter**: Instant modal to view or copy the portfolio in formatted raw Markdown for GitHub READMEs or profiles.
- **Cross-Platform Compatibility**: Fully compatible with web browsers, iOS, and Android using standard React Native and Expo APIs.
- **Filterable Developer Blog**: Real-time hashtag filtering, dynamic post views, and external project showcase links.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
# Start Expo development server (interactive menu)
npm start

# Run in Web browser
npm run web

# Run on Android (emulator or physical device)
npm run android

# Run on iOS (macOS only)
npm run ios
```

### 3. Build for Production Web
```bash
npm run build:web
```

## 📁 Project Structure
- `app/`: Expo Router file-system routing
  - `_layout.tsx`: Root stack navigator and dark status bar
  - `index.tsx`: Main developer portfolio home screen
  - `blog/index.tsx`: Filterable articles and blog list
  - `blog/[slug].tsx`: Dynamic article viewer with external showcase links
- `components/`: Modular React Native UI components
  - `Navbar.tsx`: Sticky navigation header with brand badge and Raw Markdown trigger
  - `HeroSection.tsx`: Greeting, collaboration status, bio, and latest post banner
  - `SectionHeader.tsx`: Polished section headings with emojis and dividers
  - `ProjectCard.tsx`: Versatile card supporting categories, badges, and external links
  - `RawMarkdownModal.tsx`: Accessible modal with one-click markdown copy
  - `Footer.tsx`: Branding, social profiles, and credits
- `lib/`:
  - `data.ts`: Portfolio projects, navigation links, and markdown generator
  - `posts.ts`: Blog articles and metadata
  - `theme.ts`: Unified dark grey design system tokens
