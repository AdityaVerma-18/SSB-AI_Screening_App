import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded, spacing } from '../theme/theme';

interface DocumentUploadScreenProps {
  onBack: () => void;
  onNext: () => void;
  isDark?: boolean;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  onBack,
  onNext,
  isDark = false,
}) => {
  const theme = getTheme(isDark);
  const [visaAttached, setVisaAttached] = useState<boolean>(false);
  const [nationalIdAttached, setNationalIdAttached] = useState<boolean>(false);

  const [extractedData, setExtractedData] = useState({
    fullName: 'Alex Morgan',
    docNumber: 'P8742031',
    nationality: 'United States',
    dob: '12 Mar 1992',
  });

  const handleAttachVisa = () => {
    setVisaAttached(true);
    Alert.alert('Visa Uploaded', 'Tourist Visa (V-90812) attached and scanned.');
  };

  const handleAttachId = () => {
    setNationalIdAttached(true);
    Alert.alert('National ID Uploaded', 'US State ID (ending 4821) verified.');
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
          <Text style={[styles.backLinkText, { color: theme.textSecondary }]}>Back to Step 1</Text>
        </TouchableOpacity>

        {/* Page Title & ID Badge */}
        <View style={styles.headerSection}>
          <View style={styles.headerTitleCol}>
            <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Document Upload</Text>
            <Text style={[styles.pageSubtitle, { color: theme.textMuted }]} numberOfLines={1}>
              Upload and scan government issued credentials.
            </Text>
          </View>

          <View style={[styles.idBadge, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
            <Text style={[styles.idBadgeLabel, { color: theme.textMuted }]}>ID:</Text>
            <Text style={[styles.idBadgeValue, { color: theme.textPrimary }]}>VF-20481</Text>
          </View>
        </View>

        {/* Stepper Navigation */}
        <View style={[styles.stepperContainer, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? '#143820' : '#e6f4ea', borderColor: theme.badgeOperational }]}>
              <MaterialIcons name="check" size={14} color={theme.badgeOperational} />
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary }]} numberOfLines={1}>
              Live Capture
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          {/* Step 2 (Active) */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepNumActive}>2</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary, fontWeight: '700' }]} numberOfLines={1}>
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

        {/* Passport Card (Uploaded) */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>Passport Document</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Primary travel identifier</Text>
            </View>

            <View style={[styles.verifiedPill, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
              <MaterialIcons name="check-circle" size={13} color={theme.badgeOperational} />
              <Text style={[styles.verifiedPillText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>UPLOADED</Text>
            </View>
          </View>

          <View style={[styles.fileAttachmentBox, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
            <View style={styles.fileLeft}>
              <MaterialIcons name="menu-book" size={24} color={theme.textPrimary} />
              <View>
                <Text style={[styles.fileName, { color: theme.textPrimary }]}>passport-front.jpg</Text>
                <Text style={[styles.fileMeta, { color: theme.textMuted }]}>2.4 MB · High Resolution OCR</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Preview', 'Displaying passport-front.jpg')}>
              <MaterialIcons name="visibility" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Visa Document (Drop Zone) */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>Visa (Optional / Secondary)</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Attach entry permit if required</Text>
            </View>
            {visaAttached ? (
              <View style={[styles.verifiedPill, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
                <MaterialIcons name="check-circle" size={13} color={theme.badgeOperational} />
                <Text style={[styles.verifiedPillText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>ATTACHED</Text>
              </View>
            ) : (
              <View style={[styles.pendingPill, { backgroundColor: theme.isDark ? '#4a3615' : '#fefce8', borderColor: theme.isDark ? '#7a5924' : '#fef08a' }]}>
                <Text style={[styles.pendingPillText, { color: theme.isDark ? '#ffcc00' : '#854d0e' }]}>PENDING</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.dropZone,
              {
                borderColor: theme.borderDark,
                backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#fafafa',
              },
            ]}
            onPress={handleAttachVisa}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={visaAttached ? 'check-circle' : 'add-photo-alternate'}
              size={28}
              color={visaAttached ? theme.badgeOperational : theme.textMuted}
            />
            <Text style={[styles.dropZoneText, { color: theme.textPrimary }]}>
              {visaAttached ? 'Visa attached (tourist-visa.pdf)' : 'Tap to scan or attach Visa'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* National ID Document */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>National Identity Card</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Secondary biometric proof</Text>
            </View>
            {nationalIdAttached ? (
              <View style={[styles.verifiedPill, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
                <MaterialIcons name="check-circle" size={13} color={theme.badgeOperational} />
                <Text style={[styles.verifiedPillText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>ATTACHED</Text>
              </View>
            ) : (
              <View style={[styles.pendingPill, { backgroundColor: theme.isDark ? '#4a3615' : '#fefce8', borderColor: theme.isDark ? '#7a5924' : '#fef08a' }]}>
                <Text style={[styles.pendingPillText, { color: theme.isDark ? '#ffcc00' : '#854d0e' }]}>PENDING</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.dropZone,
              {
                borderColor: theme.borderDark,
                backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#fafafa',
              },
            ]}
            onPress={handleAttachId}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={nationalIdAttached ? 'check-circle' : 'badge'}
              size={28}
              color={nationalIdAttached ? theme.badgeOperational : theme.textMuted}
            />
            <Text style={[styles.dropZoneText, { color: theme.textPrimary }]}>
              {nationalIdAttached ? 'National ID attached (state-id.jpg)' : 'Tap to scan National ID'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Extracted Fields Form */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>Extracted Passport Fields (AI OCR)</Text>

          <View style={styles.formGrid}>
            <View style={styles.formCol}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>FULL NAME</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.inputText }]}
                value={extractedData.fullName}
                onChangeText={(val) => setExtractedData((p) => ({ ...p, fullName: val }))}
              />
            </View>

            <View style={styles.formCol}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>DOCUMENT NUMBER</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.inputText }]}
                value={extractedData.docNumber}
                onChangeText={(val) => setExtractedData((p) => ({ ...p, docNumber: val }))}
              />
            </View>

            <View style={styles.formCol}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>NATIONALITY</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.inputText }]}
                value={extractedData.nationality}
                onChangeText={(val) => setExtractedData((p) => ({ ...p, nationality: val }))}
              />
            </View>

            <View style={styles.formCol}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>DATE OF BIRTH</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.inputText }]}
                value={extractedData.dob}
                onChangeText={(val) => setExtractedData((p) => ({ ...p, dob: val }))}
              />
            </View>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' }]}
          onPress={onNext}
          activeOpacity={0.85}
        >
          <Text style={[styles.nextButtonText, { color: theme.isDark ? '#000000' : '#ffffff' }]}>
            Run AI Verification Check
          </Text>
          <MaterialIcons name="arrow-forward" size={18} color={theme.isDark ? '#000000' : '#ffffff'} />
        </TouchableOpacity>
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
  docCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  docHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docCardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  docCardSubtitle: {
    fontSize: 12,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.default,
    borderWidth: 1,
    gap: 4,
    flexShrink: 0,
  },
  verifiedPillText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  pendingPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.default,
    borderWidth: 1,
    flexShrink: 0,
  },
  pendingPillText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  fileAttachmentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: rounded.lg,
    borderWidth: 1,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
  },
  fileMeta: {
    fontSize: 11,
  },
  dropZone: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: rounded.lg,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dropZoneText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formGrid: {
    gap: 10,
  },
  formCol: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: rounded.md,
    paddingVertical: 9,
    paddingHorizontal: 12,
    fontSize: 14,
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
