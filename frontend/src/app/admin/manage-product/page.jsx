'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';


const ManageProduct = () => {
        const [productList, setProductList] = useState([]);
    
    const fetchProductData = async ()=>{
        const res = await axios.get('http://localhost:5000/product/getall');
        console.table(res.data);
        setProductList(res.data);
    }
    useEffect(() => {
    fetchProductData();
    }, []);
    const deleteProduct =(id) =>{
        axios.delete('http://localhost:5000/product/delete/' + id)
        .then((result) => {
            toast.success('Product deleted successfully');
            fetchProductData();
        }).catch((err) => {
            toast.error('failed to delete product');
        });
    }

return (
    <div className='container mx-auto p-4'>
        <h2 className='text-center font-bold text-3xl my-6'>Manage Products</h2>
        <div className='overflow-x-auto shadow-md rounded-lg'>
            <table className='w-full table-auto bg-white'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Created At</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {productList.map((product) => (
                        <tr key={product._id} className='hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{product.title}</td>
                            <td className='px-6 py-4 text-sm text-gray-900 max-w-xs truncate'>{product.description}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{product.category}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>₹{product.price}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                <img src={product.image} alt={product.title} className='h-10 w-10 rounded-full object-cover' />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                {new Date(product.createdAt).toLocaleDateString()}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                                <button
                                    onClick={() => { deleteProduct(product._id) }}
                                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200'>
                                    Delete
                                </button>
                                <Link
                                    href={'/update-product/' + product._id}
                                    className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded inline-block transition-colors duration-200'>
                                    Update
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)
}

export default ManageProduct;