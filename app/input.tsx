import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { SavingsContext } from './_layout';
import { useRouter } from 'expo-router';


export default function Input() {
  const { categories, addSaving, addCategory } = useContext(SavingsContext);
  const router = useRouter();

  // モーダルと入力フォームの状態
  const [modalVisible, setModalVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handlePress = (label: string, amount: number) => {
    addSaving(label, amount);
    router.push('/'); // 保存したらホームへ戻る
  };

  const handleAddCategory = () => {
    if (!newLabel || !newAmount) return;
    addCategory(newLabel, parseInt(newAmount, 10));
    setNewLabel('');
    setNewAmount('');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>何をした「つもり」？</Text>
      
      {categories.map((cat: any) => (
        <TouchableOpacity key={cat.id} style={styles.card} onPress={() => handlePress(cat.label, cat.amount)}>
          <Text style={styles.cardText}>{cat.label}</Text>
          <Text style={styles.cardAmount}>+¥{cat.amount.toLocaleString()}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>＋ 新しい項目を追加</Text>
      </TouchableOpacity>

      {/* 新規登録用モーダル */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>新しいつもり項目</Text>
            <TextInput 
              style={styles.input} 
              placeholder="項目を入力 (例: 🍮 スイーツ)" 
              value={newLabel} 
              onChangeText={setNewLabel} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="金額を入力 (例: 300)" 
              keyboardType="numeric" 
              value={newAmount} 
              onChangeText={setNewAmount} 
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.cancelText}>キャンセル</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleAddCategory}><Text style={styles.saveText}>保存</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#eee' },
  cardText: { fontSize: 18 },
  cardAmount: { fontSize: 18, color: '#2ecc71', fontWeight: 'bold' },
  addButton: { padding: 15, alignItems: 'center', marginTop: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#999', borderRadius: 12 },
  addButtonText: { color: '#666', fontWeight: 'bold' },
  // モーダル関連
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalView: { backgroundColor: '#fff', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 20, padding: 8, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  cancelText: { color: '#999', fontSize: 16 },
  saveText: { color: '#3498db', fontSize: 16, fontWeight: 'bold' },
});