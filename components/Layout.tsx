import { ReactElement } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
