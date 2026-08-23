import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreeningRecord } from '../types';
import { getTheme, typography, rounded } from '../theme/theme';

interface RecordDetailModalProps {
  record: ScreeningRecord | null;
  visible: boolean;
  onClose: () => void;
  onUpdateStatus?: (recordId: string, newStatus: any) => void;
  isDark?: boolean;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  visible,
  onClose,
  onUpdateStatus,
  isDark = false,
}) => {
  if (!record) return null;
  const theme = getTheme(isDark);

  const getStatusBadge = () => {
    switch (record.status) {
      case 'VERIFIED':
        return {
          text: 'MATCH VERIFIED',
          color: theme.successText,
          bg: theme.successBg,
          border: theme.successBorder,
        };
      case 'NEEDS_REVIEW':
        return {
          text: 'NEEDS REVIEW',
          color: theme.warningText,
          bg: theme.warningBg,
          border: theme.warningBorder,
        };
      case 'MISMATCH':
        return {
          text: 'MISMATCH DETECTED',
          color: theme.errorText,
          bg: theme.errorBg,
          border: theme.errorBorder,
        };
      case 'HIGH_RISK':
        return {
          text: 'CRITICAL ALERT: HIGH RISK',
          color: theme.errorCritical,
          bg: theme.errorBg,
          border: theme.errorBorder,
        };
      default:
        return {
          text: 'PENDING',
          color: theme.textMuted,
          bg: theme.surfaceContainerHigh,
          border: theme.border,
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modalContent, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: theme.borderLight }]}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.modalPretitle, { color: theme.textMuted }]}>SSB INSPECTION AUDIT RECORD</Text>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]} numberOfLines={1}>{record.name}</Text>
              <Text style={[styles.modalDocId, { color: theme.textMuted }]}>
                ID: {record.id} • {record.docType} ({record.docNumber})
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f3f4f6' }]}
              onPress={onClose}
              accessibilityLabel="Close record"
            >
              <MaterialIcons name="close" size={18} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Status Pill Banner */}
            <View
              style={[
                styles.statusBanner,
                {
                  backgroundColor: badge.bg,
                  borderColor: badge.border,
                },
              ]}
            >
              <Text style={[styles.statusBannerText, { color: badge.color }]}>
                {badge.text}
              </Text>
              <Text style={[styles.matchScoreText, { color: badge.color }]}>
                Match: {record.matchScore}% · OCR: {record.ocrConfidence}%
              </Text>
            </View>

            {/* Demographics Card */}
            <View style={[styles.infoBlock, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <Text style={[styles.blockTitle, { color: theme.textSecondary }]}>BIOGRAPHIC PROFILE</Text>

              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>NATIONALITY</Text>
                  <Text style={[styles.fieldValue, { color: theme.textPrimary }]}>{record.nationality}</Text>
                </View>
                <View style={styles.gridCol}>
                  <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>DATE OF BIRTH</Text>
                  <Text style={[styles.fieldValue, { color: theme.textPrimary }]}>{record.dob}</Text>
                </View>
              </View>

              <View style={styles.gridRow}>
                <View style={styles.gridCol}>
                  <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>GENDER</Text>
                  <Text style={[styles.fieldValue, { color: theme.textPrimary }]}>{record.gender}</Text>
                </View>
                <View style={styles.gridCol}>
                  <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>TERMINAL / CHECKPOINT</Text>
                  <Text style={[styles.fieldValue, { color: theme.textPrimary }]}>{record.checkpointId}</Text>
                </View>
              </View>

              <View style={styles.gridColFull}>
                <Text style={[styles.fieldLabel, { color: theme.textMuted }]}>RESIDENCE / TRANSIT ADDRESS</Text>
                <Text style={[styles.fieldValue, { color: theme.textPrimary }]}>{record.address}</Text>
              </View>
            </View>

            {/* Security Checks */}
            <View style={[styles.infoBlock, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <Text style={[styles.blockTitle, { color: theme.textSecondary }]}>SECURITY & TAMPER CHECKS</Text>

              <View style={styles.checkRow}>
                <Text style={[styles.checkLabel, { color: theme.textPrimary }]}>Hologram & Optical Security</Text>
                <Text style={{ color: record.securityChecks.hologramDetected ? theme.badgeOperational : theme.errorText, fontWeight: '700', fontSize: 12 }}>
                  {record.securityChecks.hologramDetected ? 'PASSED' : 'NOT DETECTED'}
                </Text>
              </View>

              <View style={styles.checkRow}>
                <Text style={[styles.checkLabel, { color: theme.textPrimary }]}>Physical / Digital Tampering</Text>
                <Text style={{ color: !record.securityChecks.tamperingDetected ? theme.badgeOperational : theme.errorText, fontWeight: '700', fontSize: 12 }}>
                  {!record.securityChecks.tamperingDetected ? 'CLEAN (NONE)' : 'ALERT: DETECTED'}
                </Text>
              </View>

              <View style={styles.checkRow}>
                <Text style={[styles.checkLabel, { color: theme.textPrimary }]}>National Watchlist / Interpol</Text>
                <Text style={{ color: !record.securityChecks.watchlistMatch ? theme.badgeOperational : theme.errorText, fontWeight: '700', fontSize: 12 }}>
                  {!record.securityChecks.watchlistMatch ? 'CLEAR' : 'MATCH DETECTED'}
                </Text>
              </View>

              <View style={styles.checkRow}>
                <Text style={[styles.checkLabel, { color: theme.textPrimary }]}>Live Biometric Match</Text>
                <Text style={{ color: record.securityChecks.biometricMatch ? theme.badgeOperational : theme.warningText, fontWeight: '700', fontSize: 12 }}>
                  {record.securityChecks.biometricMatch ? 'VERIFIED' : 'FAILED / MANUAL'}
                </Text>
              </View>
            </View>

            {/* Officer Action Buttons */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[styles.modalActionBtn, { backgroundColor: theme.badgeOperational }]}
                onPress={() => {
                  if (onUpdateStatus) onUpdateStatus(record.id, 'VERIFIED');
                  Alert.alert('Status Updated', `${record.name} marked as VERIFIED.`);
                  onClose();
                }}
              >
                <MaterialIcons name="check" size={16} color="#ffffff" />
                <Text style={styles.actionBtnText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalActionBtn, { backgroundColor: '#ef4444' }]}
                onPress={() => {
                  if (onUpdateStatus) onUpdateStatus(record.id, 'MISMATCH');
                  Alert.alert('Status Updated', `${record.name} marked as MISMATCH.`);
                  onClose();
                }}
              >
                <MaterialIcons name="close" size={16} color="#ffffff" />
                <Text style={styles.actionBtnText}>Flag Mismatch</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    borderRadius: rounded.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
  },
  modalPretitle: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalDocId: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  closeButton: {
    padding: 6,
    borderRadius: 16,
  },
  scrollBody: {
    padding: 14,
    gap: 12,
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
    marginBottom: 10,
  },
  statusBannerText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  matchScoreText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
  },
  infoBlock: {
    borderRadius: rounded.lg,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    marginBottom: 10,
  },
  blockTitle: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCol: {
    flex: 1,
  },
  gridColFull: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkLabel: {
    fontSize: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  modalActionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: rounded.lg,
    gap: 6,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
