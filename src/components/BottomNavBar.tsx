import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography } from '../theme/theme';

export type TabType = 'dashboard' | 'scan' | 'records' | 'settings';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isDark?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  isDark = false,
}) => {
  const theme = getTheme(isDark);

  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: 'dashboard' as const,
    },
    {
      id: 'scan' as TabType,
      label: 'Scan',
      icon: 'qr-code-scanner' as const,
    },
    {
      id: 'records' as TabType,
      label: 'Records',
      icon: 'history-edu' as any,
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: 'settings' as const,
    },
  ];

  return (
    <View
      style={[
        styles.navContainer as ViewStyle,
        {
          backgroundColor: theme.navBg,
          borderTopColor: theme.navBorder,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && {
                  backgroundColor: isDark ? theme.surfaceContainerHighest : '#f3f4f6',
                },
              ]}
            >
              <MaterialIcons
                name={tab.icon as any}
                size={22}
                color={isActive ? theme.textPrimary : theme.textMuted}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? theme.textPrimary : theme.textMuted,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    borderTopWidth: 1,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  activeTabItem: {
    transform: [{ scale: 1.02 }],
  },
  iconWrapper: {
    padding: 4,
    borderRadius: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.bold,
  },
});
