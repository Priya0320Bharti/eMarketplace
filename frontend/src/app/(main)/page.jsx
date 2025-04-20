'use client';

<div className="bg-white max-w-full mx-auto py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* images - start */}
                        <div className="grid gap-4 lg:grid-cols-5">
                            {/* <div className="order-last flex gap-4 lg:order-none lg:flex-col">
                                {productData.images?.map((image, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={image}
                                            loading="lazy"
                                            alt="Product image"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                ))}
                            </div> */}
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
                                <img
                                    src={productData.image}
                                    loading="lazy"
                                    alt="Product main"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        {/* images - end */}

                        {/* content - start */}
                        <div className="md:py-8">
                            {/* name - start */}
                            <div className="mb-2 md:mb-3">
                                <span className="text-2xl font-bold text-gray-800 lg:text-3xl ">{productData.title}</span>
                                <h2 className="mb-0.5 inline-block text-gray-500">{productData.description}</h2>
                            </div>
                            {/* name - end */}

                            {/* rating - start */}
                            <div className="mb-6 flex items-center gap-3 md:mb-10">
                                <div className="flex h-7 items-center gap-1 rounded-full bg-indigo-500 px-2 text-white">
                                    <span className="text-sm">{productData.rating}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-500 transition duration-100">
                                    {productData.ratings} ratings
                                </span>
                            </div>
                            {/* rating - end */}

                            {/* price - start */}
                            <div className="mb-4">
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                    ₹{productData.price}
                                    </span>
                                    {productData.Price && (
                                        <span className="mb-0.5 text-red-500 line-through">₹{productData.Price}</span>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
                            </div>
                            {/* price - end */}

                            {/* buttons - start */}
                            <div className="flex gap-2.5">
                                <a
                                    href="#"
                                    className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                                >
                                    Add to cart
                                </a>
                                <a
                                    href="#"
                                    className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                                >
                                    Buy now
                                </a>
                            </div>
                            {/* buttons - end */}
                        </div>
                        {/* content - end */}
                    </div>
                </div>
            </div>