import React from 'react';
import Homesection from '../components/Homesection';
import Featuredproducts from '../components/Featuredproducts';
import CategoryDisplay from '../components/CategoryDisplay';

export default function HomePage({ products, categories, addToCart }) {
  return (
    <>
      <Homesection
        heading="Welcome to GlobalMart"
        description="Discover the latest and trending products with unbeatable prices. From fashion to electronics, home decor to accessories — GlobalMart brings everything you love in one place. Enjoy a seamless shopping experience with secure payment options, fast delivery, and top-quality items. Explore exclusive deals every day and make your shopping more exciting and rewarding with GlobalMart — your trusted online marketplace."
        buttonText="Shop Now"
        image="images/homescreen pic (1).svg"
      />
      <Featuredproducts products={products} addToCart={addToCart} />
      <CategoryDisplay categories={categories} />
    </>
  );
}