import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, rounded, spacing } from '../theme/theme';

interface FaceCaptureScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const FaceCaptureScreen: React.FC<FaceCaptureScreenProps> = ({
  onBack,
  onNext,
}) => {
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const handleCapture = () => {
    setPhotoCaptured(true);
  };

  const handleRetake = () => {
    setPhotoCaptured(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={20} color="#475569" />
        <Text style={styles.backBtnText}>Back to Scan</Text>
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.pageTitle}>New Verification</Text>
          <Text style={styles.pageSubtitle}>Complete each step to verify the identity.</Text>
        </View>
        <View style={styles.idBadge}>
          <Text style={styles.idBadgeLabel}>ID:</Text>
          <Text style={styles.idBadgeValue}>VF-20481</Text>
        </View>
      </View>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        {/* Step 1 (Active) */}
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={styles.stepNumActive}>1</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Live Capture</Text>
        </View>

        <View style={styles.stepLine} />

        {/* Step 2 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNum}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Document Upload</Text>
        </View>

        <View style={styles.stepLine} />

        {/* Step 3 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNum}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Result</Text>
        </View>
      </View>

      {/* Camera Section */}
      <View style={styles.cameraCard}>
        <View style={styles.cameraHeader}>
          <View>
            <Text style={styles.cameraTitle}>Live Face Capture</Text>
            <Text style={styles.cameraSubtitle}>Position face inside the guide.</Text>
          </View>
          <View style={styles.cameraReadyBadge}>
            <View style={styles.readyDot} />
            <Text style={styles.readyText}>CAMERA READY</Text>
          </View>
        </View>

        {/* Camera Preview Area */}
        <View style={styles.cameraViewport}>
          {/* Face Guide Overlay */}
          <View
            style={[
              styles.faceGuideOverlay,
              photoCaptured && styles.faceGuideCaptured,
            ]}
          >
            <MaterialIcons
              name={photoCaptured ? 'check-circle' : 'face'}
              size={54}
              color={photoCaptured ? '#16a34a' : 'rgba(15, 23, 42, 0.4)'}
            />
            <View style={styles.faceGuidePill}>
              <Text style={styles.faceGuideText}>
                {photoCaptured ? 'FACE ACQUIRED' : 'FACE GUIDE'}
              </Text>
            </View>
          </View>

          {/* Live Indicator */}
          <View style={styles.liveIndicatorPill}>
            <MaterialIcons name="info" size={16} color="#0f172a" />
            <Text style={styles.liveIndicatorText}>
              {photoCaptured ? 'PHOTO FROZEN' : 'LIVE PREVIEW'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.cameraActions}>
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={handleCapture}
            activeOpacity={0.85}
          >
            <MaterialIcons name="camera-alt" size={18} color="#ffffff" />
            <Text style={styles.captureBtnText}>
              {photoCaptured ? 'Photo Captured' : 'Capture Photo'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={handleRetake}
            activeOpacity={0.85}
          >
            <MaterialIcons name="refresh" size={18} color="#0f172a" />
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Checklist (3 cards) */}
      <View style={styles.checklistGrid}>
        <View style={styles.checkCard}>
          <MaterialIcons name="center-focus-strong" size={20} color="#0f172a" />
          <Text style={styles.checkCardText}>Ensure face is centered</Text>
        </View>

        <View style={styles.checkCard}>
          <MaterialIcons name="light-mode" size={20} color="#0f172a" />
          <Text style={styles.checkCardText}>Good lighting</Text>
        </View>

        <View style={styles.checkCard}>
          <MaterialIcons name="masks" size={20} color="#0f172a" />
          <Text style={styles.checkCardText}>Remove mask/glasses</Text>
        </View>
      </View>

      {/* Footer Data & Next Action */}
      <View style={styles.footerCard}>
        <View style={styles.footerDataGroup}>
          <View style={styles.footerDataItem}>
            <Text style={styles.footerDataLabel}>CHECKPOINT ID</Text>
            <Text style={styles.footerDataValue}>CP-08A4-219</Text>
          </View>
          <View style={styles.footerDataItem}>
            <Text style={styles.footerDataLabel}>OFFICER ID</Text>
            <Text style={styles.footerDataValue}>OFF-1042</Text>
          </View>
          <View style={[styles.footerDataItem, styles.hideOnSmall]}>
            <Text style={styles.footerDataLabel}>TIMESTAMP</Text>
            <Text style={styles.footerDataValue}>2025-03-08 14:32:18 UTC</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, !photoCaptured && styles.nextBtnDisabled]}
          onPress={() => {
            if (!photoCaptured) {
              Alert.alert('Face Capture Required', 'Please tap "Capture Photo" before proceeding to document upload.');
              return;
            }
            onNext();
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>Next</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
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
    paddingVertical: 20,
    paddingBottom: 100,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: -8,
  },
  backBtnText: {
    fontSize: 14,
    color: '#475569',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: rounded.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#f8fafc',
  },
  idBadgeLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#475569',
  },
  idBadgeValue: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#0f172a',
  },
  stepperContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: rounded.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  stepNum: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  stepNumActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  stepLabelActive: {
    color: '#0f172a',
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  cameraCard: {
    backgroundColor: '#ffffff',
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    gap: 16,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  cameraSubtitle: {
    fontSize: 14,
    color: '#475569',
  },
  cameraReadyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rounded.full,
  },
  readyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#166534',
  },
  readyText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#166534',
  },
  cameraViewport: {
    height: 260,
    borderRadius: rounded.lg,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  faceGuideOverlay: {
    width: 170,
    height: 210,
    borderRadius: 85,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#0f172a',
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  faceGuideCaptured: {
    borderColor: '#16a34a',
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
  },
  faceGuidePill: {
    backgroundColor: 'rgba(226, 232, 240, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  faceGuideText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#0f172a',
  },
  liveIndicatorPill: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  liveIndicatorText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
    color: '#0f172a',
  },
  cameraActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  captureBtn: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: rounded.default,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  captureBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  retakeBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: rounded.default,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  retakeBtnText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  checklistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  checkCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: rounded.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCardText: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '500',
  },
  footerCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: rounded.lg,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  footerDataGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  footerDataItem: {},
  footerDataLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#475569',
  },
  footerDataValue: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#0f172a',
    fontWeight: '600',
    marginTop: 2,
  },
  hideOnSmall: {
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  nextBtn: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: rounded.default,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nextBtnDisabled: {
    opacity: 0.6,
  },
  nextBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
