export type OrderStatus = 'completed' | 'processing' | 'cancelled';

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  date: string;
  amount: number;
  itemCount: number;
};
