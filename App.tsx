import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TopAppBar } from './src/components/TopAppBar';
import { BottomNavBar, TabType } from './src/components/BottomNavBar';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { FaceCaptureScreen } from './src/screens/FaceCaptureScreen';
import { DocumentUploadScreen } from './src/screens/DocumentUploadScreen';
import { VerificationResultScreen } from './src/screens/VerificationResultScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { RecordDetailModal } from './src/screens/RecordDetailModal';
import { mockOfficer, initialRecords } from './src/mockData';
import { ScreeningRecord, OfficerProfile } from './src/types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [officer, setOfficer] = useState<OfficerProfile>(mockOfficer);
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [scanStep, setScanStep] = useState<1 | 2 | 3>(1);
  const [records, setRecords] = useState<ScreeningRecord[]>(initialRecords);
  const [selectedRecord, setSelectedRecord] = useState<ScreeningRecord | null>(null);

  // Authentication
  const handleLoginSuccess = (officerData: any) => {
    setOfficer((prev) => ({
      ...prev,
      id: officerData.id || prev.id,
      name: officerData.name || 'Officer Verma',
      role: officerData.role || 'checkpoint',
      checkpoint: officerData.checkpoint || prev.checkpoint,
      rank: officerData.rank || prev.rank,
    }));
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Verification Step Flow
  const handleStartNewVerification = () => {
    setScanStep(1);
    setCurrentTab('scan');
  };

  const handleAcceptVerification = (newRecord: ScreeningRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setScanStep(1);
    setCurrentTab('records');
  };

  const handleDenyVerification = (newRecord: ScreeningRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setScanStep(1);
    setCurrentTab('records');
  };

  const handleUpdateRecordStatus = (recordId: string, newStatus: any) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, status: newStatus } : r))
    );
    if (selectedRecord && selectedRecord.id === recordId) {
      setSelectedRecord((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.containerDark}>
        <StatusBar barStyle="light-content" backgroundColor="#121317" />
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top App Bar with Emblem and Security Indicator (Hidden on Step 3 per design or visible) */}
      {!(currentTab === 'scan' && scanStep === 3) && (
        <TopAppBar onPressSecurity={() => setCurrentTab('settings')} />
      )}

      {/* Active Screen Tab View */}
      <View style={styles.screenContainer}>
        {/* Tab 1: Dashboard (Screen 2) */}
        {currentTab === 'dashboard' && (
          <DashboardScreen
            officer={officer}
            records={records}
            onStartVerification={handleStartNewVerification}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onNavigateToRecords={() => setCurrentTab('records')}
          />
        )}

        {/* Tab 2: Verification Flow (Screens 4, 5, 6) */}
        {currentTab === 'scan' && (
          <>
            {scanStep === 1 && (
              <FaceCaptureScreen
                onBack={() => setCurrentTab('dashboard')}
                onNext={() => setScanStep(2)}
              />
            )}
            {scanStep === 2 && (
              <DocumentUploadScreen
                onBack={() => setScanStep(1)}
                onNext={() => setScanStep(3)}
              />
            )}
            {scanStep === 3 && (
              <VerificationResultScreen
                onBack={() => setScanStep(2)}
                onAccept={handleAcceptVerification}
                onDeny={handleDenyVerification}
                onNewVerification={handleStartNewVerification}
              />
            )}
          </>
        )}

        {/* Tab 3: Records Screen (Screen 7) */}
        {currentTab === 'records' && (
          <RecordsScreen
            records={records}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />
        )}

        {/* Tab 4: Settings (Screen 3) */}
        {currentTab === 'settings' && (
          <SettingsScreen
            officer={officer}
            onLogout={handleLogout}
          />
        )}
      </View>

      {/* Persistent Bottom Navigation Bar (Hidden during step 3 result screen per design specs) */}
      {!(currentTab === 'scan' && scanStep === 3) && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'scan') {
              setScanStep(1);
            }
            setCurrentTab(tab);
          }}
        />
      )}

      {/* Record Inspection Audit Modal */}
      <RecordDetailModal
        visible={!!selectedRecord}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onUpdateStatus={handleUpdateRecordStatus}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#121317',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
});
