import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';
import GET_PRODUCTS from '../../graphql/getProducts';
import Common from '../../assets/images/Common.png'
import './Product.css'

class Product extends PureComponent {
  render() {
    const { category } = this.props.params;
    const { homepage, currency, addToCart, closeCurrencyOverlay } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === '$') {
        return (
          <div className="product-price">
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === '£') {
        return (
          <div className="product-price">
            <span>{product.prices[1].currency.symbol}</span>
            <span>{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency == 'A$') {
        return (
          <div className="product-price">
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency == '¥') {
        return (
          <div className="product-price">
            <span>{product.prices[3].currency.symbol}</span>
            <span>{product.prices[3].amount}</span>
          </div>
        )
      } else if (currency === '₽') {
        return (
          <div className="product-price">
            <span>{product.prices[4].currency.symbol}</span>
            <span>{product.prices[4].amount}</span>
          </div>
        )
      }
      return null;
    };
    return (
      <div className='products' onClick={()=>closeCurrencyOverlay()}>
        <h1 className='category'>{!homepage ? category : homepage}</h1>
        <div className='product-items'>
          <Query
            key="yes"
            query={GET_PRODUCTS}
            variables={{ input: { title: `${!category ? homepage : category}` } }}
            fetchPolicy="network-only"
          >
            {({ loading, data }) => {
              if (loading) return null;
              return data.category.products.map((product) => (
                <div key={product.id} className='product-item'>
                  <div>
                    <div className='image-div'>
                    <Link to={`/product/${product.id}`}><img className='product-image' src={product.gallery[0]} alt={`${product.name}`} /></Link>
                      { product.attributes.length > 0 && <img src={Common} alt="add-to-cart" onClick={() => addToCart(product)} className='add-to-cart-button'/>}
                    </div>
                    <p>{product.name}</p>
                    { chooseCurrency(currency, product) }
                  </div>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <Product
    {...props}
    params={useParams()}
  />
);
