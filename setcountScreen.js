
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; // 1. นําเข้า { useState } จาก 'react'
// ประกาศตัวแปรธรรมดาภายนอก
const App = () => {
 const [count,setCount] = useState(0);
 const handleIncrease = () => setCount(count + 1);
 const handleDexrease = () => setCount(count - 1);
 const handleReset = () => setCount(0);



 return (
 <View style={styles.container}>
 <Text style={styles.title}>ทดสอบตัวแปรธรรมดา let</Text>
 {/* ตัวเลขบนหน้าจอ */}
 <Text style={styles.numberText}>{count}</Text>

  <View>
     <TouchableOpacity style={styles.button1} onPress={handleIncrease}>
 <Text style={styles.buttonText}>เพิ่ม (+1)</Text>
 </TouchableOpacity>

  <TouchableOpacity style={styles.button2} onPress={handleDexrease}>
 <Text style={styles.buttonText}>ลด (-1)</Text>
 </TouchableOpacity>

  <TouchableOpacity style={styles.button3} onPress={handleReset}>
 <Text style={styles.buttonText}>รีเซ็ต (0)</Text>
 </TouchableOpacity>
  </View>






 </View>


 );
};

export default App;
const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#ffffff',
 alignItems: 'center',
 justifyContent: 'center',
 padding: 20,
 },
 title: {
 fontSize: 18,
 color: '#64748b',
 marginBottom: 10,
 },
 numberText: {
 fontSize: 72,
 fontWeight: 'bold',
 color: '#0f172a',
 marginBottom: 20,
 },
 button1: {
 backgroundColor: '#0cff03',
 position : 'absolute',
 alignItems : 'center',
 top : 10,
 left : -170,
 borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center', 
  width : 100,
  height : 50,
 
 },
  button2: {
  backgroundColor: '#d61103',
 position : 'absolute',
 alignItems : 'center',
 top : 10,
 left : 70,
 borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center', 
  width : 100,
  height : 50,

 borderRadius: 8,
 },
  button3: {
  backgroundColor: '#2a2e30',
 position : 'absolute',
 alignItems : 'center',
 top : 10,
 right : -50,
 borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center', 
  width : 100,
  height : 50,

 borderRadius: 8,
 },
 buttonText: {
 color: '#ffffff',
 fontSize: 16,
 fontWeight: '600',
 },

})



