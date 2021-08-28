import { useContext } from 'react';
import OrdersContext from '../context/OrdersContext';
import orderApi from '../api/order';
import useApi from './useApi';

const useOrders = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const fetchOrdersApi = useApi(orderApi.getOrders);
  const updateOrderStatusApi = useApi(orderApi.updateOrderStatus);

  const fetchOrders = async () => {
    const res = await fetchOrdersApi.request();
    const orders = res.data.orders.reduce((p, c) => {
      const status = c.status;
      if (!p[status]) p[status] = [c];
      else p[status].push(c);
      return p;
    }, {});
    setOrders(orders);
  };

  const acceptOrder = async (id) => {
    const res = await updateOrderStatusApi.request(id, 'processing');
    res.ok && fetchOrders();
  };

  const refusedOrder = async (id) => {
    const res = await updateOrderStatusApi.request(id, 'refused');
    res.ok && fetchOrders();
  };

  const completeOrder = async (id) => {
    const res = await updateOrderStatusApi.request(id, 'done');
    res.ok && fetchOrders();
  };

  return {
    fetchOrderStates: fetchOrdersApi,
    updateOrderStatusStates: updateOrderStatusApi,
    fetchOrders,
    orders,
    setOrders,
    acceptOrder,
    refusedOrder,
    completeOrder,
  };
};

export default useOrders;
