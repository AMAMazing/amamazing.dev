import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking, Image } from 'react-native';
import { ExternalLink, Sparkles } from 'lucide-react-native';
import { ProjectItem } from '../lib/data';
import { theme } from '../lib/theme';

interface EqualizingGridMatrixProps {
  items: ProjectItem[];
  minHeight?: number;
}

export const getGridMap = (count: number) => {
  const exactFactors: { [key: number]: { c: number; r: number } } = {
    1: { c: 1, r: 1 },
    2: { c: 2, r: 1 },
    3: { c: 3, r: 1 },
    4: { c: 2, r: 2 },
    5: { c: 5, r: 1 },
    6: { c: 3, r: 2 },
    7: { c: 7, r: 1 },
    8: { c: 4, r: 2 },
    9: { c: 3, r: 3 },
    10: { c: 5, r: 2 },
    11: { c: 11, r: 1 },
    12: { c: 4, r: 3 },
    13: { c: 13, r: 1 },
    14: { c: 7, r: 2 },
    15: { c: 5, r: 3 },
    16: { c: 4, r: 4 },
    17: { c: 17, r: 1 },
    18: { c: 6, r: 3 },
    19: { c: 19, r: 1 },
    20: { c: 5, r: 4 },
  };

  if (exactFactors[count]) return exactFactors[count];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  return { c: cols, r: rows };
};

export const getSizeConfig = (cols: number, count: number) => {
  if (count === 1) {
    return {
      iconSize: 52,
      boxSize: 88,
      titleSize: 22,
      categorySize: 13,
      padding: 24,
    };
  }
  if (count <= 4) {
    return {
      iconSize: 36,
      boxSize: 68,
      titleSize: 16,
      categorySize: 11,
      padding: 18,
    };
  }
  if (cols >= 7) {
    return {
      iconSize: 22,
      boxSize: 42,
      titleSize: 11,
      categorySize: 9,
      padding: 8,
    };
  }
  if (count <= 9) {
    return {
      iconSize: 30,
      boxSize: 56,
      titleSize: 15,
      categorySize: 10,
      padding: 14,
    };
  }
  return {
    iconSize: 24,
    boxSize: 46,
    titleSize: 13,
    categorySize: 10,
    padding: 10,
  };
};

export const EqualizingGridMatrix: React.FC<EqualizingGridMatrixProps> = ({
  items,
  minHeight = 420,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const count = items.length;
  if (count === 0) return null;

  const { c: cols, r: rows } = getGridMap(count);
  const size = getSizeConfig(cols, count);

  const openUrl = (url: string) => {
    if (!url) return;
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  const gridStyle: any = Platform.OS === 'web'
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gap: 12,
        height: minHeight,
        width: '100%',
      }
    : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      };

  return (
    <View style={styles.matrixWrapper}>
      <View style={[styles.gridContainer, gridStyle]}>
        {items.map((item, idx) => {
          const isHovered = hoveredId === idx;
          const isBlue = item.isAAdsMaximizing;

          return (
            <Pressable
              key={idx}
              onPress={() => openUrl(item.url)}
              onHoverIn={() => setHoveredId(idx)}
              onHoverOut={() => setHoveredId(null)}
              style={[
                styles.matrixCell,
                { padding: size.padding },
                isHovered && styles.matrixCellHovered,
                isBlue && styles.matrixCellBlue,
                isHovered && isBlue && styles.matrixCellBlueHovered,
              ]}
            >
              {/* Sleek Tile Icon Box */}
              <View
                style={[
                  styles.iconBox,
                  isBlue && styles.iconBoxBlue,
                  {
                    width: size.boxSize,
                    height: size.boxSize,
                    borderRadius: Math.round(size.boxSize * 0.32),
                  },
                  isHovered && styles.iconBoxHovered,
                ]}
              >
                {item.iconUrl ? (
                  <Image
                    source={{ uri: item.iconUrl }}
                    style={{
                      width: size.iconSize,
                      height: size.iconSize,
                      borderRadius: Math.round(size.iconSize * 0.22),
                    }}
                    resizeMode="contain"
                  />
                ) : item.emoji ? (
                  <Text style={{ fontSize: size.iconSize }}>{item.emoji}</Text>
                ) : (
                  <Sparkles size={size.iconSize} color={isBlue ? '#60a5fa' : theme.colors.primaryLight} />
                )}
              </View>

              {/* Title & Subtle Pill Tag */}
              <View style={styles.cellContent}>
                <Text
                  style={[
                    styles.cellTitle,
                    { fontSize: size.titleSize },
                    isHovered && (isBlue ? styles.cellTitleHoveredBlue : styles.cellTitleHovered),
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                {item.category && (
                  <View
                    style={[
                      styles.categoryTag,
                      isBlue && styles.categoryTagBlue,
                      isHovered && styles.categoryTagHovered,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryTagText,
                        { fontSize: size.categorySize },
                        isBlue && styles.categoryTagTextBlue,
                      ]}
                      numberOfLines={1}
                    >
                      {item.category}
                    </Text>
                  </View>
                )}
              </View>

              {/* Corner Open Icon */}
              <View
                style={[
                  styles.cornerAction,
                  isHovered && styles.cornerActionHovered,
                ]}
              >
                <ExternalLink
                  size={13}
                  color={isHovered ? (isBlue ? '#93c5fd' : theme.colors.primaryLight) : 'rgba(255, 255, 255, 0.22)'}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matrixWrapper: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  gridContainer: {
    backgroundColor: 'rgba(14, 14, 18, 0.65)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    padding: 12,
  },
  matrixCell: {
    backgroundColor: 'rgba(24, 24, 30, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        } as any)
      : {}),
  },
  matrixCellHovered: {
    borderColor: 'rgba(99, 102, 241, 0.65)',
    backgroundColor: 'rgba(32, 32, 44, 0.95)',
    transform: [{ translateY: -3 }],
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
  },
  matrixCellBlue: {
    borderColor: 'rgba(59, 130, 246, 0.22)',
  },
  matrixCellBlueHovered: {
    borderColor: 'rgba(59, 130, 246, 0.8)',
    backgroundColor: 'rgba(24, 32, 48, 0.95)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
  },
  iconBox: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.22s ease',
        } as any)
      : {}),
  },
  iconBoxBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  iconBoxHovered: {
    transform: [{ scale: 1.08 }, { rotate: '-2deg' }],
  },
  cellContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 6,
  },
  cellTitle: {
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  cellTitleHovered: {
    color: '#a5b4fc',
  },
  cellTitleHoveredBlue: {
    color: '#93c5fd',
  },
  categoryTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radii.full,
  },
  categoryTagBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  categoryTagHovered: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryTagText: {
    color: theme.colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  categoryTagTextBlue: {
    color: '#93c5fd',
  },
  cornerAction: {
    position: 'absolute',
    top: 9,
    right: 9,
    padding: 4,
    borderRadius: 6,
  },
  cornerActionHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});