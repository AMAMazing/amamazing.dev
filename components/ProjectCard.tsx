import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Image, Platform } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { theme } from '../lib/theme';
import { ProjectItem } from '../lib/data';

interface ProjectCardProps extends ProjectItem {
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  emoji,
  url,
  description,
  badges,
  isSmall,
  iconUrl,
  category,
  compact,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    if (url) {
      if (Platform.OS === 'web') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        Linking.openURL(url);
      }
    }
  };

  if (isSmall || compact) {
    return (
      <Pressable
        onPress={handlePress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={[
          styles.smallCard,
          isHovered && styles.smallCardHovered,
        ]}
      >
        <View style={styles.smallContent}>
          <View style={styles.smallHeader}>
            {iconUrl ? (
              <Image source={{ uri: iconUrl }} style={styles.smallIcon} resizeMode="contain" />
            ) : emoji ? (
              <Text style={styles.smallEmoji}>{emoji}</Text>
            ) : null}
            <Text style={[styles.smallTitle, isHovered && styles.titleHovered]}>{title}</Text>
          </View>
          <Text style={styles.smallDescription} numberOfLines={2}>{description}</Text>
        </View>
        <ExternalLink size={16} color={isHovered ? theme.colors.primaryLight : theme.colors.textMuted} />
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.card,
        isHovered && styles.cardHovered,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleInfo}>
          {iconUrl ? (
            <Image source={{ uri: iconUrl }} style={styles.cardIcon} resizeMode="contain" />
          ) : emoji ? (
            <Text style={styles.cardEmoji}>{emoji}</Text>
          ) : null}
          <View>
            <Text style={[styles.title, isHovered && styles.titleHovered]}>{title}</Text>
            {category ? <Text style={styles.category}>{category}</Text> : null}
          </View>
        </View>
        <View style={[styles.linkButton, isHovered && styles.linkButtonHovered]}>
          <ExternalLink size={16} color={isHovered ? '#ffffff' : theme.colors.textSecondary} />
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      {badges && badges.length > 0 ? (
        <View style={styles.badgesContainer}>
          {badges.map((badge, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                if (Platform.OS === 'web') {
                  window.open(badge.url, '_blank', 'noopener,noreferrer');
                } else {
                  Linking.openURL(badge.url);
                }
              }}
              style={styles.badgeWrapper}
            >
              <Image
                source={{ uri: badge.src }}
                style={styles.badgeImage}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    justifyContent: 'space-between',
    minHeight: 160,
  },
  cardHovered: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.cardHover,
    transform: [{ translateY: -2 }],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  titleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundElevated,
  },
  cardEmoji: {
    fontSize: 26,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  titleHovered: {
    color: theme.colors.primaryLight,
  },
  category: {
    fontSize: 12,
    color: theme.colors.primaryLight,
    marginTop: 2,
    fontWeight: '500',
  },
  linkButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButtonHovered: {
    backgroundColor: theme.colors.primary,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginTop: 6,
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  badgeWrapper: {
    height: 20,
  },
  badgeImage: {
    height: 20,
    width: 90,
  },
  smallCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  smallCardHovered: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.cardHover,
    transform: [{ translateY: -1 }],
  },
  smallContent: {
    flex: 1,
    marginRight: 12,
  },
  smallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  smallIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  smallEmoji: {
    fontSize: 16,
  },
  smallTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  smallDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
});