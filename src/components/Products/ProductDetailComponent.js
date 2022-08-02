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

  attributeClicked = (attributeName, itemName) => {
    console.log(attributeName)
    if (this.state.data.attributes.length < 2) {
      this.state.data.attributes[0].items.map((item) => (
        item._id == attributeName ? item.clicked = true : item.clicked = false
      ) )
      return this.state.data.attributes[0].items.map((item) => (
        item._id == attributeName ? this.setState({ data: { ...this.state.data, attributes: [{...this.state.data.attributes[0], items: [...this.state.data.attributes[0].items]}] }}) : item
      ))
    } else {
      this.state.data.attributes.map((attribute) => {
        attribute.items.map((item) => {
          if(item._id == attributeName) {
              item.clicked = true
              this.setState({ data: { ...this.state.data, attributes: [...this.state.data.attributes] } })
            } else if (attribute.name == itemName) {
              item.clicked = false
              this.setState({ data: { ...this.state.data, attributes: [...this.state.data.attributes] } })
            }
          })
      })
    }
  }

  render() {
    console.log(this.state)
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
                      <span className={!itemAttribute.clicked? "swatches" : "clicked-swatch"} key={nanoid()} style={{ backgroundColor: itemAttribute.value, }} onClick={() => this.attributeClicked(itemAttribute._id, item.id)}></span>
                    ))}
                    { !(item.name == 'Color') && item.items.map((itemAttribute) => (
                      <span className={!itemAttribute.clicked ? "product-detail-items" : "clicked-product-detail-items"} key={nanoid()} onClick={() => this.attributeClicked(itemAttribute._id, item.id)}>{itemAttribute.value}</span>
                    ))}
                  </div>
                </div>
              )) }
            </div>
          }
          <h4 style={{marginBottom: 10, marginTop: 30}}>PRICE</h4>
          <ChangeCurrencyLogic currency={currency} id={id}/>
          <button onClick={() => addToCart(this.state.data)} className="detail-page-button" style={{ marginTop: 20, marginBottom: 20}} type="buton">ADD TO CART</button>
          <Interweave content={this.state.data.description}/>
        </div>
      </div>
    )
  }
}

export default ProductDetailComponent;