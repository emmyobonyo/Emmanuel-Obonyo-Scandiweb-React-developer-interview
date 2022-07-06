import { PureComponent } from "react";
import { nanoid } from 'nanoid';

class Cart extends PureComponent {
  render() {
    const { cartItems } = this.props;
    console.log(cartItems)
    return (
      <h1>Cart</h1>
    )
  }
}

export default Cart;