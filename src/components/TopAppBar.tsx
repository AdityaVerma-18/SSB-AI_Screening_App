import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageStyle, ViewStyle, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, spacing } from '../theme/theme';

interface TopAppBarProps {
  onPressSecurity?: () => void;
  isDark?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onPressSecurity, isDark = false }) => {
  const theme = getTheme(isDark);

  return (
    <View
      style={[
        styles.header as ViewStyle,
        {
          backgroundColor: theme.headerBg,
          borderBottomColor: theme.headerBorder,
        },
      ]}
    >
      <View style={styles.leftSection}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB62V0fU7VgX8Xcz8VzEmzn79m5m7udDvklvcajtLtgCQTQ9ErYO24i4jo_lDulzw5AIhLEHh0j7cJSLEEPYTo_A2w10QudGPstrhZqr3-L0i6H8fIVqCSdBpuxz5t446iEAVHCUN8NEWJfNBJF0mif69R9V7iA0_T-I0Zp56tWGDWZaCgnxHDXZDCyKIx6cb24lpne_8uKFKR9okGrTzzDp4V3e8jGSZTUGMtlO5M3oXgC7kCXQkYmPzaq5k2kpZp6qQ',
          }}
          style={styles.emblem as ImageStyle}
          resizeMode="contain"
        />
        <Text
          style={[styles.headerTitle, { color: theme.textPrimary }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Ministry of Home Affairs | SSB
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.securityButton,
          { backgroundColor: isDark ? theme.surfaceContainerHigh : '#f3f4f6' },
        ]}
        onPress={onPressSecurity}
        accessibilityLabel="Security settings"
      >
        <MaterialIcons
          name="security"
          size={20}
          color={isDark ? '#ffffff' : '#4b5563'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 56,
    borderBottomWidth: 1,
    zIndex: 40,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
      },
    }),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
    overflow: 'hidden',
  },
  emblem: {
    width: 28,
    height: 28,
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  securityButton: {
    padding: 7,
    borderRadius: 20,
    flexShrink: 0,
  },
});
