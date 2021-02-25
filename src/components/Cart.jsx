import React,{useContext} from 'react';
import {CartContext} from "../Global/CartContext"
// import { ProductsContext } from '../Global/ProductsContext';
import StripeCheck from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Cart = (props) => {
    const {shoppingCart,totalPrice,qty,dispatch}= useContext(CartContext);
    const handleToken=async(token)=>{
        const product={name:'All Products', price:totalPrice}
        const response=await axios.post("http://localhost:8080/checkout",{
            product,
            token

        });
        const{status}=response.data;
        if(status==="success"){
            dispatch({type:'EMPTY'});
            props.history.push('/');
            toast.success("Thank you for Shopping with us",{position:toast.POSITION.TOP_RIGHT});
        }
    }
    return (
        <div className="cart-container">
            <div className="cart-details" style={{marginTop:"100px"}}>
               {shoppingCart.length > 0?
               shoppingCart.map(cart=>(
                   <div className="cart" key={cart.id}>
                       <span className="cart-image"><img src={cart.image} alt="not found"/></span>
                       <span className="cart-product-name">{cart.name}</span>
                       <span className="cart-product-price">Rs{cart.price}.00</span>
                       <span className="inc" onClick={()=>dispatch({type:'INC',id:cart.id,cart})}><i className="fas fa-plus"></i></span>
                       <span className="product-quantity">{cart.qty}</span>
                       <span className="dec" onClick={()=>dispatch({type:'DEC',id:cart.id,cart})}><i className="fas fa-minus"></i></span>
                       <span className="product-total-price">Rs{cart.price*cart.qty}.00</span>
                       <span className="delete-product" onClick={()=>dispatch({type:'DELETE', id:cart.id,cart})}><i className="fas fa-trash-alt"></i></span>
                       </div>
               ))
               :<div className="empty">Sorry your cart is empty</div>}
            </div>
            {shoppingCart.length> 0 ? <div className="cart-summary">
                <div className="summary">
                    <h3>Cart Summary</h3>
                    <div className="total-items">
                        <div className="items">Total Items</div>
                        <div className="items-count">{qty}</div>
                    </div>
                    <div className="total-price-section">
                        <div className="just-title">Total Price</div>
                        <div className="items-price">Rs {totalPrice}.00</div>
                    </div>
                    <div className="stripe-section">
                      <StripeCheck 
                      stripeKey='pk_test_51IOgsDHLrnSM26nSEvtejZRzDtUDvFAck6jVW5QcwKw8J6HXRTvczoUcwssI4G11bhzkbs5clV0QKusgsi2YnmgY00nXm5b2MC'
                      token={handleToken}
                      billingAddress
                      shippingAddress
                      amount={totalPrice*100}
                      name="All products"
                      >

                      </StripeCheck>
                    </div>
                </div>
            </div> :''}
        </div>
    )
}

export default Cart;
