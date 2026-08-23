import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, rounded, spacing } from '../theme/theme';
import { OfficerProfile } from '../types';

interface SettingsScreenProps {
  officer: OfficerProfile;
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  officer,
  onLogout,
}) => {
  const [biometricUnlock, setBiometricUnlock] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs9-DUrXX16NQ9c-hLubc_O8fWKWSVA-iS3zbXO1mMdegov_5O7q4FcLiGFg7RD5QR-uQbpUsXzEB35EU543Hvf-LS_spEsHAAUzUSHu3ctW21uTpXYDDACMA-C6z6XdSqnaM8EqebjBMaUlX81aYhp6UkBUlkw5ozueepCbDGvQUFL0Mcc0y7Agv7NMrsGjBLATt4P8QzJb8lKntbhu5b3ws8DBXiG2LIERiCEwUxovksDaR5avEG',
            }}
            style={styles.avatarImage}
          />
          <View style={styles.onlineDot} />
        </View>

        <Text style={styles.officerName}>{officer.name}</Text>
        <View style={styles.officerBadge}>
          <Text style={styles.officerBadgeText}>ID: {officer.id}</Text>
        </View>
      </View>

      {/* Security Section */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>SECURITY</Text>
        <View style={styles.cardRows}>
          {/* Biometric Unlock */}
          <View style={styles.toggleRow}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="fingerprint" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Biometric Unlock</Text>
            </View>
            <Switch
              value={biometricUnlock}
              onValueChange={setBiometricUnlock}
              trackColor={{ false: '#d1d5db', true: '#111827' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* 2-Factor Authentication */}
          <View style={styles.toggleRow}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="verified-user" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>2-Factor Authentication</Text>
            </View>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: '#d1d5db', true: '#111827' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Change Password */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() =>
              Alert.alert('Change Password', 'Security key verification required.')
            }
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="vpn-key" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Change Password</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* App Settings Section */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>APP SETTINGS</Text>
        <View style={styles.cardRows}>
          {/* Language */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Language', 'Current language: English (Default)')}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="language" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Language</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValueText}>English</Text>
              <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.toggleRow}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="dark-mode" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#111827' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Notifications', 'All force alerts enabled.')}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="notifications" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Notifications</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>SUPPORT</Text>
        <View style={styles.cardRows}>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Help Center', 'SSB Operations Helpline: 1800-11-SSB')}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="help" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Help Center</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Privacy & Security', 'Official MHA Security Directives.')}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="policy" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Privacy & Security</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Alert.alert('Contact Support', 'Duty Officer: +91 11 2436 8201')}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="support-agent" size={22} color="#6b7280" />
              <Text style={styles.rowLabel}>Contact Support</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Actions / Logout */}
      <View style={styles.accountActionsSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Log Out',
              'Are you sure you want to end your active session?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Log Out',
                  style: 'destructive',
                  onPress: onLogout,
                },
              ]
            );
          }}
          activeOpacity={0.85}
        >
          <MaterialIcons name="logout" size={20} color="#ffffff" />
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 24,
    paddingBottom: 100,
    gap: 20,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#000000',
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  officerName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1b1f',
  },
  officerBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: rounded.default,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  officerBadgeText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#4b5563',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: rounded.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      default: {
        elevation: 1,
      },
    }),
  },
  cardSectionTitle: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#4b5563',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 12,
  },
  cardRows: {
    gap: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1b1f',
  },
  rowValueText: {
    fontSize: 14,
    color: '#6b7280',
  },
  accountActionsSection: {
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#000000',
    borderRadius: rounded.default,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
