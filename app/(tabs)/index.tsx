import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100 p-6">
      <View className="bg-white p-8 rounded-3xl shadow-xl items-center w-full border border-slate-200">
        <Text className="text-4xl font-black text-blue-600 mb-2">
          Amolnama
        </Text>
        <Text className="text-slate-500 text-center text-lg font-medium">
          NativeWind v4 Engine: ONLINE 🟢
        </Text>
      </View>
    </View>
  );
}