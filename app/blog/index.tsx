import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ArrowRight, Tag } from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getAllPosts, Post } from '../../lib/posts';
import { theme } from '../../lib/theme';

export default function BlogListScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.hashtags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.hashtags.includes(selectedTag))
    : posts;

  const isWide = width >= 768;

  return (
    <View style={styles.screen}>
      <Navbar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Back button */}
          <Pressable
            onPress={() => router.push('/')}
            style={styles.backButton}
          >
            <ArrowLeft size={16} color={theme.colors.textSecondary} />
            <Text style={styles.backButtonText}>Back to Home</Text>
          </Pressable>

          {/* Page Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>DEVELOPER BLOG</Text>
            </View>
            <Text style={styles.title}>Articles & Updates</Text>
            <Text style={styles.subtitle}>
              Thoughts, tutorials, project case studies, and engineering updates from AMAMazing.
            </Text>
          </View>

          {/* Hashtag Filter Chips */}
          <View style={styles.filterRow}>
            <Pressable
              onPress={() => setSelectedTag(null)}
              style={[
                styles.filterChip,
                selectedTag === null && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedTag === null && styles.filterChipTextActive,
                ]}
              >
                All Posts
              </Text>
            </Pressable>

            {allTags.map((tag) => (
              <Pressable
                key={tag}
                onPress={() => setSelectedTag(tag)}
                style={[
                  styles.filterChip,
                  selectedTag === tag && styles.filterChipActive,
                ]}
              >
                <Tag
                  size={12}
                  color={selectedTag === tag ? '#ffffff' : theme.colors.textMuted}
                />
                <Text
                  style={[
                    styles.filterChipText,
                    selectedTag === tag && styles.filterChipTextActive,
                  ]}
                >
                  #{tag}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Posts Grid */}
          <View style={styles.postsList}>
            {filteredPosts.map((post) => {
              const isHovered = hoveredSlug === post.slug;
              return (
                <Pressable
                  key={post.slug}
                  onPress={() => router.push(`/blog/${post.slug}` as any)}
                  onHoverIn={() => setHoveredSlug(post.slug)}
                  onHoverOut={() => setHoveredSlug(null)}
                  style={[
                    styles.postCard,
                    isHovered && styles.postCardHovered,
                  ]}
                >
                  {post.image ? (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: post.image }}
                        style={styles.postImage}
                        resizeMode="cover"
                      />
                    </View>
                  ) : null}

                  <View style={styles.postBody}>
                    <View style={styles.metaRow}>
                      <View style={styles.dateRow}>
                        <Calendar size={13} color={theme.colors.textMuted} />
                        <Text style={styles.dateText}>{post.date}</Text>
                      </View>
                      <View style={styles.tagsContainer}>
                        {post.hashtags.map((tag) => (
                          <View key={tag} style={styles.tagBadge}>
                            <Text style={styles.tagBadgeText}>#{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <Text style={[styles.postTitle, isHovered && styles.postTitleHovered]}>
                      {post.title}
                    </Text>

                    <Text style={styles.postExcerpt} numberOfLines={3}>
                      {post.content}
                    </Text>

                    <View style={styles.readMoreContainer}>
                      <Text style={[styles.readMoreText, isHovered && styles.readMoreTextHovered]}>
                        Read Article
                      </Text>
                      <ArrowRight
                        size={14}
                        color={isHovered ? theme.colors.primaryLight : theme.colors.primary}
                      />
                    </View>
                  </View>
                </Pressable>
              );
            })}

            {filteredPosts.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No posts found with this tag.</Text>
              </View>
            ) : null}
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
    maxWidth: 960,
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
  header: {
    marginBottom: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primaryLight,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    maxWidth: 640,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radii.full,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  postsList: {
    gap: 24,
  },
  postCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    overflow: 'hidden',
  },
  postCardHovered: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.cardHover,
    transform: [{ translateY: -2 }],
  },
  imageContainer: {
    width: '100%',
    height: 220,
    backgroundColor: theme.colors.backgroundElevated,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postBody: {
    padding: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: theme.colors.backgroundElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagBadgeText: {
    fontSize: 11,
    color: theme.colors.primaryLight,
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 28,
  },
  postTitleHovered: {
    color: theme.colors.primaryLight,
  },
  postExcerpt: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  readMoreTextHovered: {
    color: theme.colors.primaryLight,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: theme.colors.textMuted,
  },
});