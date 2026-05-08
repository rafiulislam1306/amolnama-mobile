import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/config/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // We define the redirect URI first so we can use it in the hook
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
    projectNameForProxy: 'amolnama-mobile',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "283254200113-b2s2l7m4hjgmdls2b1fu3j1po6c0f850.apps.googleusercontent.com",
    webClientId: "283254200113-d2k3kg4ec60269gfiuk4ehtlp074s7e1.apps.googleusercontent.com",
    iosClientId: "283254200113-d2k3kg4ec60269gfiuk4ehtlp074s7e1.apps.googleusercontent.com",
    redirectUri: redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
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
        className={`bg-white w-full py-5 rounded-[28px] flex-row justify-center items-center shadow-2xl ${!request ? 'opacity-50' : 'active:scale-95'}`}
      >
        {!request ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text className="text-slate-900 font-black text-lg">Continue with Google</Text>
        )}
      </TouchableOpacity>

      <View className="mt-8 px-4">
        <Text className="text-blue-200 text-[10px] opacity-60 text-center">
          COPY THIS URL TO GOOGLE CLOUD:
        </Text>
        <Text className="text-white text-[11px] font-bold text-center mt-1 select-all">
          https://auth.expo.io/@rafiulislam1306/amolnama-mobile
        </Text>
      </View>
    </View>
  );
}