import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundDecoration from '../ui/BackgroundDecoration';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <BackgroundDecoration />
      <Navbar />
      <main className="flex-grow relative z-10 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
