import React from 'react';
import { ProductData } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { GoPlus } from 'react-icons/go';
import ButtonPrimery from './ButtonPrimery';
import { BsStarFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/shopperSlice';
import toast, { Toaster } from 'react-hot-toast';

const Products = ({ productData }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <h1 className="text-2xl py-2 px-4">New Products</h1>
      <div className="py-6 px-4 grid grid-cols-4 gap-4">
        {productData.map((product: ProductData) => (
          <div key={product._id} className="border-[1px] border-gray-200 mb-6 group">
            <div className="w-full h-[350px] overflow-hidden p-1">
              <Image src={product.image} alt={product.title} width={300} height={300} className="group-hover:scale-105 duration-300" />
            </div>
            <div className="px-2 py-4 flex flex-col justify-center">
              <div className="flex items-center justify-between py-2">
                <button
                  className="text-lightRed hover:text-red bg-red hover:bg-lightRed hover:ring-1 ring-red w-24 h-9 text-sm font-bold rounded-full duration-300 flex items-center justify-center gap-1 z-10"
                  onClick={() =>
                    dispatch(
                      addToCart({
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
                    ) && toast.success(`${product.title.substring(0, 20)} is added to cart`)
                  }
                >
                  <span>
                    <GoPlus size={20} />
                  </span>
                  Add
                </button>
                <Link
                  href={{
                    pathname: `/product/${product._id}`,
                    query: {
                      _id: product._id,
                      title: product.title,
                      description: product.description,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      brand: product.brand,
                      image: product.image,
                      isNew: product.isNew,
                      category: product.category,
                    },
                  }}
                  as={`/product/${product._id}`}
                  className="w-24 h-9 text-sm font-bold rounded-full duration-300 flex items-center justify-center gap-1 hover:bg-lightRed hover:text-red"
                >
                  <span>
                    <GoPlus size={20} />
                  </span>{' '}
                  Details
                </Link>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-3">
                <p className="font-bold text-blue text-sm">Now ${product.price}</p>
                <p className="text-zinc-400 line-through text-xs decoration-[1px]">${product.oldPrice}</p>
              </div>

              {/* TITLE */}
              <p className="font-semibold line-clamp-2 my-2 group-hover:line-clamp-none">{product.title}</p>

              {/* DESCRIPTION */}
              <p className="text-sm line-clamp-3 group-hover:line-clamp-none">{product.description}</p>

              {/* STARS */}
              <div className="flex items-center text-sm mt-2 gap-2">
                <div className="flex items-center gap-1 text-sm text-yellow">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <p className="text-black">25</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Toaster
          reverseOrder={false}
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Products;
