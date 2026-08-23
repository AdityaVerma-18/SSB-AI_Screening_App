import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getTheme, typography, rounded, spacing } from '../theme/theme';
import { ScreeningRecord } from '../types';

interface RecordsScreenProps {
  records: ScreeningRecord[];
  onSelectRecord: (record: ScreeningRecord) => void;
  isDark?: boolean;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  records,
  onSelectRecord,
  isDark = false,
}) => {
  const theme = getTheme(isDark);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultDesignRecords = [
    {
      id: 'VER-8924-XQ',
      name: 'Amelia Stone',
      docType: 'Passport' as const,
      docNumber: 'P902184',
      status: 'VERIFIED' as const,
      timestamp: '14:32:05 UTC',
      date: '24 Oct 2023',
      checkpointId: 'CHK-00184',
      officerId: 'OFF-1042',
      gender: 'F' as const,
      dob: '18-05-1993',
      address: 'London, UK',
      nationality: 'British',
      matchScore: 99.1,
      ocrConfidence: 99.6,
      securityChecks: {
        hologramDetected: true,
        tamperingDetected: false,
        watchlistMatch: false,
        biometricMatch: true,
      },
      tag: 'Biometric Confirmed',
      tagIcon: 'fingerprint' as const,
    },
    {
      id: 'VER-7102-BR',
      name: 'Marcus Lee',
      docType: 'Border Pass' as const,
      docNumber: 'BP-99021',
      status: 'NEEDS_REVIEW' as const,
      timestamp: '13:15:22 UTC',
      date: '24 Oct 2023',
      checkpointId: 'CHK-00183',
      officerId: 'OFF-1042',
      gender: 'M' as const,
      dob: '10-09-1987',
      address: 'Singapore Central',
      nationality: 'Singaporean',
      matchScore: 82.3,
      ocrConfidence: 91.0,
      securityChecks: {
        hologramDetected: true,
        tamperingDetected: false,
        watchlistMatch: false,
        biometricMatch: false,
      },
      tag: 'Manual Check Req.',
      tagIcon: 'visibility' as const,
    },
    {
      id: 'VER-9931-ZZ',
      name: 'Unknown Subject',
      docType: 'Passport' as const,
      docNumber: 'FAKE-8821',
      status: 'MISMATCH' as const,
      timestamp: '09:41:11 UTC',
      date: '24 Oct 2023',
      checkpointId: 'CHK-00182',
      officerId: 'OFF-1042',
      gender: 'M' as const,
      dob: '01-01-1980',
      address: 'Unknown',
      nationality: 'Undetermined',
      matchScore: 28.5,
      ocrConfidence: 65.0,
      securityChecks: {
        hologramDetected: false,
        tamperingDetected: true,
        watchlistMatch: true,
        biometricMatch: false,
      },
      tag: 'Access Denied',
      tagIcon: 'gpp-bad' as const,
    },
    {
      id: 'VER-2284-KL',
      name: 'Sarah Jenkins',
      docType: 'Aadhaar Card' as const,
      docNumber: 'XXXX-XXXX-3829',
      status: 'VERIFIED' as const,
      timestamp: '18:05:44 UTC',
      date: '23 Oct 2023',
      checkpointId: 'CHK-00184',
      officerId: 'OFF-1042',
      gender: 'F' as const,
      dob: '29-11-1996',
      address: 'Sydney, Australia',
      nationality: 'Australian',
      matchScore: 98.4,
      ocrConfidence: 99.0,
      securityChecks: {
        hologramDetected: true,
        tamperingDetected: false,
        watchlistMatch: false,
        biometricMatch: true,
      },
    },
  ];

  const allDisplayRecords = [
    ...records.map((r) => ({
      ...r,
      date: '24 Oct 2023',
      tag: r.status === 'VERIFIED' ? 'Biometric Confirmed' : r.status === 'MISMATCH' ? 'Access Denied' : 'Manual Check Req.',
      tagIcon: r.status === 'VERIFIED' ? 'fingerprint' as const : r.status === 'MISMATCH' ? 'gpp-bad' as const : 'visibility' as const,
    })),
    ...defaultDesignRecords.filter(
      (d) => !records.some((r) => r.id === d.id || r.name === d.name)
    ),
  ];

  const filteredRecords = allDisplayRecords.filter((rec) => {
    return (
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.docNumber && rec.docNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header & Search */}
        <View style={styles.headerSection}>
          <Text style={[styles.pageTitle, { color: theme.textPrimary }]}>Verification Records</Text>

          <View style={styles.searchBox}>
            <MaterialIcons
              name="search"
              size={18}
              color={theme.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                {
                  backgroundColor: theme.inputBg,
                  borderColor: theme.inputBorder,
                  color: theme.inputText,
                },
              ]}
              placeholder="Search by Name, ID, or Date..."
              placeholderTextColor={theme.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() =>
                Alert.alert('Filters', 'Filter records by status, checkpoint, or date range.')
              }
            >
              <MaterialIcons name="filter-list" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Records List */}
        <View style={styles.recordsList}>
          {filteredRecords.map((item) => {
            const isMismatch = item.status === 'MISMATCH' || item.status === 'HIGH_RISK';
            const isReview = item.status === 'NEEDS_REVIEW';

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.recordCard,
                  {
                    backgroundColor: theme.surfaceCard,
                    borderColor: isMismatch ? theme.errorBorder : theme.border,
                  },
                ]}
                onPress={() => onSelectRecord(item as ScreeningRecord)}
                activeOpacity={0.75}
              >
                {isMismatch && (
                  <View
                    style={[
                      styles.mismatchTint,
                      { backgroundColor: theme.isDark ? 'rgba(61,24,24,0.4)' : 'rgba(254, 242, 242, 0.6)' },
                    ]}
                  />
                )}

                <View style={styles.recordHeader}>
                  <View style={{ flex: 1, marginRight: 6 }}>
                    <Text
                      style={[
                        styles.recordName,
                        { color: isMismatch ? theme.errorText : theme.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.recordId,
                        { color: isMismatch ? theme.errorText : theme.textMuted },
                      ]}
                    >
                      ID: {item.id}
                    </Text>
                  </View>

                  {/* Status Badge */}
                  {isMismatch ? (
                    <View style={[styles.badgeMismatch, { backgroundColor: theme.errorBg, borderColor: theme.errorBorder }]}>
                      <MaterialIcons name="warning" size={12} color={theme.errorText} />
                      <Text style={[styles.badgeMismatchText, { color: theme.errorText }]}>MISMATCH</Text>
                    </View>
                  ) : isReview ? (
                    <View style={[styles.badgeReview, { backgroundColor: theme.warningBg, borderColor: theme.warningBorder }]}>
                      <MaterialIcons name="pending" size={12} color={theme.warningText} />
                      <Text style={[styles.badgeReviewText, { color: theme.warningText }]}>NEEDS REVIEW</Text>
                    </View>
                  ) : (
                    <View style={[styles.badgeVerified, { backgroundColor: theme.successBg, borderColor: theme.successBorder }]}>
                      <MaterialIcons name="check-circle" size={12} color={theme.successText} />
                      <Text style={[styles.badgeVerifiedText, { color: theme.successText }]}>MATCH VERIFIED</Text>
                    </View>
                  )}
                </View>

                {/* Footer Row */}
                <View style={[styles.recordFooter, { borderTopColor: theme.borderLight }]}>
                  <View style={styles.footerItem}>
                    <MaterialIcons name="calendar-today" size={13} color={theme.textMuted} />
                    <Text style={[styles.footerItemText, { color: theme.textMuted }]}>{item.date || '24 Oct 2023'}</Text>
                  </View>

                  <View style={styles.footerItem}>
                    <MaterialIcons name="schedule" size={13} color={theme.textMuted} />
                    <Text style={[styles.footerItemText, { color: theme.textMuted }]}>{item.timestamp}</Text>
                  </View>

                  {item.tag ? (
                    <View style={[styles.footerItem, styles.footerItemRight]}>
                      <MaterialIcons
                        name={item.tagIcon as any}
                        size={13}
                        color={isMismatch ? theme.errorText : theme.textMuted}
                      />
                      <Text
                        style={[
                          styles.footerItemText,
                          { color: isMismatch ? theme.errorText : theme.textMuted },
                        ]}
                      >
                        {item.tag}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color={theme.textMuted} style={{ marginRight: 8 }} />
          <Text style={[styles.loadingText, { color: theme.textMuted }]}>Loading older records...</Text>
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
  headerSection: {
    gap: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  searchBox: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: rounded.lg,
    paddingVertical: 9,
    paddingLeft: 38,
    paddingRight: 38,
    fontSize: 14,
  },
  filterBtn: {
    position: 'absolute',
    right: 8,
    padding: 6,
  },
  recordsList: {
    gap: 10,
  },
  recordCard: {
    borderWidth: 1,
    borderRadius: rounded.xl,
    padding: 14,
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  mismatchTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  recordName: {
    fontSize: 16,
    fontWeight: '600',
  },
  recordId: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    marginTop: 2,
  },
  badgeVerified: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.default,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  badgeVerifiedText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  badgeReview: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.default,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  badgeReviewText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  badgeMismatch: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: rounded.default,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  badgeMismatchText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  recordFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 10,
    zIndex: 1,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerItemRight: {
    marginLeft: 'auto',
  },
  footerItemText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
  },
});
