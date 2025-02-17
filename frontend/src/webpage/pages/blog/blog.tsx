import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GreenLine from "@/components/greenline/greenline";
import Footer from "@/components/footer/footer";
import BankLogos from "@/components/home/bankLogos,tsx/bankLogos";
import BlogCardList from "@/components/blog/blogCardList";

const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <GreenLine />
      <BlogCardList />
      <GreenLine />
      <BankLogos />
      <GreenLine />
      <Footer />
    </>
  );
};

export default Blog;
