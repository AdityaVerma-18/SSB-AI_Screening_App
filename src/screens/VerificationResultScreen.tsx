import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ImageStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded, spacing } from '../theme/theme';
import { ScreeningRecord } from '../types';

interface VerificationResultScreenProps {
  onBack: () => void;
  onAccept: (record: ScreeningRecord) => void;
  onDeny: (record: ScreeningRecord) => void;
  onNewVerification: () => void;
  isDark?: boolean;
}

export const VerificationResultScreen: React.FC<VerificationResultScreenProps> = ({
  onBack,
  onAccept,
  onDeny,
  onNewVerification,
  isDark = false,
}) => {
  const theme = getTheme(isDark);

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
    <View style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.headerBorder }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={22} color={theme.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB62V0fU7VgX8Xcz8VzEmzn79m5m7udDvklvcajtLtgCQTQ9ErYO24i4jo_lDulzw5AIhLEHh0j7cJSLEEPYTo_A2w10QudGPstrhZqr3-L0i6H8fIVqCSdBpuxz5t446iEAVHCUN8NEWJfNBJF0mif69R9V7iA0_T-I0Zp56tWGDWZaCgnxHDXZDCyKIx6cb24lpne_8uKFKR9okGrTzzDp4V3e8jGSZTUGMtlO5M3oXgC7kCXQkYmPzaq5k2kpZp6qQ',
            }}
            style={styles.emblem as ImageStyle}
            resizeMode="contain"
          />
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]} numberOfLines={1}>
            Ministry of Home Affairs | SSB
          </Text>
        </View>

        <View style={[styles.idBadge, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <Text style={[styles.idBadgeText, { color: theme.textPrimary }]}>VF-20481</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper Navigation */}
        <View style={[styles.stepperContainer, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircleDone, { backgroundColor: theme.isDark ? '#143820' : '#e6f4ea', borderColor: theme.badgeOperational }]}>
              <MaterialIcons name="check" size={14} color={theme.badgeOperational} />
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary }]} numberOfLines={1}>
              Live Capture
            </Text>
          </View>

          <View style={[styles.stepperLine, { backgroundColor: theme.border }]} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircleDone, { backgroundColor: theme.isDark ? '#143820' : '#e6f4ea', borderColor: theme.badgeOperational }]}>
              <MaterialIcons name="check" size={14} color={theme.badgeOperational} />
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary }]} numberOfLines={1}>
              Upload
            </Text>
          </View>

          <View style={[styles.stepperLine, { backgroundColor: theme.border }]} />

          {/* Step 3 (Active) */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircleActive, { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' }]}>
              <Text style={[styles.stepNumActive, { color: theme.isDark ? '#000000' : '#ffffff' }]}>3</Text>
            </View>
            <Text style={[styles.stepLabelActive, { color: theme.textPrimary }]} numberOfLines={1}>
              Result
            </Text>
          </View>
        </View>

        {/* Identity Verified Card */}
        <View style={[styles.identityCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.verifiedBadgeContainer}>
            <View style={[styles.verifiedBadge, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
              <MaterialIcons name="verified-user" size={13} color={theme.badgeOperational} />
              <Text style={[styles.verifiedBadgeText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>MATCH VERIFIED</Text>
            </View>
          </View>

          <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Identity Verified</Text>
          <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
            The submitted identity matches the verification records with high confidence.
          </Text>

          {/* Applicant Info Box */}
          <View style={[styles.applicantBox, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
            <View style={[styles.avatarInitials, { backgroundColor: theme.isDark ? theme.surfaceContainerHighest : '#e2e8f0' }]}>
              <Text style={[styles.initialsText, { color: theme.textPrimary }]}>AM</Text>
            </View>

            <View style={styles.applicantDetails}>
              <Text style={[styles.applicantName, { color: theme.textPrimary }]}>Alex Morgan</Text>
              <Text style={[styles.applicantSub, { color: theme.textMuted }]}>United States · DOB: 12 Mar 1992</Text>
              <Text style={[styles.applicantPid, { color: theme.textMuted }]}>PID: PER-849201</Text>
            </View>

            <View style={styles.confidenceBox}>
              <Text style={[styles.confidenceLabel, { color: theme.textMuted }]}>CONFIDENCE</Text>
              <Text style={[styles.confidenceValue, { color: theme.badgeOperational }]}>98.7%</Text>
            </View>
          </View>

          {/* Sub-results Grid */}
          <View style={styles.subResultsGrid}>
            <View style={[styles.subResultItem, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <Text style={[styles.subResultLabel, { color: theme.textSecondary }]}>Face match</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={15} color={theme.badgeOperational} />
                <Text style={[styles.subResultStatusText, { color: theme.badgeOperational }]}>PASSED</Text>
              </View>
            </View>

            <View style={[styles.subResultItem, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <Text style={[styles.subResultLabel, { color: theme.textSecondary }]}>Liveness check</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={15} color={theme.badgeOperational} />
                <Text style={[styles.subResultStatusText, { color: theme.badgeOperational }]}>PASSED</Text>
              </View>
            </View>

            <View style={[styles.subResultItem, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <Text style={[styles.subResultLabel, { color: theme.textSecondary }]}>Watchlist</Text>
              <View style={styles.subResultStatus}>
                <MaterialIcons name="check-circle" size={15} color={theme.badgeOperational} />
                <Text style={[styles.subResultStatusText, { color: theme.badgeOperational }]}>CLEAR</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Document Checks Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, borderBottomColor: theme.borderLight }]}>
            Document checks
          </Text>

          <View style={[styles.docItemCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
            <View style={[styles.docIconBox, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9' }]}>
              <MaterialIcons name="menu-book" size={20} color={theme.textPrimary} />
            </View>
            <View style={styles.docItemDetails}>
              <Text style={[styles.docItemTitle, { color: theme.textPrimary }]}>Passport</Text>
              <Text style={[styles.docItemSub, { color: theme.textMuted }]}>P8742031 · United States</Text>
            </View>
            <Text style={[styles.docVerifiedTag, { color: theme.badgeOperational }]}>VERIFIED</Text>
          </View>

          <View style={[styles.docItemCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
            <View style={[styles.docIconBox, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9' }]}>
              <MaterialIcons name="badge" size={20} color={theme.textPrimary} />
            </View>
            <View style={styles.docItemDetails}>
              <Text style={[styles.docItemTitle, { color: theme.textPrimary }]}>National ID</Text>
              <Text style={[styles.docItemSub, { color: theme.textMuted }]}>Ending 4821</Text>
            </View>
            <Text style={[styles.docVerifiedTag, { color: theme.badgeOperational }]}>VERIFIED</Text>
          </View>
        </View>

        {/* Audit Trail Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, borderBottomColor: theme.borderLight }]}>
            Audit trail
          </Text>

          <View style={[styles.timeline, { borderLeftColor: theme.border }]}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: theme.badgeOperational }]} />
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={[styles.timelineEventTitle, { color: theme.textPrimary }]}>Verification completed</Text>
                  <Text style={[styles.timelineTime, { color: theme.textMuted }]}>14:34</Text>
                </View>
                <Text style={[styles.timelineEventDesc, { color: theme.textMuted }]}>
                  Result generated and securely recorded.
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: theme.textMuted }]} />
              <View style={styles.timelineContent}>
                <View style={styles.timelineRow}>
                  <Text style={[styles.timelineEventTitle, { color: theme.textPrimary }]}>Documents validated</Text>
                  <Text style={[styles.timelineTime, { color: theme.textMuted }]}>14:33</Text>
                </View>
                <Text style={[styles.timelineEventDesc, { color: theme.textMuted }]}>
                  Passport and ID checks passed.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={[styles.decisionSection, { borderTopColor: theme.borderLight }]}>
          <TouchableOpacity
            style={[styles.acceptBtn, { backgroundColor: theme.badgeOperational }]}
            onPress={handleAccept}
          >
            <MaterialIcons name="check-circle" size={18} color="#ffffff" />
            <Text style={styles.acceptBtnText}>Accept Verification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.denyBtn, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}
            onPress={handleDeny}
          >
            <MaterialIcons name="cancel" size={18} color={theme.errorText} />
            <Text style={[styles.denyBtnText, { color: theme.errorText }]}>Deny Verification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.stickyBottomBar as ViewStyle, { backgroundColor: theme.navBg, borderTopColor: theme.navBorder }]}>
        <View style={styles.secureIndicator}>
          <MaterialIcons name="lock" size={14} color={theme.textMuted} />
          <Text style={[styles.secureIndicatorText, { color: theme.textMuted }]}>SECURE SESSION</Text>
        </View>

        <View style={styles.stickyButtonsRow}>
          <TouchableOpacity
            style={[styles.secondaryActionBtn, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}
            onPress={handleDownload}
          >
            <MaterialIcons name="download" size={15} color={theme.textPrimary} />
            <Text style={[styles.secondaryActionBtnText, { color: theme.textPrimary }]}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryActionBtn, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}
            onPress={onNewVerification}
          >
            <MaterialIcons name="add" size={15} color={theme.textPrimary} />
            <Text style={[styles.secondaryActionBtnText, { color: theme.textPrimary }]}>New</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    zIndex: 50,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 6,
    overflow: 'hidden',
  },
  emblem: {
    width: 26,
    height: 26,
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    flexShrink: 1,
  },
  idBadge: {
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: rounded.default,
    flexShrink: 0,
  },
  idBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 14,
    paddingBottom: 40,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
    gap: 14,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: rounded.lg,
    padding: 10,
    gap: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  stepCircleDone: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumActive: {
    fontSize: 11,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  stepLabelActive: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  stepperLine: {
    flex: 1,
    height: 1,
    minWidth: 10,
    marginHorizontal: 4,
  },
  identityCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 16,
    position: 'relative',
    gap: 12,
  },
  verifiedBadgeContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: rounded.default,
    borderWidth: 1,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 12,
    maxWidth: '70%',
  },
  applicantBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
    gap: 10,
  },
  avatarInitials: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '600',
  },
  applicantSub: {
    fontSize: 11,
    marginTop: 1,
  },
  applicantPid: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    marginTop: 2,
  },
  confidenceBox: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  subResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subResultItem: {
    flex: 1,
    minWidth: 100,
    padding: 10,
    borderRadius: rounded.default,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subResultLabel: {
    fontSize: 11,
  },
  subResultStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  subResultStatusText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  docItemCard: {
    borderRadius: rounded.lg,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  docIconBox: {
    padding: 6,
    borderRadius: rounded.default,
  },
  docItemDetails: {
    flex: 1,
  },
  docItemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  docItemSub: {
    fontSize: 11,
  },
  docVerifiedTag: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  timeline: {
    paddingLeft: 14,
    borderLeftWidth: 1,
    marginLeft: 10,
    gap: 14,
  },
  timelineItem: {
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -19,
    top: 4,
    width: 9,
    height: 9,
    borderRadius: 5,
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
    fontSize: 13,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  timelineEventDesc: {
    fontSize: 11,
  },
  decisionSection: {
    gap: 10,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  acceptBtn: {
    paddingVertical: 12,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  acceptBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  denyBtn: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  denyBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stickyBottomBar: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: spacing.marginMobile,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  secureIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  secureIndicatorText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
  },
  stickyButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: rounded.default,
    borderWidth: 1,
  },
  secondaryActionBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
