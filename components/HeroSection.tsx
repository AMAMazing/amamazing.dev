import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Heart, ArrowDownRight, Github } from 'lucide-react-native';
import { theme } from '../lib/theme';

interface HeroSectionProps {
  onExploreProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreProjects }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;

  const [exploreHovered, setExploreHovered] = useState(false);
  const [bobaHovered, setBobaHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);

  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {/* Subtle Ambient Top Spotlight */}
      <View pointerEvents="none" style={styles.ambientSpotlight} />

      {/* Minimal Availability Indicator */}
      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>
          Available for collaborations & building cool tools
        </Text>
      </View>

      {/* Editorial Display Headline */}
      <Text style={[styles.headline, isMobile && styles.headlineMobile]}>
        Hi, I'm <Text style={styles.nameAccent}>AMAMazing</Text>.
      </Text>

      {/* Clean, Restrained Subtitle */}
      <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>
        Master developer umbrella & daily operating system. Crafting modern
        digital tools,{' '}
        <Text style={styles.subtitleHighlight}>SaaS & WaaS ecosystems</Text>,
        and open-source software.
      </Text>

      {/* Refined Minimal Action Row */}
      <View style={styles.actionsRow}>
        {onExploreProjects ? (
          <Pressable
            onPress={onExploreProjects}
            onHoverIn={() => setExploreHovered(true)}
            onHoverOut={() => setExploreHovered(false)}
            style={[
              styles.primaryBtn,
              exploreHovered && styles.primaryBtnHovered,
            ]}
          >
            <Text style={styles.primaryBtnText}>Explore Work</Text>
            <ArrowDownRight size={15} color="#09090b" />
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => openUrl('https://github.com/AMAMazing')}
          onHoverIn={() => setGithubHovered(true)}
          onHoverOut={() => setGithubHovered(false)}
          style={[
            styles.secondaryBtn,
            githubHovered && styles.secondaryBtnHovered,
          ]}
        >
          <Github size={15} color="#e2e8f0" />
          <Text style={styles.secondaryBtnText}>GitHub</Text>
        </Pressable>

        <Pressable
          onPress={() => openUrl('https://www.buymeaboba.com/')}
          onHoverIn={() => setBobaHovered(true)}
          onHoverOut={() => setBobaHovered(false)}
          style={[styles.ghostBtn, bobaHovered && styles.ghostBtnHovered]}
        >
          <Heart
            size={14}
            color={bobaHovered ? '#f472b6' : '#94a3b8'}
          />
          <Text
            style={[
              styles.ghostBtnText,
              bobaHovered && styles.ghostBtnTextHovered,
            ]}
          >
            Buy Me a Boba
          </Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingBottom: 40,
    position: 'relative',
    alignItems: 'flex-start',
  },
  containerMobile: {
    paddingTop: 32,
    paddingBottom: 28,
  },
  ambientSpotlight: {
    position: 'absolute',
    top: -20,
    left: -40,
    width: 420,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.07)',
    ...(Platform.OS === 'web'
      ? ({
          filter: 'blur(70px)',
        } as any)
      : {}),
  },

  /* Status Pill */
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    marginBottom: 24,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    letterSpacing: 0.1,
  },

  /* Typography */
  headline: {
    fontSize: 56,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -2,
    lineHeight: 62,
    marginBottom: 18,
  },
  headlineMobile: {
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -1.4,
  },
  nameAccent: {
    color: '#a5b4fc',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 29,
    color: '#94a3b8',
    maxWidth: 620,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginBottom: 32,
  },
  subtitleMobile: {
    fontSize: 16,
    lineHeight: 25,
  },
  subtitleHighlight: {
    color: '#e2e8f0',
    fontWeight: '500',
  },

  /* Minimal Actions */
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.15s ease',
        } as any)
      : {}),
  },
  primaryBtnHovered: {
    backgroundColor: '#e0e7ff',
    transform: [{ translateY: -1 }],
  },
  primaryBtnText: {
    color: '#09090b',
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.15s ease',
        } as any)
      : {}),
  },
  secondaryBtnHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    transform: [{ translateY: -1 }],
  },
  secondaryBtnText: {
    color: '#f8fafc',
    fontSize: 13.5,
    fontWeight: '600',
  },
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 999,
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.15s ease',
        } as any)
      : {}),
  },
  ghostBtnHovered: {
    backgroundColor: 'rgba(244, 114, 182, 0.08)',
  },
  ghostBtnText: {
    color: '#94a3b8',
    fontSize: 13.5,
    fontWeight: '500',
  },
  ghostBtnTextHovered: {
    color: '#f472b6',
  },

  /* Hairline Bottom Divider */
  bottomDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 48,
  },
});