import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Platform,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Rocket, Globe, Share2 } from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getPostBySlug } from '../../lib/posts';
import { theme } from '../../lib/theme';

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const postSlug = typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : '';
  const post = getPostBySlug(postSlug);

  const openUrl = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url);
    }
  };

  if (!post) {
    return (
      <View style={styles.screen}>
        <Navbar />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>Article Not Found</Text>
          <Text style={styles.notFoundText}>The article you requested could not be located.</Text>
          <Pressable
            onPress={() => router.push('/blog')}
            style={styles.backToBlogButton}
          >
            <ArrowLeft size={16} color="#ffffff" />
            <Text style={styles.backToBlogButtonText}>Return to Blog</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Navbar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Back Navigation */}
          <Pressable
            onPress={() => router.push('/blog')}
            style={styles.backButton}
          >
            <ArrowLeft size={16} color={theme.colors.textSecondary} />
            <Text style={styles.backButtonText}>Back to Blog</Text>
          </Pressable>

          {/* Post Header */}
          <View style={styles.articleHeader}>
            <View style={styles.tagRow}>
              {post.hashtags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <Text style={styles.tagPillText}>#{tag}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.title}>{post.title}</Text>

            <View style={styles.dateRow}>
              <Calendar size={14} color={theme.colors.textMuted} />
              <Text style={styles.dateText}>{post.date}</Text>
            </View>

            {/* Hero Image */}
            {post.image ? (
              <View style={styles.heroImageWrapper}>
                <Image
                  source={{ uri: post.image }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              </View>
            ) : null}

            {/* External Showcase Buttons */}
            {(post.visitShowcaseUrl || post.visitOtherUrl) && (
              <View style={styles.actionsContainer}>
                {post.visitShowcaseUrl ? (
                  <Pressable
                    onPress={() => openUrl(post.visitShowcaseUrl!)}
                    style={styles.primaryActionButton}
                  >
                    <Rocket size={16} color="#ffffff" />
                    <Text style={styles.primaryActionText}>Visit Showcase</Text>
                  </Pressable>
                ) : null}

                {post.visitOtherUrl ? (
                  <Pressable
                    onPress={() => openUrl(post.visitOtherUrl!)}
                    style={styles.secondaryActionButton}
                  >
                    {post.visitOtherIcon ? (
                      <Image
                        source={{ uri: post.visitOtherIcon }}
                        style={styles.actionIcon}
                        resizeMode="contain"
                      />
                    ) : (
                      <Globe size={16} color={theme.colors.text} />
                    )}
                    <Text style={styles.secondaryActionText}>
                      Visit {post.visitOtherTitle || 'Project'}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Article Body */}
          <View style={styles.articleBody}>
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <Text key={index} style={styles.heading3}>
                    {paragraph.replace('### ', '')}
                  </Text>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <View key={index} style={styles.listBlock}>
                    {items.map((item, itemIdx) => (
                      <View key={itemIdx} style={styles.listItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.listText}>{item.replace(/^- \*\*(.*?)\*\*:/, '$1:').replace(/^- /, '')}</Text>
                      </View>
                    ))}
                  </View>
                );
              }
              return (
                <Text key={index} style={styles.paragraph}>
                  {paragraph}
                </Text>
              );
            })}
          </View>

          {/* Post Footer */}
          <View style={styles.postFooter}>
            <Text style={styles.postFooterText}>Thanks for reading!</Text>
            <Pressable
              onPress={() => router.push('/blog')}
              style={styles.footerBackButton}
            >
              <Text style={styles.footerBackButtonText}>More Articles</Text>
            </Pressable>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  articleHeader: {
    marginBottom: 24,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tagPill: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  tagPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.8,
    marginBottom: 12,
    lineHeight: 42,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  heroImageWrapper: {
    width: '100%',
    height: 320,
    borderRadius: theme.radii.xl,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  actionIcon: {
    width: 18,
    height: 18,
  },
  secondaryActionText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 24,
  },
  articleBody: {
    marginBottom: 32,
  },
  heading3: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  listBlock: {
    marginVertical: 12,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primaryLight,
    marginTop: 10,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.textSecondary,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: 24,
  },
  postFooterText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  footerBackButton: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  footerBackButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primaryLight,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  backToBlogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: theme.radii.md,
  },
  backToBlogButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});