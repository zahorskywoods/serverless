import { ReactNode } from 'react';
import { NextPage } from 'next';

import Navbar from 'components/home/Navbar';
import Footer from 'components/home/Footer';

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
