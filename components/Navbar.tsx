import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import { theme } from '../lib/theme';
import { navigationItems } from '../lib/data';

interface NavbarProps {
  onOpenRaw?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRaw, onNavigateSection }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [rawHovered, setRawHovered] = useState(false);

  const handleNavPress = (item: { name: string; href: string; id: string }) => {
    if (item.href.startsWith('#') && onNavigateSection) {
      onNavigateSection(item.id);
    }
  };

  return (
    <View style={styles.navOuter}>
      <View style={styles.navPillBar}>
        {/* Minimal Brand Wordmark */}
        <Pressable
          onPress={() => onNavigateSection?.('top')}
          style={styles.brandButton}
        >
          <View style={styles.brandStatusDot} />
          <Text style={styles.brandWordmark}>
            AMA<Text style={styles.brandAccent}>Mazing</Text>
          </Text>
        </Pressable>

        {/* Clean Typographic Links */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.linksRow}
          style={styles.linksScroll}
        >
          {navigationItems.map((item) => {
            const isHovered = hoveredItem === item.name;
            return (
              <Pressable
                key={item.name}
                onPress={() => handleNavPress(item)}
                onHoverIn={() => setHoveredItem(item.name)}
                onHoverOut={() => setHoveredItem(null)}
                style={[styles.linkItem, isHovered && styles.linkItemHovered]}
              >
                <Text
                  style={[
                    styles.linkText,
                    isHovered && styles.linkTextHovered,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Minimal Monospace Raw Trigger */}
        {onOpenRaw ? (
          <Pressable
            onPress={onOpenRaw}
            onHoverIn={() => setRawHovered(true)}
            onHoverOut={() => setRawHovered(false)}
            style={[styles.rawBtn, rawHovered && styles.rawBtnHovered]}
          >
            <Text style={[styles.rawBtnText, rawHovered && styles.rawBtnTextHovered]}>
              raw.md
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navOuter: {
    zIndex: 100,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 8,
    ...(Platform.OS === 'web'
      ? ({
          position: 'sticky',
          top: 0,
        } as any)
      : {}),
  },
  navPillBar: {
    maxWidth: 1176,
    width: '100%',
    alignSelf: 'center',
    height: 54,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: 'rgba(12, 12, 16, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    ...(Platform.OS === 'web'
      ? ({
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        } as any)
      : {}),
  },
  brandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 4,
  },
  brandStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#818cf8',
  },
  brandWordmark: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: '#a5b4fc',
    fontWeight: '500',
  },
  linksScroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  linkItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.15s ease',
        } as any)
      : {}),
  },
  linkItemHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94a3b8',
    letterSpacing: -0.1,
  },
  linkTextHovered: {
    color: '#ffffff',
  },
  rawBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 0.15s ease',
        } as any)
      : {}),
  },
  rawBtnHovered: {
    backgroundColor: 'rgba(129, 140, 248, 0.14)',
    borderColor: 'rgba(129, 140, 248, 0.4)',
  },
  rawBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94a3b8',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  rawBtnTextHovered: {
    color: '#c7d2fe',
  },
});