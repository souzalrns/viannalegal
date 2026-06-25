import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/sections/Footer';

const Index = () => (
  <>
    <Helmet><title>ViannaLegal — Cidadania Portuguesa para Brasileiros</title></Helmet>
    <Header />
    <Hero />
    <Footer />
  </>
);

export default Index;
