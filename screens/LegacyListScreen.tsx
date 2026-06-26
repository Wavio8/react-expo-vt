import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { fetchNews } from '../utils/api';
import { NewsItem } from '../types/NewsItem';
import { AnimatedCard } from '../components/animCard';

const LegacyListScreen = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: NewsItem; index: number }) => (
      <AnimatedCard item={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: NewsItem) => item.id.toString(), []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { flex: 1 },
  errorText: { color: '#e53935', fontSize: 16 },
});

export default LegacyListScreen;
