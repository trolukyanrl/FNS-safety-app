import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#2563EB';
const LIGHT_BLUE = '#EFF6FF';
const YELLOW = '#FEF9E7';
const DARK = '#1F2937';
const GREY = '#6B7280';
const GREEN = '#22C55E';

export default function SICDashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === 'Home') navigation.navigate('SICDashboard');
    if (tab === 'Tasks') navigation.navigate('SICTasks');
    if (tab === 'Profile') navigation.navigate('SICProfile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Extra top spacing for status bar / header */}
        <View style={{ height: 20 }} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark" size={26} color="#fff" />
          </View>

          <View>
            <Text style={styles.headerTitle}>SIC Portal</Text>
            <Text style={styles.headerSubtitle}>SITE IN-CHARGE</Text>
          </View>

          <Ionicons
            name="log-out-outline"
            size={22}
            color={DARK}
            style={styles.logoutIcon}
            onPress={handleLogout}
          />
        </View>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Approval Dashboard</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: LIGHT_BLUE }]}>
            <Ionicons name="hourglass-outline" size={24} color={BLUE} />
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Awaiting Review</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: YELLOW }]}>
            <Ionicons name="warning-outline" size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>05</Text>
            <Text style={styles.statLabel}>Critical Issues</Text>
          </View>
        </View>

        {/* Pending Approvals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Approvals</Text>
          <Text style={styles.link}>View History</Text>
        </View>

        {/* Approval Cards */}
        {[1, 2].map((i) => (
          <View key={i} style={styles.approvalCard}>
            <Text style={styles.badge}>
              {i === 1 ? 'BA SET · #BA-9021' : 'SAFETY KIT · #SK-442'}
            </Text>
            <Text style={styles.approvalTitle}>
              {i === 1
                ? 'Cylinder Pressure Low Check'
                : 'Weekly Inventory Audit - Zone B'}
            </Text>
            <Text style={styles.submittedBy}>
              Submitted by Inspector {i === 1 ? 'Amit R.' : 'Sarah K.'}
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewText}>Review Report</Text>
              </TouchableOpacity>

              <View style={styles.approvedIcon}>
                <Ionicons name="checkmark" size={18} color={GREEN} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {['Home', 'Tasks', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => handleNavigation(tab)}
          >
            <Ionicons
              name={
                tab === 'Home'
                  ? 'home'
                  : tab === 'Tasks'
                  ? 'checkbox-outline'
                  : 'person-outline'
              }
              size={24}
              color={activeTab === tab ? BLUE : GREY}
            />
            <Text
              style={[styles.navLabel, activeTab === tab && styles.navLabelActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: DARK },
  headerSubtitle: { fontSize: 12, color: GREY },
  logoutIcon: { marginLeft: 'auto' },
  pageTitle: { fontSize: 20, fontWeight: '700', color: DARK, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statCard: { flex: 1, borderRadius: 16, padding: 16 },
  statNumber: { fontSize: 24, fontWeight: '800', color: DARK, marginTop: 8 },
  statLabel: { fontSize: 13, color: GREY },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: DARK },
  link: { fontSize: 13, fontWeight: '600', color: BLUE },
  approvalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 2 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#E0E7FF', color: BLUE, fontSize: 11, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 8 },
  approvalTitle: { fontSize: 15, fontWeight: '700', color: DARK, marginBottom: 4 },
  submittedBy: { fontSize: 12, color: GREY, marginBottom: 12 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  reviewButton: { flex: 1, backgroundColor: '#0F172A', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  reviewText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  approvedIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#E8E8E8' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 12, color: GREY, marginTop: 4 },
  navLabelActive: { color: BLUE, fontWeight: '600' },
});
