
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

export default function App() {

  // State เก็บข้อมูลสินค้า
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State อัตราแลกเปลี่ยน
  const [exchangeRate, setExchangeRate] = useState(34);

  // State ตะกร้าสินค้า
  const [cartItems, setCartItems] = useState([]);

  // API ดึงอัตราแลกเปลี่ยน USD เป็น THB
  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then((response) => {
        if (response.data.result === 'success') {
          const rate = Number(response.data.rates.THB);

          if (Number.isFinite(rate)) {
            setExchangeRate(rate);
            console.log('อัตราแลกเปลี่ยน:', rate);
          }
        }
      })
      .catch((error) => {
        console.log('โหลดอัตราแลกเปลี่ยนไม่สำเร็จ:', error.message);
      });
  }, []);

  // API ดึงข้อมูลสินค้า
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=6')
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setLoading(false);
      });
  }, []);

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = (item) => {
    const price = Number(item.price);
    const rate = Number(exchangeRate);

    if (!Number.isFinite(price) || !Number.isFinite(rate)) {
      console.log('ราคาสินค้าหรืออัตราแลกเปลี่ยนไม่ถูกต้อง');
      return;
    }

    const thaiPrice = Math.round(price * rate);

    setCartItems((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        name: item.title,
        price: thaiPrice
      }
    ]);
  };

  // ฟังก์ชันยกเลิกสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // คำนวณจำนวนสินค้า
  const cartCount = cartItems.length;

  // คำนวณยอดรวมสินค้า
  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);

  // หน้าจอกำลังโหลด
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color="#0284c7" />
          <Text style={styles.loadingText}>
            กำลังดึงสินค้าจาก Cloud...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // หน้าจอหลัก
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.headerTitle}>
          ระบบ POS - พีรพัฒน์ อ้นจัทร์ (2510511106009)
        </Text>

        <Text style={styles.productPrice}>
          1 USD = {exchangeRate.toFixed(2)} THB
        </Text>

        {/* กล่องสรุปตะกร้าสินค้า */}
        <View style={styles.cartBox}>
          <Text style={styles.cartText}>
            สินค้าในตะกร้า: {cartCount} ชิ้น
          </Text>

          <Text style={styles.cartTotal}>
            รวมทั้งหมด: {cartTotal.toLocaleString('th-TH')} บาท
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* รายการสินค้าในตะกร้า */}
          <Text style={styles.sectionTitle}>
            รายการสินค้าในตะกร้า
          </Text>

          {cartItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                ยังไม่มีสินค้าในตะกร้า
              </Text>
            </View>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cartText}>
                    {item.name}
                  </Text>

                  <Text style={styles.productPrice}>
                    {item.price.toLocaleString('th-TH')} บาท
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.cancelBtnText}>
                    ยกเลิก
                  </Text>
                </TouchableOpacity>

              </View>
            ))
          )}

          {/* รายการสินค้าจาก API */}
          <Text style={styles.sectionTitle}>
            รายการสินค้าทั้งหมด
          </Text>

          {products.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                ยังไม่มีข้อมูลสินค้า
              </Text>
            </View>
          ) : (
            products.map((item) => (
              <View key={item.id} style={styles.card}>

                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                />

                <View style={styles.cardInfo}>

                  <Text style={styles.productTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.productPrice}>
                    ราคา: {Math.round(Number(item.price) * exchangeRate).toLocaleString('th-TH')} บาท
                  </Text>

                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.addBtnText}>
                      + ซื้อ
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            ))
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'android' ? 40 : 12,
  },

  loadingCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
    marginTop: 10,
  },

  emptyBox: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },

  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },

  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },

  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0284c7',
    marginTop: 6,
  },

  addBtn: {
    backgroundColor: '#0284c7',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },

  addBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  cartBox: {
    backgroundColor: '#e0f2fe',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },

  cartText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: 'bold',
  },

  cartTotal: {
    fontSize: 16,
    color: '#0284c7',
    fontWeight: 'bold',
    marginTop: 5,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  cancelBtn: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 6,
  },

  cancelBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

});
