const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async (req, res) => {
//   const { items, email } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     shipping_rates: ['shr_1P9RtI2NXa12iQsTFMOhWsOr'],
//     shipping_address_collection: {
//       allowed_countries: ['US', 'CA', 'GB'],
//     },
//     line_items: transformedItems,
//     mode: 'payment',
//     success_url: `${process.env.HOST}/success`,
//     cancel_url: `${process.env.HOST}/checkout`,
//     metadata: {
//       email,
//       images: JSON.stringify(items.map((item) => item.image)),
//     },
//   });

//   res.status(200).json({ id: session.id });
// };

export default async function handler(req, res) {
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1P9RtI2NXa12iQsTFMOhWsOr'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
