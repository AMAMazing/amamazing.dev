import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, Platform } from 'react-native';
import { X, Copy, Check, Code2 } from 'lucide-react-native';
import { theme } from '../lib/theme';
import { generateMarkdown } from '../lib/data';

interface RawMarkdownModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RawMarkdownModal: React.FC<RawMarkdownModalProps> = ({ visible, onClose }) => {
  const [copied, setCopied] = useState(false);
  const markdownText = generateMarkdown();

  const handleCopy = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(markdownText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.iconCircle}>
                <Code2 size={16} color={theme.colors.primaryLight} />
              </View>
              <Text style={styles.title}>Raw Portfolio Markdown</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={18} color={theme.colors.textSecondary} />
            </Pressable>
          </View>

          {/* Code Viewer */}
          <ScrollView style={styles.codeContainer} contentContainerStyle={styles.codeContent}>
            <Text style={styles.codeText} selectable>{markdownText}</Text>
          </ScrollView>

          {/* Footer Action */}
          <View style={styles.footer}>
            <Text style={styles.footerNote}>Markdown formatted for GitHub profile or README</Text>
            <Pressable
              onPress={handleCopy}
              style={[styles.copyButton, copied && styles.copyButtonActive]}
            >
              {copied ? (
                <>
                  <Check size={16} color="#ffffff" />
                  <Text style={styles.copyButtonText}>Copied to Clipboard!</Text>
                </>
              ) : (
                <>
                  <Copy size={16} color="#ffffff" />
                  <Text style={styles.copyButtonText}>Copy Markdown</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    width: '100%',
    maxWidth: 820,
    maxHeight: '85%',
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    flex: 1,
    backgroundColor: '#0a0a0c',
    padding: 16,
  },
  codeContent: {
    paddingBottom: 24,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    color: '#d4d4d8',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
  },
  footerNote: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.radii.md,
  },
  copyButtonActive: {
    backgroundColor: theme.colors.success,
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});