import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../lib/theme';
import { navigationItems } from '../lib/data';

interface NavbarProps {
  onOpenRaw?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRaw, onNavigateSection }) => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavPress = (item: { name: string; href: string; id: string }) => {
    if (item.href.startsWith('#')) {
      if (onNavigateSection) {
        onNavigateSection(item.id);
      }
    }
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.container}>
        {/* Brand Logo */}
        <Pressable
          onPress={() => {
            if (onNavigateSection) {
              onNavigateSection('top');
            }
          }}
          style={styles.logoContainer}
        >
          <Text style={styles.logoPrefix}>AMA</Text>
          <Text style={styles.logoAccent}>Mazing</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DEV</Text>
          </View>
        </Pressable>

        {/* Navigation Items */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navItemsList}
          style={styles.navScroll}
        >
          {navigationItems.map((item) => {
            const isHovered = hoveredItem === item.name;
            return (
              <Pressable
                key={item.name}
                onPress={() => handleNavPress(item)}
                onHoverIn={() => setHoveredItem(item.name)}
                onHoverOut={() => setHoveredItem(null)}
                style={[
                  styles.navLink,
                  isHovered && styles.navLinkHovered,
                ]}
              >
                <Text
                  style={[
                    styles.navLinkText,
                    isHovered && styles.navLinkTextHovered,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}

          {/* Raw Markdown view button */}
          {onOpenRaw ? (
            <Pressable
              onPress={onOpenRaw}
              style={styles.rawButton}
            >
              <Text style={styles.rawButtonText}>Raw .md</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    backgroundColor: 'rgba(10, 10, 12, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    zIndex: 50,
    ...(Platform.OS === 'web'
      ? ({
          position: 'sticky',
          top: 0,
          backdropFilter: 'blur(12px)',
        } as any)
      : {}),
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  logoPrefix: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  logoAccent: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primaryLight,
  },
  badge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  badgeText: {
    color: theme.colors.primaryLight,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  navScroll: {
    flexGrow: 0,
  },
  navItemsList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radii.sm,
  },
  navLinkHovered: {
    backgroundColor: theme.colors.backgroundElevated,
  },
  navLinkText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  navLinkTextHovered: {
    color: '#ffffff',
  },
  rawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginLeft: 6,
  },
  rawButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
});