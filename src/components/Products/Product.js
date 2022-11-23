import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import GET_PRODUCTS from '../../graphql/getProducts';
import ProductItem from './ProductItem';
import Filter from './Filter';
import './Product.css'

class Product extends PureComponent {
  render() {
    const { category } = this.props.params;
    const { homepage, currency, addToCart, closeCurrencyOverlay, disabled } = this.props;
    return (
      <div className='products' onClick={()=>closeCurrencyOverlay()}>
        <h1 className='category'>{!homepage ? category : homepage}</h1>
        <div className='product-listing-page'>
          <div className='product-listing-filter'>
            <Filter />
          </div>
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
      </div>
    );
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
  <Product
    {...props}
    params={useParams()}
  />
);
