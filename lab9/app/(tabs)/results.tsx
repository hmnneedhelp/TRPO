
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { questions } from '@/components/bruh/questions';
import { useSearchParams } from 'expo-router/build/hooks';

const ResultsScreen = () => {
  const searchParams = useSearchParams();
  const answers = searchParams.get('answers');
  const parsedAnswers = answers ? JSON.parse(answers) as (boolean | null)[] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Результаты теста:</Text>
      {questions.map((q, index) => (
        <Text key={index} style={styles.answerText}>
          {q.question} {parsedAnswers[index] ? '+' : '-'}
        </Text>
      ))}
    </View>
  );
};
export default ResultsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:"white",
    marginBottom: 20,
  },
  answerText: {
    fontSize: 16,
    color:"white",
    marginBottom: 10,
  },
});
