import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Alert } from "react-native";

export default function App() {
  const handleButtonPress = () => {
    Alert.alert("Alerta", "Hola, botón funcionando");
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-blue-600 mb-4">
        ¡NativeWind Funcionando!
      </Text>
      <Text className="text-gray-600 text-center px-4">
        React Native + Expo + NativeWind + TypeScript
      </Text>
      <TouchableOpacity 
        className="mt-6 bg-blue-500 px-6 py-3 rounded-lg shadow-lg"
        onPress={handleButtonPress}
      >
        <Text className="text-white font-semibold">Botón de Ejemplo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
