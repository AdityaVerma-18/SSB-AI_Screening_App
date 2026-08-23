import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography } from '../theme/theme';

export type TabType = 'dashboard' | 'scan' | 'records' | 'settings';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: 'dashboard' as const,
    },
    {
      id: 'scan' as TabType,
      label: 'Scan',
      icon: 'document-scanner' as any,
    },
    {
      id: 'records' as TabType,
      label: 'Records',
      icon: 'history-edu' as any,
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: 'settings' as any,
    },
  ];

  return (
    <View style={styles.navContainer}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
              <MaterialIcons
                name={tab.icon}
                size={24}
                color={isActive ? '#111827' : '#6b7280'}
              />
            </View>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    ...Platform.select({
      web: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      },
      default: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
    transform: [{ scale: 1.03 }],
  },
  iconWrapper: {
    padding: 4,
    borderRadius: 20,
    marginBottom: 2,
  },
  activeIconWrapper: {
    backgroundColor: '#f3f4f6',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
  },
  activeTabLabel: {
    color: '#111827',
    fontWeight: '700',
  },
  inactiveTabLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
});
