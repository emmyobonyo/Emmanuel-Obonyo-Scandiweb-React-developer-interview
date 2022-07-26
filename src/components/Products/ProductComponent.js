import { PureComponent } from 'react';
import ChangeCurrencyLogic from './changeCurrencyLogic';
import Common from '../../assets/images/Common.png';

class ProductComponent extends PureComponent {
    render() {
      const {product, disabled, addToCart, currency, showAddToCartButton, hideAddToCartButton, onHover} = this.props;
      return (
        <div key={product.id} className='product-item' onMouseEnter={() => showAddToCartButton(product.id)} onMouseLeave={() => hideAddToCartButton(product.id)}>
          <div>
            <div className='image-div'>
              { !product.inStock && <div className="out-of-stock-div">OUT OF STOCK</div> }
              { !disabled ? <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> : <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> }
              { product.attributes.length == 0 && onHover && product.hover && product.inStock && <img src={Common} alt="add-to-cart" onClick={() => addToCart(product)} className='add-to-cart-button'/>}
            </div>
            <p className={ !product.inStock ? 'out-of-stock' : "" }>{product.name}</p>
            <p className={ !product.inStock ? 'out-of-stock' : "" }><b>{product.brand}</b></p>
            <ChangeCurrencyLogic currency={currency} id={product.id}/>
            {/* { chooseCurrency(currency, product) } */}
            {/* Make sure I grey out ths price */}
          </div>
        </div>
      )
    }
}

export default ProductComponent;