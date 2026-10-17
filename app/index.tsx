import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone, ExternalLink, ArrowRight } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Footer } from '../components/Footer';
import { RawMarkdownModal } from '../components/RawMarkdownModal';
import {
  featuredProjects,
  webApps,
  desktopApps,
  pythonPackages,
  chromeExtensions,
  vscodeExtensions,
  otherProjects,
} from '../lib/data';
import { getAllPosts } from '../lib/posts';
import { theme } from '../lib/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [showRawModal, setShowRawModal] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const posts = getAllPosts();
  const latestPost = posts[0];

  const isWide = width >= 768;
  const isLarge = width >= 1024;

  const sectionPositions = useRef<{ [key: string]: number }>({});

  const handleLayoutSection = (id: string, y: number) => {
    sectionPositions.current[id] = y;
  };

  const scrollToSection = (sectionId: string) => {
    const y = sectionPositions.current[sectionId];
    if (typeof y === 'number' && scrollRef.current) {
      scrollRef.current.scrollTo({ y: Math.max(0, y - 80), animated: true });
    }
  };

  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
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
            latestPostTitle={latestPost?.title}
            onReadBlog={() => router.push('/blog')}
          />

          {/* Featured Projects */}
          <View
            onLayout={(e: any) => handleLayoutSection('featured', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🚀"
              title="Featured Projects"
              subtitle="Key highlights and popular releases"
            />
            <View style={[styles.grid, isWide && styles.grid2Col]}>
              {featuredProjects.map((project, idx) => (
                <View key={idx} style={isWide ? styles.colHalf : styles.colFull}>
                  <ProjectCard {...project} />
                </View>
              ))}
            </View>
          </View>

          {/* Blog Spotlight Section */}
          {latestPost ? (
            <View
              onLayout={(e: any) => handleLayoutSection('blog', e.nativeEvent.layout.y)}
              style={styles.blogSpotlightCard}
            >
              <View style={styles.blogHeaderRow}>
                <View>
                  <Text style={styles.blogBadge}>LATEST ARTICLE</Text>
                  <Text style={styles.blogTitle}>{latestPost.title}</Text>
                  <Text style={styles.blogDate}>{latestPost.date}</Text>
                </View>
                <Pressable
                  onPress={() => router.push('/blog')}
                  style={styles.viewAllButton}
                >
                  <Text style={styles.viewAllButtonText}>View All Posts</Text>
                  <ArrowRight size={14} color={theme.colors.primaryLight} />
                </Pressable>
              </View>

              <Pressable
                onPress={() => router.push(`/blog/${latestPost.slug}` as any)}
                style={styles.blogInnerCard}
              >
                <Text style={styles.blogExcerpt} numberOfLines={3}>
                  {latestPost.content}
                </Text>
                <View style={styles.readMoreRow}>
                  <Text style={styles.readMoreText}>Read full post</Text>
                  <ArrowRight size={14} color={theme.colors.primaryLight} />
                </View>
              </Pressable>
            </View>
          ) : null}

          {/* Tech Stack */}
          <View
            onLayout={(e: any) => handleLayoutSection('tech-stack', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🛠️"
              title="Tech Stack"
              subtitle="Technologies, languages, and frameworks in active use"
            />
            <Pressable
              onPress={() => openUrl('https://go-skill-icons.vercel.app/')}
              style={styles.techStackContainer}
            >
              <Image
                source={{
                  uri: 'https://go-skill-icons.vercel.app/api/icons?i=js,ts,py,react,nextjs,tailwind,expo,flask,vscode,figma,ffmpeg,vercel,gemini',
                }}
                style={styles.techStackImage}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          {/* Web Applications */}
          <View
            onLayout={(e: any) => handleLayoutSection('web-apps', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🌐"
              title="Web Applications"
              subtitle="Full-stack and client web applications"
            />
            <View style={[styles.grid, isWide && styles.grid2Col]}>
              {webApps.map((project, idx) => (
                <View key={idx} style={isWide ? styles.colHalf : styles.colFull}>
                  <ProjectCard {...project} />
                </View>
              ))}
            </View>
          </View>

          {/* Desktop Applications */}
          <View
            onLayout={(e: any) => handleLayoutSection('desktop-apps', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="💻"
              title="Desktop Applications"
              subtitle="Cross-platform GUIs and automation servers"
            />
            <View style={[styles.grid, isLarge ? styles.grid3Col : isWide ? styles.grid2Col : styles.grid1Col]}>
              {desktopApps.map((project, idx) => (
                <View
                  key={idx}
                  style={isLarge ? styles.colThird : isWide ? styles.colHalf : styles.colFull}
                >
                  <ProjectCard {...project} />
                </View>
              ))}
            </View>
          </View>

          {/* Python Packages */}
          <View
            onLayout={(e: any) => handleLayoutSection('packages', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="📦"
              title="Python Packages"
              subtitle="Open-source libraries available on PyPI"
            />
            <View style={[styles.grid, isWide && styles.grid2Col]}>
              {pythonPackages
                .filter((p) => !p.isSmall)
                .map((project, idx) => (
                  <View key={idx} style={isWide ? styles.colHalf : styles.colFull}>
                    <ProjectCard {...project} />
                  </View>
                ))}
            </View>
            <View style={styles.smallGrid}>
              {pythonPackages
                .filter((p) => p.isSmall)
                .map((project, idx) => (
                  <ProjectCard key={idx} {...project} compact />
                ))}
            </View>
          </View>

          {/* Extensions */}
          <View
            onLayout={(e: any) => handleLayoutSection('extensions', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🧩"
              title="Extensions"
              subtitle="Chrome browser and Visual Studio Code plugins"
            />
            <View style={[styles.grid, isWide && styles.grid2Col]}>
              <View style={isWide ? styles.colHalf : styles.colFull}>
                <Text style={styles.subCategoryTitle}>Chrome Web Store</Text>
                {chromeExtensions.map((project, idx) => (
                  <ProjectCard key={idx} {...project} compact />
                ))}
              </View>

              <View style={isWide ? styles.colHalf : styles.colFull}>
                <Text style={styles.subCategoryTitle}>VS Code Marketplace</Text>
                {vscodeExtensions.map((project, idx) => (
                  <ProjectCard key={idx} {...project} compact />
                ))}
              </View>
            </View>
          </View>

          {/* Other Projects */}
          <View
            onLayout={(e: any) => handleLayoutSection('other', e.nativeEvent.layout.y)}
          >
            <SectionHeader
              emoji="🛠️"
              title="Other Projects"
              subtitle="Experimental utilities and creative apps"
            />
            <View style={[styles.grid, isWide && styles.grid2Col]}>
              {otherProjects
                .filter((p) => !p.isSmall)
                .map((project, idx) => (
                  <View key={idx} style={isWide ? styles.colHalf : styles.colFull}>
                    <ProjectCard {...project} />
                  </View>
                ))}
            </View>
            <View style={styles.smallGrid}>
              {otherProjects
                .filter((p) => p.isSmall)
                .map((project, idx) => (
                  <ProjectCard key={idx} {...project} compact />
                ))}
            </View>
          </View>

          {/* Mobile Apps Coming Soon */}
          <View style={styles.mobileComingSoonCard}>
            <Smartphone size={36} color={theme.colors.primaryLight} />
            <Text style={styles.mobileComingSoonTitle}>Mobile Apps (Expo & React Native)</Text>
            <Text style={styles.mobileComingSoonText}>
              Cross-platform iOS and Android apps currently in active development.
            </Text>
            <View style={styles.mobileBadge}>
              <Text style={styles.mobileBadgeText}>Coming in 2026</Text>
            </View>
          </View>

          {/* GitHub Stats */}
          <View
            onLayout={(e: any) => handleLayoutSection('stats', e.nativeEvent.layout.y)}
            style={styles.statsSection}
          >
            <SectionHeader
              emoji="📊"
              title="GitHub Contributions & Stats"
              subtitle="Live streak metrics and code activity"
            />
            <Pressable
              onPress={() => openUrl('https://github.com/AMAMazing')}
              style={styles.statsContainer}
            >
              <Image
                source={{
                  uri: 'https://github-readme-streak-stats-eight.vercel.app/?user=AMAMazing&theme=ocean-gradient&background=121212&border=2e2e38',
                }}
                style={styles.statsImage}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        <Footer />
      </ScrollView>

      {/* Raw Markdown Portfolio Modal */}
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
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  grid1Col: {
    flexDirection: 'column',
  },
  grid2Col: {
    flexDirection: 'row',
  },
  grid3Col: {
    flexDirection: 'row',
  },
  colFull: {
    width: '100%',
    paddingHorizontal: 8,
  },
  colHalf: {
    width: '50%',
    paddingHorizontal: 8,
  },
  colThird: {
    width: '33.333%',
    paddingHorizontal: 8,
  },
  smallGrid: {
    marginTop: 8,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 12,
    marginTop: 6,
  },
  blogSpotlightCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginVertical: theme.spacing.xl,
  },
  blogHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  blogBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primaryLight,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  blogDate: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.backgroundElevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  viewAllButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
  blogInnerCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.radii.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  blogExcerpt: {
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
  techStackContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    overflow: 'hidden',
  },
  techStackImage: {
    width: '100%',
    height: 70,
    maxWidth: 620,
  },
  mobileComingSoonCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.borderLight,
    marginVertical: theme.spacing.xl,
  },
  mobileComingSoonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 6,
  },
  mobileComingSoonText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: 420,
    marginBottom: 14,
  },
  mobileBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  mobileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
  statsSection: {
    marginVertical: theme.spacing.lg,
  },
  statsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsImage: {
    width: '100%',
    height: 190,
    maxWidth: 540,
  },
});