import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { GitFork } from 'lucide-react-native';
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

          {/* Featured Projects (9 Core Closed-Source Projects) */}
          <View
            onLayout={(e: any) => handleLayoutSection('featured', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="⭐"
              title="Featured Projects"
              subtitle="Core flagships across web operating systems, creator tools, and media platforms"
            />
            <EqualizingGridMatrix items={featuredProjects} minHeight={460} />
          </View>

          {/* Open Source Community Contributions Banner */}
          <View
            onLayout={(e: any) => handleLayoutSection('open-source', e.nativeEvent.layout.y)}
            style={styles.openSourceBanner}
          >
            <View style={styles.openSourceIconCircle}>
              <GitFork size={22} color={theme.colors.primaryLight} />
            </View>
            <View style={styles.openSourceTextContainer}>
              <View style={styles.openSourceTagRow}>
                <Text style={styles.openSourceBadge}>OPEN SOURCE</Text>
                <Text style={styles.openSourceSubBadge}>Free & Public Community Projects</Text>
              </View>
              <Text style={styles.openSourceHeading}>
                Open Source Community Contributions
              </Text>
              <Text style={styles.openSourceDescription}>
                Everything below consists of my personal open-source projects, community packages, web tools, and browser extensions.
              </Text>
            </View>
          </View>

          {/* Web Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('web-apps', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🌐"
              title="Web Applications"
              subtitle="Open-source browser utilities, transit systems, and game sandboxes"
            />
            <EqualizingGridMatrix items={webApps} minHeight={240} />
          </View>

          {/* Desktop Applications (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('desktop-apps', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="💻"
              title="Desktop Applications"
              subtitle="Open-source local dev servers and desktop automation utilities"
            />
            <EqualizingGridMatrix items={desktopApps} minHeight={220} />
          </View>

          {/* Python Packages (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('packages', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="�"
              title="Python Packages"
              subtitle="Open-source libraries published on PyPI for developers"
            />
            <EqualizingGridMatrix items={pythonPackages} minHeight={220} />
          </View>

          {/* NPM Packages (Open Source) */}
          <View>
            <SectionHeader
              emoji="📦"
              title="NPM Packages"
              subtitle="Developer scaffolding and starter CLI boilerplates"
            />
            <EqualizingGridMatrix items={npmPackages} minHeight={180} />
          </View>

          {/* Chrome Extensions (Open Source) */}
          <View
            onLayout={(e: any) => handleLayoutSection('extensions', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🧩"
              title="Chrome Extensions"
              subtitle="Open-source productivity and streaming browser extensions"
            />
            <EqualizingGridMatrix items={chromeExtensions} minHeight={220} />
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
              <Text style={styles.statNumber}>13+</Text>
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
  openSourceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    padding: 20,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  openSourceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  openSourceTextContainer: {
    flex: 1,
  },
  openSourceTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  openSourceBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primaryLight,
    letterSpacing: 0.8,
  },
  openSourceSubBadge: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  openSourceHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  openSourceDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
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
    marginVertical: theme.spacing.xxl,
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