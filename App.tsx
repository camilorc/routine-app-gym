import "./global.css";
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from './auth/AuthContext';
import { RoutinesProvider } from './contexts/RoutinesContext';
import { colors } from './styles';
import { TabIcon } from './components/TabIcon';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Importar pantallas
import HomeScreen from './screens/HomeScreen';
import { AuthContainer } from './screens/auth';
import RoutinesListScreen from './screens/RoutinesListScreen';
import CreateRoutineScreen from './screens/CreateRoutineScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RoutinesStack = createStackNavigator();

// Stack Navigator para la sección de Rutinas
function RoutinesStackNavigator() {
  return (
    <RoutinesStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <RoutinesStack.Screen name="RoutinesList" component={RoutinesListScreen} />
      <RoutinesStack.Screen name="CreateRoutine" component={CreateRoutineScreen} />
      <RoutinesStack.Screen name="AddExercise" component={AddExerciseScreen} />
    </RoutinesStack.Navigator>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Create') {
            // Botón especial para crear rutina
            return (
              <View 
                className="w-8 h-8 rounded-md items-center justify-center"
                style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
              >
                <Ionicons name="add" size={16} color={colors.background.primary} />
              </View>
            );
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <TabIcon name={iconName} focused={focused} />;
        },
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.primary,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8 + insets.bottom,
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen 
        name="Create" 
        component={RoutinesStackNavigator}
        options={{ 
          tabBarLabel: 'Rutinas'
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AuthContainer}
        options={{ tabBarLabel: 'Mi Cuenta' }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        cardStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RoutinesProvider>
          <NavigationContainer>
            <RootStack />
            <StatusBar style="dark" backgroundColor={colors.background.primary} />
          </NavigationContainer>
        </RoutinesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
