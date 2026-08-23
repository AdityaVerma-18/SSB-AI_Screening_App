import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded, spacing } from '../theme/theme';

interface FaceCaptureScreenProps {
  onBack: () => void;
  onNext: () => void;
  isDark?: boolean;
}

export const FaceCaptureScreen: React.FC<FaceCaptureScreenProps> = ({
  onBack,
  onNext,
  isDark = false,
}) => {
  const theme = getTheme(isDark);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [photoCaptured, setPhotoCaptured] = useState<boolean>(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setPhotoCaptured(true);
    }, 900);
  };

  const handleRetake = () => {
    setPhotoCaptured(false);
  };

  const handleProceed = () => {
    if (!photoCaptured) {
      Alert.alert(
        'Photo Required',
        'Please capture the subject photo before proceeding to document upload.'
      );
      return;
    }
    onNext();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Link */}
        <TouchableOpacity style={styles.backLink} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={18} color={theme.textSecondary} />
          <Text style={[styles.backLinkText, { color: theme.textSecondary }]}>Back to Dashboard</Text>
        </TouchableOpacity>

        {/* Page Title & ID Badge Header */}
        <View style={styles.headerSection}>
          <View style={styles.headerTitleCol}>
            <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>New Verification</Text>
            <Text style={[styles.pageSubtitle, { color: theme.textMuted }]} numberOfLines={1}>
              Complete each step to verify the identity.
            </Text>
          </View>

          <View style={[styles.idBadge, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
            <Text style={[styles.idBadgeLabel, { color: theme.textMuted }]}>ID:</Text>
            <Text style={[styles.idBadgeValue, { color: theme.textPrimary }]}>VF-20481</Text>
          </View>
        </View>

        {/* Stepper Navigation (Responsive Flex Layout) */}
        <View style={[styles.stepperContainer, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          {/* Step 1 (Active) */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepNumActive}>1</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary, fontWeight: '700' }]} numberOfLines={1}>
              Live Capture
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f3f4f6', borderColor: theme.border }]}>
              <Text style={[styles.stepNum, { color: theme.textMuted }]}>2</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textMuted }]} numberOfLines={1}>
              Upload
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          {/* Step 3 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f3f4f6', borderColor: theme.border }]}>
              <Text style={[styles.stepNum, { color: theme.textMuted }]}>3</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textMuted }]} numberOfLines={1}>
              Result
            </Text>
          </View>
        </View>

        {/* Camera Live Preview Card */}
        <View style={[styles.cameraCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.cameraHeader}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.cameraTitle, { color: theme.textPrimary }]}>Live Face Capture</Text>
              <Text style={[styles.cameraSubtitle, { color: theme.textMuted }]}>
                Position face inside the guide.
              </Text>
            </View>

            <View style={[styles.cameraReadyBadge, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
              <View style={[styles.readyDot, { backgroundColor: theme.badgeOperational }]} />
              <Text style={[styles.cameraReadyText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>
                {photoCaptured ? 'ACQUIRED' : 'CAMERA READY'}
              </Text>
            </View>
          </View>

          {/* Viewport */}
          <View style={[styles.viewport, { backgroundColor: theme.isDark ? '#0e0f12' : '#f0f4f8' }]}>
            <View style={[styles.faceGuideOval, { borderColor: photoCaptured ? theme.badgeOperational : (theme.isDark ? '#6b7280' : '#4b5563') }]}>
              <MaterialIcons
                name="account-circle"
                size={72}
                color={photoCaptured ? theme.badgeOperational : (theme.isDark ? '#4b5563' : '#9ca3af')}
              />
              <View style={[styles.guidePill, { backgroundColor: theme.isDark ? 'rgba(30,31,35,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                <Text style={[styles.guidePillText, { color: theme.textPrimary }]}>
                  {photoCaptured ? 'FACE ACQUIRED ✓' : 'FACE GUIDE'}
                </Text>
              </View>
            </View>

            <View style={[styles.liveIndicator, { backgroundColor: theme.isDark ? 'rgba(30,31,35,0.9)' : 'rgba(255,255,255,0.9)' }]}>
              <MaterialIcons name="info" size={13} color={theme.textMuted} />
              <Text style={[styles.liveIndicatorText, { color: theme.textPrimary }]}>LIVE PREVIEW</Text>
            </View>
          </View>

          {/* Capture Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' },
                isCapturing && { opacity: 0.7 },
              ]}
              onPress={handleCapture}
              disabled={isCapturing}
              activeOpacity={0.85}
            >
              {isCapturing ? (
                <ActivityIndicator color={theme.isDark ? '#000000' : '#ffffff'} size="small" />
              ) : (
                <>
                  <MaterialIcons
                    name="camera-alt"
                    size={18}
                    color={theme.isDark ? '#000000' : '#ffffff'}
                  />
                  <Text style={[styles.captureButtonText, { color: theme.isDark ? '#000000' : '#ffffff' }]}>
                    {photoCaptured ? 'Recapture' : 'Capture Photo'}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.retakeButton, { borderColor: theme.border, backgroundColor: theme.surfaceCard }]}
              onPress={handleRetake}
              activeOpacity={0.8}
            >
              <MaterialIcons name="refresh" size={18} color={theme.textPrimary} />
              <Text style={[styles.retakeButtonText, { color: theme.textPrimary }]}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Capture Guidelines Checklist */}
        <View style={styles.checklistSection}>
          <Text style={[styles.checklistHeader, { color: theme.textPrimary }]}>Capture checklist</Text>
          <View style={styles.checklistGrid}>
            <View style={[styles.checkItem, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
              <MaterialIcons name="check-circle" size={16} color={theme.badgeOperational} />
              <Text style={[styles.checkItemText, { color: theme.textSecondary }]}>Ensure face is centered</Text>
            </View>

            <View style={[styles.checkItem, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
              <MaterialIcons name="check-circle" size={16} color={theme.badgeOperational} />
              <Text style={[styles.checkItemText, { color: theme.textSecondary }]}>Good lighting on subject</Text>
            </View>

            <View style={[styles.checkItem, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
              <MaterialIcons name="check-circle" size={16} color={theme.badgeOperational} />
              <Text style={[styles.checkItemText, { color: theme.textSecondary }]}>Remove mask or glasses</Text>
            </View>
          </View>
        </View>

        {/* Footer Meta & Next Button */}
        <View style={[styles.footerCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.metaRow}>
            <Text style={[styles.footerMetaText, { color: theme.textMuted }]}>
              Checkpoint: <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>CHK-00184</Text>
            </Text>
            <Text style={[styles.footerMetaText, { color: theme.textMuted }]}>
              Officer: <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>OFF-1042</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' },
              !photoCaptured && { opacity: 0.6 },
            ]}
            onPress={handleProceed}
            activeOpacity={0.85}
          >
            <Text style={[styles.nextButtonText, { color: theme.isDark ? '#000000' : '#ffffff' }]}>
              Next: Document Upload
            </Text>
            <MaterialIcons name="arrow-forward" size={18} color={theme.isDark ? '#000000' : '#ffffff'} />
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
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: '500',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  headerTitleCol: {
    flex: 1,
    gap: 2,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  pageSubtitle: {
    fontSize: 12,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.default,
    flexShrink: 0,
  },
  idBadgeLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
  },
  idBadgeValue: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
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
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepCircleActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '600',
  },
  stepNumActive: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  stepLine: {
    flex: 1,
    height: 1,
    minWidth: 10,
    marginHorizontal: 4,
  },
  cameraCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cameraSubtitle: {
    fontSize: 12,
  },
  cameraReadyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.default,
    borderWidth: 1,
    gap: 4,
    flexShrink: 0,
  },
  readyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cameraReadyText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  viewport: {
    height: 240,
    borderRadius: rounded.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  faceGuideOval: {
    width: 140,
    height: 180,
    borderRadius: 70,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  guidePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.full,
  },
  guidePillText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  liveIndicator: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.full,
  },
  liveIndicatorText: {
    fontSize: 9,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  captureButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: rounded.lg,
    gap: 6,
  },
  captureButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  retakeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
    gap: 4,
  },
  retakeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checklistSection: {
    gap: 8,
  },
  checklistHeader: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: typography.fontFamily.mono,
    textTransform: 'uppercase',
  },
  checklistGrid: {
    gap: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: rounded.md,
    borderWidth: 1,
    gap: 8,
  },
  checkItemText: {
    fontSize: 12,
  },
  footerCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerMetaText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: rounded.lg,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
