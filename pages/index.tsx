import Head from 'next/head';
import Banner from '../components/Banner';
import { Product } from '../types';
import { useEffect, useState } from 'react';
import Products from '../components/Products';

interface Props {
  productData: Product;
}

export default function Home({ productData }: Props) {
  console.log(productData);
  // const [products, setProducts] = useState<ProductData[]>([]);

  // const fetchData = async () => {
  //   await fetch('http://localhost:3000/api/productdata')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <Head>
        <title>OLShop | Be Awesome</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-lightBlue relative">
        <div className="max-w-contentContainer mx-auto bg-white">
          <Banner />
          <Products productData={productData} />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const productData = await (await fetch('http://localhost:3000/api/productdata')).json();

  return {
    props: {
      productData,
    },
  };
};
