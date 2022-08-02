import { PureComponent } from 'react';
import ChangeCurrencyLogic from './changeCurrencyLogic';

class ProductComponent extends PureComponent {
    render() {
      const {product, disabled, currency} = this.props;
      return (
        <div key={product.id} className='product-item'>
          <div>
            <div className='image-div'>
              { !product.inStock && <div className="out-of-stock-div">OUT OF STOCK</div> }
              { !disabled ? <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> : <img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /> }
            </div>
            <p className={ !product.inStock ? 'out-of-stock' : "" }>{product.name}</p>
            <p className={ !product.inStock ? 'out-of-stock' : "" }><b>{product.brand}</b></p>
            <ChangeCurrencyLogic currency={currency} id={product.id}/>
          </div>
        </div>
      )
    }
}

export default ProductComponent;