import { PureComponent } from "react";
import { nanoid } from 'nanoid';

class Cart extends PureComponent {
  render() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    console.log(cartItems)
    const { currency } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === 'USD') {
        return (
          <div>
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === 'GBP') {
        return (
          <div>
            <span>{product.prices[1].currency.symbol}</span>
            <span>{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency == 'AUD') {
        return (
          <div>
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency == 'JPY') {
        return (
          <div>
            <span>{product.prices[3].currency.symbol}</span>
            <span>{product.prices[3].amount}</span>
          </div>
        )
      } else if (currency === 'RUB') {
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
      <div>
        <h1>Cart</h1>
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
            </div>
          }
        </div>
      ))}
      </div>
    )
  }
}

export default Cart;