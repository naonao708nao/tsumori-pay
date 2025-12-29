import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SavingsContext } from './_layout';

export default function History() {
  const { history } = useContext(SavingsContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={styles.itemAmount}>¥{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  item: { backgroundColor: '#fff', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemLabel: { fontSize: 16, fontWeight: 'bold' },
  itemDate: { fontSize: 12, color: '#999' },
  itemAmount: { fontSize: 16, color: '#2ecc71' },
});