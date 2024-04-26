type Amount = {
  amount: Number;
};

const FormatePrice = ({ amount }: Amount) => {
  const formattedAmount = new Number(amount).toLocaleString('em-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return <span>{formattedAmount}</span>;
};

export default FormatePrice;
