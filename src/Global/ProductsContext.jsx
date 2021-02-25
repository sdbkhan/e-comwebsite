import React ,{createContext,useState}from 'react';
import cycle from "../assets/cycle.jpg";
import girl from "../assets/girl.png";
import girl2 from "../assets/girl2.webp"
import gym from '../assets/gym.jpg';
import headphone from "../assets/headphone.webp";
import laptop from "../assets/laptop.jpg";
import phone from "../assets/phone.webp";
import protein from "../assets/protein.jpg";


export const ProductsContext=createContext();

const ProductsContextProvider = (props) => {
    const [products]=useState([
        {
           id:1,
           name:'Cycle',
           price:400,
           image:cycle,
           status:"new" 
        },
        {
            id:2,
            name:'Girl1',
            price:350,
            image:girl,
            status:"hot" 
         },
         {
            id:3,
            name:'Girl2',
            price:400,
            image:girl2,
            status:"new" 
         },
         {
            id:4,
            name:'Gym',
            price:1500,
            image:gym,
            status:"hot" 
         },
         {
            id:5,
            name:'Headphone',
            price:700,
            image:headphone,
            status:"new" 
         },
         {
            id:6,
            name:'Laptop',
            price:35000,
            image:laptop,
            status:"hot" 
         },
         {
            id:7,
            name:'Phone',
            price:4000,
            image:phone,
            status:"hot" 
         },
         {
            id:8,
            name:'protein',
            price:3500,
            image:protein,
            status:"new" 
         }
    ]);
    return (
       <ProductsContext.Provider value={{products: [...products]}}>
           {props.children}

       </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;
