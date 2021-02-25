import React,{useContext} from 'react';
import Banner from "./Banner";
import {ProductsContext} from "../Global/ProductsContext";
import {CartContext} from "../Global/CartContext";

const Products = () => {
    const {products} =useContext(ProductsContext)
    const {dispatch}= useContext(CartContext);

    // console.log("data variabl",data);
    // console.log(data);
    return (
        <div className="container">
            <Banner/>
        <div className="products">
            {products.map((product)=>(
                <div className="product"
                key={product.id}>
                    {/* <div className="cover"> */}
                    <div className="product-image">
                        <img src={product.image} alt="not found"/>
                    </div>
                    <div className="product-details">
                        <div className="product-name">
                            {product.name}
                        </div>
                        <div className="product-price">
                            Rs {product.price}.00
                        </div>
                    </div>
                    {/* </div> */}
                    <div className="add-to-cart" onClick={()=>dispatch({type:
                    'ADD_TO_CART', id:product.id,product})}>add to cart</div>
                    {product.status=== 'hot'?<div className="hot">Hot</div>:''}
                    {product.status=== 'new'?<div className="new">New</div>:''}
                    </div>
            ))}

        </div>
        </div>
    )
}

export default Products;
