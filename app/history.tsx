import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Alert, TouchableOpacityを追加
import { useContext } from 'react';
import { SavingsContext } from './_layout';

export default function History() {
  const { history, deleteSaving } = useContext(SavingsContext);

  const confirmDelete = (id: string, label: string) => {
    Alert.alert(
      "履歴の削除",
      `${label} の履歴を削除しますか？（貯金総額からも差し引かれます）`,
      [
        { text: "キャンセル", style: "cancel" },
        { text: "削除", style: "destructive", onPress: () => deleteSaving(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onLongPress={() => confirmDelete(item.id, item.label)} // 行全体の長押しで発火
            activeOpacity={0.6} // 押し込んだ時のフィードバックを少し強めに
          >
            <View style={styles.item}>
              <View>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.itemAmount}>¥{item.amount.toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>履歴がまだありません</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  item: { backgroundColor: '#fff', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemLabel: { fontSize: 16, fontWeight: 'bold' },
  itemDate: { fontSize: 12, color: '#999' },
  rightContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  itemAmount: { fontSize: 16, color: '#2ecc71', fontWeight: 'bold' },
  deleteIcon: { fontSize: 18, marginLeft: 10 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});