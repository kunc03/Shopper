import Image from 'next/image';
import { phoneImg } from '../public/assets/images';
import { FiChevronDown } from 'react-icons/fi';
import { FaPlaceOfWorship } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { navbarData } from '../lib/data';
import Link from 'next/link';

const NavbarButton = () => {
  return (
    <div className="w-full mx-auto py-2 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image className="w-6" src={phoneImg} alt="phoneImg" />
          <p className="text-sm font-semibold ml-2">How do you want to get it?</p>
          <FiChevronDown className="w-4 h-4" />
          <span className="w-[1px] h-4 bg-white inline-flex ml-2"></span>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineLocationOn className="w-4 h-4" />
          <p className="text-sm text-zinc-100">Pekalongan, Indonesia</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-sm">
          {navbarData.map((item) => (
            <Link key={item.name} href={item.url} className=" hover:bg-hoverRed px-1 rounded-full">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarButton;
