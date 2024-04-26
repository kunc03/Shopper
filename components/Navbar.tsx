import Image from 'next/image';
import { logo } from '../public/assets/images/index';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import NavbarButton from './NavbarButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { addUser, removeUser } from '../redux/shopperSlice';

const Navbar = () => {
  const productData = useSelector((state: any) => state.shopper.productData);
  const userInfo = useSelector((state: any) => state.shopper.userInfo);
  const [totalAmt, setTotalAmt] = useState('');
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        })
      );
    } else {
      dispatch(removeUser());
    }
  }, [session, dispatch]);

  useEffect(() => {
    let price = 0;
    productData.map((product: any) => {
      price += product.price * product.quantity;

      return price;
    });

    setTotalAmt(price.toFixed(2));
  }, [productData]);

  return (
    <div className="w-full bg-red text-white flex flex-col items-center sticky top-0 z-50">
      <div className="w-full h-full border-b-[1px] border-b-white">
        <div className="w-full mx-auto h-20 px-4 flex items-center gap-2">
          {/* Logo Start */}
          <Link href={'/'} className="text-3xl font-bold navBarHover">
            OLShop
          </Link>
          {/* Logo End */}

          {/* Departments Start Here */}
          <Link href={'/'} className="navBarHover hover:bg-hoverRed">
            <div className="w-4 grid grid-cols-2 gap-[2px]">
              <span className="w-2 h-1 border-[2px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 rounded-full border-[2px] border-white inline-flex ml-[1px]"></span>
              <span className="w-3.5 h-2 border-[2px] rounded-bl-md rounded-tr-md border-white inline-flex"></span>
            </div>
            <p className="text-sm">Departments</p>
          </Link>
          {/* Dapartments End Here */}

          {/* Services Start Here */}
          <Link href={'/'}>
            <div className="navBarHover hover:bg-hoverRed">
              <div className="w-4 grid grid-cols-2 gap-[2px]">
                <span className="w-2 h-1 border-[2px] rounded-bl-md rounded-tr-md border-white inline-flex"></span>
                <span className="w-2 h-1 border-[2px] rounded-bl-md rounded-tr-md border-white inline-flex"></span>
                <span className="w-2 h-1 border-[2px] rounded-bl-md rounded-tr-md border-white inline-flex"></span>

                <span className="w-2 h-1 border-[2px] rounded-bl-md rounded-tr-md border-white inline-flex"></span>
              </div>
              <p className="text-sm">Services</p>
            </div>
          </Link>
          {/* Services End Here */}

          {/* Search Start Here */}
          <div className="h-10 flex flex-1 relative">
            <input type="text" className="w-full h-full rounded-full px-4 text-black text-base outline-none border-[1px] border-transparent focus-visible:border-black duration-200" placeholder="Search for everything" />
            <span className="absolute w-8 h-8 rounded-full flex items-center justify-center top-1 right-1 bg-red hover:bg-darkRed text-white shadow-sm shadow-black text-xl">
              <IoSearchOutline />
            </span>
          </div>
          {/* Search End Here */}

          {/* MyItem Start Here */}
          <Link href={'/'} className="navBarHover hover:bg-hoverRed">
            <AiOutlineHeart />
            <div>
              <p className="text-xs">Recorder</p>
              <h2 className="text-sm font-bold -mt-1">My Items</h2>
            </div>
          </Link>
          {/* MyItem End Here */}

          {/* Account Start Here */}
          {userInfo ? (
            <div onClick={() => signOut()} className="navBarHover hover:bg-hoverRed cursor-pointer">
              <Image width={500} height={500} className="w-10 rounded-full object-cover" src={userInfo.image} alt="userImage" />
              <div>
                <p className="text-xs">Sign Out</p>
                <h2 className="text-sm font-bold -mt-1">{userInfo.name}</h2>
              </div>
            </div>
          ) : (
            <div onClick={() => signIn()} className="navBarHover hover:bg-hoverRed cursor-pointer">
              <AiOutlineUser className="text-lg" />
              <div>
                <p className="text-xs">Sign In</p>
                <h2 className="text-sm font-bold -mt-1">Account</h2>
              </div>
            </div>
          )}

          {/* Account End Here */}

          {/* Cart Start Here */}
          <Link href={'/cart'} className="flex flex-col justify-center items-center h-12 px-5 rounded-full bg-transparent hover:bg-hoverRed duration-300 relative">
            <BsCart2 className="text-2xl" />
            <p className="text-[10px]">${totalAmt}</p>
            <span className="absolute w-4 h-4 rounded-full flex items-center justify-center top-0 right-4 bg-yellow shadow-sm shadow-black text-black text-xs">{productData.length > 0 ? productData.length : 0}</span>
          </Link>
          {/* Cart End Here */}
        </div>
      </div>
      <NavbarButton />
    </div>
  );
};

export default Navbar;
