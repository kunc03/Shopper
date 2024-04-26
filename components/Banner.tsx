import Slider from 'react-slick';
import { bannerImg, sliderImgOne, sliderImgTwo, sliderImgThree, sliderImgFour } from '../public/assets/images';
import Image from 'next/image';
import BannerText from './BannerText';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ButtonPrimery from './ButtonPrimery';

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="absolute bottom-[50%] right-6 w-12 h-8  text-xl flex items-center justify-center rounded-md duration-300 z-10 text-blue hover:scale-110" onClick={onClick}>
      <SlArrowRight size={40} />
    </button>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="absolute bottom-[50%] left-6 w-12 h-8  text-xl flex items-center justify-center rounded-md duration-300 z-10 text-blue hover:scale-110" onClick={onClick}>
      <SlArrowLeft size={40} className="" />
    </button>
  );
}

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const red = 'bg-red text-lightRed hover:bg-lightRed hover:text-red hover:ring-1 ring-red';
  const blue = 'bg-blue text-lightBlue hover:bg-lightBlue hover:text-blue hover:ring-1 ring-blue';

  return (
    <div className="w-full bg-white px-4 py-6 font-titleFont flex gap-4 border-b-[1px]">
      <div className="w-2/3 rounded-lg h-[410px] relative">
        <Slider {...settings} className="w-full">
          <div className="w-full h-[410px] relative">
            <Image src={sliderImgOne} alt="sliderImgOne" priority className="w-full h-full object-cover rounded-lg bg-no-repeat" />

            <BannerText mainStyles="text-lightBlue" title="Spring fashion in bloom" description="New trends & styles to turn heads anytime, on any budget" btnText="Shop now" btnStyles={blue} />
          </div>

          <div className="w-full h-[410px] relative">
            <Image src={sliderImgTwo} alt="sliderImgTwo" priority className="w-full h-full object-cover rounded-lg bg-no-repeat" />

            <BannerText title="Up to 65% off" description="New savings every week! Hurry to score low prices!" mainStyles="text-lightRed" btnText="Shop now" btnStyles={red} />
          </div>

          <div className="w-full h-[410px] relative">
            <Image src={sliderImgThree} alt="sliderImgThree" priority className="w-full h-full object-cover rounded-lg bg-no-repeat" />

            <BannerText title="You can save $1.300+ a year!" description="Start saving with free delivery, Walmart, and more!" mainStyles="text-blue" btnText="Shop now" btnStyles={blue} />
          </div>

          <div className="w-full h-[410px] relative">
            <Image src={sliderImgFour} alt="sliderImgFour" priority className="w-full h-full object-cover rounded-lg bg-no-repeat" />

            <BannerText title="Up to 65% off" description="New savings every week! Hurry to score low prices!" mainStyles="text-blue" btnText="Shop now" btnStyles={blue} />
          </div>
        </Slider>
      </div>
      <div className="w-1/3 border-[1px] rounded-lg  p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold text-darkRed">Flash Pick of the day</h2>
          <p className="text-sm text-zinc-500">View all</p>
        </div>
        <Image src={bannerImg} alt="bannerImg" className="w-full h-[16rem] object-cover rounded-lg" />
        <ButtonPrimery btnText="Options" bg={true} />
        <p className="text-lg text-black font-semibold">From $199.90</p>
        <p className="text-base text-gray-500 -m-1 truncate">Modern Sofas, Elegant Tables and an Array of Living Room Furniture. Discover Perfection in Style and Comfort!</p>
      </div>
    </div>
  );
};

export default Banner;
