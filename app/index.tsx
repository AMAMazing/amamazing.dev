import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SectionHeader } from '../components/SectionHeader';
import { EqualizingGridMatrix, HoverOrigin } from '../components/EqualizingGridMatrix';
import { OssShowcaseBanner } from '../components/OssShowcaseBanner';
import { GithubStatsSection } from '../components/GithubStatsSection';
import { ProjectHoverTakeover } from '../components/ProjectHoverTakeover';
import { Footer } from '../components/Footer';
import { RawMarkdownModal } from '../components/RawMarkdownModal';
import {
  featuredProjects,
  openSourceSections,
  ProjectItem,
} from '../lib/data';
import { theme } from '../lib/theme';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [showRawModal, setShowRawModal] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [isOssHovered, setIsOssHovered] = useState(false);
  const [hoverOrigin, setHoverOrigin] = useState<HoverOrigin>({
    x: width / 2,
    y: height / 2,
  });

  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});
  const hoverClearTimeout = useRef<any>(null);

  const handleHoverProject = useCallback(
    (project: ProjectItem | null, origin?: HoverOrigin, oss = false) => {
      if (hoverClearTimeout.current) {
        clearTimeout(hoverClearTimeout.current);
        hoverClearTimeout.current = null;
      }

      if (project) {
        if (origin) setHoverOrigin(origin);
        setIsOssHovered(oss);
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

  return (
    <View style={styles.screen}>
      {Platform.OS === 'web' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes expandOverlayGPU {
                0% { opacity: 0; transform: scale(0.24) translateZ(0); }
                100% { opacity: 1; transform: scale(1) translateZ(0); }
              }
              @keyframes swapContentGPU {
                0% { opacity: 0.2; transform: translateY(12px) scale(0.985) translateZ(0); }
                100% { opacity: 1; transform: translateY(0px) scale(1) translateZ(0); }
              }
              @keyframes pulseRing {
                0%, 100% { transform: scale(1); opacity: 0.95; }
                50% { transform: scale(1.4); opacity: 0.35; }
              }
            `,
          }}
        />
      )}

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
              onHoverItem={(item, origin) => handleHoverProject(item, origin, false)}
            />
          </View>

          {/* Open-Source Community Showcase Banner */}
          <OssShowcaseBanner
            sections={openSourceSections}
            onLayout={(e: any) => handleLayoutSection('open-source', e.nativeEvent.layout.y)}
          />

          {/* Dynamic Open Source Sections (Driven 100% by data.ts) */}
          {openSourceSections.map((section) => (
            <View
              key={section.id}
              onLayout={(e: any) => handleLayoutSection(section.id, e.nativeEvent.layout.y)}
              style={styles.sectionBlock}
            >
              <SectionHeader
                emoji={section.emoji}
                title={section.title}
                subtitle={section.subtitle}
              />
              <EqualizingGridMatrix
                items={section.items}
                minHeight={section.minHeight}
                variant="opensource"
                onHoverItem={(item, origin) => handleHoverProject(item, origin, true)}
              />
            </View>
          ))}

          {/* GitHub Streak & Stats Section */}
          <GithubStatsSection
            onLayout={(e: any) => handleLayoutSection('github-stats', e.nativeEvent.layout.y)}
          />
        </View>

        <Footer />
      </ScrollView>

      <ProjectHoverTakeover
        project={hoveredProject}
        hoverOrigin={hoverOrigin}
        isOss={isOssHovered}
      />

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
});