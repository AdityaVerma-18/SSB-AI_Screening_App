import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, rounded, spacing } from '../theme/theme';

interface DocumentUploadScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  onBack,
  onNext,
}) => {
  const [visaUploaded, setVisaUploaded] = useState(false);
  const [nationalIdUploaded, setNationalIdUploaded] = useState(false);

  const handleSimulateUpload = (type: 'visa' | 'nationalId') => {
    if (type === 'visa') {
      setVisaUploaded(true);
      Alert.alert('Visa Document Attached', 'visa-scanned.pdf (1.8 MB) verified and attached.');
    } else {
      setNationalIdUploaded(true);
      Alert.alert('National ID Attached', 'national-id.jpg (2.1 MB) verified and attached.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.flowStepLabel}>VERIFICATION FLOW · STEP 2 OF 3</Text>
          <Text style={styles.flowTitle}>Upload Identity Documents</Text>
          <Text style={styles.flowSubtitle}>
            Add the required documents to continue your identity verification.
          </Text>
        </View>

        {/* Minimalist Stepper */}
        <View style={styles.stepperBar}>
          <View style={styles.stepperItem}>
            <MaterialIcons name="check-circle" size={16} color="#6b7280" />
            <Text style={styles.stepperItemInactiveText}>Details</Text>
          </View>

          <View style={styles.stepperDivider} />

          <View style={styles.stepperItem}>
            <View style={styles.stepperActiveBadge}>
              <Text style={styles.stepperActiveBadgeText}>2</Text>
            </View>
            <Text style={styles.stepperActiveItemText}>Documents</Text>
          </View>

          <View style={styles.stepperDivider} />

          <View style={styles.stepperItem}>
            <View style={styles.stepperInactiveBadge}>
              <Text style={styles.stepperInactiveBadgeText}>3</Text>
            </View>
            <Text style={styles.stepperItemInactiveText}>Review</Text>
          </View>
        </View>
      </View>

      {/* Upload Cards Section (Grid) */}
      <View style={styles.cardsGrid}>
        {/* Passport Card (Uploaded) */}
        <View style={styles.uploadCard}>
          <View style={styles.uploadCardHeader}>
            <View style={styles.uploadCardTitleGroup}>
              <MaterialIcons name="menu-book" size={20} color="#111827" />
              <View>
                <Text style={styles.uploadDocTitle}>Passport Image</Text>
                <Text style={styles.requiredTag}>REQUIRED</Text>
              </View>
            </View>
            <View style={styles.uploadedBadge}>
              <Text style={styles.uploadedBadgeText}>UPLOADED</Text>
            </View>
          </View>

          <View style={styles.filePreviewBox}>
            <View style={styles.filePreviewLeft}>
              <MaterialIcons name="description" size={20} color="#6b7280" />
              <View>
                <Text style={styles.fileNameText}>passport-front.jpg</Text>
                <Text style={styles.fileMetaText}>2.4 MB · Verified</Text>
              </View>
            </View>
            <MaterialIcons name="check-circle" size={18} color="#16a34a" />
          </View>

          <View style={styles.cardActionsRow}>
            <TouchableOpacity
              style={styles.actionOutlineBtn}
              onPress={() => Alert.alert('Camera Scan', 'Optical Passport MRZ scanner active.')}
            >
              <MaterialIcons name="photo-camera" size={16} color="#374151" />
              <Text style={styles.actionBtnText}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionGreyBtn}
              onPress={() => Alert.alert('Replace', 'Select replacement file.')}
            >
              <Text style={styles.actionBtnText}>Replace</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Visa Card */}
        <View style={[styles.uploadCard, !visaUploaded && styles.dashedCard]}>
          <View style={styles.uploadCardHeader}>
            <View style={styles.uploadCardTitleGroup}>
              <MaterialIcons name="airplane-ticket" size={20} color="#6b7280" />
              <View>
                <Text style={styles.uploadDocTitle}>Visa Image</Text>
                <Text style={styles.requiredTag}>REQUIRED</Text>
              </View>
            </View>
            <View style={visaUploaded ? styles.uploadedBadge : styles.pendingBadge}>
              <Text style={visaUploaded ? styles.uploadedBadgeText : styles.pendingBadgeText}>
                {visaUploaded ? 'UPLOADED' : 'PENDING'}
              </Text>
            </View>
          </View>

          {visaUploaded ? (
            <View style={styles.filePreviewBox}>
              <View style={styles.filePreviewLeft}>
                <MaterialIcons name="description" size={20} color="#6b7280" />
                <View>
                  <Text style={styles.fileNameText}>visa-scanned.pdf</Text>
                  <Text style={styles.fileMetaText}>1.8 MB · Attached</Text>
                </View>
              </View>
              <MaterialIcons name="check-circle" size={18} color="#16a34a" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.dropZone}
              onPress={() => handleSimulateUpload('visa')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="cloud-upload" size={24} color="#9ca3af" />
              <Text style={styles.dropZoneTitle}>Drop visa image here</Text>
              <Text style={styles.dropZoneSub}>JPG, PNG or PDF · Max 10 MB</Text>
            </TouchableOpacity>
          )}

          <View style={styles.cardActionsRow}>
            <TouchableOpacity
              style={styles.actionOutlineBtn}
              onPress={() => handleSimulateUpload('visa')}
            >
              <MaterialIcons name="photo-camera" size={16} color="#374151" />
              <Text style={styles.actionBtnText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionGreyBtn}
              onPress={() => handleSimulateUpload('visa')}
            >
              <Text style={styles.actionBtnText}>Browse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* National ID Card */}
        <View style={[styles.uploadCard, !nationalIdUploaded && styles.dashedCard]}>
          <View style={styles.uploadCardHeader}>
            <View style={styles.uploadCardTitleGroup}>
              <MaterialIcons name="badge" size={20} color="#6b7280" />
              <View>
                <Text style={styles.uploadDocTitle}>National ID Image</Text>
                <Text style={styles.requiredTag}>REQUIRED</Text>
              </View>
            </View>
            <View style={nationalIdUploaded ? styles.uploadedBadge : styles.pendingBadge}>
              <Text style={nationalIdUploaded ? styles.uploadedBadgeText : styles.pendingBadgeText}>
                {nationalIdUploaded ? 'UPLOADED' : 'PENDING'}
              </Text>
            </View>
          </View>

          {nationalIdUploaded ? (
            <View style={styles.filePreviewBox}>
              <View style={styles.filePreviewLeft}>
                <MaterialIcons name="description" size={20} color="#6b7280" />
                <View>
                  <Text style={styles.fileNameText}>national-id.jpg</Text>
                  <Text style={styles.fileMetaText}>2.1 MB · Attached</Text>
                </View>
              </View>
              <MaterialIcons name="check-circle" size={18} color="#16a34a" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.dropZone}
              onPress={() => handleSimulateUpload('nationalId')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="cloud-upload" size={24} color="#9ca3af" />
              <Text style={styles.dropZoneTitle}>Drop national ID here</Text>
              <Text style={styles.dropZoneSub}>JPG, PNG or PDF · Max 10 MB</Text>
            </TouchableOpacity>
          )}

          <View style={styles.cardActionsRow}>
            <TouchableOpacity
              style={styles.actionOutlineBtn}
              onPress={() => handleSimulateUpload('nationalId')}
            >
              <MaterialIcons name="photo-camera" size={16} color="#374151" />
              <Text style={styles.actionBtnText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionGreyBtn}
              onPress={() => handleSimulateUpload('nationalId')}
            >
              <Text style={styles.actionBtnText}>Browse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Extracted Fields Section */}
      <View style={styles.extractedCard}>
        <View style={styles.extractedHeader}>
          <Text style={styles.extractedTitle}>Extracted Fields</Text>
          <Text style={styles.extractedSubtitle}>
            Review the information extracted from your documents.
          </Text>
        </View>

        <View style={styles.extractedFieldsGrid}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>FULL NAME</Text>
            <View style={styles.lockedInputWrapper}>
              <TextInput
                style={styles.fieldInput}
                value="Alex Morgan"
                editable={false}
              />
              <MaterialIcons
                name="lock"
                size={16}
                color="#9ca3af"
                style={styles.lockedIcon}
              />
            </View>
          </View>

          {/* Document Number */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>DOCUMENT NUMBER</Text>
            <View style={styles.lockedInputWrapper}>
              <TextInput
                style={styles.fieldInput}
                value="P8742031"
                editable={false}
              />
              <MaterialIcons
                name="lock"
                size={16}
                color="#9ca3af"
                style={styles.lockedIcon}
              />
            </View>
          </View>

          {/* Nationality */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>NATIONALITY</Text>
            <TextInput
              style={styles.fieldInput}
              value="United States"
              editable={false}
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
            <TextInput
              style={styles.fieldInput}
              value="12 Mar 1992"
              editable={false}
            />
          </View>
        </View>
      </View>

      {/* Bottom Page-Level Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.bottomBackBtn} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={16} color="#374151" />
          <Text style={styles.bottomBackBtnText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNextBtn} onPress={onNext}>
          <Text style={styles.bottomNextBtnText}>Next</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
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
  headerSection: {
    gap: 12,
  },
  headerTextGroup: {
    gap: 4,
  },
  flowStepLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
    letterSpacing: 0.8,
  },
  flowTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  flowSubtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  stepperBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 4,
  },
  stepperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepperItemInactiveText: {
    fontSize: 13,
    color: '#6b7280',
  },
  stepperDivider: {
    width: 16,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  stepperActiveBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperActiveBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  stepperActiveItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  stepperInactiveBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperInactiveBadgeText: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  uploadCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    gap: 14,
    justifyContent: 'space-between',
  },
  dashedCard: {
    borderStyle: 'dashed',
  },
  uploadCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  uploadCardTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadDocTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  requiredTag: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
    marginTop: 1,
  },
  uploadedBadge: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.default,
  },
  uploadedBadgeText: {
    color: '#15803d',
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  pendingBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rounded.default,
  },
  pendingBadgeText: {
    color: '#4b5563',
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  filePreviewBox: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rounded.lg,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filePreviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileNameText: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  fileMetaText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
    marginTop: 1,
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e5e7eb',
    borderRadius: rounded.lg,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#ffffff',
  },
  dropZoneTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  dropZoneSub: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    color: '#9ca3af',
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 'auto',
  },
  actionOutlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: rounded.lg,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  actionGreyBtn: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: rounded.lg,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  extractedCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rounded.xl,
    padding: 18,
    gap: 14,
  },
  extractedHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
    gap: 2,
  },
  extractedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  extractedSubtitle: {
    fontSize: 13,
    color: '#4b5563',
  },
  extractedFieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  fieldGroup: {
    flex: 1,
    minWidth: 220,
    gap: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
    letterSpacing: 0.5,
  },
  lockedInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  fieldInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: rounded.lg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
  },
  lockedIcon: {
    position: 'absolute',
    right: 10,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  bottomBackBtn: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: rounded.lg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bottomBackBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  bottomNextBtn: {
    backgroundColor: '#111827',
    borderRadius: rounded.lg,
    paddingHorizontal: 28,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bottomNextBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
});
