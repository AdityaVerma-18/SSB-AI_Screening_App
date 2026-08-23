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
import { ScreeningRecord, OfficerProfile } from '../types';

interface DashboardScreenProps {
  officer: OfficerProfile;
  records: ScreeningRecord[];
  onStartVerification: () => void;
  onSelectRecord: (record: ScreeningRecord) => void;
  onNavigateToRecords: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  officer,
  records,
  onStartVerification,
  onSelectRecord,
  onNavigateToRecords,
}) => {
  const [timeFilter, setTimeFilter] = useState<'Today' | 'Yesterday' | '7 Days'>('Today');

  const verifiedCount = records.filter((r) => r.status === 'VERIFIED').length + 245;
  const mismatchCount = records.filter((r) => r.status === 'MISMATCH' || r.status === 'HIGH_RISK').length + 5;
  const pendingCount = records.filter((r) => r.status === 'NEEDS_REVIEW').length + 15;

  const formatDate = () => {
    return 'Monday, October 14, 2024';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return {
          label: 'MATCH VERIFIED',
          textColor: '#15803d',
          bgColor: '#f0fdf4',
          borderColor: '#bbf7d0',
        };
      case 'NEEDS_REVIEW':
        return {
          label: 'NEEDS REVIEW',
          textColor: '#a16207',
          bgColor: '#fefce8',
          borderColor: '#fef08a',
        };
      case 'MISMATCH':
        return {
          label: 'MISMATCH',
          textColor: '#b91c1c',
          bgColor: '#fef2f2',
          borderColor: '#fecaca',
        };
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          textColor: '#991b1b',
          bgColor: '#fee2e2',
          borderColor: '#fca5a5',
        };
      default:
        return {
          label: 'PENDING',
          textColor: '#4b5563',
          bgColor: '#f3f4f6',
          borderColor: '#e5e7eb',
        };
    }
  };

  const handleExport = () => {
    Alert.alert(
      'Export Report',
      'Audit log for today downloaded in official certified PDF format.'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.dateText}>{formatDate().toUpperCase()}</Text>
          <Text style={styles.greetingText}>Good morning, Officer Verma</Text>
        </View>

        <View style={styles.welcomeBottomRow}>
          <Text style={styles.subGreetingText}>
            Monitor your verification activity and keep your workspace secure.
          </Text>
          <View style={styles.operationalBadge}>
            <MaterialIcons
              name="monitor-heart"
              size={16}
              color="#6b7280"
            />
            <Text style={styles.operationalText}>System operational</Text>
            <View style={styles.operationalDot} />
          </View>
        </View>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <View style={styles.heroTextSection}>
            <View style={styles.heroBadgeRow}>
              <MaterialIcons name="policy" size={14} color="#9ca3af" />
              <Text style={styles.heroBadgeText}>VERIFICATION WORKSPACE</Text>
            </View>
            <Text style={styles.heroTitle}>Start a new verification</Text>
            <Text style={styles.heroSubtitle}>
              Verify an identity in seconds with our secure, guided checkpoint process.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={onStartVerification}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add-a-photo" size={18} color="#111827" />
            <Text style={styles.heroButtonText}>Start New Verification</Text>
            <MaterialIcons name="arrow-outward" size={18} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Today's stats</Text>
            <Text style={styles.sectionSubtitle}>
              A snapshot of verification outcomes today.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.timeFilterButton}
            onPress={() => {
              const opts: ('Today' | 'Yesterday' | '7 Days')[] = ['Today', 'Yesterday', '7 Days'];
              const next = (opts.indexOf(timeFilter) + 1) % opts.length;
              setTimeFilter(opts[next]);
            }}
          >
            <MaterialIcons
              name="calendar-today"
              size={16}
              color="#4b5563"
            />
            <Text style={styles.timeFilterText}>{timeFilter}</Text>
            <MaterialIcons
              name="expand-more"
              size={18}
              color="#4b5563"
            />
          </TouchableOpacity>
        </View>

        {/* 3 Stat Cards */}
        <View style={styles.statCardsGrid}>
          {/* Verified */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>Verified</Text>
              <View style={[styles.statIconBadge, { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' }]}>
                <MaterialIcons name="check-circle" size={16} color="#16a34a" />
              </View>
            </View>
            <View style={styles.statCardBottom}>
              <Text style={[styles.statCount, { color: '#16a34a' }]}>{verifiedCount}</Text>
              <Text style={[styles.statTrend, { color: '#16a34a' }]}>+12.5%</Text>
            </View>
          </View>

          {/* Mismatched */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>Mismatched</Text>
              <View style={[styles.statIconBadge, { backgroundColor: '#fef2f2', borderColor: '#fee2e2' }]}>
                <MaterialIcons name="cancel" size={16} color="#dc2626" />
              </View>
            </View>
            <View style={styles.statCardBottom}>
              <Text style={[styles.statCount, { color: '#dc2626' }]}>
                {mismatchCount < 10 ? `0${mismatchCount}` : mismatchCount}
              </Text>
              <Text style={[styles.statTrend, { color: '#dc2626' }]}>-2.1%</Text>
            </View>
          </View>

          {/* Pending */}
          <View style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={styles.statCardLabel}>Pending</Text>
              <View style={[styles.statIconBadge, { backgroundColor: '#fefce8', borderColor: '#fef08a' }]}>
                <MaterialIcons name="schedule" size={16} color="#ca8a04" />
              </View>
            </View>
            <View style={styles.statCardBottomColumn}>
              <Text style={[styles.statCount, { color: '#ca8a04' }]}>{pendingCount}</Text>
              <Text style={styles.statPendingLabel}>NEEDS REVIEW</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Activity Table */}
      <View style={styles.activityCard}>
        <View style={styles.activityHeader}>
          <View>
            <Text style={styles.activityTitle}>Recent activity</Text>
            <Text style={styles.activitySubtitle}>
              Latest verification events across your checkpoints.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.exportReportBtn}
            onPress={handleExport}
          >
            <MaterialIcons name="download" size={18} color="#374151" />
            <Text style={styles.exportReportBtnText}>Export report</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Items */}
        <View style={styles.activityList}>
          {records.slice(0, 4).map((item) => {
            const badge = getStatusBadge(item.status);
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.activityRow}
                onPress={() => onSelectRecord(item)}
                activeOpacity={0.7}
              >
                <View style={styles.activityRowTop}>
                  <View>
                    <Text style={styles.personName}>{item.name}</Text>
                    <Text style={styles.personId}>ID: {item.id}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusChip,
                      { backgroundColor: badge.bgColor, borderColor: badge.borderColor },
                    ]}
                  >
                    <Text style={[styles.statusChipText, { color: badge.textColor }]}>
                      {badge.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.activityRowBottom}>
                  <View style={styles.metaBadge}>
                    <MaterialIcons name="schedule" size={14} color="#6b7280" />
                    <Text style={styles.metaBadgeText}>{item.timestamp}</Text>
                  </View>

                  <View style={styles.metaBadge}>
                    <MaterialIcons name="location-on" size={14} color="#6b7280" />
                    <Text style={[styles.metaBadgeText, styles.monoText]}>
                      {item.checkpointId}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Export full report bottom button */}
        <TouchableOpacity
          style={styles.exportFullBtn}
          onPress={onNavigateToRecords}
        >
          <MaterialIcons name="download" size={18} color="#374151" />
          <Text style={styles.exportFullBtnText}>Export full report</Text>
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
  contentContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 20,
    paddingBottom: 90,
    gap: 24,
    maxWidth: spacing.containerMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeSection: {
    gap: 8,
  },
  dateText: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  greetingText: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
  },
  welcomeBottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  subGreetingText: {
    color: '#4b5563',
    fontSize: 14,
    flex: 1,
    minWidth: 220,
  },
  operationalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  operationalText: {
    color: '#4b5563',
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 0.5,
  },
  operationalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  heroCard: {
    backgroundColor: '#18191b',
    borderRadius: rounded.xl,
    padding: 24,
  },
  heroContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  heroTextSection: {
    maxWidth: 420,
    gap: 8,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroBadgeText: {
    color: '#d1d5db',
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  heroSubtitle: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: rounded.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtonText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '500',
  },
  statsSection: {
    gap: 16,
  },
  statsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 2,
  },
  timeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeFilterText: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '500',
  },
  statCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#ffffff',
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statCardLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  statIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCardBottom: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  statCardBottomColumn: {
    flexDirection: 'column',
    gap: 2,
  },
  statCount: {
    fontSize: 24,
    fontWeight: '700',
  },
  statTrend: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '500',
  },
  statPendingLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    color: '#6b7280',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  activityHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  activityTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
  },
  activitySubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 2,
  },
  exportReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.default,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  exportReportBtnText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '500',
  },
  activityList: {
    backgroundColor: '#ffffff',
  },
  activityRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 8,
  },
  activityRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  personName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
  personId: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
    marginTop: 2,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: rounded.default,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.mono,
    fontWeight: '600',
  },
  activityRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaBadgeText: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: typography.fontFamily.mono,
  },
  monoText: {
    fontFamily: typography.fontFamily.mono,
  },
  exportFullBtn: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  exportFullBtnText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '500',
  },
});
