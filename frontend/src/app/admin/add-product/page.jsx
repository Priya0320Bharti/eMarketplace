'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const ProductSchema= Yup.object().shape({
  title:Yup.string().required('title is required'),
  description:Yup.string().required('desciption is required'),
  category:Yup.string().required('category is required'),
  price:Yup.string().required('Price must be added')
  .matches(/[0-9]/,'Price must contain number'),
  image:Yup.string().required('image is required')
})

const AddProduct = () => {
  
  const productForm = useFormik({
    initialValues:{
      title:'',
      description:'',
      category:'',
      price:'',
      image:''
    },
    onSubmit:(values)=>{
      console.log(values);
      axios.post('http://localhost:5000/product/add', values)
      .then((result) => {
        toast.success('Product added successfully');
      }).catch((err) => {
        console.log(err)
        toast.error('Something Went wrong');
      });
    },
    validationSchema: ProductSchema
  })

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if(!file) toast.error('No file selected');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mypreset');
    formData.append('cloud_name', 'dwywvfsyu');

    axios.post('https://api.cloudinary.com/v1_1/dwywvfsyu/image/upload', formData)
    .then((result) => {
        toast.success('File uploaded successfully');
        productForm.setFieldValue('image', result.data.url);
    }).catch((err) => {
        toast.error('File upload failed');
    });

}

  return (
    <div><div className="max-w-lg mx-auto container mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
          Add a Product
        </h1>
        
      </div>
      <div className="mt-5">
        
        
        {/* Form */}
        <form onSubmit={productForm.handleSubmit}>
          <div className="grid gap-y-4">
            {/* Form Group */}
            <div>
              <label
                htmlFor="Title"
                className="block text-sm mb-2 dark:text-white"
              >
              Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  onChange={productForm.handleChange}
                  value={productForm.values.title}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="email-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.title && productForm.touched.title)&&(
                  <p className='text-xs text-red-600 mt-2' id="email-error">
                    {productForm.errors.title}
                  </p>
                )
              }
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm mb-2 dark:text-white"
              >
                Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="description"
                onChange={productForm.handleChange}
                value={productForm.values.description}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.description && productForm.touched.description)&&(
                  <p className='text-xs text-red-500 mt-2' id="description-error">
                    {productForm.errors.description}
                  </p>
                )
              }
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm mb-2 dark:text-white"
              >
                Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="category"
                  onChange={productForm.handleChange}
                  value={productForm.values.category}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="confirm-password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.category && productForm.touched.category)&&(
                  <p className='text-xs text-red-500 mt-2' id="category-error">
                    {productForm.errors.category}
                  </p>
                )
              }
            </div>
            {/* End Form Group */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm mb-2 dark:text-white "
              >
                Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  onChange={productForm.handleChange}
                  value={productForm.values.price}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="confirm-password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.price && productForm.touched.price)&&(
                  <p className='text-xs text-red-500 mt-2' id="price-error">
                    {productForm.errors.price}
                  </p>
                )
              }
            </div>
            {/* End Form Group */}
            {/* <div>
              <label
                htmlFor="price"
                className="block text-sm mb-2 dark:text-white "
              >
                Market Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="marketprice"
                  onChange={productForm.handleChange}
                  value={productForm.values.marketprice}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="confirm-password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.marketprice && productForm.touched.marketprice)&&(
                  <p className='text-xs text-red-500 mt-2' id="price-error">
                    {productForm.errors.marketprice}
                  </p>
                )
              }
            </div> */}
            {/* End Form Group */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm mb-2 dark:text-white"
              >
                Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  onChange={handleFileUpload}
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  required=""
                  aria-describedby="confirm-password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              {
                (productForm.errors.image && productForm.touched.image)&&(
                  <p className='text-xs text-red-500 mt-2' id="image-error">
                    {productForm.errors.image}
                  </p>
                )
              }
            </div>
            {/* End Form Group */}
            {/* Checkbox */}
            
            {/* End Checkbox */}
            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add Product
            </button>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  </div>
  </div>
  )
}

export default AddProduct;