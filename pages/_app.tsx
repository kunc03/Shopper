import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { AppProps } from 'next/app';
import { Open_Sans, Poppins, Quicksand } from 'next/font/google';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import Layout from '../components/Layout';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <PersistGate loading={'loading'} persistor={persistor}>
          <main className={`${quicksand.className} font-quicksand`}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </PersistGate>
      </SessionProvider>
    </Provider>
  );
}
