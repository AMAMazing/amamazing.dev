import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking, Image } from 'react-native';
import { Heart, Sparkles, ArrowRight, Github } from 'lucide-react-native';
import { theme } from '../lib/theme';

interface HeroSectionProps {
  onExploreProjects?: () => void;
  onReadBlog?: () => void;
  latestPostTitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onReadBlog,
  latestPostTitle,
}) => {
  const [bobaHovered, setBobaHovered] = useState(false);
  const [blogHovered, setBlogHovered] = useState(false);

  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Glow Accent Element */}
      <View style={styles.glowAura} />

      {/* Main Hero Card */}
      <View style={styles.heroCard}>
        {/* Top Status Pill */}
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Open for Collaborations & Building Cool Tools</Text>
        </View>

        {/* Headline */}
        <Text style={styles.greeting}>
          Hi there, I'm <Text style={styles.nameHighlight}>AMAMazing</Text> 👋
        </Text>

        <Text style={styles.description}>
          Software engineer crafting high-impact developer utilities, web applications, open-source Python packages, and cross-platform experiences.
        </Text>

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => openUrl('https://www.buymeaboba.com/')}
            onHoverIn={() => setBobaHovered(true)}
            onHoverOut={() => setBobaHovered(false)}
            style={[styles.primaryButton, bobaHovered && styles.primaryButtonHovered]}
          >
            <Heart size={16} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Buy Me a Boba</Text>
          </Pressable>

          <Pressable
            onPress={() => openUrl('https://github.com/AMAMazing')}
            style={styles.secondaryButton}
          >
            <Github size={16} color={theme.colors.text} />
            <Text style={styles.secondaryButtonText}>GitHub Profile</Text>
          </Pressable>
        </View>

        {/* Latest Post Spotlight Banner */}
        {latestPostTitle ? (
          <Pressable
            onPress={onReadBlog}
            onHoverIn={() => setBlogHovered(true)}
            onHoverOut={() => setBlogHovered(false)}
            style={[styles.spotlightBanner, blogHovered && styles.spotlightBannerHovered]}
          >
            <View style={styles.spotlightIcon}>
              <Sparkles size={14} color={theme.colors.primaryLight} />
            </View>
            <Text style={styles.spotlightLabel}>Latest Post:</Text>
            <Text style={styles.spotlightTitle} numberOfLines={1}>{latestPostTitle}</Text>
            <ArrowRight size={14} color={blogHovered ? theme.colors.primaryLight : theme.colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xl,
    position: 'relative',
  },
  glowAura: {
    position: 'absolute',
    top: 20,
    left: '20%',
    right: '20%',
    height: 140,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderRadius: 100,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(60px)' } as any) : {}),
  },
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(39, 39, 42, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    marginBottom: theme.spacing.lg,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.8,
    marginBottom: theme.spacing.md,
  },
  nameHighlight: {
    color: theme.colors.primaryLight,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.textSecondary,
    maxWidth: 680,
    marginBottom: theme.spacing.xl,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
  },
  primaryButtonHovered: {
    backgroundColor: theme.colors.primaryHover,
    transform: [{ translateY: -1 }],
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.backgroundElevated,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  spotlightBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(30, 30, 36, 0.9)',
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radii.md,
    marginTop: theme.spacing.xs,
  },
  spotlightBannerHovered: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.backgroundElevated,
  },
  spotlightIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotlightLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primaryLight,
  },
  spotlightTitle: {
    fontSize: 13,
    color: theme.colors.text,
    fontWeight: '500',
    flex: 1,
  },
});