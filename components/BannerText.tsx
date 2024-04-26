type Proptypes = {
  title: string;
  description: string;
  btnText: string;
  btnStyles?: string;
  mainStyles?: string;
};

const BannerText = (props: Proptypes) => {
  const { title, description, btnText, btnStyles, mainStyles } = props;

  return (
    <div className={`absolute top-0 left-4 w-60 h-full flex flex-col gap-3 ${mainStyles}`}>
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-sm leading-5">{description}</p>
      <button className={`w-24 h-8 font-semibold duration-200 rounded-full transition-all ${btnStyles}`}>{btnText}</button>
    </div>
  );
};

export default BannerText;
