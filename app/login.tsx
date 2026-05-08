import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/config/firebase';

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Paste your Android Client ID from google-services.json here
    androidClientId: "283254200113-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    
    // Paste your Web Client ID from Firebase Auth settings here
    webClientId: "283254200113-d2k3kg4ec60269gfiuk4ehtlp074s7e1.apps.googleusercontent.com",
    
    // If you don't have an iOS ID yet, you can leave it blank or use the Web ID
    iosClientId: "283254200113-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // id_token is the "Passport" that tells Firebase who you are
      const { id_token } = response.params; 
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View className="flex-1 bg-blue-600 justify-center px-8 items-center">
      <View className="mb-12 items-center">
        <Text className="text-white text-6xl font-black tracking-tighter">Amolnama</Text>
        <Text className="text-blue-100 text-lg font-medium opacity-80">Native POS Experience</Text>
      </View>

      <TouchableOpacity 
        disabled={!request}
        onPress={() => promptAsync()}
        className="bg-white w-full py-5 rounded-[28px] flex-row justify-center items-center shadow-2xl active:scale-95 transition-all"
      >
        <Text className="text-slate-900 font-black text-lg">Continue with Google</Text>
      </TouchableOpacity>

      <Text className="text-blue-200 text-xs mt-8 opacity-60">
        Securely synced with amolnama-cc2bf.firebaseapp.com
      </Text>
    </View>
  );
}