import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';
import {
  GitFork,
  Calendar,
  Sparkles,
  MousePointerClick,
  ArrowUpRight,
  Layers,
  Terminal,
  Globe,
  Cpu,
  Package,
  Puzzle,
  ShieldCheck,
} from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SectionHeader } from '../components/SectionHeader';
import { EqualizingGridMatrix, HoverOrigin } from '../components/EqualizingGridMatrix';
import { Footer } from '../components/Footer';
import { RawMarkdownModal } from '../components/RawMarkdownModal';
import {
  featuredProjects,
  webApps,
  desktopApps,
  pythonPackages,
  npmPackages,
  chromeExtensions,
  ProjectItem,
} from '../lib/data';
import { theme } from '../lib/theme';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [showRawModal, setShowRawModal] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [hoverOrigin, setHoverOrigin] = useState<HoverOrigin>({
    x: width / 2,
    y: height / 2,
  });

  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});
  const hoverClearTimeout = useRef<any>(null);

  const totalOssCount =
    webApps.length +
    desktopApps.length +
    pythonPackages.length +
    npmPackages.length +
    chromeExtensions.length;

  // Debounced hover handoff so moving across 12px grid gaps stays buttery smooth
  const handleHoverProject = useCallback(
    (project: ProjectItem | null, origin?: HoverOrigin) => {
      if (hoverClearTimeout.current) {
        clearTimeout(hoverClearTimeout.current);
        hoverClearTimeout.current = null;
      }

      if (project) {
        if (origin) setHoverOrigin(origin);
        setHoveredProject(project);
      } else {
        hoverClearTimeout.current = setTimeout(() => {
          setHoveredProject(null);
        }, 45);
      }
    },
    []
  );

  const handleLayoutSection = (id: string, y: number) => {
    sectionPositions.current[id] = y;
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    const y = sectionPositions.current[sectionId];
    if (typeof y === 'number' && scrollRef.current) {
      scrollRef.current.scrollTo({ y: Math.max(0, y - 80), animated: true });
    }
  };

  const isOssHovered =
    hoveredProject?.category?.toLowerCase().includes('package') ||
    hoveredProject?.category?.toLowerCase().includes('extension') ||
    hoveredProject?.category?.toLowerCase().includes('web') ||
    hoveredProject?.category?.toLowerCase().includes('desktop');

  const isBlueHovered = Boolean(hoveredProject?.isAAdsMaximizing);

  const cleanUrl = hoveredProject?.url
    ? hoveredProject.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : '';

  return (
    <View style={styles.screen}>
      {/* Global Web Keyframes & Architectural Dot Grid */}
      {Platform.OS === 'web' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes expandOverlayGPU {
                0% {
                  opacity: 0;
                  transform: scale(0.24) translateZ(0);
                }
                100% {
                  opacity: 1;
                  transform: scale(1) translateZ(0);
                }
              }
              @keyframes swapContentGPU {
                0% {
                  opacity: 0.2;
                  transform: translateY(12px) scale(0.985) translateZ(0);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0px) scale(1) translateZ(0);
                }
              }
              @keyframes pulseRing {
                0%, 100% { transform: scale(1); opacity: 0.95; }
                50% { transform: scale(1.4); opacity: 0.35; }
              }
            `,
          }}
        />
      )}

      {/* Subtle Architectural Background Mesh (Zero GPU Lag) */}
      <View pointerEvents="none" style={styles.ambientBackgroundMesh} />

      <Navbar
        onOpenRaw={() => setShowRawModal(true)}
        onNavigateSection={scrollToSection}
      />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          {/* Hero Section */}
          <HeroSection onExploreProjects={() => scrollToSection('featured')} />

          {/* Featured Flagship Section */}
          <View
            onLayout={(e: any) => handleLayoutSection('featured', e.nativeEvent.layout.y)}
            style={styles.sectionBlock}
          >
            <View style={styles.sectionBadgeRow}>
              <View style={styles.flagshipPill}>
                <Sparkles size={12} color="#a5b4fc" />
                <Text style={styles.flagshipPillText}>CORE ECOSYSTEM</Text>
              </View>
              <View style={styles.sectionBadgeLine} />
              <Text style={styles.sectionCountLabel}>
                {featuredProjects.length} FLAGSHIPS
              </Text>
            </View>

            <SectionHeader
              emoji="⭐"
              title="Featured Projects"
              subtitle="Core flagships across web operating systems, creator tools, and media platforms"
            />
            <EqualizingGridMatrix
              items={featuredProjects}
              minHeight={460}
              variant="featured"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* Elevated Open-Source Community Showcase Banner */}
          <View
            onLayout={(e: any) => handleLayoutSection('open-source', e.nativeEvent.layout.y)}
            style={styles.ossShowcaseBanner}
          >
            <View style={styles.ossBannerTopRow}>
              <View style={styles.ossPillBadge}>
                <GitFork size={13} color="#34d399" />
                <Text style={styles.ossPillText}>OPEN SOURCE & COMMUNITY WORK</Text>
              </View>

              <View style={styles.ossCountBadge}>
                <Text style={styles.ossCountBadgeText}>
                  {totalOssCount} PUBLIC RELEASES
                </Text>
              </View>
            </View>

            <Text style={styles.ossBannerTitle}>
              Developer Utilities, Packages & Browser Extensions
            </Text>
            <Text style={styles.ossBannerDescription}>
              Open-source tools, CLI scaffolds, and automation packages built by AMAMazing for the developer community. Hover any tile to inspect or click directly to launch.
            </Text>

            {/* Quick Category Breakdown Pills */}
            <View style={styles.ossCategoryCluster}>
              <View style={styles.ossMiniChip}>
                <Globe size={12} color="#6ee7b7" />
                <Text style={styles.ossMiniChipText}>{webApps.length} Web Apps</Text>
              </View>
              <View style={styles.ossMiniChip}>
                <Cpu size={12} color="#6ee7b7" />
                <Text style={styles.ossMiniChipText}>{desktopApps.length} Desktop</Text>
              </View>
              <View style={styles.ossMiniChip}>
                <Terminal size={12} color="#6ee7b7" />
                <Text style={styles.ossMiniChipText}>{pythonPackages.length} PyPI</Text>
              </View>
              <View style={styles.ossMiniChip}>
                <Package size={12} color="#6ee7b7" />
                <Text style={styles.ossMiniChipText}>{npmPackages.length} NPM</Text>
              </View>
              <View style={styles.ossMiniChip}>
                <Puzzle size={12} color="#6ee7b7" />
                <Text style={styles.ossMiniChipText}>{chromeExtensions.length} Extensions</Text>
              </View>
            </View>
          </View>

          {/* Web Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('web-apps', e.nativeEvent.layout.y)}
            style={styles.sectionBlock}
          >
            <SectionHeader
              emoji="🌐"
              title="Web Applications"
              subtitle="Open-source browser utilities, transit systems, and game sandboxes"
            />
            <EqualizingGridMatrix
              items={webApps}
              minHeight={240}
              variant="opensource"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* Desktop Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('desktop-apps', e.nativeEvent.layout.y)}
            style={styles.sectionBlock}
          >
            <SectionHeader
              emoji="💻"
              title="Desktop Applications"
              subtitle="Open-source local dev servers and desktop automation utilities"
            />
            <EqualizingGridMatrix
              items={desktopApps}
              minHeight={220}
              variant="opensource"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* Python Packages (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('packages', e.nativeEvent.layout.y)}
            style={styles.sectionBlock}
          >
            <SectionHeader
              emoji="🐍"
              title="Python Packages"
              subtitle="Open-source libraries published on PyPI for developers"
            />
            <EqualizingGridMatrix
              items={pythonPackages}
              minHeight={260}
              variant="opensource"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* NPM Packages (Open Source) */}
          <View style={styles.sectionBlock}>
            <SectionHeader
              emoji="📦"
              title="NPM Packages"
              subtitle="Developer scaffolding and starter CLI boilerplates"
            />
            <EqualizingGridMatrix
              items={npmPackages}
              minHeight={180}
              variant="opensource"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* Chrome Extensions (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('extensions', e.nativeEvent.layout.y)}
            style={styles.sectionBlock}
          >
            <SectionHeader
              emoji="🧩"
              title="Chrome Extensions"
              subtitle="Open-source productivity and streaming browser extensions"
            />
            <EqualizingGridMatrix
              items={chromeExtensions}
              minHeight={220}
              variant="opensource"
              onHoverItem={handleHoverProject}
            />
          </View>

          {/* Bento Telemetry Stats Grid */}
          <View
            onLayout={(e: any) => handleLayoutSection('stats', e.nativeEvent.layout.y)}
            style={[
              styles.bentoStatsGrid,
              width < 768 && styles.bentoStatsGridMobile,
            ]}
          >
            {/* Stat Card 1: Core Flagships */}
            <View style={styles.bentoStatCard}>
              <View style={styles.bentoStatHeader}>
                <View style={styles.bentoIconIndigo}>
                  <Layers size={18} color="#818cf8" />
                </View>
                <Text style={styles.bentoBadgeIndigo}>PRODUCTION</Text>
              </View>
              <Text style={styles.bentoStatNumber}>{featuredProjects.length}</Text>
              <Text style={styles.bentoStatTitle}>Featured Core Projects</Text>
              <Text style={styles.bentoStatSub}>
                Full-scale platforms, web OS environments, and creator suites
              </Text>
            </View>

            {/* Stat Card 2: Open Source */}
            <View style={[styles.bentoStatCard, styles.bentoStatCardEmerald]}>
              <View style={styles.bentoStatHeader}>
                <View style={styles.bentoIconEmerald}>
                  <GitFork size={18} color="#34d399" />
                </View>
                <Text style={styles.bentoBadgeEmerald}>MIT / PUBLIC</Text>
              </View>
              <Text style={[styles.bentoStatNumber, { color: '#34d399' }]}>
                {totalOssCount}+
              </Text>
              <Text style={styles.bentoStatTitle}>Open Source Releases</Text>
              <Text style={styles.bentoStatSub}>
                Published across PyPI, NPM, Chrome Web Store, and GitHub
              </Text>
            </View>

            {/* Stat Card 3: Community */}
            <View style={styles.bentoStatCard}>
              <View style={styles.bentoStatHeader}>
                <View style={styles.bentoIconBlue}>
                  <ShieldCheck size={18} color="#60a5fa" />
                </View>
                <Text style={styles.bentoBadgeBlue}>ECOSYSTEM</Text>
              </View>
              <Text style={[styles.bentoStatNumber, { color: '#93c5fd' }]}>100%</Text>
              <Text style={styles.bentoStatTitle}>Community Driven</Text>
              <Text style={styles.bentoStatSub}>
                Built openly with direct source inspection and zero paywalls
              </Text>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>

      {/* =========================================================
       * FULL-SCREEN EXPANDING HOVER TAKEOVER (60FPS GPU COMPOSITED)
       * ========================================================= */}
      {hoveredProject && (
        <View
          pointerEvents="none"
          style={[
            styles.fullScreenTakeover,
            isOssHovered
              ? styles.takeoverBgOss
              : isBlueHovered
              ? styles.takeoverBgBlue
              : styles.takeoverBgFeatured,
            Platform.OS === 'web'
              ? ({
                  transformOrigin: `${hoverOrigin.x}px ${hoverOrigin.y}px`,
                  animation: 'expandOverlayGPU 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  willChange: 'transform, opacity',
                } as any)
              : {},
          ]}
        >
          {/* Giant Background Watermark Icon / Emoji */}
          <View style={styles.watermarkContainer}>
            {hoveredProject.iconUrl ? (
              <Image
                source={{ uri: hoveredProject.iconUrl }}
                style={styles.watermarkImage}
                resizeMode="contain"
              />
            ) : hoveredProject.emoji ? (
              <Text style={styles.watermarkEmoji}>{hoveredProject.emoji}</Text>
            ) : null}
          </View>

          {/* Framed Spotlight Stage */}
          <View
            key={hoveredProject.title}
            style={[
              styles.takeoverStageCard,
              isOssHovered
                ? styles.takeoverStageCardOss
                : isBlueHovered
                ? styles.takeoverStageCardBlue
                : styles.takeoverStageCardFeatured,
              Platform.OS === 'web'
                ? ({
                    animation: 'swapContentGPU 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    willChange: 'transform, opacity',
                  } as any)
                : {},
            ]}
          >
            {/* Top Meta Pills */}
            <View style={styles.takeoverBadgeRow}>
              {hoveredProject.category && (
                <View
                  style={[
                    styles.takeoverCategoryPill,
                    isOssHovered && styles.takeoverCategoryPillOss,
                    isBlueHovered && styles.takeoverCategoryPillBlue,
                  ]}
                >
                  <Text
                    style={[
                      styles.takeoverCategoryText,
                      isOssHovered && styles.takeoverCategoryTextOss,
                      isBlueHovered && styles.takeoverCategoryTextBlue,
                    ]}
                  >
                    {hoveredProject.category}
                  </Text>
                </View>
              )}
              {hoveredProject.released && (
                <View style={styles.takeoverDatePill}>
                  <Calendar size={13} color="#cbd5e1" />
                  <Text style={styles.takeoverDateText}>{hoveredProject.released}</Text>
                </View>
              )}
            </View>

            {/* Hero Icon + Title */}
            <View style={styles.takeoverHeaderRow}>
              <View
                style={[
                  styles.takeoverIconBox,
                  isOssHovered && styles.takeoverIconBoxOss,
                  isBlueHovered && styles.takeoverIconBoxBlue,
                ]}
              >
                {hoveredProject.iconUrl ? (
                  <Image
                    source={{ uri: hoveredProject.iconUrl }}
                    style={styles.takeoverIcon}
                    resizeMode="contain"
                  />
                ) : hoveredProject.emoji ? (
                  <Text style={styles.takeoverEmoji}>{hoveredProject.emoji}</Text>
                ) : (
                  <Sparkles size={44} color="#ffffff" />
                )}
              </View>

              <Text style={styles.takeoverTitle}>{hoveredProject.title}</Text>
            </View>

            {/* Full Project Description */}
            <Text style={styles.takeoverDescription}>{hoveredProject.description}</Text>

            {/* Ambient Non-Button Click Status Bar */}
            <View style={styles.ambientPromptDivider} />

            <View style={styles.ambientInstructionRow}>
              <View style={styles.pulseIndicatorWrapper}>
                <View
                  style={[
                    styles.pulseDot,
                    isOssHovered
                      ? styles.pulseDotOss
                      : isBlueHovered
                      ? styles.pulseDotBlue
                      : styles.pulseDotFeatured,
                    Platform.OS === 'web'
                      ? ({ animation: 'pulseRing 1.8s infinite ease-in-out' } as any)
                      : {},
                  ]}
                />
                <MousePointerClick
                  size={18}
                  color={
                    isOssHovered ? '#6ee7b7' : isBlueHovered ? '#93c5fd' : '#a5b4fc'
                  }
                />
              </View>

              <Text style={styles.ambientInstructionText}>
                Click anywhere right now to open project
              </Text>

              {cleanUrl ? (
                <View style={styles.ambientUrlReadout}>
                  <Text
                    style={[
                      styles.ambientUrlText,
                      isOssHovered && styles.ambientUrlTextOss,
                      isBlueHovered && styles.ambientUrlTextBlue,
                    ]}
                    numberOfLines={1}
                  >
                    {cleanUrl}
                  </Text>
                  <ArrowUpRight
                    size={15}
                    color={
                      isOssHovered ? '#34d399' : isBlueHovered ? '#60a5fa' : '#818cf8'
                    }
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      )}

      {/* Raw Markdown Modal */}
      <RawMarkdownModal
        visible={showRawModal}
        onClose={() => setShowRawModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    position: 'relative',
  },
  ambientBackgroundMesh: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: `
            radial-gradient(circle at 15% 8%, rgba(99, 102, 241, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 55%, rgba(16, 185, 129, 0.06) 0%, transparent 45%),
            radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 28px 28px',
        } as any)
      : {}),
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  mainContainer: {
    maxWidth: 1220,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 22,
  },
  sectionBlock: {
    marginBottom: 36,
  },
  sectionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  flagshipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  flagshipPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#a5b4fc',
    letterSpacing: 1,
  },
  sectionBadgeLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionCountLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textMuted,
    letterSpacing: 0.8,
  },

  /* =========================================================
   * Open Source Showcase Banner
   * ========================================================= */
  ossShowcaseBanner: {
    marginTop: 28,
    marginBottom: 40,
    padding: 28,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 21, 20, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.22)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)',
        } as any)
      : {}),
  },
  ossBannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  ossPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ossPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 0.9,
  },
  ossCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  ossCountBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.6,
  },
  ossBannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  ossBannerDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: theme.colors.textSecondary,
    maxWidth: 780,
    marginBottom: 20,
  },
  ossCategoryCluster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ossMiniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  ossMiniChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a7f3d0',
  },

  /* =========================================================
   * Bento Telemetry Stats Grid
   * ========================================================= */
  bentoStatsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 32,
  },
  bentoStatsGridMobile: {
    flexDirection: 'column',
  },
  bentoStatCard: {
    flex: 1,
    backgroundColor: '#14141b',
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  bentoStatCardEmerald: {
    backgroundColor: '#111918',
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  bentoStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoIconIndigo: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(99, 102, 241, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoIconEmerald: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoIconBlue: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(59, 130, 246, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoBadgeIndigo: {
    fontSize: 10,
    fontWeight: '800',
    color: '#818cf8',
    letterSpacing: 0.9,
  },
  bentoBadgeEmerald: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 0.9,
  },
  bentoBadgeBlue: {
    fontSize: 10,
    fontWeight: '800',
    color: '#60a5fa',
    letterSpacing: 0.9,
  },
  bentoStatNumber: {
    fontSize: 38,
    fontWeight: '900',
    color: '#a5b4fc',
    letterSpacing: -1,
    marginBottom: 4,
  },
  bentoStatTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  bentoStatSub: {
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.textMuted,
  },

  /* =========================================================
   * Full-Screen Expanding Hover Takeover (Zero-Blur GPU Fast)
   * ========================================================= */
  fullScreenTakeover: {
    ...(Platform.OS === 'web'
      ? ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        } as any)
      : {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    overflow: 'hidden',
  },
  takeoverBgFeatured: {
    backgroundColor: 'rgba(8, 9, 16, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(99, 102, 241, 0.20) 0%, rgba(8, 9, 16, 0.97) 72%)',
        } as any)
      : {}),
  },
  takeoverBgOss: {
    backgroundColor: 'rgba(6, 14, 13, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(16, 185, 129, 0.18) 0%, rgba(6, 14, 13, 0.97) 72%)',
        } as any)
      : {}),
  },
  takeoverBgBlue: {
    backgroundColor: 'rgba(7, 12, 20, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(59, 130, 246, 0.20) 0%, rgba(7, 12, 20, 0.97) 72%)',
        } as any)
      : {}),
  },
  watermarkContainer: {
    position: 'absolute',
    right: '-4%',
    bottom: '-8%',
    opacity: 0.045,
    transform: [{ rotate: '-12deg' }],
  },
  watermarkImage: {
    width: 520,
    height: 520,
  },
  watermarkEmoji: {
    fontSize: 420,
  },
  takeoverStageCard: {
    maxWidth: 940,
    width: '100%',
    padding: 40,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'flex-start',
    gap: 22,
  },
  takeoverStageCardFeatured: {
    backgroundColor: 'rgba(18, 19, 32, 0.78)',
    borderColor: 'rgba(129, 140, 248, 0.28)',
  },
  takeoverStageCardOss: {
    backgroundColor: 'rgba(12, 24, 22, 0.78)',
    borderColor: 'rgba(52, 211, 153, 0.28)',
  },
  takeoverStageCardBlue: {
    backgroundColor: 'rgba(14, 22, 36, 0.78)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  takeoverBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  takeoverCategoryPill: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.45)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  takeoverCategoryPillOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderColor: 'rgba(52, 211, 153, 0.45)',
  },
  takeoverCategoryPillBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderColor: 'rgba(96, 165, 250, 0.45)',
  },
  takeoverCategoryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#a5b4fc',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  takeoverCategoryTextOss: {
    color: '#6ee7b7',
  },
  takeoverCategoryTextBlue: {
    color: '#93c5fd',
  },
  takeoverDatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  takeoverDateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  takeoverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    flexWrap: 'wrap',
  },
  takeoverIconBox: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(129, 140, 248, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeoverIconBoxOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.16)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  takeoverIconBoxBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.16)',
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  takeoverIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  takeoverEmoji: {
    fontSize: 44,
  },
  takeoverTitle: {
    fontSize: 50,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    flexShrink: 1,
  },
  takeoverDescription: {
    fontSize: 21,
    lineHeight: 33,
    color: '#e2e8f0',
    fontWeight: '400',
    maxWidth: 840,
  },

  /* =========================================================
   * Ambient Non-Button Click Prompt Styles
   * ========================================================= */
  ambientPromptDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 6,
  },
  ambientInstructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  pulseIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pulseDotFeatured: {
    backgroundColor: '#818cf8',
  },
  pulseDotOss: {
    backgroundColor: '#34d399',
  },
  pulseDotBlue: {
    backgroundColor: '#60a5fa',
  },
  ambientInstructionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0.2,
  },
  ambientUrlReadout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.14)',
  },
  ambientUrlText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#a5b4fc',
  },
  ambientUrlTextOss: {
    color: '#6ee7b7',
  },
  ambientUrlTextBlue: {
    color: '#93c5fd',
  },
});