import { PureComponent } from "react";
import { nanoid } from 'nanoid';

class Cart extends PureComponent {
  render() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    return (
      cartItems.map((item) => (
        <div key={nanoid()}>
          <hr />
          <h3>{ item.brand }</h3>
          <h3>{ item.name }</h3>

        </div>
      ))
    )
  }
}

export default Cart;