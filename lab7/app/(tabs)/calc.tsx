import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Calc() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
  
    const validateInput = (value:any) => {
      // Проверка на пустую строку и нечисловые символы
      if (value.trim() === '') {
        Alert.alert("Ошибка", "Поле не должно быть пустым.");
        return false;
      }
      if (isNaN(value)) {
        Alert.alert("Ошибка", "Введите корректное число.");
        return false;
      }
      return true;
    };
  
    const calculateSin = () => {
      if (validateInput(inputValue)) {
        const radians = parseFloat(inputValue);
        setResult(Math.sin(radians).toFixed(4));
      }
    };
  
    const calculateCos = () => {
      if (validateInput(inputValue)) {
        const radians = parseFloat(inputValue);
        setResult(Math.cos(radians).toFixed(4));
      }
    };
  
    const calculateTan = () => {
      if (validateInput(inputValue)) {
        const radians = parseFloat(inputValue);
        setResult(Math.tan(radians).toFixed(4));
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Тригонометрические функции</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите угол в радианах"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <View style={styles.buttonContainer}>
          <Button title="Синус" onPress={calculateSin} />
          <Button title="Косинус" onPress={calculateCos} />
          <Button title="Тангенс" onPress={calculateTan} />
        </View>
        {result !== null && (
          <Text style={styles.result}>Результат: {result}</Text>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#282c34',
    },
    title: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      width: '80%',
      color: '#fff',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    result: {
      fontSize: 18,
      color: '#fff',
    },
  });