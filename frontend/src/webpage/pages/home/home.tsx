import React from 'react';
import GreenLine from '../../components/greenline/greenline';
import Steps from '../../components/home/steps/steps';
import Products from '@/components/home/products/products';
import BankLogos from '@/components/home/bankLogos,tsx/bankLogos';
import BlogPosts from '@/components/home/blogPost/blogPost';
import HeroBanner from '@/components/home/heroBanner/heroBanner';
import Footer from '@/components/footer/footer';


const Home: React.FC = () => {
  return (
    <>
      <GreenLine />
      <Steps/>
      <GreenLine />
      <Products />
      <GreenLine />
      <BankLogos  />
      <GreenLine />
      <BlogPosts />
      <GreenLine />
      <HeroBanner />
      <GreenLine />
      <Footer />
    </>
  );
};

export default Home;