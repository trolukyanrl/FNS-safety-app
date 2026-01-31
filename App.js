import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './screens/LoginScreen';
import SICDashboard from './screens/SICDashboard';
import SICTasks from './screens/SICTasks';
import SICProfile from './screens/SICProfile';
import TADashboard from './screens/TADashboard';
import TasksScreen from './screens/TasksScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* SIC Screens */}
        <Stack.Screen name="SICDashboard" component={SICDashboard} />
        <Stack.Screen name="SICTasks" component={SICTasks} />
        <Stack.Screen name="SICProfile" component={SICProfile} />

        {/* TA Screens */}
        <Stack.Screen name="TADashboard" component={TADashboard} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>

      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
