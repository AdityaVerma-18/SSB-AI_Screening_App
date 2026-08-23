import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, rounded, spacing } from '../theme/theme';
import { ScreeningRecord } from '../types';

interface VerificationResultScreenProps {
  onBack: () => void;
  onAccept: (record: ScreeningRecord) => void;
  onDeny: (record: ScreeningRecord) => void;
  onNewVerification: () => void;
}

export const VerificationResultScreen: React.FC<VerificationResultScreenProps> = ({
  onBack,
  onAccept,
  onDeny,
  onNewVerification,
}) => {
  const resultRecord: ScreeningRecord = {
    id: 'VF-20481',
    name: 'Alex Morgan',
    docType: 'Passport',
    docNumber: 'P8742031',
    status: 'VERIFIED',
    timestamp: '14:34:00 UTC',
    checkpointId: 'CHK-00184',
    officerId: 'OFF-1042',
    gender: 'M',
    dob: '12 Mar 1992',
    address: 'New York, United States',
    nationality: 'United States',
    matchScore: 98.7,
    ocrConfidence: 99.4,
    securityChecks: {
      hologramDetected: true,
      tamperingDetected: false,
      watchlistMatch: false,
      biometricMatch: true,
    },
    notes: 'Submitted identity matches the verification records with high confidence.',
  };

  const handleAccept = () => {
    onAccept(resultRecord);
    Alert.alert(
      'Verification Accepted',
      'Alex Morgan (VF-20481) has been verified and approved for transit.'
    );
  };

  const handleDeny = () => {
    const deniedRecord: ScreeningRecord = {
      ...resultRecord,
      status: 'MISMATCH',
      notes: 'Verification denied by checkpoint officer.',
    };
    onDeny(deniedRecord);
    Alert.alert(
      'Verification Denied',
      'Alex Morgan (VF-20481) transit clearance has been denied.'
    );
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Report',
      'Screening Audit Report (VF-20481.pdf) downloaded to device.'
    );
  };

  return (
    <View style={styles.outerContainer}>
      {/* Header (Task Focused) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#444748" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJN9Vsrn5_0Wl2W9WpYgQlusuh7n_i7nCLx4GRjPkhyPgIz2EunXeYfZZgjg3sgBcBMUakGl1EVxzaG3kOqKhZMrGyBkIDSxha4hB0qLie7v6TKikGX91v2E9z6K-KwEEY1aPcsi6siRezFBwFlEXZhJV2wp4io5fFQykL0sh9PtRUrH7cQh3eBBC8nPrHrxJKONM6C0NJpI4RmJ4WN-L7KuV031wvvQqaaNBRLJVgoNM1S5xl2aUHTmDlSsKxB-kIOQ',
            }}
            style={styles.emblem}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle} numberOfLines={1}>
            Ministry of Home Affairs | SSB — AI Document Screening
          </Text>
        </View>

        <View style={styles.idBadge}>
          <Text style={styles.idBadgeText}>ID: VF-20481</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper */}
        <View style={styles.stepperContainer}>
          {/* Step 1 */}
          <View style={styles.stepCol}>
            <View style={styles.stepCircleDone}>
              <MaterialIcons name="check" size={16} color="#ffffff" />
            </View>
            <Text style={styles.stepLabel}>Live Capture</Text>
          </View>

          <View style={styles.stepperLine} />

          {/* Step 2 */}
          <View style={styles.stepCol}>
            <View style={styles.stepCircleDone}>
              <MaterialIcons name="check" size={16} color="#ffffff" />
            </View>
            <Text style={styles.stepLabel}>Upload</Text>
          </View>

          <View style={styles.stepperLine} />

          {/* Step 3 (Active) */}
          <View style={styles.stepCol}>
            <View style={styles.stepCircleActive}>
              <Text style={styles.stepNumActive}>3</Text>
            </View>
            <Text style={styles.stepLabelActive}>Result</Text>
          </View>
        </View>

        {/* Identity Verified Card */}
        <View style={styles.identityCard}>
          <View style={styles.verifiedBadgeContainer}>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified-user" size={14} color="#137333" />
              <Text style={styles.verifiedBadgeText}>MATCH VERIFIED</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>Identity Verified</Text>
          <Text style={styles.cardSubtitle}>
            The submitted identity matches the verification records with high confidence.
          </Text>

          {/* Applicant Info Box */}
          <View style={styles.applicantBox}>
            <View style={styles.avatarInitials}>
              <Text style={styles.initialsText}>AM</Text>
            </View>

            <View style={styles.applicantDetails}>
              <Text style={styles.applicantName}>Alex Morgan</Text>
              <Text style={styles.applicantSub}>United States · DOB: 12 Mar 1992</Text>
              <Text style={styles.applicantPid}>PID: PER-849201</Text>
            </View>

            <View style={styles.confidenceBox}>
              <Text style={styles.confidenceLabel}>CONFIDENCE</Text>
              <Text style={styles.confidenceValue}>98.7%</Text>
            </View>
          </View>

          {/* Sub-results Grid */}
          <View style={styles.subResultsGrid}>
            <View style={styles.subResultItem}>
              <Text style={styles.subResultLabel}>Face match</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={16} color="#137333" />
                <Text style={styles.subResultStatusText}>PASSED</Text>
              </View>
            </View>

            <View style={styles.subResultItem}>
              <Text style={styles.subResultLabel}>Liveness check</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={16} color="#137333" />
                <Text style={styles.subResultStatusText}>PASSED</Text>
              </View>
            </View>

            <View style={styles.subResultItem}>
              <Text style={styles.subResultLabel}>Watchlist</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={16} color="#137333" />
                <Text style={styles.subResultStatusText}>CLEAR</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Document Checks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document checks</Text>

          <View style={styles.docItemCard}>
            <View style={styles.docIconBox}>
              <MaterialIcons name="menu-book" size={22} color="#1a1c1c" />
            </View>
            <View style={styles.docItemDetails}>
              <Text style={styles.docItemTitle}>Passport</Text>
              <Text style={styles.docItemSub}>P8742031 · United States</Text>
            </View>
            <Text style={styles.docVerifiedTag}>VERIFIED</Text>
          </View>

          <View style={styles.docItemCard}>
            <View style={styles.docIconBox}>
              <MaterialIcons name="badge" size={22} color="#1a1c1c" />
            </View>
            <View style={styles.docItemDetails}>
              <Text style={styles.docItemTitle}>National ID</Text>
              <Text style={styles.docItemSub}>Ending 4821</Text>
            </View>
            <Text style={styles.docVerifiedTag}>VERIFIED</Text>
          </View>
        </View>

        {/* Audit Trail Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audit trail</Text>

          <View style={styles.timeline}>
            {/* Event 1 */}
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.dotActive]} />
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineEventTitle}>Verification completed</Text>
                  <Text style={styles.timelineTime}>14:34</Text>
                </View>
                <Text style={styles.timelineEventDesc}>
                  Result generated and securely recorded.
                </Text>
              </View>
            </View>

            {/* Event 2 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineEventTitle}>Documents validated</Text>
                  <Text style={styles.timelineTime}>14:33</Text>
                </View>
                <Text style={styles.timelineEventDesc}>
                  Passport and ID checks passed.
                </Text>
              </View>
            </View>

            {/* Event 3 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineEventTitle}>Face captured</Text>
                  <Text style={styles.timelineTime}>14:32</Text>
                </View>
                <Text style={styles.timelineEventDesc}>
                  Liveness session initiated.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Accept / Deny Action Section */}
        <View style={styles.decisionSection}>
          <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
            <MaterialIcons name="check-circle" size={20} color="#ffffff" />
            <Text style={styles.acceptBtnText}>Accept Verification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.denyBtn} onPress={handleDeny}>
            <MaterialIcons name="cancel" size={20} color="#444748" />
            <Text style={styles.denyBtnText}>Deny Verification</Text>
          </TouchableOpacity>

          <Text style={styles.decisionNote}>
            Finalizing this action will update the user's status and notify the relevant departments.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions Bar */}
      <View style={styles.stickyBottomBar}>
        <View style={styles.secureIndicator}>
          <MaterialIcons name="lock" size={16} color="#444748" />
          <Text style={styles.secureIndicatorText}>SECURE SESSION</Text>
        </View>

        <View style={styles.stickyButtonsRow}>
          <TouchableOpacity style={styles.secondaryActionBtn} onPress={handleDownload}>
            <MaterialIcons name="download" size={16} color="#444748" />
            <Text style={styles.secondaryActionBtnText}>Download Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryActionBtn} onPress={onNewVerification}>
            <MaterialIcons name="add" size={16} color="#444748" />
            <Text style={styles.secondaryActionBtnText}>New Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fdfcfa',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c7c8',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    justifyContent: 'space-between',
    zIndex: 50,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    color: '#1a1c1c',
    flex: 1,
  },
  idBadge: {
    borderWidth: 1,
    borderColor: '#8e9192',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.default,
  },
  idBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#444748',
  },
  container: {
    flex: 1,
    backgroundColor: '#fdfcfa',
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 20,
    paddingBottom: 110,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
    gap: 24,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0efee',
    borderWidth: 1,
    borderColor: '#c4c7c8',
    borderRadius: rounded.lg,
    padding: 16,
  },
  stepCol: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircleDone: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1a1c1c',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepNumActive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1c1c',
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#1a1c1c',
  },
  stepLabelActive: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#1a1c1c',
  },
  stepperLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#c4c7c8',
    marginHorizontal: 8,
  },
  identityCard: {
    backgroundColor: '#f0efee',
    borderWidth: 1,
    borderColor: '#c4c7c8',
    borderRadius: rounded.xl,
    padding: 24,
    position: 'relative',
    gap: 16,
  },
  verifiedBadgeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F4EA',
    borderWidth: 1,
    borderColor: '#CEEAD6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.default,
  },
  verifiedBadgeText: {
    color: '#137333',
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#121317',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#444748',
    maxWidth: '75%',
  },
  applicantBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: '#c4c7c8',
    gap: 14,
  },
  avatarInitials: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e4e2e1',
    borderWidth: 1,
    borderColor: '#8e9192',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1c1c',
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#121317',
  },
  applicantSub: {
    fontSize: 14,
    color: '#444748',
    marginTop: 2,
  },
  applicantPid: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#444748',
    marginTop: 4,
  },
  confidenceBox: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#444748',
  },
  confidenceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#121317',
  },
  subResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subResultItem: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: '#c4c7c8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subResultLabel: {
    fontSize: 13,
    color: '#444748',
  },
  subResultStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subResultStatusText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#137333',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#121317',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c7c8',
    paddingBottom: 8,
  },
  docItemCard: {
    backgroundColor: '#f0efee',
    borderWidth: 1,
    borderColor: '#c4c7c8',
    borderRadius: rounded.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  docIconBox: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: '#8e9192',
  },
  docItemDetails: {
    flex: 1,
  },
  docItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121317',
  },
  docItemSub: {
    fontSize: 13,
    color: '#444748',
    marginTop: 2,
  },
  docVerifiedTag: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#137333',
  },
  timeline: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#c4c7c8',
    marginLeft: 12,
    gap: 18,
  },
  timelineItem: {
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -22,
    top: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8e9192',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  dotActive: {
    backgroundColor: '#1a1c1c',
  },
  timelineContent: {
    gap: 2,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineEventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#121317',
  },
  timelineTime: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#444748',
  },
  timelineEventDesc: {
    fontSize: 13,
    color: '#444748',
  },
  decisionSection: {
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#c4c7c8',
    paddingTop: 24,
  },
  acceptBtn: {
    backgroundColor: '#1a1c1c',
    paddingVertical: 14,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  acceptBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  denyBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#8e9192',
    paddingVertical: 14,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  denyBtnText: {
    color: '#444748',
    fontSize: 16,
    fontWeight: '600',
  },
  decisionNote: {
    fontSize: 13,
    color: '#444748',
    textAlign: 'center',
    lineHeight: 18,
  },
  stickyBottomBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#c4c7c8',
    paddingVertical: 12,
    paddingHorizontal: spacing.marginMobile,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      },
    }),
  },
  secureIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  secureIndicatorText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#444748',
  },
  stickyButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: '#c4c7c8',
    backgroundColor: '#ffffff',
  },
  secondaryActionBtnText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444748',
  },
});
