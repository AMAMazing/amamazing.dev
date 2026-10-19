import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import {
  Calendar,
  Sparkles,
  MousePointerClick,
  ArrowUpRight,
} from 'lucide-react-native';
import { ProjectItem } from '../lib/data';
import { HoverOrigin } from './EqualizingGridMatrix';

interface ProjectHoverTakeoverProps {
  project: ProjectItem | null;
  hoverOrigin: HoverOrigin;
  isOss: boolean;
}

export function ProjectHoverTakeover({
  project,
  hoverOrigin,
  isOss,
}: ProjectHoverTakeoverProps) {
  if (!project) return null;

  const isBlueHovered = Boolean(project.isAAdsMaximizing);
  const cleanUrl = project.url
    ? project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : '';

  return (
    <View
      pointerEvents="none"
      style={[
        styles.fullScreenTakeover,
        isOss
          ? styles.takeoverBgOss
          : isBlueHovered
          ? styles.takeoverBgBlue
          : styles.takeoverBgFeatured,
        Platform.OS === 'web'
          ? ({
              transformOrigin: `${hoverOrigin.x}px ${hoverOrigin.y}px`,
              animation: 'expandOverlayGPU 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              willChange: 'transform, opacity',
            } as any)
          : {},
      ]}
    >
      {/* Giant Background Watermark Icon / Emoji */}
      <View style={styles.watermarkContainer}>
        {project.iconUrl ? (
          <Image
            source={{ uri: project.iconUrl }}
            style={styles.watermarkImage}
            resizeMode="contain"
          />
        ) : project.emoji ? (
          <Text style={styles.watermarkEmoji}>{project.emoji}</Text>
        ) : null}
      </View>

      {/* Framed Spotlight Stage */}
      <View
        key={project.title}
        style={[
          styles.takeoverStageCard,
          isOss
            ? styles.takeoverStageCardOss
            : isBlueHovered
            ? styles.takeoverStageCardBlue
            : styles.takeoverStageCardFeatured,
          Platform.OS === 'web'
            ? ({
                animation: 'swapContentGPU 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                willChange: 'transform, opacity',
              } as any)
            : {},
        ]}
      >
        {/* Top Meta Pills */}
        <View style={styles.takeoverBadgeRow}>
          {project.category && (
            <View
              style={[
                styles.takeoverCategoryPill,
                isOss && styles.takeoverCategoryPillOss,
                isBlueHovered && styles.takeoverCategoryPillBlue,
              ]}
            >
              <Text
                style={[
                  styles.takeoverCategoryText,
                  isOss && styles.takeoverCategoryTextOss,
                  isBlueHovered && styles.takeoverCategoryTextBlue,
                ]}
              >
                {project.category}
              </Text>
            </View>
          )}
          {project.released && (
            <View style={styles.takeoverDatePill}>
              <Calendar size={13} color="#cbd5e1" />
              <Text style={styles.takeoverDateText}>{project.released}</Text>
            </View>
          )}
        </View>

        {/* Hero Icon + Title */}
        <View style={styles.takeoverHeaderRow}>
          <View
            style={[
              styles.takeoverIconBox,
              isOss && styles.takeoverIconBoxOss,
              isBlueHovered && styles.takeoverIconBoxBlue,
            ]}
          >
            {project.iconUrl ? (
              <Image
                source={{ uri: project.iconUrl }}
                style={styles.takeoverIcon}
                resizeMode="contain"
              />
            ) : project.emoji ? (
              <Text style={styles.takeoverEmoji}>{project.emoji}</Text>
            ) : (
              <Sparkles size={44} color="#ffffff" />
            )}
          </View>

          <Text style={styles.takeoverTitle}>{project.title}</Text>
        </View>

        {/* Full Project Description */}
        <Text style={styles.takeoverDescription}>{project.description}</Text>

        {/* Ambient Non-Button Click Status Bar */}
        <View style={styles.ambientPromptDivider} />

        <View style={styles.ambientInstructionRow}>
          <View style={styles.pulseIndicatorWrapper}>
            <View
              style={[
                styles.pulseDot,
                isOss
                  ? styles.pulseDotOss
                  : isBlueHovered
                  ? styles.pulseDotBlue
                  : styles.pulseDotFeatured,
                Platform.OS === 'web'
                  ? ({ animation: 'pulseRing 1.8s infinite ease-in-out' } as any)
                  : {},
              ]}
            />
            <MousePointerClick
              size={18}
              color={isOss ? '#6ee7b7' : isBlueHovered ? '#93c5fd' : '#a5b4fc'}
            />
          </View>

          <Text style={styles.ambientInstructionText}>
            Click anywhere right now to open project
          </Text>

          {cleanUrl ? (
            <View style={styles.ambientUrlReadout}>
              <Text
                style={[
                  styles.ambientUrlText,
                  isOss && styles.ambientUrlTextOss,
                  isBlueHovered && styles.ambientUrlTextBlue,
                ]}
                numberOfLines={1}
              >
                {cleanUrl}
              </Text>
              <ArrowUpRight
                size={15}
                color={isOss ? '#34d399' : isBlueHovered ? '#60a5fa' : '#818cf8'}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenTakeover: {
    ...(Platform.OS === 'web'
      ? ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        } as any)
      : {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    overflow: 'hidden',
  },
  takeoverBgFeatured: {
    backgroundColor: 'rgba(8, 9, 16, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(99, 102, 241, 0.20) 0%, rgba(8, 9, 16, 0.97) 72%)',
        } as any)
      : {}),
  },
  takeoverBgOss: {
    backgroundColor: 'rgba(6, 14, 13, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(16, 185, 129, 0.18) 0%, rgba(6, 14, 13, 0.97) 72%)',
        } as any)
      : {}),
  },
  takeoverBgBlue: {
    backgroundColor: 'rgba(7, 12, 20, 0.95)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(59, 130, 246, 0.20) 0%, rgba(7, 12, 20, 0.97) 72%)',
        } as any)
      : {}),
  },
  watermarkContainer: {
    position: 'absolute',
    right: '-4%',
    bottom: '-8%',
    opacity: 0.045,
    transform: [{ rotate: '-12deg' }],
  },
  watermarkImage: {
    width: 520,
    height: 520,
  },
  watermarkEmoji: {
    fontSize: 420,
  },
  takeoverStageCard: {
    maxWidth: 940,
    width: '100%',
    padding: 40,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'flex-start',
    gap: 22,
  },
  takeoverStageCardFeatured: {
    backgroundColor: 'rgba(18, 19, 32, 0.78)',
    borderColor: 'rgba(129, 140, 248, 0.28)',
  },
  takeoverStageCardOss: {
    backgroundColor: 'rgba(12, 24, 22, 0.78)',
    borderColor: 'rgba(52, 211, 153, 0.28)',
  },
  takeoverStageCardBlue: {
    backgroundColor: 'rgba(14, 22, 36, 0.78)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  takeoverBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  takeoverCategoryPill: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.45)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  takeoverCategoryPillOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderColor: 'rgba(52, 211, 153, 0.45)',
  },
  takeoverCategoryPillBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderColor: 'rgba(96, 165, 250, 0.45)',
  },
  takeoverCategoryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#a5b4fc',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  takeoverCategoryTextOss: {
    color: '#6ee7b7',
  },
  takeoverCategoryTextBlue: {
    color: '#93c5fd',
  },
  takeoverDatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  takeoverDateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  takeoverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    flexWrap: 'wrap',
  },
  takeoverIconBox: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(129, 140, 248, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeoverIconBoxOss: {
    backgroundColor: 'rgba(16, 185, 129, 0.16)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  takeoverIconBoxBlue: {
    backgroundColor: 'rgba(59, 130, 246, 0.16)',
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  takeoverIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  takeoverEmoji: {
    fontSize: 44,
  },
  takeoverTitle: {
    fontSize: 50,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    flexShrink: 1,
  },
  takeoverDescription: {
    fontSize: 21,
    lineHeight: 33,
    color: '#e2e8f0',
    fontWeight: '400',
    maxWidth: 840,
  },
  ambientPromptDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 6,
  },
  ambientInstructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  pulseIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pulseDotFeatured: {
    backgroundColor: '#818cf8',
  },
  pulseDotOss: {
    backgroundColor: '#34d399',
  },
  pulseDotBlue: {
    backgroundColor: '#60a5fa',
  },
  ambientInstructionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0.2,
  },
  ambientUrlReadout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.14)',
  },
  ambientUrlText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#a5b4fc',
  },
  ambientUrlTextOss: {
    color: '#6ee7b7',
  },
  ambientUrlTextBlue: {
    color: '#93c5fd',
  },
});