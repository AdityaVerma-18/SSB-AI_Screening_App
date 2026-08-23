import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  ImageStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded, spacing } from '../theme/theme';
import { OfficerProfile } from '../types';

interface SettingsScreenProps {
  officer: OfficerProfile;
  onLogout: () => void;
  isDark?: boolean;
  onToggleDarkMode?: (val: boolean) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  officer,
  onLogout,
  isDark = false,
  onToggleDarkMode,
}) => {
  const theme = getTheme(isDark);
  const [biometricUnlock, setBiometricUnlock] = useState<boolean>(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);

  const handleToggleTheme = (value: boolean) => {
    if (onToggleDarkMode) {
      onToggleDarkMode(value);
    }
  };

  const handleAuditLogExport = () => {
    Alert.alert(
      'Export Audit Logs',
      'Officer session audit report (ID: OFF-1042) exported to PDF.'
    );
  };

  const handleSupport = () => {
    Alert.alert(
      'SSB IT Helpdesk',
      'Toll Free: 1800-11-2324\nEmail: ssb-support@mha.gov.in\nDirect Terminal Comms: ACTIVE'
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Officer Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
                }}
                style={styles.avatar as ImageStyle}
              />
              <View style={[styles.onlineDot, { backgroundColor: theme.badgeOperational }]} />
            </View>

            <View style={styles.officerDetails}>
              <Text style={[styles.officerName, { color: theme.textPrimary }]}>{officer.name}</Text>
              <Text style={[styles.officerRank, { color: theme.textSecondary }]}>
                {officer.rank} · {officer.unit}
              </Text>
              <Text style={[styles.officerId, { color: theme.textMuted }]}>ID: {officer.id}</Text>
            </View>
          </View>

          {/* Clearance & Checkpoint Bar */}
          <View style={[styles.clearanceBar, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
            <View style={styles.clearanceCol}>
              <Text style={[styles.clearanceLabel, { color: theme.textMuted }]}>CLEARANCE</Text>
              <Text style={[styles.clearanceValue, { color: theme.badgeOperational }]}>
                {officer.securityClearance}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.clearanceCol}>
              <Text style={[styles.clearanceLabel, { color: theme.textMuted }]}>TERMINAL</Text>
              <Text style={[styles.clearanceValue, { color: theme.textPrimary }]}>
                {officer.checkpoint}
              </Text>
            </View>
          </View>
        </View>

        {/* Security Settings Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, borderBottomColor: theme.borderLight }]}>
            Security & Authentication
          </Text>

          {/* Biometric Switch */}
          <View style={[styles.settingRow, { borderBottomColor: theme.borderLight }]}>
            <View style={styles.settingTextWrap}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Biometric Unlock</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>
                Require fingerprint / face unlock for terminal access
              </Text>
            </View>
            <Switch
              value={biometricUnlock}
              onValueChange={setBiometricUnlock}
              trackColor={{ false: '#767577', true: theme.badgeOperational }}
              thumbColor={biometricUnlock ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {/* 2FA Switch */}
          <View style={[styles.settingRow, { borderBottomColor: theme.borderLight }]}>
            <View style={styles.settingTextWrap}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>2-Factor Authentication</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>
                Enforce TOTP code on every verification session
              </Text>
            </View>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: '#767577', true: theme.badgeOperational }}
              thumbColor={twoFactorAuth ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {/* Notifications Switch */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextWrap}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Security Threat Alerts</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>
                Real-time push notifications on watchlist matches
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: theme.badgeOperational }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Application Preferences Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, borderBottomColor: theme.borderLight }]}>
            Appearance & System
          </Text>

          {/* Dark Mode Switch */}
          <View style={[styles.settingRow, { borderBottomColor: theme.borderLight }]}>
            <View style={styles.settingTextWrap}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Dark Mode</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>
                Optimize interface for low-light night border operations
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={handleToggleTheme}
              trackColor={{ false: '#767577', true: theme.badgeOperational }}
              thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {/* Language Selector */}
          <TouchableOpacity
            style={[styles.linkRow, { borderBottomColor: theme.borderLight }]}
            onPress={() => Alert.alert('Language', 'System Language: English (IN) · Hindi supported.')}
          >
            <View>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Language / भाषा</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>English (Default)</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={theme.textMuted} />
          </TouchableOpacity>

          {/* Export Audit Logs */}
          <TouchableOpacity style={styles.linkRow} onPress={handleAuditLogExport}>
            <View>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>Export Terminal Audit Logs</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Encrypted compliance archive</Text>
            </View>
            <MaterialIcons name="download" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Support & Logout */}
        <View style={[styles.sectionCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.linkRow, { borderBottomColor: theme.borderLight }]}
            onPress={handleSupport}
          >
            <View>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>SSB Technical Support</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>24x7 Control Room helpline</Text>
            </View>
            <MaterialIcons name="help-outline" size={20} color={theme.textSecondary} />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#fef2f2', borderColor: theme.isDark ? theme.borderDark : '#fecaca' }]}
            onPress={onLogout}
            activeOpacity={0.85}
          >
            <MaterialIcons name="logout" size={18} color="#ef4444" />
            <Text style={styles.logoutBtnText}>LOG OUT OF SESSION</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 14,
    paddingBottom: 90,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
    gap: 14,
  },
  profileCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  officerDetails: {
    flex: 1,
    gap: 2,
  },
  officerName: {
    fontSize: 17,
    fontWeight: '700',
  },
  officerRank: {
    fontSize: 13,
  },
  officerId: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.5,
  },
  clearanceBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
  },
  clearanceCol: {
    alignItems: 'center',
    gap: 2,
  },
  clearanceLabel: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
  },
  clearanceValue: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
  },
  divider: {
    width: 1,
    height: 24,
  },
  sectionCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    textTransform: 'uppercase',
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  settingTextWrap: {
    flex: 1,
    marginRight: 10,
    gap: 2,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  logoutBtn: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
    gap: 6,
  },
  logoutBtnText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.5,
  },
});
