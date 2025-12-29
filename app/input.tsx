import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SavingsContext } from './_layout';
import { useRouter } from 'expo-router';

const CATEGORIES = [
  { id: '1', label: '☕️ コーヒー', amount: 500 },
  { id: '2', label: '🍺 飲み会', amount: 4000 },
  { id: '3', label: '👗 洋服', amount: 5000 },
];

export default function Input() {
  const { addSaving } = useContext(SavingsContext);
  const router = useRouter();

  const handlePress = (label: string, amount: number) => {
    addSaving(label, amount);
    router.push('/'); // 保存したらホームへ戻る
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>何をした「つもり」？</Text>
      {CATEGORIES.map(cat => (
        <TouchableOpacity key={cat.id} style={styles.card} onPress={() => handlePress(cat.label, cat.amount)}>
          <Text style={styles.cardText}>{cat.label}</Text>
          <Text style={styles.cardAmount}>+¥{cat.amount.toLocaleString()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#eee' },
  cardText: { fontSize: 18 },
  cardAmount: { fontSize: 18, color: '#2ecc71', fontWeight: 'bold' },
});