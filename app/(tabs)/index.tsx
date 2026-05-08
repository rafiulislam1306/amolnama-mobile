import { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MANUAL_PRODUCTS } from '../../src/data/products';
import { useCartStore } from '../../src/store/useCartStore';

export default function POSScreen() {
  // We explicitly pull 'cart' here so React watches it for changes
  const { addToCart, cart, clearCart } = useCartStore();

  // We calculate the total here. 
  // 'useMemo' ensures it only recalculates when the cart actually changes.
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-blue-600 pt-16 pb-6 px-6 rounded-b-3xl shadow-lg">
        <Text className="text-white text-2xl font-bold">Amolnama POS</Text>
        <Text className="text-blue-100 opacity-80">Manual Entry Mode</Text>
      </View>

      {/* Product Catalog */}
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
          Catalog
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {MANUAL_PRODUCTS.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => {
                console.log("Adding product:", product.name); // Debug check
                addToCart(product);
              }}
              className="bg-white w-[48%] p-4 rounded-2xl mb-4 shadow-sm border border-slate-100 active:bg-blue-50"
            >
              <Text className="text-slate-900 font-bold text-lg">{product.name}</Text>
              <Text className="text-blue-600 font-medium">৳{product.price}</Text>
              <View className="mt-2 bg-slate-100 rounded-full py-1 items-center">
                <Text className="text-slate-500 text-xs">Add to Bill</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Checkout Bar */}
      <View className="bg-white p-6 pb-10 rounded-t-3xl shadow-2xl border-t border-slate-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-slate-400 text-sm">
              Items in Cart: {cart.length}
            </Text>
            <Text className="text-3xl font-black text-slate-900">
              ৳{totalPrice}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={clearCart}
            className="bg-red-50 px-4 py-2 rounded-xl"
          >
            <Text className="text-red-500 font-bold">Clear</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className={`py-4 rounded-2xl items-center shadow-md ${cart.length > 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
          disabled={cart.length === 0}
        >
          <Text className="text-white font-bold text-lg">Process Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}