'use server';

import Stripe from 'stripe';
import { StoreProduct } from '../types';
import { redirect } from 'next/navigation';

export const checkoutOrder = async (order: StoreProduct) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const price = order.items[0].price;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        id: order._id,
        email: order.email,
      },

      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_UTL}/[profile]]`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_UTL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};
