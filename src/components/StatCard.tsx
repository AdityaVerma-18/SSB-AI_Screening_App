import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded } from '../theme/theme';

interface StatCardProps {
  title: string;
  count: string | number;
  trend?: string;
  subtitle?: string;
  type: 'verified' | 'mismatched' | 'pending';
  onPress?: () => void;
  isDark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  trend,
  subtitle,
  type,
  onPress,
  isDark = false,
}) => {
  const theme = getTheme(isDark);

  const getCardTheme = () => {
    switch (type) {
      case 'verified':
        return {
          textColor: theme.successText,
          bgColor: theme.successBg,
          borderColor: theme.successBorder,
          icon: 'check-circle' as const,
        };
      case 'mismatched':
        return {
          textColor: theme.errorText,
          bgColor: theme.errorBg,
          borderColor: theme.errorBorder,
          icon: 'cancel' as const,
        };
      case 'pending':
      default:
        return {
          textColor: theme.warningText,
          bgColor: theme.warningBg,
          borderColor: theme.warningBorder,
          icon: 'schedule' as const,
        };
    }
  };

  const cardTheme = getCardTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceCard,
          borderColor: theme.border,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text
          style={[styles.titleText, { color: theme.textSecondary }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: cardTheme.bgColor, borderColor: cardTheme.borderColor },
          ]}
        >
          <MaterialIcons name={cardTheme.icon} size={14} color={cardTheme.textColor} />
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={[styles.countText, { color: cardTheme.textColor }]}>
          {count}
        </Text>
        {trend && (
          <Text
            style={[styles.trendText, { color: cardTheme.textColor }]}
            numberOfLines={1}
          >
            {trend}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[styles.subtitleText, { color: theme.textMuted }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 95,
    borderRadius: rounded.lg,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  countText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: typography.fontFamily.bold,
  },
  trendText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
    textTransform: 'uppercase',
  },
});
