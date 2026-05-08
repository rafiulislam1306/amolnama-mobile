import React, { useMemo } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { OFFICIAL_CATALOG } from '../../src/data/catalog';
import { useAppStore } from '../../src/store/useAppStore';

export default function POSScreen() {
  const { cart, addToCart, clearCart, user } = useAppStore();

  // Price Logic: Mirroring v2's calculation engine
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const handleProcessPayment = () => {
    if (cart.length === 0) return;
    Alert.alert("Process Bill", `Confirm total: ৳${total}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", onPress: () => console.log("Finalizing Transaction...") }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Native Header: Much smoother than a PWA header */}
      <View className="bg-blue-600 px-6 pt-12 pb-8 rounded-b-[40px] shadow-xl">
        <Text className="text-white text-3xl font-black">Amolnama</Text>
        <Text className="text-blue-100 font-medium opacity-80">Welcome back, {user?.email?.split('@')[0]}</Text>
      </View>

      <ScrollView className="flex-1 px-4 mt-6" showsVerticalScrollIndicator={false}>
        {/* Render Sections based on your v2 Logic */}
        <Section title="New SIM Cards" items={getItemsByCat('new-sim')} onAdd={addToCart} />
        <Section title="SIM Replacements" items={getItemsByCat('paid-rep')} onAdd={addToCart} />
        <Section title="Other Services" items={getItemsByCat('service')} onAdd={addToCart} />
        <Section title="Free Actions (FOC)" items={getItemsByCat('foc')} onAdd={addToCart} />
        <View className="h-20" /> 
      </ScrollView>

      {/* Floating Checkout Bar: The "Native" Feel */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-6 pb-10 rounded-t-[35px] shadow-2xl border-t border-slate-100">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-400 font-bold text-xs uppercase tracking-tighter">Current Total</Text>
            <Text className="text-4xl font-black text-slate-900">৳{total}</Text>
          </View>
          <TouchableOpacity onPress={clearCart} className="bg-red-50 px-6 py-3 rounded-2xl">
            <Text className="text-red-500 font-bold">Clear</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleProcessPayment}
          disabled={cart.length === 0}
          className={`w-full py-5 rounded-2xl items-center shadow-lg ${cart.length > 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
        >
          <Text className="text-white font-black text-xl">Complete Sale</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Helper: Matches your v2 Category filtering logic
function getItemsByCat(cat: string) {
  return Object.entries(OFFICIAL_CATALOG)
    .filter(([_, item]) => item.cat === cat)
    .map(([id, item]) => ({ id, ...item }));
}

// UI Section: Reusable component for a clean "Standard" structure
function Section({ title, items, onAdd }: any) {
  if (items.length === 0) return null;
  return (
    <View className="mb-8">
      <Text className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-4 ml-1">{title}</Text>
      <View className="flex-row flex-wrap justify-between">
        {items.map((item: any) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => onAdd(item)}
            className="bg-white w-[48%] p-5 rounded-[28px] mb-4 border border-slate-100 shadow-sm active:bg-blue-50 active:scale-95 transition-all"
          >
            <Text className="text-slate-900 font-bold text-sm mb-1">{item.display}</Text>
            <Text className="text-blue-600 font-black text-lg">৳{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}