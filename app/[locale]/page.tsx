import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Navbar from './components/ui/Navbar';

// Lazy load components
const HeroSection = dynamic(() => import('./components/sections/HeroSection'));
const FeaturesSection = dynamic(() => import('./components/sections/FeaturesSection'));
const CharactersSection = dynamic(() => import('./components/sections/CharactersSection'));
const MediaSection = dynamic(() => import('./components/sections/MediaSection'));
const NewsSection = dynamic(() => import('./components/sections/NewsSection'));
const Footer = dynamic(() => import('./components/ui/Footer'));

// Loading components for Suspense
const SectionLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const metadata: Metadata = {
  alternates: {
    languages: {
      'en': '/en',
      'vi': '/vi'
    }
  }
};

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CharactersSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MediaSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <NewsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
}