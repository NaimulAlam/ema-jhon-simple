import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        // console.log('Order Placed')
    }

    const removeProduct = (productKey) => {
        // console.log('removed', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        // const counts = productKeys.map(key => savedCart[key]);
        //these console log will work after clik on review order
        // console.log(counts);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        console.log(cartProducts);
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="Happy"/>
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {/* <h2>Cart Items: {cart.length} </h2> */}
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }
                {   thankYou    }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="add-cart-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;