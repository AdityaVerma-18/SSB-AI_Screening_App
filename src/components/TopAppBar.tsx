import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageStyle, ViewStyle, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';

interface TopAppBarProps {
  onPressSecurity?: () => void;
  dark?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onPressSecurity, dark = false }) => {
  return (
    <View style={[styles.header as ViewStyle, dark ? styles.headerDark : styles.headerLight]}>
      <View style={styles.leftSection}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB62V0fU7VgX8Xcz8VzEmzn79m5m7udDvklvcajtLtgCQTQ9ErYO24i4jo_lDulzw5AIhLEHh0j7cJSLEEPYTo_A2w10QudGPstrhZqr3-L0i6H8fIVqCSdBpuxz5t446iEAVHCUN8NEWJfNBJF0mif69R9V7iA0_T-I0Zp56tWGDWZaCgnxHDXZDCyKIx6cb24lpne_8uKFKR9okGrTzzDp4V3e8jGSZTUGMtlO5M3oXgC7kCXQkYmPzaq5k2kpZp6qQ',
          }}
          style={styles.emblem as ImageStyle}
          resizeMode="contain"
        />
        <Text
          style={[styles.headerTitle, dark ? styles.titleDark : styles.titleLight]}
          numberOfLines={1}
        >
          Ministry of Home Affairs | SSB — AI Document Screening
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.securityButton, dark && styles.securityButtonDark]}
        onPress={onPressSecurity}
        accessibilityLabel="Security settings"
      >
        <MaterialIcons
          name="security"
          size={22}
          color={dark ? '#ffffff' : '#4b5563'}
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
    height: 60,
    borderBottomWidth: 1,
    zIndex: 40,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
      },
    }),
  },
  headerLight: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e5e7eb',
  },
  headerDark: {
    backgroundColor: colors.darkSurfaceDim,
    borderBottomColor: colors.darkSurfaceContainerHigh,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  emblem: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
    flex: 1,
  },
  titleLight: {
    color: '#111827',
  },
  titleDark: {
    color: '#ffffff',
  },
  securityButton: {
    padding: 8,
    borderRadius: 20,
  },
  securityButtonDark: {
    backgroundColor: colors.darkSurfaceContainer,
  },
});
