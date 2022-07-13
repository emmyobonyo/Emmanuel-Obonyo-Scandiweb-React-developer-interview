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
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === '£') {
        return (
          <div>
            <span>{product.prices[1].currency.symbol}</span>
            <span>{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency == 'A$') {
        return (
          <div>
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency == '¥') {
        return (
          <div>
            <span>{product.prices[3].currency.symbol}</span>
            <span>{product.prices[3].amount}</span>
          </div>
        )
      } else if (currency === '₽') {
        return (
          <div>
            <span>{product.prices[4].currency.symbol}</span>
            <span>{product.prices[4].amount}</span>
          </div>
        )
      }
      return null;
    };
    return (
      <div className="cart-overlay-div">
        <h3>My Bag,</h3>
        <h3>{ `${quantity} items` }</h3>
       { cartItems.map((item) => (
        <div key={nanoid()}>
          <hr />
          <h3>{ item.brand }</h3>
          <h3>{ item.name }</h3>
          { item.category === 'clothes' && item.attributes.length > 0 &&
            <div>
              { item.attributes.map((item) => (
                <div key={nanoid()}>
                  <h3>{item.name}</h3>
                  <div>
                    {item.items.map((itemAttribute) => (
                      <span key={nanoid()}>{itemAttribute.value}</span>
                    ))}
                  </div>
                </div>
              )) }
              <p>PRICE</p>
              { chooseCurrency( currency, item) }
              <button onClick={() => removeFromCart(item.id)}>Delete</button>
              <div>
                <button onClick={() => increment(item.id)}>+</button>
                <span>{item.count}</span>
                <button onClick={() => decrement(item.id)}>-</button>
              </div>
              { item.gallery.length > 1 &&
                <Carousel>
                  { item.gallery.map((image) => (
                    <img key={nanoid()} src={image} />
                  )) }
                </Carousel>
              }
              { item.gallery.length < 2 &&
                <img src={ item.gallery[0] }/>
              }
            </div>
          }
          { item.category === 'tech' && item.attributes.length > 0 &&
            <div>
            { item.attributes.map((item) => (
              <div key={nanoid()}>
                { item.name === 'Color' &&
                  <div>
                    <h3>{item.name}</h3>
                    <div>
                      {item.items.map((value) => (
                        <span key={nanoid()}>{value.value}</span>
                      ))}
                    </div>
                  </div>
                }
                { item.name === 'Capacity' &&
                  <div>
                    <h3>{item.name}</h3>
                    <div>
                      {item.items.map((value) => (
                        <span key={nanoid()}>{value.value}</span>
                      ))}
                    </div>
                  </div>
                }
              </div>
            )) }
            <p>PRICE</p>
            { chooseCurrency( currency, item) }
            <button onClick={() => removeFromCart(item.id)}>Delete</button>
              <div>
                <button onClick={() => increment(item.id)}>+</button>
                <span>{item.count}</span>
                <button onClick={() => decrement(item.id)}>-</button>
              </div>
              { item.gallery.length > 1 &&
                <Carousel>
                  { item.gallery.map((image) => (
                    <img key={nanoid()} src={image} />
                  )) }
                </Carousel>
              }
              { item.gallery.length < 2 &&
                <img src={ item.gallery[0] } />
              }
          </div>
          }
        </div>
      ))}
      <div>
        <h3>{`${total} ${currency}`}</h3>
      </div>
      </div>
    )
  }
}

export default CartOverlay;