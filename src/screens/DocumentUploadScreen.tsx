import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getTheme, typography, rounded, spacing } from '../theme/theme';

interface DocAttachment {
  name: string;
  uri?: string;
  size?: string;
  type?: string;
}

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

  const [passportDoc, setPassportDoc] = useState<DocAttachment>({
    name: 'passport-front.jpg',
    size: '2.4 MB',
    type: 'image/jpeg',
  });

  const [visaDoc, setVisaDoc] = useState<DocAttachment | null>(null);
  const [nationalIdDoc, setNationalIdDoc] = useState<DocAttachment | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const [extractedData, setExtractedData] = useState({
    fullName: 'Alex Morgan',
    docNumber: 'P8742031',
    nationality: 'United States',
    dob: '12 Mar 1992',
  });

  // Web File Picker Helper
  const pickFileWeb = (docType: 'passport' | 'visa' | 'id', isCamera: boolean) => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = isCamera ? 'image/*' : 'image/*,application/pdf';
    if (isCamera) {
      input.setAttribute('capture', 'environment');
    }

    input.onchange = (event: any) => {
      const file = event.target.files?.[0];
      if (file) {
        const sizeMB = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        const reader = new FileReader();
        reader.onload = (e) => {
          const resultUri = e.target?.result as string;
          const newDoc: DocAttachment = {
            name: file.name,
            uri: resultUri,
            size: sizeMB,
            type: file.type,
          };
          if (docType === 'passport') setPassportDoc(newDoc);
          else if (docType === 'visa') setVisaDoc(newDoc);
          else if (docType === 'id') setNationalIdDoc(newDoc);

          Alert.alert('Document Loaded', `${file.name} successfully uploaded.`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Scan Document with Camera
  const handleScanWithCamera = async (docType: 'passport' | 'visa' | 'id') => {
    if (Platform.OS === 'web') {
      pickFileWeb(docType, true);
      return;
    }

    try {
      setIsScanning(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        const asset = result.assets[0];
        const fileName = `${docType}-scan-${Date.now().toString().slice(-4)}.jpg`;
        const newDoc: DocAttachment = {
          name: fileName,
          uri: asset.uri,
          size: '1.8 MB',
          type: 'image/jpeg',
        };

        if (docType === 'passport') setPassportDoc(newDoc);
        else if (docType === 'visa') setVisaDoc(newDoc);
        else if (docType === 'id') setNationalIdDoc(newDoc);

        Alert.alert('Document Scanned', `Camera scan for ${docType.toUpperCase()} captured.`);
      }
    } catch (e) {
      Alert.alert('Camera Error', 'Could not open camera to scan document.');
    } finally {
      setIsScanning(false);
    }
  };

  // Browse Files / Gallery
  const handleBrowseFiles = async (docType: 'passport' | 'visa' | 'id') => {
    if (Platform.OS === 'web') {
      pickFileWeb(docType, false);
      return;
    }

    try {
      setIsScanning(true);
      const res = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!res.canceled && res.assets && res.assets[0]) {
        const file = res.assets[0];
        const fileSizeMB = file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.2 MB';
        const newDoc: DocAttachment = {
          name: file.name || `${docType}-doc.pdf`,
          uri: file.uri,
          size: fileSizeMB,
          type: file.mimeType || 'application/pdf',
        };

        if (docType === 'passport') setPassportDoc(newDoc);
        else if (docType === 'visa') setVisaDoc(newDoc);
        else if (docType === 'id') setNationalIdDoc(newDoc);

        Alert.alert('Document Attached', `${newDoc.name} uploaded from storage.`);
      }
    } catch (e) {
      try {
        const imgRes = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 0.8,
        });
        if (!imgRes.canceled && imgRes.assets && imgRes.assets[0]) {
          const asset = imgRes.assets[0];
          const newDoc: DocAttachment = {
            name: `${docType}-upload.jpg`,
            uri: asset.uri,
            size: '2.1 MB',
            type: 'image/jpeg',
          };
          if (docType === 'passport') setPassportDoc(newDoc);
          else if (docType === 'visa') setVisaDoc(newDoc);
          else if (docType === 'id') setNationalIdDoc(newDoc);
        }
      } catch (err) {
        Alert.alert('Browse Error', 'Could not browse device files.');
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleRemoveDoc = (docType: 'passport' | 'visa' | 'id') => {
    if (docType === 'visa') setVisaDoc(null);
    else if (docType === 'id') setNationalIdDoc(null);
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
              Scan credentials via Camera or Browse files.
            </Text>
          </View>

          <View style={[styles.idBadge, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
            <Text style={[styles.idBadgeLabel, { color: theme.textMuted }]}>ID:</Text>
            <Text style={[styles.idBadgeValue, { color: theme.textPrimary }]}>VF-20481</Text>
          </View>
        </View>

        {/* Stepper Navigation */}
        <View style={[styles.stepperContainer, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? '#143820' : '#e6f4ea', borderColor: theme.badgeOperational }]}>
              <MaterialIcons name="check" size={14} color={theme.badgeOperational} />
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary }]} numberOfLines={1}>
              Live Capture
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepNumActive}>2</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary, fontWeight: '700' }]} numberOfLines={1}>
              Upload
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f3f4f6', borderColor: theme.border }]}>
              <Text style={[styles.stepNum, { color: theme.textMuted }]}>3</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textMuted }]} numberOfLines={1}>
              Result
            </Text>
          </View>
        </View>

        {/* 1. Passport Document Card */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>1. Passport (Primary)</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Required international identifier</Text>
            </View>

            <View style={[styles.verifiedPill, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
              <MaterialIcons name="check-circle" size={13} color={theme.badgeOperational} />
              <Text style={[styles.verifiedPillText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>ATTACHED</Text>
            </View>
          </View>

          {/* Attachment Preview Box */}
          <View style={[styles.fileAttachmentBox, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
            <View style={styles.fileLeft}>
              {passportDoc.uri ? (
                <Image source={{ uri: passportDoc.uri }} style={styles.docThumbnail} />
              ) : (
                <MaterialIcons name="menu-book" size={24} color={theme.textPrimary} />
              )}
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={[styles.fileName, { color: theme.textPrimary }]} numberOfLines={1}>
                  {passportDoc.name}
                </Text>
                <Text style={[styles.fileMeta, { color: theme.textMuted }]}>
                  {passportDoc.size} · Optical Character Recognition
                </Text>
              </View>
            </View>
          </View>

          {/* Action Row for Passport */}
          <View style={styles.docActionRow}>
            <TouchableOpacity
              style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
              onPress={() => handleScanWithCamera('passport')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="camera-alt" size={16} color={theme.textPrimary} />
              <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Scan with Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
              onPress={() => handleBrowseFiles('passport')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="folder-open" size={16} color={theme.textPrimary} />
              <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Browse Files</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Visa Document Card */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>2. Visa Permit</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Entry / Transit endorsement</Text>
            </View>
            {visaDoc ? (
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

          {visaDoc ? (
            <View style={[styles.fileAttachmentBox, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <View style={styles.fileLeft}>
                {visaDoc.uri ? (
                  <Image source={{ uri: visaDoc.uri }} style={styles.docThumbnail} />
                ) : (
                  <MaterialIcons name="description" size={24} color={theme.textPrimary} />
                )}
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={[styles.fileName, { color: theme.textPrimary }]} numberOfLines={1}>
                    {visaDoc.name}
                  </Text>
                  <Text style={[styles.fileMeta, { color: theme.textMuted }]}>{visaDoc.size}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveDoc('visa')}>
                <MaterialIcons name="close" size={18} color={theme.errorText} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.docActionRow}>
              <TouchableOpacity
                style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
                onPress={() => handleScanWithCamera('visa')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="camera-alt" size={16} color={theme.textPrimary} />
                <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Scan Visa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
                onPress={() => handleBrowseFiles('visa')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="folder-open" size={16} color={theme.textPrimary} />
                <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Browse Files</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 3. National ID Document Card */}
        <View style={[styles.docCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.docHeaderRow}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>3. National Identity Card</Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textMuted }]}>Secondary biometric proof</Text>
            </View>
            {nationalIdDoc ? (
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

          {nationalIdDoc ? (
            <View style={[styles.fileAttachmentBox, { backgroundColor: theme.isDark ? theme.surfaceContainerLow : '#f8fafc', borderColor: theme.border }]}>
              <View style={styles.fileLeft}>
                {nationalIdDoc.uri ? (
                  <Image source={{ uri: nationalIdDoc.uri }} style={styles.docThumbnail} />
                ) : (
                  <MaterialIcons name="badge" size={24} color={theme.textPrimary} />
                )}
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={[styles.fileName, { color: theme.textPrimary }]} numberOfLines={1}>
                    {nationalIdDoc.name}
                  </Text>
                  <Text style={[styles.fileMeta, { color: theme.textMuted }]}>{nationalIdDoc.size}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleRemoveDoc('id')}>
                <MaterialIcons name="close" size={18} color={theme.errorText} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.docActionRow}>
              <TouchableOpacity
                style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
                onPress={() => handleScanWithCamera('id')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="camera-alt" size={16} color={theme.textPrimary} />
                <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Scan National ID</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.docBtn, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f1f5f9', borderColor: theme.border }]}
                onPress={() => handleBrowseFiles('id')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="folder-open" size={16} color={theme.textPrimary} />
                <Text style={[styles.docBtnText, { color: theme.textPrimary }]}>Browse Files</Text>
              </TouchableOpacity>
            </View>
          )}
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

        {/* Run AI Verification Button */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' }]}
          onPress={onNext}
          activeOpacity={0.85}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator color={theme.isDark ? '#000000' : '#ffffff'} size="small" />
          ) : (
            <>
              <Text style={[styles.nextButtonText, { color: theme.isDark ? '#000000' : '#ffffff' }]}>
                Run AI Verification Check
              </Text>
              <MaterialIcons name="arrow-forward" size={18} color={theme.isDark ? '#000000' : '#ffffff'} />
            </>
          )}
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
    flex: 1,
  },
  docThumbnail: {
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
  },
  fileMeta: {
    fontSize: 11,
  },
  docActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  docBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: rounded.md,
    borderWidth: 1,
    gap: 6,
  },
  docBtnText: {
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
