import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Common from '../../assets/images/Common.png';

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
        <Link to={`/product/${product.id}`} key={product.id}>
          <div key={product.id} className='product-item' onMouseEnter={() => this.showAddToCartButton(product.id)} onMouseLeave={() => this.hideAddToCartButton(product.id)}>
          <div>
            <div className='image-div'>
              { !product.inStock && <div className="out-of-stock-div">OUT OF STOCK</div> }
              { !disabled ? <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> : <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> }
              { product.attributes.length == 0 && this.state.onHover && product.hover && product.inStock && <img src={Common} alt="add-to-cart" onClick={() => addToCart(product)} className='add-to-cart-button'/>}
            </div>
            <p className={ !product.inStock ? 'out-of-stock' : "" }>{product.name}</p>
            <p className={ !product.inStock ? 'out-of-stock' : "" }><b>{product.brand}</b></p>
            { chooseCurrency(currency, product) }
            {/* Make sure I grey out ths price */}
          </div>
        </div>
        </Link>
      ))
    )
  }
}

export default ProductItem;