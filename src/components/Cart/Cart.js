import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);

    // const total = cart.reduce((total, prd) => total + prd.price , 0)

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        // debugger;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = total / 10

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    const grandTotal = formatNumber(total + shipping + tax);

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price: {formatNumber(total)}</p>
            <p> <small>Shipping Cost {shipping} </small> </p>
            <p> <small>Vat + Tax: {formatNumber(tax)} </small> </p>
            <p>Total Price: {grandTotal}</p>
            <br />
            {
                props.children
            }

            {/* <Link to="/review">
                <button className="add-cart-btn">Review Order</button>
            </Link> */}
        </div>
    );
};

export default Cart;