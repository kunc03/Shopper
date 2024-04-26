import React from 'react';
import TopFooter from './TopFooter';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const disabled = ['product', 'cart', 'login', 'register'];

const Footer = () => {
  const pathname = usePathname().split('/')[1];

  return (
    <>
      <TopFooter />
      {!pathname === disabled.includes(pathname) && (
        <button
          className="absolute right-7 bottom-10 text-lightRed hover:text-red bg-red hover:bg-lightRed hover:ring-1 ring-red p-2 text-sm font-bold rounded-full duration-300 flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp size={25} />
        </button>
      )}

      <div className="w-full bg-darkRed text-lightRed py-6">
        <div className="w-full mx-auto">
          <ul className="w-full flex flex-wrap gap-1 justify-center items-center text-sm text-zinc-200">
            <li>© 2024 OLShop. All rights reserved.</li>
            <li>
              Powered by:{' '}
              <Link href="https://github.com/kunc03" target="_blank" className="text-lightRed">
                Kunc
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
