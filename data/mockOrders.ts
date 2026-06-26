import { Order } from '../types/Order';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '12347',
    status: 'completed',
    date: '14.05.2026',
    amount: 2450,
    itemCount: 3,
  },
  {
    id: '2',
    orderNumber: '12348',
    status: 'processing',
    date: '13.05.2026',
    amount: 1890,
    itemCount: 2,
  },
  {
    id: '3',
    orderNumber: '12349',
    status: 'cancelled',
    date: '10.05.2026',
    amount: 3200,
    itemCount: 5,
  },
  {
    id: '4',
    orderNumber: '12350',
    status: 'completed',
    date: '08.05.2026',
    amount: 790,
    itemCount: 1,
  },
];
