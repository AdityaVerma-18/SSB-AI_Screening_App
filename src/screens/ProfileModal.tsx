import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OfficerProfile } from '../types';
import { colors, typography, rounded, spacing } from '../theme/theme';

interface ProfileModalProps {
  visible: boolean;
  officer: OfficerProfile;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  officer,
  onClose,
  onLogout,
}) => {
  const [biometricLock, setBiometricLock] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [spectralMode, setSpectralMode] = useState(true);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.pretitle}>SECURITY PROFILE & SYSTEM PREFERENCES</Text>
              <Text style={styles.title}>Officer Identity Badge</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <MaterialIcons name="close" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Officer ID Card */}
            <View style={styles.officerCard}>
              <View style={styles.officerAvatar}>
                <MaterialIcons name="security" size={36} color={colors.primary} />
              </View>
              <View style={styles.officerInfo}>
                <Text style={styles.officerName}>{officer.name}</Text>
                <Text style={styles.officerRank}>{officer.rank}</Text>
                <Text style={styles.officerId}>ID: {officer.id}</Text>
              </View>
            </View>

            {/* Clearance Pill */}
            <View style={styles.clearanceBox}>
              <MaterialIcons name="verified-user" size={16} color={colors.success} />
              <View style={styles.clearanceTextWrap}>
                <Text style={styles.clearanceLabel}>SECURITY CLEARANCE LEVEL</Text>
                <Text style={styles.clearanceValue}>{officer.securityClearance}</Text>
              </View>
            </View>

            {/* Deployment Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>POSTING & DEPLOYMENT</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Operational Unit</Text>
                <Text style={styles.detailVal}>{officer.unit}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Assigned Checkpoint</Text>
                <Text style={[styles.detailVal, styles.mono]}>{officer.checkpoint}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Active Shift</Text>
                <Text style={styles.detailVal}>Alpha Shift (06:00 - 14:00 IST)</Text>
              </View>
            </View>

            {/* System Security Controls */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SECURITY PROTOCOLS & CONTROLS</Text>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleTitle}>Biometric Device Unlock</Text>
                  <Text style={styles.toggleSubtitle}>Require fingerprint/Face ID on resume</Text>
                </View>
                <Switch
                  value={biometricLock}
                  onValueChange={setBiometricLock}
                  trackColor={{ false: colors.surfaceVariant, true: colors.successBg }}
                  thumbColor={biometricLock ? colors.success : colors.outline}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleTitle}>Offline Encrypted Buffer</Text>
                  <Text style={styles.toggleSubtitle}>Cache scans when satellite link drops</Text>
                </View>
                <Switch
                  value={offlineSync}
                  onValueChange={setOfflineSync}
                  trackColor={{ false: colors.surfaceVariant, true: colors.successBg }}
                  thumbColor={offlineSync ? colors.success : colors.outline}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleTitle}>UV Spectral Analysis</Text>
                  <Text style={styles.toggleSubtitle}>Deep neural scan for security holograms</Text>
                </View>
                <Switch
                  value={spectralMode}
                  onValueChange={setSpectralMode}
                  trackColor={{ false: colors.surfaceVariant, true: colors.successBg }}
                  thumbColor={spectralMode ? colors.success : colors.outline}
                />
              </View>
            </View>

            {/* Cryptographic Session info */}
            <View style={styles.cryptoBox}>
              <MaterialIcons name="lock" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.cryptoText}>
                Session Encrypted: AES-256-GCM / TLS 1.3 MHA Key Ring
              </Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                Alert.alert(
                  'End Secure Session',
                  'Are you sure you want to log out from this checkpoint terminal?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Logout',
                      style: 'destructive',
                      onPress: () => {
                        onClose();
                        onLogout();
                      },
                    },
                  ]
                );
              }}
            >
              <MaterialIcons name="logout" size={18} color="#ff453a" />
              <Text style={styles.logoutBtnText}>Lock & Terminate Session</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '88%',
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    backgroundColor: colors.surfaceContainerHighest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pretitle: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: colors.primary,
    fontSize: typography.sizes.headlineMd,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  body: {
    padding: 20,
  },
  officerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 14,
  },
  officerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  officerInfo: {
    flex: 1,
  },
  officerName: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  officerRank: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    marginTop: 2,
  },
  officerId: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    marginTop: 2,
  },
  clearanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.successBg,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: colors.successBorder,
    padding: 12,
    marginBottom: 16,
  },
  clearanceTextWrap: {
    flex: 1,
  },
  clearanceLabel: {
    color: colors.success,
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
  },
  clearanceValue: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    marginTop: 1,
  },
  section: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 14,
    marginBottom: 14,
    gap: 10,
  },
  sectionTitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailKey: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  detailVal: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  mono: {
    fontFamily: typography.fontFamily.mono,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(68, 71, 72, 0.3)',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 10,
  },
  toggleTitle: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  toggleSubtitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  cryptoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginVertical: 10,
  },
  cryptoText: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3d1818',
    borderWidth: 1,
    borderColor: '#6b2c2c',
    borderRadius: rounded.lg,
    paddingVertical: 14,
    marginTop: 10,
  },
  logoutBtnText: {
    color: '#ff453a',
    fontSize: 13,
    fontWeight: '700',
  },
});
