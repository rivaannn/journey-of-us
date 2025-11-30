import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Intro from './pages/Intro';
import MusicPlayer from './components/ui/MusicPlayer';

// Memuat halaman secara lazy untuk optimasi performa
const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Letters = lazy(() => import('./pages/Letters'));
const Story = lazy(() => import('./pages/Story'));
const Fun = lazy(() => import('./pages/Fun'));

// Komponen untuk menangani transisi rute
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Halaman Intro di Root */}
        <Route path="/" element={<Intro />} />

        {/* Rute Utama Aplikasi dibungkus dalam Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Home />
            </Suspense>
          } />
          <Route path="/timeline" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Timeline />
            </Suspense>
          } />
          <Route path="/gallery" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Gallery />
            </Suspense>
          } />
          <Route path="/letters" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Letters />
            </Suspense>
          } />
          <Route path="/story" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Story />
            </Suspense>
          } />
          <Route path="/fun" element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <Fun />
            </Suspense>
          } />
        </Route>

        {/* Tangkap semua rute tak dikenal - alihkan ke root (Intro) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      {/* Pemutar Musik Global */}
      <MusicPlayer />
      <AnimatedRoutes />
    </Router>
  );
}
