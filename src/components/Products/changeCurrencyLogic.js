import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { nanoid } from 'nanoid';
import GET_PRODUCT from '../../graphql/getProduct';

class ChangeCurrencyLogic extends PureComponent {
  render() {
    const { currency, id } = this.props
    return (
      <Query
        key="no"
        query={GET_PRODUCT}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, data }) => {
          if (loading) return null;
          return (
            <div>
              {data.product.prices.map((price) => (
                <div key={nanoid()}>
                  {price.currency.symbol === currency &&
                  <div className="product-price">
                    <span>{currency}</span>
                    <span>{price.amount}</span>
                  </div>
                  }
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ChangeCurrencyLogic;