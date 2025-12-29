import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import React, { createContext, useState, useContext } from 'react';

// データの型定義
export const SavingsContext = createContext<any>(null);

export default function RootLayout() {
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<{id: string, label: string, amount: number, date: string}[]>([]);

  // 貯金を追加する関数
  const addSaving = (label: string, amount: number) => {
    setTotal(prev => prev + amount);
    setHistory(prev => [{ id: Date.now().toString(), label, amount, date: new Date().toLocaleString() }, ...prev]);
  };

  return (
    <SavingsContext.Provider value={{ total, history, addSaving }}>
          <Tabs>
            <Tabs.Screen 
              name="index" 
              options={{ 
                title: 'ホーム', 
                tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>
              }} 
            />
            <Tabs.Screen 
              name="input" 
              options={{ 
                title: '貯める', 
                tabBarIcon: () => <Text style={{ fontSize: 20 }}>💰</Text>
              }} 
            />
            <Tabs.Screen 
              name="history" 
              options={{ 
                title: '履歴', 
                tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text>
              }} 
            />
          </Tabs>
        </SavingsContext.Provider>
    );
}