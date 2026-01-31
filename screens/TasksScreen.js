import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#4285F4';
const DARK_GREY = '#333333';
const LIGHT_GREY = '#666666';

const TASKS = [
  { id: 'BA-SET-042', title: 'Zone A-3 Inspection', time: 'Today, 10:00 AM', location: 'Zone A-3', status: 'Pending', progress: 0 },
  { id: 'SK-015', title: 'Safety Kit Check - B Wing', time: 'Today, 2:30 PM', location: 'Zone B-1', status: 'Pending', progress: 0 },
];

export default function TasksScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Tasks');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === 'Home') navigation.navigate('TADashboard');
    if (tab === 'Tasks') navigation.navigate('Tasks');
    if (tab === 'Profile') navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>My Tasks</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {TASKS.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskId}>{task.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{task.status}</Text>
              </View>
            </View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.taskDetails}>
              <Ionicons name="calendar-outline" size={14} color={LIGHT_GREY} />
              <Text style={styles.taskDetailText}>{task.time}</Text>
            </View>
            <View style={styles.taskDetails}>
              <Ionicons name="location-outline" size={14} color={LIGHT_GREY} />
              <Text style={styles.taskDetailText}>{task.location}</Text>
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
              name={tab === 'Home' ? 'home' : tab === 'Tasks' ? 'checkbox-outline' : 'person-outline'}
              size={24}
              color={activeTab === tab ? BLUE : LIGHT_GREY}
            />
            <Text style={[styles.navLabel, activeTab === tab && styles.navLabelActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  pageTitle: { fontSize: 20, fontWeight: '700', color: DARK_GREY },
  scrollContent: { padding: 20, paddingBottom: 100 },
  taskCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  taskId: { fontSize: 12, fontWeight: '600', color: LIGHT_GREY },
  statusBadge: { backgroundColor: '#FFF8E1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600', color: '#F9A825' },
  taskTitle: { fontSize: 16, fontWeight: '600', color: DARK_GREY, marginBottom: 12 },
  taskDetails: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  taskDetailText: { fontSize: 14, color: LIGHT_GREY, marginLeft: 8 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#E8E8E8' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 12, color: LIGHT_GREY, marginTop: 4 },
  navLabelActive: { color: BLUE, fontWeight: '600' },
});
