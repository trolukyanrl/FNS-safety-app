import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#2563EB';
const LIGHT_BLUE = '#EFF6FF';
const DARK = '#1F2937';
const GREY = '#6B7280';
const LIGHT_GREY = '#9CA3AF';
const WHITE = '#FFFFFF';
const GREEN = '#22C55E';
const RED = '#EF4444';

const TASK_TYPES = [
  { id: '1', name: 'BA-SET', icon: 'shield-checkmark' },
  { id: '2', name: 'SK', icon: 'construct' },
];

const ZONES = [
  { id: '1', name: 'Zone A' },
  { id: '2', name: 'Zone B' },
  { id: '3', name: 'Zone C' },
];

const INSPECTORS = [
  { id: '1', name: 'Amit R.', department: 'Safety' },
  { id: '2', name: 'Sarah K.', department: 'Operations' },
  { id: '3', name: 'Raj P.', department: 'Maintenance' },
  { id: '4', name: 'Lisa M.', department: 'Quality' },
];

export default function SICAssignTask({ navigation }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showInspectorModal, setShowInspectorModal] = useState(false);

  const handleAssignTask = () => {
    if (!taskTitle.trim() || !taskDescription.trim() || !selectedType || !selectedZone || !selectedInspector || !dueDate.trim()) {
      Alert.alert('Error', 'Please fill in all fields to assign a task.');
      return;
    }

    // Here you would typically save the task to your backend/database
    Alert.alert(
      'Task Assigned',
      `Task "${taskTitle}" has been assigned to ${selectedInspector.name} in ${selectedZone.name} with due date ${dueDate}.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderTaskType = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.typeItem,
        selectedType?.id === item.id && styles.typeItemSelected
      ]}
      onPress={() => {
        setSelectedType(item);
        setShowTypeModal(false);
      }}
    >
      <Ionicons name={item.icon} size={20} color={selectedType?.id === item.id ? BLUE : GREY} />
      <Text style={[
        styles.typeText,
        selectedType?.id === item.id && styles.typeTextSelected
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderZone = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.typeItem,
        selectedZone?.id === item.id && styles.typeItemSelected
      ]}
      onPress={() => {
        setSelectedZone(item);
        setShowZoneModal(false);
      }}
    >
      <Ionicons name="location-outline" size={20} color={selectedZone?.id === item.id ? BLUE : GREY} />
      <Text style={[
        styles.typeText,
        selectedZone?.id === item.id && styles.typeTextSelected
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderInspector = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.inspectorItem,
        selectedInspector?.id === item.id && styles.inspectorItemSelected
      ]}
      onPress={() => {
        setSelectedInspector(item);
        setShowInspectorModal(false);
      }}
    >
      <View style={styles.inspectorInfo}>
        <Text style={styles.inspectorName}>{item.name}</Text>
        <Text style={styles.inspectorDept}>{item.department}</Text>
      </View>
      {selectedInspector?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color={GREEN} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={DARK} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Assign Task</Text>
            <Text style={styles.headerSubtitle}>SITE IN-CHARGE</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          {/* Task Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Title</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="title-outline" size={20} color={LIGHT_GREY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter task title"
                placeholderTextColor={LIGHT_GREY}
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
            </View>
          </View>

          {/* Task Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Type</Text>
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => setShowTypeModal(true)}
            >
              <Ionicons name="list-outline" size={20} color={LIGHT_GREY} style={styles.inputIcon} />
              <Text style={[
                styles.selectText,
                !selectedType && { color: LIGHT_GREY }
              ]}>
                {selectedType ? selectedType.name : 'Select task type'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={LIGHT_GREY} />
            </TouchableOpacity>
          </View>

          {/* Zone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Zone</Text>
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => setShowZoneModal(true)}
            >
              <Ionicons name="location-outline" size={20} color={LIGHT_GREY} style={styles.inputIcon} />
              <Text style={[
                styles.selectText,
                !selectedZone && { color: LIGHT_GREY }
              ]}>
                {selectedZone ? selectedZone.name : 'Select zone'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={LIGHT_GREY} />
            </TouchableOpacity>
          </View>

          {/* Inspector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Assign To</Text>
            <TouchableOpacity
              style={styles.selectWrapper}
              onPress={() => setShowInspectorModal(true)}
            >
              <Ionicons name="person-outline" size={20} color={LIGHT_GREY} style={styles.inputIcon} />
              <Text style={[
                styles.selectText,
                !selectedInspector && { color: LIGHT_GREY }
              ]}>
                {selectedInspector ? `${selectedInspector.name} (${selectedInspector.department})` : 'Select inspector'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={LIGHT_GREY} />
            </TouchableOpacity>
          </View>

          {/* Due Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Due Date</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color={LIGHT_GREY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={LIGHT_GREY}
                value={dueDate}
                onChangeText={setDueDate}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Task Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Description</Text>
            <View style={styles.textareaWrapper}>
              <TextInput
                style={styles.textarea}
                placeholder="Describe the task details..."
                placeholderTextColor={LIGHT_GREY}
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Assign Button */}
          <TouchableOpacity style={styles.assignButton} onPress={handleAssignTask}>
            <Ionicons name="add-circle" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.assignButtonText}>Assign Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      {/* Task Type Modal */}
      <Modal
        visible={showTypeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTypeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Task Type</Text>
            <FlatList
              data={TASK_TYPES}
              renderItem={renderTaskType}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Zone Modal */}
      <Modal
        visible={showZoneModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowZoneModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowZoneModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Zone</Text>
            <FlatList
              data={ZONES}
              renderItem={renderZone}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Inspector Modal */}
      <Modal
        visible={showInspectorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInspectorModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowInspectorModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Inspector</Text>
            <FlatList
              data={INSPECTORS}
              renderItem={renderInspector}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { width: 40, height: 40, borderRadius: 8, backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  headerContent: { flex: 1, marginLeft: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: DARK },
  headerSubtitle: { fontSize: 12, color: GREY, marginTop: 4 },
  formCard: { backgroundColor: WHITE, borderRadius: 16, padding: 20, elevation: 2 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '500', color: DARK, marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16 },
  textareaWrapper: { backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: DARK },
  textarea: { paddingVertical: 14, fontSize: 16, color: DARK },
  selectWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14 },
  dateWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14 },
  selectText: { flex: 1, fontSize: 16, color: DARK, marginLeft: 12 },
  dateText: { flex: 1, fontSize: 16, color: DARK, marginLeft: 12 },
  assignButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: BLUE, borderRadius: 12, paddingVertical: 16, marginTop: 8 },
  buttonIcon: { marginRight: 12 },
  assignButtonText: { fontSize: 16, fontWeight: '700', color: WHITE },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: WHITE, borderRadius: 16, width: '80%', maxHeight: '60%', padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: DARK, marginBottom: 16, textAlign: 'center' },
  typeItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#F9FAFB', marginBottom: 8 },
  typeItemSelected: { backgroundColor: LIGHT_BLUE, borderWidth: 1, borderColor: BLUE },
  typeText: { marginLeft: 12, fontSize: 16, color: GREY },
  typeTextSelected: { color: BLUE, fontWeight: '600' },
  inspectorItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#F9FAFB', marginBottom: 8 },
  inspectorItemSelected: { backgroundColor: LIGHT_BLUE, borderWidth: 1, borderColor: BLUE },
  inspectorInfo: { flex: 1 },
  inspectorName: { fontSize: 16, fontWeight: '600', color: DARK },
  inspectorDept: { fontSize: 12, color: GREY, marginTop: 2 },
});