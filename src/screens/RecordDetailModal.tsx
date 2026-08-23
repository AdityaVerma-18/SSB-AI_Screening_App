import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreeningRecord } from '../types';
import { colors, typography, rounded, spacing } from '../theme/theme';

interface RecordDetailModalProps {
  record: ScreeningRecord | null;
  visible: boolean;
  onClose: () => void;
  onUpdateStatus?: (recordId: string, newStatus: any) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  visible,
  onClose,
  onUpdateStatus,
}) => {
  if (!record) return null;

  const getStatusBadge = () => {
    switch (record.status) {
      case 'VERIFIED':
        return {
          text: 'MATCH VERIFIED',
          color: colors.success,
          bg: colors.successBg,
          border: colors.successBorder,
        };
      case 'NEEDS_REVIEW':
        return {
          text: 'NEEDS REVIEW',
          color: colors.warning,
          bg: colors.warningBg,
          border: colors.warningBorder,
        };
      case 'MISMATCH':
        return {
          text: 'MISMATCH DETECTED',
          color: colors.error,
          bg: colors.errorBg,
          border: colors.errorBorder,
        };
      case 'HIGH_RISK':
        return {
          text: 'CRITICAL ALERT: HIGH RISK',
          color: '#ff453a',
          bg: '#4a0e17',
          border: '#8b0000',
        };
      default:
        return {
          text: 'PENDING',
          color: colors.onSurfaceVariant,
          bg: colors.surfaceContainerHigh,
          border: colors.outlineVariant,
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
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalPretitle}>SSB INSPECTION AUDIT RECORD</Text>
              <Text style={styles.modalTitle}>{record.name}</Text>
              <Text style={styles.modalDocId}>
                ID: {record.id} • {record.docType} ({record.docNumber})
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              accessibilityLabel="Close record"
            >
              <MaterialIcons name="close" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Status Banner */}
            <View
              style={[
                styles.statusBanner,
                { backgroundColor: badge.bg, borderColor: badge.border },
              ]}
            >
              <MaterialIcons
                name={
                  record.status === 'VERIFIED'
                    ? 'verified'
                    : record.status === 'HIGH_RISK'
                    ? 'warning'
                    : 'info'
                }
                size={20}
                color={badge.color}
              />
              <Text style={[styles.statusBannerText, { color: badge.color }]}>
                {badge.text}
              </Text>
            </View>

            {/* AI Scores Summary */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>AI CONFIDENCE & BIOMETRICS</Text>
              <View style={styles.scoreRow}>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>Face Biometric Match</Text>
                  <Text
                    style={[
                      styles.scoreValue,
                      { color: record.matchScore > 85 ? colors.success : colors.warning },
                    ]}
                  >
                    {record.matchScore}%
                  </Text>
                </View>
                <View style={styles.scoreDivider} />
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreLabel}>OCR Confidence</Text>
                  <Text style={[styles.scoreValue, { color: colors.primary }]}>
                    {record.ocrConfidence}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Document Extracted Fields */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>EXTRACTED IDENTITY DETAILS</Text>
              <View style={styles.grid}>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Full Legal Name</Text>
                  <Text style={styles.gridValue}>{record.name}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Date of Birth</Text>
                  <Text style={styles.gridValue}>{record.dob}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Gender / Nationality</Text>
                  <Text style={styles.gridValue}>
                    {record.gender} • {record.nationality}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Document Number</Text>
                  <Text style={[styles.gridValue, styles.monoText]}>
                    {record.docNumber}
                  </Text>
                </View>
                <View style={[styles.gridItem, { width: '100%' }]}>
                  <Text style={styles.gridLabel}>Registered Address</Text>
                  <Text style={styles.gridValue}>{record.address}</Text>
                </View>
              </View>
            </View>

            {/* Security Integrity Checklist */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>SECURITY INTEGRITY CHECKS</Text>
              <View style={styles.checksList}>
                <View style={styles.checkItem}>
                  <MaterialIcons
                    name={record.securityChecks.hologramDetected ? 'check-circle' : 'cancel'}
                    size={18}
                    color={
                      record.securityChecks.hologramDetected
                        ? colors.success
                        : colors.errorCritical
                    }
                  />
                  <Text style={styles.checkText}>Hologram & Optical Security Foil</Text>
                  <Text
                    style={[
                      styles.checkResult,
                      {
                        color: record.securityChecks.hologramDetected
                          ? colors.success
                          : colors.errorCritical,
                      },
                    ]}
                  >
                    {record.securityChecks.hologramDetected ? 'VALID' : 'FAILED / ABSENT'}
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <MaterialIcons
                    name={!record.securityChecks.tamperingDetected ? 'check-circle' : 'cancel'}
                    size={18}
                    color={
                      !record.securityChecks.tamperingDetected
                        ? colors.success
                        : colors.errorCritical
                    }
                  />
                  <Text style={styles.checkText}>Physical Tampering / Re-lamination</Text>
                  <Text
                    style={[
                      styles.checkResult,
                      {
                        color: !record.securityChecks.tamperingDetected
                          ? colors.success
                          : colors.errorCritical,
                      },
                    ]}
                  >
                    {!record.securityChecks.tamperingDetected ? 'CLEAN' : 'TAMPERED'}
                  </Text>
                </View>

                <View style={styles.checkItem}>
                  <MaterialIcons
                    name={!record.securityChecks.watchlistMatch ? 'check-circle' : 'warning'}
                    size={18}
                    color={
                      !record.securityChecks.watchlistMatch
                        ? colors.success
                        : colors.errorCritical
                    }
                  />
                  <Text style={styles.checkText}>MHA & Interpol Watchlist Screening</Text>
                  <Text
                    style={[
                      styles.checkResult,
                      {
                        color: !record.securityChecks.watchlistMatch
                          ? colors.success
                          : colors.errorCritical,
                      },
                    ]}
                  >
                    {!record.securityChecks.watchlistMatch ? 'CLEAR' : 'MATCH DETECTED'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Officer Notes */}
            {record.notes ? (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>OFFICER & AI AUDIT NOTES</Text>
                <Text style={styles.notesText}>{record.notes}</Text>
              </View>
            ) : null}

            {/* Metadata Footer */}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                Checkpoint: {record.checkpointId} • Officer: {record.officerId} • Timestamp:{' '}
                {record.timestamp}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() =>
                  Alert.alert(
                    'Exported Screening Certificate',
                    `Certificate ID: CERT-${record.id}-${Date.now().toString().slice(-4)}\nVerification Hash: 8f92a019b8...`
                  )
                }
              >
                <MaterialIcons name="print" size={18} color={colors.primary} />
                <Text style={styles.exportButtonText}>Print Certificate</Text>
              </TouchableOpacity>

              {onUpdateStatus && record.status !== 'VERIFIED' && (
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => {
                    onUpdateStatus(record.id, 'VERIFIED');
                    onClose();
                  }}
                >
                  <MaterialIcons name="check-circle" size={18} color={colors.onPrimary} />
                  <Text style={styles.approveButtonText}>Override & Approve</Text>
                </TouchableOpacity>
              )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    backgroundColor: colors.surfaceContainerHighest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalPretitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 1,
    marginBottom: 4,
  },
  modalTitle: {
    color: colors.primary,
    fontSize: typography.sizes.headlineMd,
    fontWeight: '700',
  },
  modalDocId: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontFamily: typography.fontFamily.mono,
    marginTop: 4,
  },
  closeButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scrollBody: {
    padding: 20,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: rounded.lg,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusBannerText: {
    fontSize: 13,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.outlineVariant,
  },
  scoreLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
  },
  gridLabel: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    marginBottom: 2,
  },
  gridValue: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  monoText: {
    fontFamily: typography.fontFamily.mono,
  },
  checksList: {
    gap: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    padding: 10,
    borderRadius: rounded.default,
  },
  checkText: {
    color: colors.primary,
    fontSize: 12,
    flex: 1,
    marginLeft: 8,
  },
  checkResult: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  notesText: {
    color: colors.onSurface,
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  metaText: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerHigh,
  },
  exportButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    backgroundColor: colors.primary,
  },
  approveButtonText: {
    color: colors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
