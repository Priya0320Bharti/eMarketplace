'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Navbar = ()=> {
  const [masterList, setMasterList] = useState([]);
  
  const fetchProduct = () => {
    axios.get('http://localhost:5000/product/getall')
      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
        setMasterList(res.data);
      }).catch((err) => {
        console.log(err);

      });
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  const searchProduct = (e) => {
    setProductList(
      masterList.filter( (product) => { return product.title.toLowerCase().includes(e.target.value.toLowerCase())} )
    )
  }


  return (
    <div>
      <header className="mb-8 border-b">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* logo - start */}
        <a
          href="/"
          className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
          aria-label="logo"
        >
          <svg
            width={95}
            height={94}
            viewBox="0 0 95 94"
            className="h-auto w-6 text-indigo-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
          </svg>
          Our Website
        </a>
        {/* logo - end */}
        {/* nav - start */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {/* start search */}
        <form>
            <div className="relative z-10 flex gap-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
              <div className="w-full">
                <label
                  htmlFor="searchProduct"
                  className="block text-sm text-gray-700 font-medium dark:text-white"
                >
                  <span className="sr-only">Search product</span>
                </label>
                <input
                  type="search"
                  onChange={searchProduct}
                  className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Search product"
                />
              </div>

              <div>
                <a
                  className="size-11 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  <svg
                    className="shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </a>
              </div>
            </div>
          </form>
          {/* <hr /> */}
          
          {/* end search  */}
          <a href="/" className="item-center text-lg font-semibold text-indigo-500">
            Home
          </a>
          <a
            href="/login"
            className="items-center justify-between text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            Ragister
          </a>
          <a
            href="/contact"
            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            Contact
          </a>
          <a
            href="/about"
            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            About
          </a>
        </nav>
        {/* nav - end */}
        {/* buttons - start */}
        <div className="flex divide-x border-r sm:border-l">
          <a
            href="#"
            className="hidden h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:flex sm:h-20 sm:w-20 md:h-24 md:w-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Wishlist
            </span>
          </a>
          <a
            href="/signup"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Account
            </span>
          </a>
          <a
            href="/cart"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </a>
        </div>
        {/* buttons - end */}
      </div>
    </header>
    </div>
  )
}

export default Navbar;