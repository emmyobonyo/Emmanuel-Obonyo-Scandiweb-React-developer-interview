import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import GET_PRODUCTS from '../../graphql/getProducts';
import ProductItem from './ProductItem';
import './Product.css'

class Product extends PureComponent {
  render() {
    const { category } = this.props.params;
    const { homepage, currency, addToCart, closeCurrencyOverlay, disabled } = this.props;
    // const chooseCurrency = (currency, product) => {
    //   if (currency === '$') {
    //     return (
    //       <div className="product-price">
    //         <span>{product.prices[0].currency.symbol}</span>
    //         <span>{product.prices[0].amount}</span>
    //       </div>
    //     );
    //   } else if (currency === '£') {
    //     return (
    //       <div className="product-price">
    //         <span>{product.prices[1].currency.symbol}</span>
    //         <span>{product.prices[1].amount}</span>
    //       </div>
    //     )
    //   } else if (currency == 'A$') {
    //     return (
    //       <div className="product-price">
    //         <span>{product.prices[2].currency.symbol}</span>
    //         <span>{product.prices[2].amount}</span>
    //       </div>
    //     )
    //   } else if (currency == '¥') {
    //     return (
    //       <div className="product-price">
    //         <span>{product.prices[3].currency.symbol}</span>
    //         <span>{product.prices[3].amount}</span>
    //       </div>
    //     )
    //   } else if (currency === '₽') {
    //     return (
    //       <div className="product-price">
    //         <span>{product.prices[4].currency.symbol}</span>
    //         <span>{product.prices[4].amount}</span>
    //       </div>
    //     )
    //   }
    //   return null;
    // };
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
              return <ProductItem data={data} disabled={disabled} addToCart={addToCart} currency={currency}/>
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
