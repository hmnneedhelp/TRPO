
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { questions } from '@/components/bruh/questions';
import { GestureHandlerRootView, NativeViewGestureHandler, ScrollView } from 'react-native-gesture-handler';

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(boolean | null)[]>(questions.map(() => null));
  const router = useRouter();

  const handleAnswer = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedOption === questions[currentQuestionIndex].correct;
      setAnswers(newAnswers)
      setSelectedOption(null);
      router.push({ pathname: '/results', params: { answers: JSON.stringify(newAnswers) } });
      
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navigation}>
        {questions.map((_, index) => (
          <Button title={(index+1).toString()} key={index} onPress={()=>setCurrentQuestionIndex(index)} color={"white"} />
        ))}
      </ScrollView>
      <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <View key={index} style={styles.buttonContainer}>
          <Button
            title={option}
            onPress={() => setSelectedOption(index)}
            color={selectedOption === index ? 'blue' : 'gray'}
          />
        </View>
      ))}
      <Button title="Ответить" onPress={handleAnswer} disabled={selectedOption === null} />
            <Button title={"Очистить"} onPress={()=>setAnswers([])} />
      
    </View>
    
    </GestureHandlerRootView>
  );
};
export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:150,
    padding: 16,
    backgroundColor: '#282c34', // Dark background for contrast
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
  },
  navigation: {
    flexDirection: 'row',
  },
  navItem: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    height:15,
  },
  navText: {
    color: "black",
  },
  buttonContainer: {
    marginVertical: 10, // Add margin for spacing between buttons
    width: '100%', // Make buttons take full width
  },
});