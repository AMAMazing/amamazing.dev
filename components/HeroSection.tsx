import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking } from 'react-native';
import { Heart, ArrowRight, Github, Sparkles } from 'lucide-react-native';
import { theme } from '../lib/theme';

interface HeroSectionProps {
  onExploreProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects }) => {
  const [bobaHovered, setBobaHovered] = useState(false);
  const [exploreHovered, setExploreHovered] = useState(false);

  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.glowAura} />

      <View style={styles.heroCard}>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Open for Collaborations & Building Cool Tools</Text>
        </View>

        <Text style={styles.greeting}>
          Hi there, I'm <Text style={styles.nameHighlight}>AMAMazing</Text> ✨
        </Text>

        <Text style={styles.description}>
          Master developer umbrella & daily operating system. Crafting modern digital tools, SaaS & WaaS ecosystems, and open source projects.
        </Text>

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

          {onExploreProjects ? (
            <Pressable
              onPress={onExploreProjects}
              onHoverIn={() => setExploreHovered(true)}
              onHoverOut={() => setExploreHovered(false)}
              style={[styles.outlineButton, exploreHovered && styles.outlineButtonHovered]}
            >
              <Sparkles size={16} color={exploreHovered ? '#ffffff' : theme.colors.primaryLight} />
              <Text style={[styles.outlineButtonText, exploreHovered && styles.outlineButtonTextHovered]}>
                Explore Featured Projects
              </Text>
              <ArrowRight size={14} color={exploreHovered ? '#ffffff' : theme.colors.primaryLight} />
            </Pressable>
          ) : null}
        </View>
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
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
  },
  outlineButtonHovered: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  outlineButtonText: {
    color: theme.colors.primaryLight,
    fontSize: 14,
    fontWeight: '600',
  },
  outlineButtonTextHovered: {
    color: '#ffffff',
  },
});