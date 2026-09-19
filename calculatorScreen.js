import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_GAP = 12;
const KEYPAD_PADDING = 16;
const BUTTON_WIDTH = (width - (KEYPAD_PADDING * 2) - (BUTTON_GAP * 3)) / 4;

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearOnNextNumber, setClearOnNextNumber] = useState(false);

  // ฟังก์ชันช่วยจัดฟอร์แมตตัวเลขให้มีคอมมา (,) หลักพัน
  const formatNumberWithCommas = (str) => {
    if (!str) return '';
    return str.split(/([\+\−\×\÷])/).map(part => {
      if (['+', '−', '×', '÷'].includes(part)) return part;
      
      let parts = part.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }).join('');
  };

  const handleTap = (type, value) => {
    // ลบคอมมาออกก่อนนำข้อมูลไปประมวลผลต่อ
    const currentRawValue = displayValue.replace(/,/g, '');

    // 1. จัดการกดปุ่มตัวเลข (0-9)
    if (type === 'number') {
      if (clearOnNextNumber) {
        setDisplayValue(value);
        setClearOnNextNumber(false);
      } else {
        setDisplayValue(formatNumberWithCommas(currentRawValue === '0' ? value : currentRawValue + value));
      }
    }

    // 2. จัดการจุดทศนิยม (.)
    if (type === 'decimal') {
      if (clearOnNextNumber) {
        setDisplayValue('0.');
        setClearOnNextNumber(false);
        return;
      }
      
      const tokens = currentRawValue.split(/[\+\−\×\÷]/);
      const lastToken = tokens[tokens.length - 1];
      
      if (!lastToken.includes('.')) {
        setDisplayValue(formatNumberWithCommas(currentRawValue + '.'));
      }
    }

    // 3. จัดการปุ่มล้างข้อมูล (AC / C)
    if (type === 'clear') {
      setDisplayValue('0');
      setClearOnNextNumber(false);
    }

    // 4. จัดการปุ่มลบตัวเลขทีละหลัก (Backspace)
    if (type === 'backspace') {
      // ถ้าคำนวณเสร็จแล้วกดลบ ให้ล้างเป็น 0 ทันที
      if (clearOnNextNumber) {
        setDisplayValue('0');
        setClearOnNextNumber(false);
        return;
      }

      // ลบตัวอักษรตัวสุดท้ายออก 1 ตัว
      const remainingValue = currentRawValue.slice(0, -1);
      
      // ถ้าลบจนโล่ง หรือเหลือแค่ช่องว่าง ให้กลับไปเป็นเลข '0'
      if (remainingValue === '' || remainingValue === '0') {
        setDisplayValue('0');
      } else {
        setDisplayValue(formatNumberWithCommas(remainingValue));
      }
    }

    // 5. จัดการปุ่มเปลี่ยนเครื่องหมาย บวก/ลบ (+/-)
    if (type === 'toggleSign') {
      // ค้นหาตัวเลขตัวสุดท้ายในสมการเพื่อใส่ประจุลบเฉพาะตัวนั้น
      const tokens = currentRawValue.split(/([\+\−\×\÷])/);
      const lastToken = tokens[tokens.length - 1];
      
      if (lastToken && lastToken !== '0') {
        const toggledToken = (parseFloat(lastToken) * -1).toString();
        tokens[tokens.length - 1] = toggledToken;
        setDisplayValue(formatNumberWithCommas(tokens.join('')));
      }
    }

    // 6. จัดการเครื่องหมายคำนวณ (+, −, ×, ÷)
    if (type === 'operator') {
      setClearOnNextNumber(false);
      const lastChar = currentRawValue.slice(-1);
      
      if (['+', '−', '×', '÷'].includes(lastChar)) {
        setDisplayValue(formatNumberWithCommas(currentRawValue.slice(0, -1) + value));
      } else {
        setDisplayValue(formatNumberWithCommas(currentRawValue + value));
      }
    }

    // 7. จัดการเครื่องหมายเท่ากับ (=) เพื่อคำนวณผลลัพธ์
    if (type === 'equal') {
      try {
        let formattedExpression = currentRawValue
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-');

        const calculateResult = new Function(`return ${formattedExpression}`)();
        
        if (calculateResult === undefined || isNaN(calculateResult)) {
          setDisplayValue('Error');
        } else {
          const finalResult = Number.isInteger(calculateResult) 
            ? calculateResult.toString() 
            : parseFloat(calculateResult.toFixed(4)).toString();
            
          setDisplayValue(formatNumberWithCommas(finalResult));
        }
      } catch (error) {
        setDisplayValue('Error');
      }
      setClearOnNextNumber(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ส่วนหน้าจอแสดงผลตัวเลข */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1}>{displayValue}</Text>
      </View>

      {/* ส่วนแผงปุ่มกด */}
      <View style={styles.keypad}>
        {/* แถวที่ 1: AC, +/-, ⌫ (ลบ), ÷ */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.btnTop]} onPress={() => handleTap('clear')}>
            <Text style={styles.btnTextDark}>{displayValue === '0' ? 'AC' : 'C'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnTop]} onPress={() => handleTap('toggleSign')}>
            <Text style={styles.btnTextDark}>+/-</Text>
          </TouchableOpacity>
          {/* เปลี่ยนปุ่ม % เดิมเป็นปุ่มลบตัวเลข (Backspace) */}
          <TouchableOpacity style={[styles.btn, styles.btnTop]} onPress={() => handleTap('backspace')}>
            <Text style={styles.btnTextDark}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOrange]} onPress={() => handleTap('operator', '÷')}>
            <Text style={styles.btnText}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* แถวที่ 2: 7, 8, 9, × */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '7')}><Text style={styles.btnText}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '8')}><Text style={styles.btnText}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '9')}><Text style={styles.btnText}>9</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOrange]} onPress={() => handleTap('operator', '×')}>
            <Text style={styles.btnText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* แถวที่ 3: 4, 5, 6, − */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '4')}><Text style={styles.btnText}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '5')}><Text style={styles.btnText}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '6')}><Text style={styles.btnText}>6</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOrange]} onPress={() => handleTap('operator', '−')}>
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>
        </View>

        {/* แถวที่ 4: 1, 2, 3, + */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '1')}><Text style={styles.btnText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '2')}><Text style={styles.btnText}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('number', '3')}><Text style={styles.btnText}>3</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOrange]} onPress={() => handleTap('operator', '+')}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* แถวที่ 5: 0, ., = */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.btnZero]} onPress={() => handleTap('number', '0')}>
            <Text style={[styles.btnText, styles.zeroText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleTap('decimal')}>
            <Text style={styles.btnText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOrange]} onPress={() => handleTap('equal')}>
            <Text style={styles.btnText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  // ==========================================
  // LAYOUT & CONTAINERS
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: '#17171c',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  displayContainer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    alignItems: 'flex-end',
  },
  keypad: {
    paddingHorizontal: KEYPAD_PADDING,
    gap: BUTTON_GAP,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: BUTTON_GAP,
  },

  // ==========================================
  // BUTTONS & SHAPES
  // ==========================================
  btn: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: '#2e2f38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnZero: {
    width: (BUTTON_WIDTH * 2) + BUTTON_GAP,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  btnTop: {
    backgroundColor: '#4e505f',
  },
  btnOrange: {
    backgroundColor: '#ff9f0a',
  },

  // ==========================================
  // TEXTS
  // ==========================================
  displayText: {
    fontSize: 54,
    fontWeight: '300',
    color: '#ffffff',
  },
  btnText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#ffffff',
  },
  btnTextDark: {
    fontSize: 26,
    fontWeight: '500',
    color: '#ffffff',
  },
  zeroText: {
    textAlign: 'left',
  },
});
