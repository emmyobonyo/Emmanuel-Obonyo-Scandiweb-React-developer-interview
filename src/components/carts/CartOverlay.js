import { PureComponent } from "react";
import { nanoid } from 'nanoid';
import Carousel from 'nuka-carousel';
import './CartOverlay.css';

class CartOverlay extends PureComponent {

  render() {
    const { currency, removeFromCart, cartItems, increment, decrement, total, quantity } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === '$') {
        return (
          <div>
            <h4 className="cart-overlay-prices">{product.prices[0].currency.symbol}</h4>
            <h4 className="cart-overlay-prices">{product.prices[0].amount}</h4>
          </div>
        );
      } else if (currency === '£') {
        return (
          <div>
            <h4 className="cart-overlay-prices">{product.prices[1].currency.symbol}</h4>
            <h4 className="cart-overlay-prices">{product.prices[1].amount}</h4>
          </div>
        )
      } else if (currency == 'A$') {
        return (
          <div>
            <h4 className="cart-overlay-prices">{product.prices[2].currency.symbol}</h4>
            <h4 className="cart-overlay-prices">{product.prices[2].amount}</h4>
          </div>
        )
      } else if (currency == '¥') {
        return (
          <div>
            <h4 className="cart-overlay-prices">{product.prices[3].currency.symbol}</h4>
            <h4 className="cart-overlay-prices">{product.prices[3].amount}</h4>
          </div>
        )
      } else if (currency === '₽') {
        return (
          <div>
            <h4 className="cart-overlay-prices">{product.prices[4].currency.symbol}</h4>
            <h4 className="cart-overlay-prices">{product.prices[4].amount}</h4>
          </div>
        )
      }
      return null;
    };
    return (
      <div className="cart-overlay-div">
        { cartItems.length > 0 ?
        <div className="cart-overlay-top">
          <h4 style={{ marginLeft: 10 }}>My Bag,</h4>
          <h4 className="cart-overlay-heading">{ `${quantity} item${cartItems.length > 1 ? 's' : ''}` }</h4>
        </div> : <h3>You have no items in your cart</h3> }
       { cartItems.map((item) => (
        <div key={nanoid()}>
          { item.category === 'clothes' && item.attributes.length > 0 &&
            <div className="cart-overlay-sections">
              <div className="cart-overlay-sections-1">
                <h4 className="cart-overlay-brand">{ item.brand }</h4>
                <h4 className="cart-overlay-name">{ item.name }</h4>
                { chooseCurrency( currency, item) }
                { item.attributes.map((item) => (
                  <div key={nanoid()}>
                    <h4 style={{marginTop: 0}}>{`${item.name}:`}</h4>
                    <div>
                      {item.items.map((itemAttribute) => (
                        <span className="product-detail-items" key={nanoid()}>{itemAttribute.value}</span>
                      ))}
                    </div>
                  </div>
                )) }
                <button className="delete-button" onClick={() => removeFromCart(item.id)}>Delete</button>
              </div>
              <div className="cart-overlay-buttons-div">
                <div className="cart-overlay-buttons">
                  <button className="cart-overlay-button" onClick={() => increment(item.id)}>+</button>
                  <span>{item.count}</span>
                  <button className="cart-overlay-button" onClick={() => decrement(item.id)}>-</button>
                </div>
                <img src={item.gallery[0]} className="cart-overlay-image"/>
              </div>
            </div>
          }
          { item.category === 'tech' && item.attributes.length > 0 &&
            <div className="cart-overlay-sections">
              <div className="cart-overlay-sections-1">
                <h4 className="cart-overlay-brand">{ item.brand }</h4>
                <h4 className="cart-overlay-name">{ item.name }</h4>
                { chooseCurrency( currency, item) }
                { item.attributes.map((item) => (
                  <div key={nanoid()}>
                    { item.name === 'Color' &&
                      <div>
                        <h4>{`${item.name}:`}</h4>
                        <div>
                          {item.items.map((value) => (
                            <span className="swatches" key={nanoid()} style={{ backgroundColor: value.value, }}></span>
                          ))}
                        </div>
                      </div>
                    }
                    { item.name === 'Capacity' &&
                      <div>
                        <h3>{item.name}</h3>
                        <div>
                          {item.items.map((value) => (
                            <span className="detail-page-capacity" key={nanoid()}>{value.value}</span>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                )) }
                <button className="delete-button" onClick={() => removeFromCart(item.id)}>Delete</button>
              </div>
              <div className="cart-overlay-buttons-div">
                <div className="cart-overlay-buttons">
                  <button className="cart-overlay-button" onClick={() => increment(item.id)}>+</button>
                  <span>{item.count}</span>
                  <button className="cart-overlay-button" onClick={() => decrement(item.id)}>-</button>
                </div>
                <img src={item.gallery[0]} className="cart-overlay-image"/>
              </div>
          </div>
          }
        </div>
      ))}
        <div className="cart-overlay-total">
          <h3>Total</h3>
          <h3>{`${Math.round(total * 10)/10} ${currency}`}</h3>
        </div>
        <div className="cart-overlay-total-buttons">
          <button className="cart-overlay-total-button button-1">VIEW BACK</button>
          <button className="cart-overlay-total-button button-2">CHECK OUT</button>
        </div>
      </div>
    )
  }
}

export default CartOverlay;