// 'use client';
// import { useParams } from 'next/navigation';
// import React from 'react';

// const UpdateProduct = () => {

//   const { id } = useParams();

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

//     try {
//       const response = await fetch(`http://localhost:5000/product/getbyid/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   }

//   return (
//     <>

//     </>
//   )
// };

// export default UpdateProduct;