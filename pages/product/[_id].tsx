import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductData } from '../../types';
import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BsInfoCircle, BsStarFill } from 'react-icons/bs';
import ButtonPrimery from '../../components/ButtonPrimery';
import { GoPlus } from 'react-icons/go';
import { ship1Img, ship2Img, ship3Img } from '../../public/assets/images';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/shopperSlice';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  const [product, setProduct] = useState<any>({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    setProduct(router.query);
    setIsLoading(false);
  }, [router.query]);

  const _id = Number(product._id);

  return (
    <div className="w-full bg-white">
      <div className="max-w-contentContainer mx-auto flex justify-center items-center py-4">
        <div className="w-2/3 h-full flex items-center justify-center overflow-hidden relative">
          <Image src={product.image} alt={product.title} width={300} height={300} className="w-[50%] transform-origin-top-left cursor-move duration-500" />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-2 shadow-sm shadow-zinc-400 p-2 rounded-md">
          <p className="p-2 text-darkRed text-sm font-semibold border border-gray-400 rounded-md">500+ bought since yesterday</p>
          <div className="px-2 py-4 border border-gray-400 rounded-md flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-2 py-[1px] text-darkRed text-sm border-[1px] border-darkRed rounded-sm">Best seller</button>
                <button className="px-2 py-[1px] text-blue text-sm border-[1px] border-blue rounded-sm">Rollback</button>
              </div>
              <IoMdHeartEmpty className="text-red text-2xl" />
            </div>
          </div>
          {/* Product info */}
          <div>
            <p className="text-sm underline underline-offset-4">{product.brand}</p>
            <p className="text-xl font-semibold text-black">{product.title}</p>
            <p className="text-base text-zinc-500">{product.description}</p>
            <div className="flex items-center gap-2 text-xs mt-2">
              <div className="flex gap-1 text-red">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </div>
              <p>(5.0)</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-semibold text-blue">Now ${product.price}</p>
              <p className="text-sm text-zinc-500 flex gap-2 items-center">
                <s>${product.oldPrice}</s>
                <span>
                  <BsInfoCircle />
                </span>
              </p>
            </div>
          </div>
          {/* Online info */}
          <div>
            <p>
              <span className="font-semibold">$18/mo</span> <span className="font-bold">withKunc</span> <span className="underline underline-offset-2">Learn how</span>
            </p>
            <p>
              Price when purchased online
              <span>
                <BsInfoCircle />
              </span>
            </p>
          </div>
          {/* add to cart */}
          <div className="border-b-[1px] border-b-zinc-300 pb-4">
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
          </div>
          {/* Deliver Option */}
          <div>
            <p className="text-base font-semibold pb-2">How do you want to get it?</p>
            <div className="w-full grid grid-cols-3 gap-4 text-xs">
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship1Img} alt="ship1Img" className="w-10" />
                <p>Shipping</p>
                <p>Tomorrow</p>
                <p>Free</p>
              </div>
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship2Img} alt="ship2Img" className="w-10" />
                <p>Pickup</p>
                <p>Tomorrow</p>
                <p>Free</p>
              </div>
              <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                <Image src={ship3Img} alt="ship3Img" className="w-10" />
                <p>Delivery</p>
                <p>Tomorrow</p>
              </div>
            </div>
            <p className="font-bold text-xs">
              Pekalongan, 51134 <span className="text-zinc-500 font-normal underline underline-offset-2 ml-1">Change</span>
            </p>
          </div>
        </div>
      </div>
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
  );
};

export default ProductDetails;
