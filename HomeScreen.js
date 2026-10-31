import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 
export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>หน้าแรก (เลือกเมนูเครื่องดื่ม)</Text>
  
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Detail')
          }}
        >
          <Text style={styles.buttonText}>สั่งซื้อ: กาแฟลาเต้ (60 บาท)</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', padding: 24 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 24 },
    button: { backgroundColor: '#0284c7', paddingVertical: 16, paddingHorizontal: 28, borderRadius: 12 },
    backButton: { backgroundColor: '#475569', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, marginTop: 24 },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    card: { backgroundColor: '#ffffff', width: '100%', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#cbd5e1' },
    infoText: { fontSize: 18, color: '#1e293b', marginBottom: 12, fontWeight: '600' },
    studentText: { fontSize: 16, color: '#059669', marginTop: 8, fontWeight: 'bold' },
  });