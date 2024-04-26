import React from 'react';

type Props = {
  btnText?: string;
  icon?: JSX.Element;
  bg: boolean;
  className?: string;
  onClick?: () => void;
};

const ButtonPrimery = ({ onClick, btnText, icon, bg, className }: Props) => {
  const bgColor = 'text-lightRed hover:text-red bg-red hover:bg-lightRed hover:ring-1 ring-red';

  return (
    <button className={`w-24 h-9 text-sm font-bold ${bg === true && bgColor} rounded-full duration-300 flex items-center justify-center gap-1 ${className} ${onClick} `}>
      <span>{icon}</span> {btnText}
    </button>
  );
};

export default ButtonPrimery;
