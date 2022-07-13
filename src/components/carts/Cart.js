import { PureComponent } from "react";
import { nanoid } from 'nanoid';
import Carousel from 'nuka-carousel';
import '../Products/ProductDetail.css';

class Cart extends PureComponent {

  render() {
    const { currency, removeFromCart, cartItems, increment, decrement, total, quantity } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === '$') {
        return (
          <div>
            <span className="product-detail-prices">{product.prices[0].currency.symbol}</span>
            <span className="product-detail-prices">{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === '£') {
        return (
          <div>
            <span className="product-detail-prices">{product.prices[1].currency.symbol}</span>
            <span className="product-detail-prices">{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency == 'A$') {
        return (
          <div>
            <span className="product-detail-prices">{product.prices[2].currency.symbol}</span>
            <span className="product-detail-prices">{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency == '¥') {
        return (
          <div>
            <span className="product-detail-prices">{product.prices[3].currency.symbol}</span>
            <span className="product-detail-prices">{product.prices[3].amount}</span>
          </div>
        )
      } else if (currency === '₽') {
        return (
          <div>
            <span className="product-detail-prices">{product.prices[4].currency.symbol}</span>
            <span className="product-detail-prices">{product.prices[4].amount}</span>
          </div>
        )
      }
      return null;
    };
    return (
      <div className="cart-div-overall">
        <h1 className="cart-heading">Cart</h1>
       { cartItems.map((item) => (
        <div key={nanoid()}>
          { item.category === 'clothes' && item.attributes.length > 0 &&
            <div className="cart-div">
              <div className="cart-div-item">
                <h3 className="product-detail-brand">{ item.brand }</h3>
                <h3 className="product-detail-name">{ item.name }</h3>
                { item.attributes.map((item) => (
                  <div key={nanoid()}>
                    <h4 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h4>
                    <div>
                      {item.items.map((itemAttribute) => (
                        <span className="product-detail-items" key={nanoid()}>{itemAttribute.value}</span>
                      ))}
                    </div>
                  </div>
                )) }
                <h4 style={{marginBottom: 10, marginTop: 30}}>PRICE</h4>
                { chooseCurrency( currency, item) }
                <button className="delete-button" onClick={() => removeFromCart(item.id)}>Delete</button>
              </div>
              <div className="cart-div-carousel">
                <div className="cart-div-carousel-button">
                  <button className="button" onClick={() => increment(item.id)}>+</button>
                  <h3>{item.count}</h3>
                  <button className="button" onClick={() => decrement(item.id)}>-</button>
                </div>
                { item.gallery.length > 1 &&
                  <Carousel>
                    { item.gallery.map((image) => (
                      <img key={nanoid()} src={image} className="cart-images" />
                    )) }
                  </Carousel>
                }
                { item.gallery.length < 2 &&
                  <img src={ item.gallery[0] }/>
                }
                </div>
            </div>
          }
          { item.category === 'tech' && item.attributes.length > 0 &&
            <div className="cart-div">
              <div className="cart-div-item">
                <h3>{ item.brand }</h3>
                <h3>{ item.name }</h3>
                { item.attributes.map((item) => (
                  <div key={nanoid()}>
                    { item.name === 'Color' &&
                      <div>
                        <h3 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h3>
                        <div>
                          {item.items.map((value) => (
                            <span className="swatches" key={nanoid()} style={{ backgroundColor: value.value, }}></span>
                          ))}
                        </div>
                      </div>
                    }
                  { item.name === 'Capacity' &&
                    <div>
                      <h3 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h3>
                      <div>
                        {item.items.map((value) => (
                          <span className="detail-page-capacity" key={nanoid()}>{value.value}</span>
                        ))}
                      </div>
                    </div>
                  }
                </div>
                )) }
                <h4>PRICE</h4>
                { chooseCurrency( currency, item) }
                <button className="delete-button" onClick={() => removeFromCart(item.id)}>Delete</button>
              </div>
              <div className="cart-div-carousel">
                <div className="cart-div-carousel-button">
                  <button className="button" onClick={() => increment(item.id)}>+</button>
                  <h3>{item.count}</h3>
                  <button className="button" onClick={() => decrement(item.id)}>-</button>
                </div>
                { item.gallery.length > 1 &&
                  <Carousel>
                    { item.gallery.map((image) => (
                      <img key={nanoid()} src={image} className="cart-images"/>
                    )) }
                  </Carousel>
                }
                { item.gallery.length < 2 &&
                  <img src={ item.gallery[0] } />
                }
                </div>
            </div>
          }
           <hr className="horizontal-line"/>
        </div>
      ))}
      <div>
        <div>
          <h3 className="toal-titles">Tax 21%:</h3>
          <h3 className="total-titles-2">{`${currency} ${Math.round(0.21 * total * 10)/10} `}</h3>
        </div>
        <div>
          <h3 className="toal-titles">Quantity: </h3>
          <h3 className="total-titles-2">{ quantity }</h3>
        </div>
        <div>
          <h3 className="toal-titles">Total:</h3>
          <h3 className="total-titles-2">{ total == 0 ? 'You have no items in the cart' : `${ currency } ${Math.round((total + (0.21 * total))*10)/10}` }</h3>
        </div>
      </div>
      <button className="button-total">Order</button>
      </div>
    )
  }
}

export default Cart;