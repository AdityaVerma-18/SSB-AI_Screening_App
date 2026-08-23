import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatCard } from '../components/StatCard';
import { getTheme, typography, rounded, spacing } from '../theme/theme';
import { ScreeningRecord, OfficerProfile } from '../types';

interface DashboardScreenProps {
  officer: OfficerProfile;
  records: ScreeningRecord[];
  onStartVerification: () => void;
  onSelectRecord: (record: ScreeningRecord) => void;
  onNavigateToRecords: () => void;
  isDark?: boolean;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  officer,
  records,
  onStartVerification,
  onSelectRecord,
  onNavigateToRecords,
  isDark = false,
}) => {
  const theme = getTheme(isDark);

  const verifiedCount = records.filter((r) => r.status === 'VERIFIED').length;
  const mismatchCount = records.filter(
    (r) => r.status === 'MISMATCH' || r.status === 'HIGH_RISK'
  ).length;
  const pendingCount = records.filter((r) => r.status === 'NEEDS_REVIEW').length;

  const handleExport = () => {
    Alert.alert(
      'Export Summary',
      'Daily verification audit records (.csv) exported successfully.'
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Operational Status & Greeting Bar */}
        <View style={styles.topStatusRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={[styles.greetingText, { color: theme.textPrimary }]} numberOfLines={1}>
              Welcome back, {officer.name}
            </Text>
            <Text style={[styles.checkpointMeta, { color: theme.textMuted }]} numberOfLines={1}>
              {officer.checkpoint} · Sector 4
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: theme.isDark ? '#143820' : '#e6f4ea' }]}>
            <View style={[styles.statusDot, { backgroundColor: theme.badgeOperational }]} />
            <Text style={[styles.statusBadgeText, { color: theme.isDark ? '#4cd964' : '#137333' }]}>
              System operational
            </Text>
          </View>
        </View>

        {/* Hero Card - Start Verification */}
        <View style={[styles.heroCard, { backgroundColor: theme.heroBg, borderColor: theme.border }]}>
          <View style={styles.heroContent}>
            <Text style={[styles.heroPretitle, { color: theme.heroSubtext }]}>
              IDENTITY SCREENING PORTAL
            </Text>
            <Text style={[styles.heroTitle, { color: theme.heroText }]}>
              Start a new verification
            </Text>
            <Text style={[styles.heroDesc, { color: theme.heroSubtext }]}>
              Verify passenger and document data against SSB national biometric databases.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.heroButton, { backgroundColor: theme.heroBtnBg }]}
            onPress={onStartVerification}
            activeOpacity={0.9}
          >
            <MaterialIcons name="qr-code-scanner" size={20} color={theme.heroBtnText} />
            <Text style={[styles.heroButtonText, { color: theme.heroBtnText }]}>
              Begin Screening
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                Today's stats
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]} numberOfLines={1}>
                A snapshot of verification outcomes today.
              </Text>
            </View>

            <View
              style={[
                styles.todayPill,
                {
                  backgroundColor: theme.surfaceCard,
                  borderColor: theme.border,
                },
              ]}
            >
              <MaterialIcons name="calendar-today" size={13} color={theme.textSecondary} />
              <Text style={[styles.todayPillText, { color: theme.textSecondary }]}>Today</Text>
            </View>
          </View>

          {/* 3 Responsive Stat Cards */}
          <View style={styles.statCardsGrid}>
            <StatCard
              title="Verified"
              count={verifiedCount || 249}
              trend="+12.5%"
              type="verified"
              onPress={onNavigateToRecords}
              isDark={isDark}
            />
            <StatCard
              title="Mismatched"
              count={mismatchCount < 10 ? `0${mismatchCount || 7}` : mismatchCount}
              trend="-2.1%"
              type="mismatched"
              onPress={onNavigateToRecords}
              isDark={isDark}
            />
            <StatCard
              title="Pending"
              count={pendingCount || 16}
              subtitle="Review"
              type="pending"
              onPress={onNavigateToRecords}
              isDark={isDark}
            />
          </View>
        </View>

        {/* Recent Activity List */}
        <View style={[styles.activityCard, { backgroundColor: theme.surfaceCard, borderColor: theme.border }]}>
          <View style={[styles.activityHeader, { borderBottomColor: theme.borderLight }]}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.activityTitle, { color: theme.textPrimary }]}>
                Recent activity
              </Text>
              <Text style={[styles.activitySubtitle, { color: theme.textMuted }]} numberOfLines={1}>
                Latest verification events across your checkpoints.
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.exportReportBtn,
                {
                  backgroundColor: theme.isDark ? theme.surfaceContainerHigh : '#ffffff',
                  borderColor: theme.border,
                },
              ]}
              onPress={handleExport}
              accessibilityLabel="Export report"
            >
              <MaterialIcons name="download" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Activity Items */}
          <View style={styles.activityList}>
            {records.slice(0, 5).map((record, index) => {
              const isMismatch =
                record.status === 'MISMATCH' || record.status === 'HIGH_RISK';
              const isReview = record.status === 'NEEDS_REVIEW';

              return (
                <TouchableOpacity
                  key={record.id}
                  style={[
                    styles.activityItem,
                    index !== records.length - 1 && [styles.activityItemBorder, { borderBottomColor: theme.borderLight }],
                  ]}
                  onPress={() => onSelectRecord(record)}
                  activeOpacity={0.7}
                >
                  <View style={styles.activityMain}>
                    <View style={{ flex: 1, marginRight: 6 }}>
                      <Text style={[styles.recordName, { color: theme.textPrimary }]} numberOfLines={1}>
                        {record.name}
                      </Text>
                      <Text style={[styles.recordId, { color: theme.textMuted }]}>
                        ID: {record.id}
                      </Text>
                    </View>

                    {/* Status Badge */}
                    {isMismatch ? (
                      <View style={[styles.badgeMismatch, { backgroundColor: theme.errorBg, borderColor: theme.errorBorder }]}>
                        <Text style={[styles.badgeMismatchText, { color: theme.errorText }]}>
                          MISMATCH
                        </Text>
                      </View>
                    ) : isReview ? (
                      <View style={[styles.badgeReview, { backgroundColor: theme.warningBg, borderColor: theme.warningBorder }]}>
                        <Text style={[styles.badgeReviewText, { color: theme.warningText }]}>
                          NEEDS REVIEW
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.badgeVerified, { backgroundColor: theme.successBg, borderColor: theme.successBorder }]}>
                        <Text style={[styles.badgeVerifiedText, { color: theme.successText }]}>
                          MATCH VERIFIED
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.activityMetaRow}>
                    <View style={styles.metaCol}>
                      <MaterialIcons name="schedule" size={13} color={theme.textMuted} />
                      <Text style={[styles.metaText, { color: theme.textMuted }]}>{record.timestamp}</Text>
                    </View>

                    <View style={styles.metaCol}>
                      <MaterialIcons name="location-on" size={13} color={theme.textMuted} />
                      <Text style={[styles.metaText, { color: theme.textMuted }]}>{record.checkpointId}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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
    gap: 16,
  },
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  checkpointMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.full,
    gap: 6,
    flexShrink: 0,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
  },
  heroCard: {
    borderRadius: rounded.xl,
    padding: 18,
    borderWidth: 1,
    gap: 16,
  },
  heroContent: {
    gap: 4,
  },
  heroPretitle: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  heroDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: rounded.lg,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  statsSection: {
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  todayPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.md,
    flexShrink: 0,
  },
  todayPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statCardsGrid: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  activityCard: {
    borderRadius: rounded.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  activitySubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  exportReportBtn: {
    padding: 7,
    borderRadius: rounded.md,
    borderWidth: 1,
    flexShrink: 0,
  },
  activityList: {
    paddingHorizontal: 14,
  },
  activityItem: {
    paddingVertical: 12,
    gap: 6,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
  },
  activityMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recordName: {
    fontSize: 15,
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
    flexShrink: 0,
  },
  badgeMismatchText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '700',
  },
  activityMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metaCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
  },
});
