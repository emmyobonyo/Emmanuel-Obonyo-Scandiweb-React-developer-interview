import { PureComponent } from "react";
import { nanoid } from 'nanoid';
// import Carousel from 'nuka-carousel';
import ChangeCurrencyLogic from "../Products/changeCurrencyLogic";
import Carousel from "./Carousel";
// import CarouselItem from "./CarouselItem";
import './CartOverlay.css';
class Cart extends PureComponent {

  render() {
    const { currency, cartItems, increment, decrement, total, quantity } = this.props;
    return (
      <div className="cart-div-overall">
        <h1 className="cart-heading">Cart</h1>
       { cartItems.map((item) => (
        <div key={nanoid()}>
          <div className="cart-div">
            <div className="cart-div-item">
              <h3 className="product-detail-brand">{ item.brand }</h3>
              <h3 className="product-detail-name">{ item.name }</h3>
              { item.attributes.map((item) => (
                <div key={nanoid()}>
                  <h4 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h4>
                  <div>
                    { item.items.map((itemAttribute) => (
                      <div className="itemAttribute-items" key={nanoid()}>
                        { item.name == "Color" && <span className={ itemAttribute.clicked ? "swatches-clicked" : "swatches-cart"} style={{ backgroundColor: itemAttribute.value, }}></span>}
                        { !(item.name == "Color") &&<span className={ itemAttribute.clicked ? "product-detail-items-cart-clicked" : "product-detail-items-cart"}>{itemAttribute.value}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )) }
              <h4>PRICE</h4>
              <ChangeCurrencyLogic id={item.id} currency={currency} />
            </div>
            <div className="cart-div-carousel">
              <div className="cart-div-carousel-button">
                <button className="button" onClick={() => increment(item)}>+</button>
                <h3>{item.count}</h3>
                <button className="button" onClick={() => decrement(item, item.count)}>-</button>
              </div>
              { item.gallery.length > 1 &&
                <Carousel item={item} />
                // <div className="carousel">
                //   <div className="carousel-inner">
                //     { item.gallery.map((image, index) => (
                //       <div className="carousel-item">
                //         <CarouselItem image={image}/>
                //       </div>
                //     )) }
                //   </div>
                // </div>
                // <Carousel>
                //   { item.gallery.map((image) => (
                //     <img key={nanoid()} src={image} className="cart-images"/>
                //   )) }
                // </Carousel>
              }
              {
                item.gallery.length < 2 &&
                <img src={ item.gallery[0] } className="cart-images" />
              }
            </div>
          </div>
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