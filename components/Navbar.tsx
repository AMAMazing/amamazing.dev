import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Code2, Compass } from 'lucide-react-native';
import { theme } from '../lib/theme';
import { navigationItems } from '../lib/data';

interface NavbarProps {
  onOpenRaw?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRaw, onNavigateSection }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavPress = (item: { name: string; href: string; id: string }) => {
    if (item.href === '/blog') {
      router.push('/blog');
    } else if (item.href.startsWith('#')) {
      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          if (onNavigateSection) {
            onNavigateSection(item.id);
          }
        }, 100);
      } else if (onNavigateSection) {
        onNavigateSection(item.id);
      }
    }
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.container}>
        {/* Brand Logo */}
        <Pressable
          onPress={() => router.push('/')}
          style={styles.logoContainer}
        >
          <Text style={styles.logoPrefix}>AMA</Text>
          <Text style={styles.logoAccent}>Mazing</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>EXPO</Text>
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
            const isBlog = item.name === 'Blog' && pathname.startsWith('/blog');
            return (
              <Pressable
                key={item.name}
                onPress={() => handleNavPress(item)}
                onHoverIn={() => setHoveredItem(item.name)}
                onHoverOut={() => setHoveredItem(null)}
                style={[
                  styles.navLink,
                  (isHovered || isBlog) && styles.navLinkActive,
                ]}
              >
                <Text
                  style={[
                    styles.navLinkText,
                    (isHovered || isBlog) && styles.navLinkTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}

          {onOpenRaw ? (
            <Pressable
              onPress={onOpenRaw}
              onHoverIn={() => setHoveredItem('raw')}
              onHoverOut={() => setHoveredItem(null)}
              style={[
                styles.rawButton,
                hoveredItem === 'raw' && styles.rawButtonHovered,
              ]}
            >
              <Code2 size={14} color={hoveredItem === 'raw' ? '#ffffff' : theme.colors.textMuted} />
              <Text
                style={[
                  styles.rawButtonText,
                  hoveredItem === 'raw' && styles.rawButtonTextHovered,
                ]}
              >
                Raw
              </Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    backgroundColor: 'rgba(18, 18, 18, 0.92)',
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
    letterSpacing: -0.5,
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
  navLinkActive: {
    backgroundColor: theme.colors.backgroundElevated,
  },
  navLinkText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  navLinkTextActive: {
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
  rawButtonHovered: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  rawButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  rawButtonTextHovered: {
    color: '#ffffff',
  },
});