import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';
import GET_PRODUCTS from '../../graphql/getProducts';
import Common from '../../assets/images/Common.png'

class Product extends PureComponent {
  render() {
    const { category } = this.props.params;
    const { homepage, currency } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === 'USD') {
        return (
          <div>
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === 'GBP') {
        return (
          <div>
            <span>{product.prices[1].currency.symbol}</span>
            <span>{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency == 'AUD') {
        return (
          <div>
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency == 'JPY') {
        return (
          <div>
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency === 'RUB') {
        return (
          <div>
            <span>{product.prices[3].currency.symbol}</span>
            <span>{product.prices[3].amount}</span>
          </div>
        )
      }
      return null;
    };
    return (
      <div>
        <h1>{category}</h1>
        <Query
          key="yes"
          query={GET_PRODUCTS}
          variables={{ input: { title: `${!category ? homepage : category}` } }}
          fetchPolicy="network-only"
        >
          {({ loading, data }) => {
            if (loading) return null;
            return data.category.products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div>
                  <img src={product.gallery[0]} alt={`${product.name}`} />
                  { product.gallery.length > 1 && <img src={Common} alt="add-to-cart" />}
                  <p>{product.name}</p>
                  { chooseCurrency(currency, product) }
                </div>
              </Link>
            ));
          }}
        </Query>
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
