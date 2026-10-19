import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking, Image } from 'react-native';
import { Flame, GitCommit, ExternalLink } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { theme } from '../lib/theme';

interface GithubStatsSectionProps {
  onLayout?: (e: any) => void;
}

export const GithubStatsSection: React.FC<GithubStatsSectionProps> = ({ onLayout }) => {
  const username = 'AMAMazing';
  const githubProfileUrl = `https://github.com/${username}`;

  const streakCardUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=14181c&ring=818cf8&fire=818cf8&currStreakLabel=a5b4fc`;
  const statsCardUrl = `https://github-readme-stats.vercel.app/api?username=AMAMazing&show_icons=true&theme=dark&hide_border=true&bg_color=14181c&title_color=818cf8&text_color=cbd5e1&icon_color=34d399&hide=issues,contribs&include_all_commits=true&count_private=true`;

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
        title="GitHub Stats & Activity"
        subtitle="Tracking daily commit streaks, open-source repositories, and developer milestones"
      />

      <View style={styles.cardsGrid}>
        {/* Streak Stats Card */}
        <Pressable
          onPress={openGithub}
          style={({ hovered }: any) => [
            styles.statCardWrapper,
            hovered && styles.statCardWrapperHovered,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderTitleRow}>
              <Flame size={16} color="#fb923c" />
              <Text style={styles.cardTitle}>Contribution Streak</Text>
            </View>
            <ExternalLink size={14} color="rgba(255, 255, 255, 0.3)" />
          </View>
          <View style={styles.imageContainer}>
            {Platform.OS === 'web' ? (
              <img
                src={streakCardUrl}
                alt="AMAMazing GitHub Streak Stats"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  display: 'block',
                  maxWidth: 495,
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

        {/* Overall Stats Card */}
        <Pressable
          onPress={openGithub}
          style={({ hovered }: any) => [
            styles.statCardWrapper,
            hovered && styles.statCardWrapperHovered,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderTitleRow}>
              <GitCommit size={16} color="#34d399" />
              <Text style={styles.cardTitle}>Milestones & Overview</Text>
            </View>
            <ExternalLink size={14} color="rgba(255, 255, 255, 0.3)" />
          </View>
          <View style={styles.imageContainer}>
            {Platform.OS === 'web' ? (
              <img
                src={statsCardUrl}
                alt="AMAMazing GitHub Stats"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  display: 'block',
                  maxWidth: 495,
                }}
              />
            ) : (
              <Image
                source={{ uri: statsCardUrl }}
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
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    width: '100%',
    justifyContent: 'center',
  },
  statCardWrapper: {
    flex: 1,
    minWidth: 320,
    maxWidth: 580,
    backgroundColor: 'rgba(20, 24, 28, 0.85)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'transform 0.18s ease-out, border-color 0.18s ease-out, box-shadow 0.18s ease-out',
          cursor: 'pointer',
        } as any)
      : {}),
  },
  statCardWrapperHovered: {
    borderColor: 'rgba(129, 140, 248, 0.5)',
    backgroundColor: 'rgba(24, 28, 36, 0.95)',
    transform: [{ translateY: -3 }],
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 12px 30px -10px rgba(99, 102, 241, 0.25)',
        } as any)
      : {}),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#cbd5e1',
    letterSpacing: 0.3,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativeCardImage: {
    width: 320,
    height: 195,
  },
});