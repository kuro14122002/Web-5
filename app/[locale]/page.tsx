import Navbar from './components/ui/Navbar';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import CharactersSection from './components/sections/CharactersSection';
import MediaSection from './components/sections/MediaSection';
import NewsSection from './components/sections/NewsSection';
import Footer from './components/ui/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <MediaSection />
      <NewsSection />
      <Footer />
    </main>
  );
} 