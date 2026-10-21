import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking, Image } from 'react-native';
import { Flame, ExternalLink } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { theme } from '../lib/theme';

interface GithubStatsSectionProps {
  onLayout?: (e: any) => void;
}

export const GithubStatsSection: React.FC<GithubStatsSectionProps> = ({ onLayout }) => {
  const username = 'AMAMazing';
  const githubProfileUrl = `https://github.com/${username}`;

  const streakCardUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=14181c&ring=818cf8&fire=818cf8&currStreakLabel=a5b4fc`;

  const openGithub = () => {
    if (Platform.OS === 'web') {
      window.open(githubProfileUrl, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(githubProfileUrl);
    }
  };

  return (
    <View onLayout={onLayout} style={styles.sectionContainer} id="github-stats">
      {/* Badge Header Row */}
      <View style={styles.badgeRow}>
        <View style={styles.streakPill}>
          <Flame size={13} color="#f97316" />
          <Text style={styles.streakPillText}>LIVE CONTRIBUTION STREAK</Text>
        </View>
        <View style={styles.badgeLine} />
        <Pressable onPress={openGithub} style={styles.profileLink}>
          <Text style={styles.profileLinkText}>@{username}</Text>
          <ExternalLink size={12} color="#a5b4fc" />
        </Pressable>
      </View>

      <SectionHeader
        emoji="🔥"
        title="GitHub Contribution Streak"
        subtitle="Tracking daily open-source contributions and developer momentum"
      />

      <View style={styles.centerWrapper}>
        <Pressable
          onPress={openGithub}
          style={({ hovered }: any) => [
            styles.statCardWrapper,
            hovered && styles.statCardWrapperHovered,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderTitleRow}>
              <Flame size={18} color="#fb923c" />
              <Text style={styles.cardTitle}>Current Streak</Text>
            </View>
            <ExternalLink size={16} color="rgba(255, 255, 255, 0.3)" />
          </View>
          <View style={styles.imageContainer}>
            {Platform.OS === 'web' ? (
              <img
                src={streakCardUrl}
                alt="AMAMazing GitHub Streak Stats"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxWidth: 540,
                }}
              />
            ) : (
              <Image
                source={{ uri: streakCardUrl }}
                style={styles.nativeCardImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 44,
    width: '100%',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  streakPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fdba74',
    letterSpacing: 1,
  },
  badgeLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  profileLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  profileLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a5b4fc',
    letterSpacing: 0.5,
  },
  centerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  statCardWrapper: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: 'rgba(20, 24, 28, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 24,
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'transform 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
          cursor: 'pointer',
        } as any)
      : {}),
  },
  statCardWrapperHovered: {
    borderColor: 'rgba(129, 140, 248, 0.5)',
    backgroundColor: 'rgba(24, 28, 36, 0.95)',
    transform: [{ translateY: -4 }],
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 16px 40px -12px rgba(99, 102, 241, 0.25)',
        } as any)
      : {}),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#cbd5e1',
    letterSpacing: 0.3,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14181c',
    borderRadius: 12,
    paddingVertical: 12,
  },
  nativeCardImage: {
    width: '100%',
    maxWidth: 540,
    aspectRatio: 467 / 195,
  },
});