import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { phoneImg, warningImg } from '../public/assets/images';
import Image from 'next/image';
import { ship1Img, ship2Img, ship3Img } from '../public/assets/images';
import { StoreProduct } from '../types';
import { TbReload } from 'react-icons/tb';
import { HiMinusSmall } from 'react-icons/hi2';
import { MdOutlineAdd } from 'react-icons/md';
import FormatePrice from './FormatePrice';
import { deleteItem, minusQuantity, plusQuantity, resetCart } from '../redux/shopperSlice';
import { IoMdClose } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { checkoutOrder } from '../actions/order.actions';
import axios from 'axios';

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartPage = () => {
  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get('success')) {
  //     console.log('Order placed! You will receive an email confirmation.');
  //   }

  //   if (query.get('canceled')) {
  //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  //   }
  // }, []);

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.shopper.productData);
  const userInfo = useSelector((state: any) => state.shopper.userInfo);
  const [warningMsg, setWarningMsg] = useState(false);
  // Price
  const [totalOldPrice, setTotalOldPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    setWarningMsg(true);
    let oldPrice = 0;
    let savings = 0;
    let amt = 0;
    let name = '';
    productData.map((item: StoreProduct) => {
      oldPrice += item.oldPrice * item.quantity;
      savings += item.oldPrice - item.price;
      amt += item.price * item.quantity;
      name = item.title;
      return;
    });
    setName(name);
    setTotalOldPrice(oldPrice);
    setTotalSavings(savings);
    setTotalAmt(amt);
  }, [productData]);

  const handleCheckout = async () => {
    // console.log(productData);

    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      items: productData,
    };

    const message = () => {
      return `
Data Customer : 
  Nama  : ${data.name}
  Email : ${data.email}

Data Product : 
  ${data.items.map((item: any) => `${item.title} (${item.quantity} items x $ ${item.price}) \n`)}
Total : $ ${totalAmt}

Terima Kasih
  `;
    };

    const messageWA = message();

    window.open('https://web.whatsapp.com/send?phone=6281229363084&text=' + encodeURIComponent(messageWA));
  };

  return (
    <div className="w-full py-10">
      <div className="w-full flex gap-10">
        <div className="w-2/3 flex flex-col gap-5">
          <h1 className="text-lg font-bold text-black">
            Cart <span className="text-lightText font-normal"> ({productData.length} items)</span>
          </h1>
          {/* Pickup Details */}
          <div>
            <div className=" font-bold items-center gap-2 mb-2">
              <Image src={phoneImg} alt="phoneImg" />
              <p>Pickup and delivery options</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-4 text-xs">
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship1Img} alt="ship1Img" className="w-10" />
                <p className="font-bold">Shipping</p>
                <p>All items available</p>
              </div>
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship2Img} alt="ship2Img" className="w-10" />
                <p className="font-bold">Pickup</p>
                <p>All items available</p>
              </div>
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship3Img} alt="ship3Img" className="w-10" />
                <p className="font-bold">Delivery</p>
                <p>All items available</p>
              </div>
            </div>
            {/* Cart Product */}
            <div className="w-full p-5 border-[1px] border-zinc-400 rounded-md flex flex-col gap-4 my-4">
              <p className="font-semibold text-sm text-zinc-500">
                Sold and shipped by <span className="text-red font-semibold">OLShop.com</span>
              </p>
              <div className="flex gap-2">
                <button className="px-2 py-[1px] text-darkRed text-sm border-[1px] border-darkRed rounded-sm">Best seller</button>
                <button className="px-2 py-[1px] text-blue text-sm border-[1px] border-blue rounded-sm">Rollback</button>
              </div>
              {/* Items */}
              <div>
                {productData.map((product: StoreProduct) => (
                  <div key={product._id} className="flex items-center justify-between gap-4 border-b-[1px] border-b-zinc-200 pb-4">
                    <div className="w-3/4 flex items-center gap-4">
                      <Image className="w-28" width={500} height={500} src={product.image} alt="productImg" />
                      <div className="">
                        <h2 className="text-base text-zinc-900">{product.title}</h2>
                        <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>
                        <p className="text-sm text-zinc-500">price: ${product.price}</p>
                        <p className="text-sm text-blue flex items-center gap-1">
                          <span className="bg-blue rounded-full text-white text-xs w-4 h-4 flex items-center justify-center">
                            <TbReload className="rotate-100" />
                          </span>
                          Free 30-day returns
                        </p>
                        {/* Buttons */}
                        <div className="mt-2 flex items-center gap-6">
                          <button className="text-sm underline underline-offset-2 decoration-[1px] text-zinc-600 hover:no-underline hover:text-red duration-300" onClick={() => dispatch(deleteItem(product._id))}>
                            Remove
                          </button>
                          <div className="w-28 h-9 border border-zinc-400 rounded-full text-base font-semibold text-black flex items-center justify-between px-3">
                            <button
                              className="text-base w-5 h-5 text-zinc-600 hover:bg-[#74767c] hover:text-white rounded-full flex items-center justify-center duration-200"
                              onClick={() =>
                                dispatch(
                                  minusQuantity({
                                    _id: product._id,
                                    title: product.title,
                                    description: product.description,
                                    oldPrice: product.oldPrice,
                                    price: product.price,
                                    brand: product.brand,
                                    image: product.image,
                                    quantity: 1,
                                    category: product.category,
                                  })
                                )
                              }
                            >
                              <HiMinusSmall />
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              className="text-base w-5 h-5 text-zinc-600 hover:bg-[#74767c] hover:text-white rounded-full flex items-center justify-center duration-200"
                              onClick={() =>
                                dispatch(
                                  plusQuantity({
                                    _id: product._id,
                                    title: product.title,
                                    description: product.description,
                                    oldPrice: product.oldPrice,
                                    price: product.price,
                                    brand: product.brand,
                                    image: product.image,
                                    quantity: 1,
                                    category: product.category,
                                  })
                                )
                              }
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="1/4 text-right flex flex-col items-end gap-1">
                      <p className="font-semibold text-lg text-blue">
                        <FormatePrice amount={product.price * product.quantity} />
                      </p>
                      <p className="text-sm line-through text-zinc-500">
                        <FormatePrice amount={product.oldPrice * product.quantity} />
                      </p>
                      <div className="flex items-center text-xs gap-2">
                        <p className="bg-sky-200 text-[8px] uppercase px-2 py-[1px]">You save</p>
                        <p className="font-semibold text-blue">
                          <FormatePrice amount={product.oldPrice * product.quantity - product.price * product.quantity} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => dispatch(resetCart()) && window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-44 ring-1 ring-red hover:bg-lightRed hover:text-red h-10 rounded-full text-base font-semibold bg-red text-lightRed duration-300"
              >
                Reset Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4 mt-24 h-[500px] border-[1px] border-zinc-400 rounded-md flex flex-col justify-center gap-4">
          <div className="w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4">
            {userInfo ? (
              <button onClick={handleCheckout} className="bg-blue hover:bg-hoverBg w-full text-white h-10 rounded-full font-semibold duration-300">
                Continue to checkout
              </button>
            ) : (
              <button className="bg-blue hover:bg-hoverBg w-full text-white h-10 rounded-full font-semibold duration-300 cursor-not-allowed">Continue to checkout</button>
            )}
            {!userInfo && <p className="text-sm text-center text-red -mt-4 font-semibold ">Please sign in for checkout</p>}
            {warningMsg && (
              <div className="bg-hoverBg text-white p-2 rounded-lg flex items-center justify-between gap-4">
                <Image className="w-8" src={warningImg} alt="warningImg" />
                <p className="text-sm">Items in your cart have reduced prices. Check out now for extra savings!</p>
                <IoMdClose onClick={() => setWarningMsg(false)} className="w-8 h-4 text-3xl hover:bg-sky-600 rounded-full cursor-pointer duration-200" />
              </div>
            )}
            <p className="text-sm text-center">
              For the best shopping experience, <span className="underline underline-offset-2 decoration-[1px]">sign in</span>
            </p>
          </div>
          {/* Checkout Price */}
          <div className="w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4">
            <div className="flex flex-col gap-1">
              <div className="text-sm flex justify-between">
                <p className="font-semibold">
                  Subtotal <span className=""> ( {productData.length} items )</span>
                </p>
                <p className="line-through text-zinc-500 text-base">
                  <FormatePrice amount={totalOldPrice} />
                </p>
              </div>
              <div className="text-sm flex justify-between">
                <p className="font-semibold">Savings</p>
                <p className="text-blue font-bold bg-sky-100 py-1 px-[2px] rounded-lg flex">
                  -<FormatePrice amount={totalSavings} />
                </p>
              </div>
              <div className="text-sm flex justify-between">
                <p className="font-semibold">Total Amount</p>
                <p className="text-zinc-800 font-normaltext-base">
                  <FormatePrice amount={totalAmt} />
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 border-b-[1px] border-b-zinc-200 pb-4">
            <div className="flex flex-col gap-1">
              <div className="text-sm flex justify-between">
                <p>Shipping</p>
                <p className="text-sky-600 font-semibold">Free</p>
              </div>
              <div className="text-sm flex justify-between">
                <p className="font-semibold">Pekalongan</p>
                <p className="text-zinc-800"> Calculated at checkout</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>Estimated total</p>
            <p className="text-zinc-800 font-bold text-lg">
              <FormatePrice amount={totalAmt} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
