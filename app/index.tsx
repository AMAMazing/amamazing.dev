import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { GitFork, Sparkles, Terminal } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SectionHeader } from '../components/SectionHeader';
import { EqualizingGridMatrix } from '../components/EqualizingGridMatrix';
import { Footer } from '../components/Footer';
import { RawMarkdownModal } from '../components/RawMarkdownModal';
import {
  featuredProjects,
  webApps,
  desktopApps,
  pythonPackages,
  npmPackages,
  chromeExtensions,
} from '../lib/data';
import { theme } from '../lib/theme';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [showRawModal, setShowRawModal] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});

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
          <HeroSection
            onExploreProjects={() => scrollToSection('featured')}
          />

          {/* Featured Projects (9 Core Flagship Projects) */}
          <View
            onLayout={(e: any) => handleLayoutSection('featured', e.nativeEvent.layout.y)}
            style={styles.sectionSpacing}
          >
            <SectionHeader
              emoji="⭐"
              title="Featured Projects"
              subtitle="Core flagships across web operating systems, creator tools, and media platforms"
            />
            <EqualizingGridMatrix items={featuredProjects} minHeight={450} variant="featured" />
          </View>

          {/* Elegant Open Source Divider & Section Intro */}
          <View
            onLayout={(e: any) => handleLayoutSection('open-source', e.nativeEvent.layout.y)}
            style={styles.ossDividerWrapper}
          >
            <View style={styles.ossDividerLine} />
            <View style={styles.ossPillContainer}>
              <View style={styles.ossPillBadge}>
                <GitFork size={13} color="#34d399" />
                <Text style={styles.ossPillText}>OPEN SOURCE COMMUNITY WORK</Text>
              </View>
            </View>
            <View style={styles.ossDividerLine} />
          </View>

          <Text style={styles.ossIntroDescription}>
            Public utilities, developer packages, and community contributions built by AMAMazing
          </Text>

          {/* Web Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('web-apps', e.nativeEvent.layout.y)}
            style={styles.sectionSpacing}
          >
            <SectionHeader
              emoji="🌐"
              title="Web Applications"
              subtitle="Open-source browser utilities, transit systems, and game sandboxes"
            />
            <EqualizingGridMatrix items={webApps} minHeight={240} variant="opensource" />
          </View>

          {/* Desktop Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('desktop-apps', e.nativeEvent.layout.y)}
            style={styles.sectionSpacing}
          >
            <SectionHeader
              emoji="💻"
              title="Desktop Applications"
              subtitle="Open-source local dev servers and desktop automation utilities"
            />
            <EqualizingGridMatrix items={desktopApps} minHeight={220} variant="opensource" />
          </View>

          {/* Python Packages (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('packages', e.nativeEvent.layout.y)}
            style={styles.sectionSpacing}
          >
            <SectionHeader
              emoji="🐍"
              title="Python Packages"
              subtitle="Open-source libraries published on PyPI for developers"
            />
            <EqualizingGridMatrix items={pythonPackages} minHeight={220} variant="opensource" />
          </View>

          {/* NPM Packages (Open Source) */}
          <View style={styles.sectionSpacing}>
            <SectionHeader
              emoji="📦"
              title="NPM Packages"
              subtitle="Developer scaffolding and starter CLI boilerplates"
            />
            <EqualizingGridMatrix items={npmPackages} minHeight={180} variant="opensource" />
          </View>

          {/* Chrome Extensions (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('extensions', e.nativeEvent.layout.y)}
            style={styles.sectionSpacing}
          >
            <SectionHeader
              emoji="🧩"
              title="Chrome Extensions"
              subtitle="Open-source productivity and streaming browser extensions"
            />
            <EqualizingGridMatrix items={chromeExtensions} minHeight={220} variant="opensource" />
          </View>

          {/* Stats Bar */}
          <View
            onLayout={(e: any) => handleLayoutSection('stats', e.nativeEvent.layout.y)}
            style={styles.statsCard}
          >
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Featured Core Projects</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#34d399' }]}>13+</Text>
              <Text style={styles.statLabel}>Open Source Releases</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Community Driven</Text>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>

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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  sectionSpacing: {
    marginBottom: theme.spacing.lg,
  },
  ossDividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
    gap: 16,
  },
  ossDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(52, 211, 153, 0.25)',
  },
  ossPillContainer: {
    alignItems: 'center',
  },
  ossPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.35)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.radii.full,
  },
  ossPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 0.8,
  },
  ossIntroDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: -theme.spacing.sm,
  },
  statsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primaryLight,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
});