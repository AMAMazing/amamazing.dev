import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  GitFork,
  Globe,
  Cpu,
  Terminal,
  Package,
  Puzzle,
  Code2,
} from 'lucide-react-native';
import { ProjectSection, OssIconType, totalOssCount } from '../lib/data';
import { theme } from '../lib/theme';

interface OssShowcaseBannerProps {
  sections: ProjectSection[];
  onLayout?: (e: any) => void;
}

const renderChipIcon = (icon: OssIconType) => {
  const props = { size: 12, color: '#6ee7b7' };
  switch (icon) {
    case 'globe':
      return <Globe {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
    case 'terminal':
      return <Terminal {...props} />;
    case 'package':
      return <Package {...props} />;
    case 'puzzle':
      return <Puzzle {...props} />;
    case 'code':
      return <Code2 {...props} />;
  }
};

export function OssShowcaseBanner({ sections, onLayout }: OssShowcaseBannerProps) {
  return (
    <View onLayout={onLayout} style={styles.ossShowcaseBanner}>
      <View style={styles.ossBannerTopRow}>
        <View style={styles.ossPillBadge}>
          <GitFork size={13} color="#34d399" />
          <Text style={styles.ossPillText}>OPEN SOURCE & COMMUNITY WORK</Text>
        </View>

        <View style={styles.ossCountBadge}>
          <Text style={styles.ossCountBadgeText}>{totalOssCount} PUBLIC RELEASES</Text>
        </View>
      </View>

      <Text style={styles.ossBannerTitle}>
        Developer Utilities, Packages & Extensions
      </Text>
      <Text style={styles.ossBannerDescription}>
        Open-source tools, CLI scaffolds, and automation packages built by AMAMazing for the
        developer community. Hover any tile to inspect or click directly to launch.
      </Text>

      <View style={styles.ossCategoryCluster}>
        {sections.map((section) => (
          <View key={section.id} style={styles.ossMiniChip}>
            {renderChipIcon(section.icon)}
            <Text style={styles.ossMiniChipText}>
              {section.items.length} {section.shortTitle}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ossShowcaseBanner: {
    marginTop: 28,
    marginBottom: 40,
    padding: 28,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 21, 20, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.22)',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)',
        } as any)
      : {}),
  },
  ossBannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  ossPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ossPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 0.9,
  },
  ossCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  ossCountBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.6,
  },
  ossBannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  ossBannerDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: theme.colors.textSecondary,
    maxWidth: 780,
    marginBottom: 20,
  },
  ossCategoryCluster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ossMiniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  ossMiniChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a7f3d0',
  },
});