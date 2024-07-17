// import React from 'react'
// import ProductContext from './productContext'

// const ProductState = (props) => {

//     const host = "http://localhost:4000";

//     const getIndividualUserProducts= async()=>{
//         const response= await fetch(`${host}/product/fetchAllProductsOfAUser`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 'auth-token': localStorage.getItem('token')
//         }
//     })
//     const json = await response.json();
//     console.log(json);
//     }

//     const getAllProducts= async()=>{
//         const response= await fetch(`${host}/product/getallUsersProduct`,{
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//         }
//         })
//         const json = await response.json();
//         console.log(json);
//     }

//     const addProduct=async(crane, pulley, ballbearings, grece )=>{
//       await fetch(`${host}/product/addProduct`,{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             'auth-token': localStorage.getItem('token')
//         },

//         body: JSON.stringify({crane, pulley, ballbearings, grece }),
//       })
//     }

//     const updateProduct = async(id,crane, pulley, ballbearings, grece )=>{
//         await fetch(`${host}/product/updateProduct/${id}`,{
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               'auth-token': localStorage.getItem('token')
//           },
  
//           body: JSON.stringify({crane, pulley, ballbearings, grece }),
//         })
//       }

//   return (
//     <div>ProductState</div>
//   )
// }

// export default ProductState


import React, { useState, useEffect } from 'react';
import ProductContext from './productContext';

const ProductState = (props) => {
    const host = "http://localhost:4000";

    const [products, setProducts] = useState([]);

    const getIndividualUserProducts = async () => {
        const response = await fetch(`${host}/product/fetchAllProductsOfAUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setProducts(json);
    }

    const getAllProducts = async () => {
        const response = await fetch(`${host}/product/getallUsersProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setProducts(json);
    }

    const addProduct = async (crane, pulley, ballbearings, grece) => {
        const response = await fetch(`${host}/product/addProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ crane, pulley, ballbearings, grece }),
        });
        const json = await response.json();
        setProducts(products.concat(json));
    }

    const updateProduct = async (id, crane, pulley, ballbearings, grece) => {
        const response = await fetch(`${host}/product/updateProduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ crane, pulley, ballbearings, grece }),
        });
        const json = await response.json();
        setProducts(products.map(product => product._id === id ? json : product));
    }

    const incrementProduct = async (field) => {
        const response = await fetch(`${host}/product/incrementProduct`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ field }),
        });
        const json = await response.json();
        setProducts(products.map(product => product._id === json._id ? json : product));
    }

    const decrementProduct = async (field) => {
        const response = await fetch(`${host}/product/decrementProduct`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ field }),
        });
        const json = await response.json();
        setProducts(products.map(product => product._id === json._id ? json : product));
    }

    return (
        <ProductContext.Provider value={{
            products,
            getIndividualUserProducts,
            getAllProducts,
            addProduct,
            updateProduct,
            incrementProduct,
            decrementProduct
        }}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductState;
