import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { getTheme, typography, rounded, spacing } from '../theme/theme';

interface FaceCaptureScreenProps {
  onBack: () => void;
  onNext: (photoUri?: string) => void;
  isDark?: boolean;
}

export const FaceCaptureScreen: React.FC<FaceCaptureScreenProps> = ({
  onBack,
  onNext,
  isDark = false,
}) => {
  const theme = getTheme(isDark);
  const [nativePermission, requestNativePermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [webStreamActive, setWebStreamActive] = useState<boolean>(false);
  
  const cameraRef = useRef<any>(null);
  const webVideoRef = useRef<any>(null);
  const webStreamRef = useRef<any>(null);

  // Web Webcam Initialization
  useEffect(() => {
    if (Platform.OS === 'web' && !capturedPhotoUri) {
      startWebCamera();
    }
    return () => {
      stopWebCamera();
    };
  }, [facing, capturedPhotoUri]);

  const startWebCamera = async () => {
    if (Platform.OS !== 'web' || typeof navigator === 'undefined' || !navigator.mediaDevices) return;
    try {
      stopWebCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing === 'front' ? 'user' : 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      webStreamRef.current = stream;
      setWebStreamActive(true);
      if (webVideoRef.current) {
        webVideoRef.current.srcObject = stream;
        webVideoRef.current.play().catch(() => {});
      }
    } catch (e) {
      setWebStreamActive(false);
    }
  };

  const stopWebCamera = () => {
    if (webStreamRef.current) {
      webStreamRef.current.getTracks().forEach((track: any) => track.stop());
      webStreamRef.current = null;
      setWebStreamActive(false);
    }
  };

  // Capture from Web Camera Stream
  const captureWebFrame = (): string | null => {
    if (Platform.OS !== 'web' || !webVideoRef.current) return null;
    try {
      const video = webVideoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.85);
      }
    } catch (e) {
      console.warn('Web capture error:', e);
    }
    return null;
  };

  // Main Capture Trigger (Cross Platform)
  const handleCapturePhoto = async () => {
    setIsProcessing(true);
    try {
      if (Platform.OS === 'web') {
        if (webStreamActive && webVideoRef.current) {
          const photoDataUrl = captureWebFrame();
          if (photoDataUrl) {
            setCapturedPhotoUri(photoDataUrl);
            stopWebCamera();
            setIsProcessing(false);
            return;
          }
        }
        // Web fallback: Input file picker
        pickImageWeb(true);
      } else {
        // Native Expo Camera
        if (cameraRef.current && nativePermission?.granted) {
          const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
          if (photo?.uri) {
            setCapturedPhotoUri(photo.uri);
          }
        } else {
          // Native ImagePicker Camera Fallback
          const res = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!res.canceled && res.assets && res.assets[0]?.uri) {
            setCapturedPhotoUri(res.assets[0].uri);
          }
        }
      }
    } catch (err) {
      Alert.alert('Camera Error', 'Could not capture photo. Please check device permissions.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Web File Picker Helper
  const pickImageWeb = (isCameraMode = false) => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (isCameraMode) {
      input.setAttribute('capture', 'user');
    }
    input.onchange = (event: any) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCapturedPhotoUri(e.target.result as string);
            stopWebCamera();
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Gallery Picker (Web & Native)
  const handlePickFromGallery = async () => {
    if (Platform.OS === 'web') {
      pickImageWeb(false);
    } else {
      try {
        setIsProcessing(true);
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
        if (!res.canceled && res.assets && res.assets[0]?.uri) {
          setCapturedPhotoUri(res.assets[0].uri);
        }
      } catch (e) {
        Alert.alert('Gallery Error', 'Could not access photo library.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleToggleFacing = () => {
    setFacing((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const handleRetake = () => {
    setCapturedPhotoUri(null);
    if (Platform.OS === 'web') {
      setTimeout(startWebCamera, 100);
    }
  };

  const handleProceed = () => {
    if (!capturedPhotoUri) {
      Alert.alert(
        'Photo Required',
        'Please capture or upload a subject photo before proceeding to document upload.'
      );
      return;
    }
    onNext(capturedPhotoUri);
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

        {/* Header Section */}
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

        {/* Stepper Navigation */}
        <View style={[styles.stepperContainer, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepNumActive}>1</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textPrimary, fontWeight: '700' }]} numberOfLines={1}>
              Live Capture
            </Text>
          </View>

          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />

          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, { backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#f3f4f6', borderColor: theme.border }]}>
              <Text style={[styles.stepNum, { color: theme.textMuted }]}>2</Text>
            </View>
            <Text style={[styles.stepLabel, { color: theme.textMuted }]} numberOfLines={1}>
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

        {/* Camera Live Viewport Card */}
        <View style={[styles.cameraCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={styles.cameraHeader}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={[styles.cameraTitle, { color: theme.textPrimary }]}>Live Face Capture</Text>
              <Text style={[styles.cameraSubtitle, { color: theme.textMuted }]}>
                Position subject face inside the biometric oval guide.
              </Text>
            </View>

            <View style={[styles.cameraReadyBadge, { backgroundColor: theme.isDark ? '#183a24' : '#e6f4ea', borderColor: theme.isDark ? '#2d5f3f' : '#bbf7d0' }]}>
              <View style={[styles.readyDot, { backgroundColor: theme.badgeOperational }]} />
              <Text style={[styles.cameraReadyText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>
                {capturedPhotoUri ? 'ACQUIRED' : (Platform.OS === 'web' && webStreamActive) || nativePermission?.granted ? 'LIVE CAMERA' : 'READY'}
              </Text>
            </View>
          </View>

          {/* Viewport Box */}
          <View style={[styles.viewport, { backgroundColor: theme.isDark ? '#0a0b0d' : '#e2e8f0' }]}>
            {capturedPhotoUri ? (
              // Captured Photo Preview
              <View style={styles.previewContainer}>
                <Image source={{ uri: capturedPhotoUri }} style={styles.capturedImage} resizeMode="contain" />
                <View style={[styles.guidePill, { position: 'absolute', bottom: 12, backgroundColor: 'rgba(0,0,0,0.75)' }]}>
                  <MaterialIcons name="check-circle" size={14} color={theme.badgeOperational} />
                  <Text style={{ color: '#ffffff', fontSize: 11, fontWeight: '700', marginLeft: 4 }}>
                    PHOTO ACQUIRED
                  </Text>
                </View>
              </View>
            ) : Platform.OS === 'web' ? (
              // Web Camera View (HTML5 Video)
              <View style={styles.cameraOverlay}>
                {/* @ts-ignore */}
                <video
                  ref={(el: any) => {
                    webVideoRef.current = el;
                    if (el && webStreamRef.current && el.srcObject !== webStreamRef.current) {
                      el.srcObject = webStreamRef.current;
                      el.play().catch(() => {});
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: facing === 'front' ? 'scaleX(-1)' : 'none',
                  }}
                />
                <View style={[styles.faceGuideOval, { position: 'absolute', borderColor: theme.badgeOperational }]}>
                  <View style={[styles.guidePill, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                    <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '700' }}>FACE GUIDE</Text>
                  </View>
                </View>

                {webStreamActive && (
                  <TouchableOpacity style={styles.flipBtn} onPress={handleToggleFacing}>
                    <MaterialIcons name="flip-camera-ios" size={20} color="#ffffff" />
                  </TouchableOpacity>
                )}

                {!webStreamActive && (
                  <TouchableOpacity
                    style={[styles.permissionBtn, { position: 'absolute', backgroundColor: theme.badgeOperational }]}
                    onPress={startWebCamera}
                  >
                    <MaterialIcons name="videocam" size={14} color="#ffffff" />
                    <Text style={styles.permissionBtnText}>Enable Webcam</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : nativePermission?.granted ? (
              // Native Expo Camera
              <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                facing={facing}
              >
                <View style={styles.cameraOverlay}>
                  <View style={[styles.faceGuideOval, { borderColor: theme.badgeOperational }]}>
                    <View style={[styles.guidePill, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                      <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '700' }}>FACE GUIDE</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.flipBtn} onPress={handleToggleFacing}>
                    <MaterialIcons name="flip-camera-ios" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </CameraView>
            ) : (
              // Native Permission Prompt
              <View style={styles.placeholderCenter}>
                <View style={[styles.faceGuideOval, { borderColor: theme.isDark ? '#6b7280' : '#4b5563' }]}>
                  <MaterialIcons
                    name="account-circle"
                    size={68}
                    color={theme.isDark ? '#4b5563' : '#9ca3af'}
                  />
                  <View style={[styles.guidePill, { backgroundColor: theme.isDark ? 'rgba(30,31,35,0.85)' : 'rgba(255,255,255,0.85)' }]}>
                    <Text style={[styles.guidePillText, { color: theme.textPrimary }]}>FACE GUIDE</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.permissionBtn, { backgroundColor: theme.badgeOperational }]}
                  onPress={requestNativePermission}
                >
                  <MaterialIcons name="videocam" size={14} color="#ffffff" />
                  <Text style={styles.permissionBtnText}>Enable Live Camera</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                { backgroundColor: theme.isDark ? '#ffffff' : '#0f172a' },
                isProcessing && { opacity: 0.7 },
              ]}
              onPress={handleCapturePhoto}
              disabled={isProcessing}
              activeOpacity={0.85}
            >
              {isProcessing ? (
                <ActivityIndicator color={theme.isDark ? '#000000' : '#ffffff'} size="small" />
              ) : (
                <>
                  <MaterialIcons
                    name="camera-alt"
                    size={18}
                    color={theme.isDark ? '#000000' : '#ffffff'}
                  />
                  <Text style={[styles.captureButtonText, { color: theme.isDark ? '#000000' : '#ffffff' }]}>
                    {capturedPhotoUri ? 'Recapture Photo' : 'Capture Photo'}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.galleryButton, { borderColor: theme.border, backgroundColor: theme.surfaceCard }]}
              onPress={handlePickFromGallery}
              activeOpacity={0.8}
            >
              <MaterialIcons name="photo-library" size={18} color={theme.textPrimary} />
              <Text style={[styles.galleryButtonText, { color: theme.textPrimary }]}>Gallery</Text>
            </TouchableOpacity>

            {capturedPhotoUri && (
              <TouchableOpacity
                style={[styles.retakeButton, { borderColor: theme.border, backgroundColor: theme.surfaceCard }]}
                onPress={handleRetake}
                activeOpacity={0.8}
              >
                <MaterialIcons name="refresh" size={18} color={theme.textPrimary} />
              </TouchableOpacity>
            )}
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

        {/* Footer Card */}
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
              !capturedPhotoUri && { opacity: 0.6 },
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
    height: 260,
    borderRadius: rounded.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderCenter: {
    alignItems: 'center',
    gap: 12,
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
    paddingVertical: 3,
    borderRadius: rounded.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guidePillText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  flipBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  permissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.full,
    zIndex: 10,
  },
  permissionBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 13,
    fontWeight: '700',
  },
  galleryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
    gap: 4,
  },
  galleryButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  retakeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    borderWidth: 1,
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
