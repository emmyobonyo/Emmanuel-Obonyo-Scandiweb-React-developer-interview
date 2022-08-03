import { PureComponent } from "react";
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import ChangeCurrencyLogic from "../Products/changeCurrencyLogic";
import './CartOverlay.css';

class CartOverlay extends PureComponent {

  render() {
    const { currency, cartItems, increment, decrement, total, quantity, onClickCartOverlay, closeCurrencyOverlay } = this.props;
    return (
      <div className="cart-overlay-div" onClick={onClickCartOverlay}>
        { cartItems.length > 0 ?
        <div className="cart-overlay-top">
          <h4 style={{ marginLeft: 10 }}>My Bag,</h4>
          <h4 className="cart-overlay-heading">{ `${quantity} item${cartItems.length > 1 ? 's' : ''}` }</h4>
        </div> : <h3>You have no items in your cart</h3> }
       { cartItems.map((item) => (
        <div key={nanoid()}>
          <div className="cart-overlay-sections">
            <div className="cart-overlay-sections-1">
              <h4 className="cart-overlay-brand">{ item.brand }</h4>
              <h4 className="cart-overlay-name">{ item.name }</h4>
              <ChangeCurrencyLogic id={item.id} currency={currency}/>
              { item.attributes.map((item) => (
                <div key={nanoid()}>
                  <h4 style={{ marginTop: 20 }}>{`${item.name}:`}</h4>
                  <div>
                    { item.items.map((itemAttribute) => (
                      <div className="itemAttribute-items" key={nanoid()}>
                      { item.name === "Color" && <span className={ itemAttribute.clicked ? "swatches-clicked" : "swatches-cart"} style={{ backgroundColor: itemAttribute.value, }}></span>}
                      { !(item.name === "Color") &&<span className={ itemAttribute.clicked ? "product-detail-items-cart-clicked" : "product-detail-items-cart"}>{itemAttribute.value}</span>}
                    </div>
                    )) }
                  </div>
                </div>
              )) }
            </div>
            <div className="cart-overlay-buttons-div">
              <div className="cart-overlay-buttons">
                <button className="cart-overlay-button" onClick={() => increment(item)}>+</button>
                <span>{item.count}</span>
                <button className="cart-overlay-button" onClick={() => decrement(item, item.count)}>-</button>
              </div>
              <img src={item.gallery[0]} className="cart-overlay-image" alt="overlay" />
            </div>
          </div>
        </div>
      ))}
        <div className="cart-overlay-total">
          <h3>Total</h3>
          <h3>{`${Math.round(total * 10)/10} ${currency}`}</h3>
        </div>
        <div className="cart-overlay-total-buttons">
          <Link to='/cart' onClick={closeCurrencyOverlay}><button className="cart-overlay-total-button button-1">VIEW BAG</button></Link>
          <button className="cart-overlay-total-button button-2">CHECK OUT</button>
        </div>
      </div>
    )
  }
}

export default CartOverlay;