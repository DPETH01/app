import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 
 
export default function DetailScreen({ route, navigation }) {
    // รับก้อนข้อมูลที่ส่งมาจากหน้าแรก (ถ้ายังไม่ได้ส่งมา ให้เป็นก้อนว่าง {})
    const data = route.params || {};
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>หน้ารายละเอียดคำสั่งซื้อ</Text>
  
        <View style={styles.card}>
          {/* [จุดที่ 2] บรรทัดที่ 42-43: ดึงชื่อเมนูและราคามาแสดงด้วยเครื่องหมายจุด (.) */}
          <Text style={styles.infoText}>ชื่อเมนู: {data.menuName}</Text>
          <Text style={styles.infoText}>ราคา: {data.price} บาท</Text>
  
          {/* [โจทย์ Challenge 4] บรรทัดที่ 46: แสดงชื่อและรหัสนักศึกษาที่ส่งมาจากหน้าแรก */}
          <Text style={styles.studentText}>ผู้สั่งซื้อ: {data.studentName}</Text>
        </View>
  
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>ย้อนกลับไปหน้าแรก</Text>
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