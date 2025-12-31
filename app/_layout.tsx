import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// データの型定義
export const SavingsContext = createContext<any>(null);

const STORAGE_KEY = '@tsumori_pay_data';

export default function RootLayout() {
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<{id: string, label: string, amount: number, date: string}[]>([]);
  const [categories, setCategories] = useState([
    { id: '1', label: '☕️ コーヒー', amount: 500 },
    { id: '2', label: '🍺 飲み会', amount: 4000 },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 【1】 起動時に AsyncStorage からデータを読み込む
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const savedData = JSON.parse(jsonValue);
          setTotal(savedData.total || 0);
          setHistory(savedData.history || []);
          if (savedData.categories) setCategories(savedData.categories);
        }
      } catch (e) {
        console.error('読み込みエラー:', e);
      } finally {
        setIsLoaded(true); // 読み込みが完了したことをマーク
      }
    };
    loadData();
  }, []);

  // 【2】 データが更新されるたびに AsyncStorage に保存する
  useEffect(() => {
    const saveData = async () => {
      // 読み込みが完了する前に保存が走るとデータが消えるため、isLoaded が true の時のみ保存
      if (isLoaded) {
        try {
          const dataToSave = JSON.stringify({ total, history, categories });
          await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
        } catch (e) {
          console.error('保存エラー:', e);
        }
      }
    };
    saveData();
  }, [total, history, categories, isLoaded]);

  const addCategory = (label: string, amount: number) => {
    setCategories(prev => [...prev, { id: Date.now().toString(), label, amount }]);
  };

  // 特定の履歴を削除する関数
  const deleteSaving = (id: string) => {
    const itemToDelete = history.find(item => item.id === id);
    if (!itemToDelete) return;
    
    setTotal(prev => prev - itemToDelete.amount);
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // 貯金を追加する関数
  const addSaving = (label: string, amount: number) => {
    setTotal(prev => prev + amount);
    setHistory(prev => [{ id: Date.now().toString(), label, amount, date: new Date().toLocaleString() }, ...prev]);
  };

  return (
    <SavingsContext.Provider value={{ total, history, categories, addSaving, addCategory, deleteSaving }}>
      <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{ title: 'ホーム', tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> }} 
        />
        <Tabs.Screen 
          name="input" 
          options={{ title: '貯める', tabBarIcon: () => <Text style={{ fontSize: 20 }}>💰</Text> }} 
        />
        <Tabs.Screen 
          name="history" 
          options={{ title: '履歴', tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text> }} 
        />
      </Tabs>
    </SavingsContext.Provider>
  );
}