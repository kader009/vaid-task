'use client';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/shared/Navbar';
import Sidebar from './_components/Sidebar';
import Footer from '@/shared/Footer';

const Dashbooardlayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex w-full min-h-screen ">
        <Sidebar />
        <Toaster/>
        <main className="flex-1 w-full">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Dashbooardlayout;
