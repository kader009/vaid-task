'use client';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/shared/Navbar';
import Sidebar from './_components/Sidebar';
import Footer from '@/shared/Footer';

const Dashbooardlayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 w-full">
        <Sidebar />

        <main className="flex-1 w-full">{children}</main>

        <Toaster />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashbooardlayout;
