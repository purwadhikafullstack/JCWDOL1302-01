import {
  cancelUnconfirmedOrdersAction,
  confirmShippingOrdersAction,
} from '@/actions/order.action';
import cron from 'node-cron';

export const scheduleTask = () => {
  cron.schedule('0 * * * * *', async () => {
    await confirmShippingOrdersAction();
    console.log('Confirm shipping orders finished');

    await cancelUnconfirmedOrdersAction();
    console.log('Cancel unconfirmed orders finished');
  });
};
