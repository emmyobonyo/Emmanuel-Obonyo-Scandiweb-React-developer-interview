import { PureComponent } from "react";
import { nanoid } from 'nanoid';
import ChangeCurrencyLogic from "./changeCurrencyLogic";
import { Interweave } from 'interweave';

class ProductDetailComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.product,
      image: null
    }
  }

  changeImage = (src) => {
    this.setState({
      image: src
    })
  }
  render() {
    const { currency, addToCart, closeCurrencyOverlay, id } = this.props
    return (
      <div className="product-detail" onClick={closeCurrencyOverlay}>
        <div className="product-detail-images">
          { this.state.data.gallery.map((image) => (
            <img onClick={() => this.changeImage(image)} className="detail-page-thumnails" src={image} alt={this.state.data.name} key={nanoid()}/>
          )) }
        </div>
        <img src={ this.state.image || this.state.data.gallery[0]} alt={this.state.data.name} className="detail-page-image"/>
        <div className="detail-page-details">
          <h3 className="product-detail-brand">{this.state.data.brand}</h3>
          <h3 className="product-detail-name">{this.state.data.name}</h3>
          { this.state.data.attributes.length > 0 &&
            <div>
              { this.state.data.attributes.map((item) => (
                <div key={nanoid()}>
                  <h4 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h4>
                  <div>
                    { item.name == 'Color' && item.items.map((itemAttribute) => (
                      <span className="swatches" key={nanoid()} style={{ backgroundColor: itemAttribute.value, }}></span>
                    ))}
                    { !(item.name == 'Color') && item.items.map((itemAttribute) => (
                      <span className="product-detail-items" key={nanoid()}>{itemAttribute.value}</span>
                    ))}
                  </div>
                </div>
              )) }
            </div>
          }
          <h4 style={{marginBottom: 10, marginTop: 30}}>PRICE</h4>
          <ChangeCurrencyLogic currency={currency} id={id}/>
          <button onClick={() => addToCart(this.state.data.product)} className="detail-page-button" style={{ marginTop: 20, marginBottom: 20}} type="buton">ADD TO CART</button>
          <Interweave content={this.state.data.description}/>
        </div>
      </div>
    )
  }
}

export default ProductDetailComponent;