import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Order, OrderStatus } from '../types/Order';
import { mockOrders } from '../data/mockOrders';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  completed: { label: 'Выполнен', color: 'rgba(85, 168, 83, 1)' },
  processing: { label: 'В обработке', color: 'rgba(255, 149, 7, 1)' },
  cancelled: { label: 'Отменён', color: 'rgba(244, 67, 47, 1)' },
};

const formatAmount = (amount: number): string =>
  amount.toLocaleString('ru-RU') + ' ₽';

const OrderCard = React.memo(({ order }: { order: Order }) => {
  const status = STATUS_CONFIG[order.status];
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>№ {order.orderNumber}</Text>
        <View style={[styles.badge, { backgroundColor: status.color }]}>
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Дата:</Text>
        <Text style={styles.rowValue}>{order.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Сумма:</Text>
        <Text style={styles.rowValue}>{formatAmount(order.amount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Товаров:</Text>
        <Text style={styles.rowValue}>{order.itemCount} шт</Text>
      </View>
    </View>
  );
});

OrderCard.displayName = 'OrderCard';

const OrdersScreen = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(
    () => orders.filter((o) => o.orderNumber.includes(search.trim())),
    [orders, search],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Order>) => <OrderCard order={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Order) => item.id, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Заказы</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="rgba(255, 255, 255, 1)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по номеру заказа..."
            placeholderTextColor="rgba(255, 255, 255, 1)"
            value={search}
            onChangeText={setSearch}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Мои заказы</Text>
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.refreshButton} onPress={() => setSearch('')}>
          <Ionicons name="refresh" size={18} color="rgba(69, 146, 226, 1)" />
          <Text style={styles.refreshText}>Обновить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newOrderButton}>
          <Text style={styles.newOrderText}>+ Новый заказ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const BLUE = 'rgba(73, 144, 226, 1)';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 21,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 166, 233, 1)',
    borderRadius: 10,
    paddingHorizontal: 17,
    height: 39,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(49, 50, 52, 1)',
    marginBottom: 14,
  },
  listContent: {
    paddingBottom: 36,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 211, 213, 1)',
    paddingTop: 20,
paddingRight: 15,
paddingBottom: 1,
paddingLeft: 15,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(49, 50, 52, 1)',
  },
  badge: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(183, 183, 183, 1)',
  },
  rowValue: {
    fontSize: 10,
    color: 'rgba(49, 50, 52, 1)',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 23,
    borderTopWidth: 1,
    borderTopColor: 'rgba(211, 211, 213, 1)',
  },
  refreshButton: {
    flex: 167,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 12,
    height: 44,
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(51, 49, 50, 1)',
  },
  newOrderButton: {
    flex: 177,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE,
    borderRadius: 12,
    height: 44,
  },
  newOrderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});

export default OrdersScreen;
