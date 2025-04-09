'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import useVoiceContext from '@/context/VoiceContext';
import pluralize from 'pluralize';
import { useRouter } from 'next/navigation';
import { IconShoppingCart, IconFilter } from '@tabler/icons-react';

const Browse = () => {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const [productList, setProductList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [sortBy, setSortBy] = useState('default');
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(1000000);

  const {
    transcript,
    resetTranscript,
    interpretVoiceCommand,
    fillInputUsingVoice,
    performActionUsingVoice,
    finalTranscript,
    voiceResponse,
    voices,
    triggerModal,
    checkExistenceInTranscript
  } = useVoiceContext();

  const filterByCategory = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const filterByMaxPrice = (price) => {
    setPriceRange(prev => ({ ...prev, max: price }));
  };

  const filterByMinPrice = (price) => {
    setPriceRange(prev => ({ ...prev, min: price }));
  };

  useEffect(() => {
    if (finalTranscript.includes('show me some ')) {
      const product = pluralize.singular(finalTranscript.split(' ').at(-1));
      filterAndSortProducts(product);
      resetTranscript();
      voiceResponse(`Here are some ${product}s for you`);
      triggerModal(
        `Here are some ${product} for you`,
        'Please ask or select the product you want to buy',
        true,
        <IconShoppingCart size={50} />
      );
    }
    else if (finalTranscript.includes('search product') || finalTranscript.includes('browse product')) {
      const product = pluralize.singular(finalTranscript.split(' ').slice(2).join(' '));
      filterAndSortProducts(product);
      resetTranscript();
      voiceResponse(`Here is your ${product}`);
      triggerModal(
        `Here is your ${product}`,
        'Please ask or select the product you want to buy',
        true,
        <IconShoppingCart size={50} />
      );
    } else if (finalTranscript.includes('filter by category')) {
      const category = pluralize.singular(finalTranscript.split(' ').at(-1));
      filterByCategory(category);
      resetTranscript();
      voiceResponse(`Here are some ${category}s for you`);
      triggerModal(
        `Here are some ${category} for you`,
        '',
        true,
        <IconFilter size={50} />
      );
    }
    else if (finalTranscript.includes('View Product number '.toLowerCase()) || finalTranscript.includes('Open Product number '.toLowerCase())) {
      const product = parseInt(finalTranscript.split(' ').at(-1));
      if (productList[product - 1]) {
        resetTranscript();
        router.push(`/view-detail/${productList[product - 1]._id}`);
        voiceResponse(`Opening product ${product}`);
      } else {
        voiceResponse(`Product number ${product} not found`);
      }
    }
    else if (finalTranscript.includes('price lower than'.toLowerCase())) {
      const price = parseInt(finalTranscript.split(' ').at(-1));
      filterByMaxPrice(price);
      voiceResponse(`Here are some products with price less than ${price}`);
      resetTranscript();
    }
    else if (finalTranscript.includes('price greater than'.toLowerCase())) {
      const price = parseInt(finalTranscript.split(' ').at(-1));
      filterByMinPrice(price);
      voiceResponse(`Here are some products with price greater than ${price}`);
      resetTranscript();
    }
    else if (finalTranscript.includes('clear search')) {
      setProductList(masterList);
      resetTranscript();
    }
  }, [finalTranscript, productList, router]);

  const fetchProduct = () => {
    axios.get('http://localhost:5000/product/getall')
      .then((res) => {
        const products = res.data;
        setProductList(products);
        setMasterList(products);
        const highestPrice = Math.max(...products.map(p => p.price));
        setMaxPossiblePrice(highestPrice);
        setPriceRange({ min: 0, max: highestPrice });
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const filterAndSortProducts = (searchTerm = '') => {
    let filtered = [...masterList];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setProductList(filtered);
  };

  const searchProduct = (query) => {
    if (typeof query === 'string') {
      filterAndSortProducts(query);
    } else if (query?.target?.value) {
      filterAndSortProducts(query.target.value);
    }
  };

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategory, priceRange, sortBy]);

  const isInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const categories = ['all', ...new Set(masterList.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Discover Amazing Products
          </h1>

          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="search"
                onChange={searchProduct}
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
                placeholder="Search for products..."
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter & Sort</h2>
          <div className="flex flex-wrap gap-6 items-start">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border-gray-200 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex-1 min-w-[300px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max={maxPossiblePrice}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPossiblePrice}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border-gray-200 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product, index) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Product Number Label */}
              <div className="absolute -left-3 -top-3 z-10 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              
              <Link href={'/view-detail/' + product._id}>
                <div className="relative aspect-square overflow-hidden rounded-t-xl container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => {
                    addToCart(product);
                  }}
                  className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {productList.length === 0 && (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}

export default Browse;