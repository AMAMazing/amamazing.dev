import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Linking, Image } from 'react-native';
import { ExternalLink, Sparkles, GitFork } from 'lucide-react-native';
import { ProjectItem } from '../lib/data';
import { theme } from '../lib/theme';

interface EqualizingGridMatrixProps {
  items: ProjectItem[];
  minHeight?: number;
  variant?: 'featured' | 'opensource';
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
      iconSize: 44,
      boxSize: 76,
      titleSize: 20,
      categorySize: 12,
      padding: 22,
    };
  }
  if (count <= 4) {
    return {
      iconSize: 32,
      boxSize: 60,
      titleSize: 15,
      categorySize: 11,
      padding: 16,
    };
  }
  if (cols >= 7) {
    return {
      iconSize: 20,
      boxSize: 38,
      titleSize: 11,
      categorySize: 9,
      padding: 8,
    };
  }
  if (count <= 9) {
    return {
      iconSize: 28,
      boxSize: 52,
      titleSize: 14,
      categorySize: 10,
      padding: 14,
    };
  }
  return {
    iconSize: 22,
    boxSize: 42,
    titleSize: 12,
    categorySize: 9,
    padding: 10,
  };
};

export const EqualizingGridMatrix: React.FC<EqualizingGridMatrixProps> = ({
  items,
  minHeight = 420,
  variant = 'featured',
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const count = items.length;
  if (count === 0) return null;

  const isOss = variant === 'opensource';
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
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` ,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` ,
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
      <View
        style={[
          styles.gridContainer,
          isOss && styles.gridContainerOss,
          gridStyle,
        ]}
      >
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
                isOss && styles.matrixCellOss,
                { padding: size.padding },
                isHovered && styles.matrixCellHovered,
                isHovered && isOss && styles.matrixCellOssHovered,
                isBlue && styles.matrixCellBlue,
                isHovered && isBlue && styles.matrixCellBlueHovered,
              ]}
            >
              {/* Tile Icon Box */}
              <View
                style={[
                  styles.iconBox,
                  isOss && styles.iconBoxOss,
                  isBlue && styles.iconBoxBlue,
                  {
                    width: size.boxSize,
                    height: size.boxSize,
                    borderRadius: Math.round(size.boxSize * 0.3),
                  },
                  isHovered && styles.iconBoxHovered,
                  isHovered && isOss && styles.iconBoxOssHovered,
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
                ) : isOss ? (
                  <GitFork size={size.iconSize} color="#34d399" />
                ) : (
                  <Sparkles size={size.iconSize} color={isBlue ? '#60a5fa' : theme.colors.primaryLight} />
                )}
              </View>

              {/* Title & Category Tag */}
              <View style={styles.cellContent}>
                <Text
                  style={[
                    styles.cellTitle,
                    { fontSize: size.titleSize },
                    isHovered && (isOss ? styles.cellTitleHoveredOss : isBlue ? styles.cellTitleHoveredBlue : styles.cellTitleHovered),
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                {item.category && (
                  <View
                    style={[
                      styles.categoryTag,
                      isOss && styles.categoryTagOss,
                      isBlue && styles.categoryTagBlue,
                      isHovered && styles.categoryTagHovered,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryTagText,
                        { fontSize: size.categorySize },
                        isOss && styles.categoryTagTextOss,
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
                  size={12}
                  color={
                    isHovered
                      ? isOss
                        ? '#6ee7b7'
                        : isBlue
                        ? '#93c5fd'
                        : theme.colors.primaryLight
                      : 'rgba(255, 255, 255, 0.18)'
                  }
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
    backgroundColor: 'rgba(18, 18, 22, 0.75)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
  },
  gridContainerOss: {
    backgroundColor: 'rgba(15, 17, 21, 0.7)',
    borderColor: 'rgba(52, 211, 153, 0.12)',
  },
  matrixCell: {
    backgroundColor: 'rgba(26, 26, 32, 0.85)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        } as any)
      : {}),
  },
  matrixCellOss: {
    backgroundColor: 'rgba(20, 24, 28, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  matrixCellHovered: {
    borderColor: 'rgba(99, 102, 241, 0.65)',
    backgroundColor: 'rgba(32, 32, 44, 0.95)',
    transform: [{ translateY: -2 }],
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  matrixCellOssHovered: {
    borderColor: 'rgba(52, 211, 153, 0.6)',
    backgroundColor: 'rgba(22, 30, 32, 0.95)',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  matrixCellBlue: {
    borderColor: 'rgba(59, 130, 246, 0.22)',
  },
  matrixCellBlueHovered: {
    borderColor: 'rgba(59, 130, 246, 0.75)',
    backgroundColor: 'rgba(24, 32, 48, 0.95)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  iconBox: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.2s ease',
        } as any)
      : {}),
  },
  iconBoxOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(52, 211, 153, 0.22)',
  },
  iconBoxBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  iconBoxHovered: {
    transform: [{ scale: 1.06 }],
  },
  iconBoxOssHovered: {
    transform: [{ scale: 1.06 }],
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
    marginBottom: 5,
    letterSpacing: -0.2,
  },
  cellTitleHovered: {
    color: '#a5b4fc',
  },
  cellTitleHoveredBlue: {
    color: '#93c5fd',
  },
  cellTitleHoveredOss: {
    color: '#6ee7b7',
  },
  categoryTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: theme.radii.full,
  },
  categoryTagOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  categoryTagBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  categoryTagHovered: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryTagText: {
    color: theme.colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryTagTextOss: {
    color: '#6ee7b7',
  },
  categoryTagTextBlue: {
    color: '#93c5fd',
  },
  cornerAction: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 3,
    borderRadius: 5,
  },
  cornerActionHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});