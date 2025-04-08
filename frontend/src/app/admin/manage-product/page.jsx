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
        <div className='container mx-auto'>
        <h2 className='text-center font-bold text-3xl my-6 underline'>Manage Product</h2>
        <table className='border-2'>
            <thead className='border-y-2'>
                <tr>
                    <th className='border-2'>TITLE</th>
                    <th className='border-2'>Description</th>
                    <th className='border-2'>Category</th>
                    <th className='border-2'>Price</th>
                    
                    <th className='border-2'>Image</th>
                    <th className='border-2'>CreatedAt</th>
                    <th className='border-2'>Delete</th>
                    <th className='border-2'>Update</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    productList.map( (product) =>{
                    return (
                        <tr key={product._id} >
                            <td className='border-2'>{product.title}</td>
                            <td className='border-2'>{product.description}</td>
                            <td className='border-2'>{product.category}</td>
                            <td className='border-2'>{product.price}</td>
                            <td className='border-2'>{product.image}</td>
                            <td className='border-2'>{product.createdAt}</td>
                            <td className='border-2'>
                                <button
                                onClick={ ()=> { deleteProduct(product._id)}}
                                className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                            </td>
                            <td className='border-2'>
                                <Link
                                href={'/update-product/' + product._id}
                                className='bg-blue-500 text-white px-2 py-1 rounded'>Update</Link>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>
)
}

export default ManageProduct;