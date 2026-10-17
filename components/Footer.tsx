import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking } from 'react-native';
import { Github, Globe, Heart } from 'lucide-react-native';
import { theme } from '../lib/theme';

export const Footer: React.FC = () => {
  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.quoteRow}>
          <Text style={styles.quoteEmoji}>✨</Text>
          <Text style={styles.quoteText}>Building tools that matter.</Text>
        </View>

        <Text style={styles.subtext}>
          Crafted with Expo, React Native, and TypeScript. Styled in modern dark grey.
        </Text>

        <View style={styles.linksRow}>
          <Pressable
            onPress={() => openUrl('https://github.com/AMAMazing')}
            style={styles.iconLink}
          >
            <Github size={18} color={theme.colors.textSecondary} />
          </Pressable>

          <Pressable
            onPress={() => openUrl('https://amamazing.dev')}
            style={styles.iconLink}
          >
            <Globe size={18} color={theme.colors.textSecondary} />
          </Pressable>

          <Pressable
            onPress={() => openUrl('https://www.buymeaboba.com/')}
            style={styles.iconLink}
          >
            <Heart size={18} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        <Text style={styles.copyright}>
          © {new Date().getFullYear()} AMAMazing. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0d0d0f',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.xxl,
    marginTop: theme.spacing.xxl,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  quoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quoteEmoji: {
    fontSize: 20,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtext: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  iconLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  copyright: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});