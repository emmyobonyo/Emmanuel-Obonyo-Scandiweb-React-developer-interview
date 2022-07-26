import { PureComponent } from 'react';
import ProductComponent from './ProductComponent';
import { Link } from 'react-router-dom';

class ProductItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.category.products,
      onHover: false,
    }
  }

  showAddToCartButton = (id) => {
    const product = this.state.data.filter(item => item.id == id)
    product[0].hover = true;
    console.log(product[0].hover)
    this.setState({
      onHover: true,
    })
  }

  hideAddToCartButton = (id) => {
    const product = this.state.data.filter(item => item.id == id)
    product[0].hover = false;
    this.setState({
      onHover: false,
    })
  }

  render() {
    const { disabled, addToCart, chooseCurrency, currency } = this.props;
    console.log(this.state.data)
    return (
      this.state.data.map((product) => (
        <div>
          { !product.inStock ? <ProductComponent product={product} disabled={disabled} currency={currency} addToCart={addToCart} showAddToCartButton={this.showAddToCartButton} hideAddToCartButton={this.hideAddToCartButton} onHover={this.state.onHover}/> : <Link to={`/product/${product.id}`}><ProductComponent product={product} disabled={disabled} currency={currency} addToCart={addToCart} showAddToCartButton={this.showAddToCartButton} hideAddToCartButton={this.hideAddToCartButton} onHover={this.state.onHover}/></Link>}
        </div>
      ))
    )
  }
}

export default ProductItem;