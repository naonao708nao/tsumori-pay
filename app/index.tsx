import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SavingsContext } from './_layout';

export default function Home() {
  const { total } = useContext(SavingsContext);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>現在のつもり貯金</Text>
      <Text style={styles.amount}>¥{total.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  label: { fontSize: 18, color: '#666' },
  amount: { fontSize: 60, fontWeight: 'bold', color: '#2ecc71' },
});