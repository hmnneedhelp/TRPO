// Импорт необходимых модулей
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type ResultsScreenProps = {
  route: {
    params: {
      answers: number[];
    };
  };
};

const Tab = createBottomTabNavigator();

const questions: Question[] = [
  { question: 'Сколько будет 2 + 2?', options: ['3', '4', '5'], correctAnswer: 1 },
  { question: 'Столица Франции?', options: ['Берлин', 'Париж', 'Рим'], correctAnswer: 1 },
  { question: 'Самая большая планета Солнечной системы?', options: ['Земля', 'Юпитер', 'Марс'], correctAnswer: 1 },
];

type QuestionScreenProps = {
  question: string;
  options: string[];
  onAnswerSelected: (index: number) => void;
};

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, options, onAnswerSelected }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => onAnswerSelected(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

type TestScreenProps = {
  navigation: {
    navigate: (screen: string, params?: { answers: number[] }) => void;
  };
};

const TestScreen: React.FC<TestScreenProps> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (selectedIndex: number) => {
    setAnswers([...answers, selectedIndex]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Результаты', { answers });
    }
  };

  return (
    <QuestionScreen
      question={questions[currentQuestionIndex].question}
      options={questions[currentQuestionIndex].options}
      onAnswerSelected={handleAnswer}
    />
  );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
  const { answers } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Результаты тестирования:</Text>
      {questions.map((q, index) => (
        <Text key={index} style={styles.resultText}>
          {q.question} {answers[index] === q.correctAnswer ? '+' : '-'}
        </Text>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
