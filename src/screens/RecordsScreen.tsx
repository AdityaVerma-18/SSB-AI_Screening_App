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
import { colors, typography, rounded, spacing } from '../theme/theme';
import { ScreeningRecord } from '../types';

interface RecordsScreenProps {
  records: ScreeningRecord[];
  onSelectRecord: (record: ScreeningRecord) => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  records,
  onSelectRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Default records from design template if none added
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

  // Combine user records with design records
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header & Search Section */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Verification Records</Text>

          <View style={styles.searchBox}>
            <MaterialIcons
              name="search"
              size={20}
              color="#6b7280"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Name, ID, or Date..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() =>
                Alert.alert('Filters', 'Filter records by status, checkpoint, or date range.')
              }
            >
              <MaterialIcons name="filter-list" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Records List (Bento/Card Style) */}
        <View style={styles.recordsList}>
          {filteredRecords.map((item) => {
            const isMismatch = item.status === 'MISMATCH' || item.status === 'HIGH_RISK';
            const isReview = item.status === 'NEEDS_REVIEW';

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.recordCard,
                  isMismatch && styles.recordCardMismatch,
                ]}
                onPress={() => onSelectRecord(item as ScreeningRecord)}
                activeOpacity={0.7}
              >
                {isMismatch && <View style={styles.mismatchTint} />}

                <View style={styles.recordHeader}>
                  <View>
                    <Text
                      style={[
                        styles.recordName,
                        isMismatch && styles.recordNameMismatch,
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.recordId,
                        isMismatch && styles.recordIdMismatch,
                      ]}
                    >
                      ID: {item.id}
                    </Text>
                  </View>

                  {/* Status Badge */}
                  {isMismatch ? (
                    <View style={styles.badgeMismatch}>
                      <MaterialIcons name="warning" size={14} color="#991b1b" />
                      <Text style={styles.badgeMismatchText}>MISMATCH</Text>
                    </View>
                  ) : isReview ? (
                    <View style={styles.badgeReview}>
                      <MaterialIcons name="pending" size={14} color="#854d0e" />
                      <Text style={styles.badgeReviewText}>NEEDS REVIEW</Text>
                    </View>
                  ) : (
                    <View style={styles.badgeVerified}>
                      <MaterialIcons name="check-circle" size={14} color="#ffffff" />
                      <Text style={styles.badgeVerifiedText}>MATCH VERIFIED</Text>
                    </View>
                  )}
                </View>

                {/* Footer Row */}
                <View style={styles.recordFooter}>
                  <View style={styles.footerItem}>
                    <MaterialIcons name="calendar-today" size={16} color="#4b5563" />
                    <Text style={styles.footerItemText}>{item.date || '24 Oct 2023'}</Text>
                  </View>

                  <View style={styles.footerItem}>
                    <MaterialIcons name="schedule" size={16} color="#4b5563" />
                    <Text style={styles.footerItemText}>{item.timestamp}</Text>
                  </View>

                  {item.tag ? (
                    <View style={[styles.footerItem, styles.footerItemRight]}>
                      <MaterialIcons
                        name={item.tagIcon as any}
                        size={16}
                        color={isMismatch ? '#dc2626' : '#4b5563'}
                      />
                      <Text
                        style={[
                          styles.footerItemText,
                          isMismatch && { color: '#dc2626' },
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

        {/* Loading Indicator for older records */}
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color="#6b7280" style={{ marginRight: 8 }} />
          <Text style={styles.loadingText}>Loading older records...</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 20,
    paddingBottom: 110,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
  headerSection: {
    gap: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  searchBox: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: rounded.lg,
    paddingVertical: 12,
    paddingLeft: 44,
    paddingRight: 44,
    fontSize: 16,
    color: '#111827',
  },
  filterBtn: {
    position: 'absolute',
    right: 10,
    padding: 6,
  },
  recordsList: {
    gap: 16,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: rounded.xl,
    padding: 16,
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  recordCardMismatch: {
    borderColor: '#fecaca',
  },
  mismatchTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(254, 242, 242, 0.5)',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  recordName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  recordNameMismatch: {
    color: '#991b1b',
  },
  recordId: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
    marginTop: 2,
    letterSpacing: 0.8,
  },
  recordIdMismatch: {
    color: '#dc2626',
  },
  badgeVerified: {
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.default,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeVerifiedText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  badgeReview: {
    backgroundColor: '#fef9c3',
    borderWidth: 1,
    borderColor: '#fef08a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.default,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeReviewText: {
    color: '#854d0e',
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  badgeMismatch: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.default,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeMismatchText: {
    color: '#991b1b',
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  recordFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
    zIndex: 1,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerItemRight: {
    marginLeft: 'auto',
  },
  footerItemText: {
    fontSize: 13,
    color: '#4b5563',
    fontFamily: typography.fontFamily.mono,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 13,
    fontFamily: typography.fontFamily.mono,
  },
});
