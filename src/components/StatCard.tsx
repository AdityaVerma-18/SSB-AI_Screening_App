import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, rounded } from '../theme/theme';

interface StatCardProps {
  title: string;
  count: string | number;
  trend?: string;
  subtitle?: string;
  type: 'verified' | 'mismatched' | 'pending';
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  trend,
  subtitle,
  type,
  onPress,
}) => {
  const getTheme = () => {
    switch (type) {
      case 'verified':
        return {
          textColor: colors.success,
          bgColor: colors.successBg,
          borderColor: colors.successBorder,
          icon: 'check-circle' as const,
        };
      case 'mismatched':
        return {
          textColor: colors.error,
          bgColor: colors.errorBg,
          borderColor: colors.errorBorder,
          icon: 'cancel' as const,
        };
      case 'pending':
      default:
        return {
          textColor: colors.warning,
          bgColor: colors.warningBg,
          borderColor: colors.warningBorder,
          icon: 'schedule' as const,
        };
    }
  };

  const theme = getTheme();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{title}</Text>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: theme.bgColor, borderColor: theme.borderColor },
          ]}
        >
          <MaterialIcons name={theme.icon} size={16} color={theme.textColor} />
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={[styles.countText, { color: theme.textColor }]}>
          {count}
        </Text>
        {trend && (
          <Text style={[styles.trendText, { color: theme.textColor }]}>
            {trend}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitleText}>{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    color: colors.onSurfaceVariant,
    fontSize: typography.sizes.bodySm,
    fontWeight: '400',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  countText: {
    fontSize: typography.sizes.headlineLgMobile,
    fontWeight: '700',
    fontFamily: typography.fontFamily.bold,
  },
  trendText: {
    fontSize: typography.sizes.labelCaps,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: typography.sizes.labelCaps,
    fontFamily: typography.fontFamily.mono,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
});
