import { PureComponent } from "react";
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { nanoid } from 'nanoid';
import { Interweave } from 'interweave';
import GET_PRODUCT from "../../graphql/getProduct";


class ProductDetail extends PureComponent {
  render() {
    const { id } = this.props.params;
    const { currency } = this.props;
    const chooseCurrency = (currency, product) => {
      if (currency === '$') {
        return (
          <div>
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        );
      } else if (currency === '£') {
        return (
          <div>
            <span>{product.prices[1].currency.symbol}</span>
            <span>{product.prices[1].amount}</span>
          </div>
        )
      } else if (currency === 'A$') {
        return (
          <div>
            <span>{product.prices[2].currency.symbol}</span>
            <span>{product.prices[2].amount}</span>
          </div>
        )
      } else if (currency === '¥') {
        return (
          <div>
            <span>{product.prices[3].currency.symbol}</span>
            <span>{product.prices[3].amount}</span>
          </div>
        )
      } else if (currency === '₽') {
        return (
          <div>
            <span>{product.prices[4].currency.symbol}</span>
            <span>{product.prices[4].amount}</span>
          </div>
        )
      }
      return null;
    };
    return (
      <Query
        key="yes"
        query={GET_PRODUCT}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, data}) => {
          if (loading) return null;
          return (
            <div>
              { data.product.gallery.map((image) => (
                <img src={image} alt={data.product.name} key={nanoid()}/>
              )) }
              <img src={data.product.gallery[0]} alt={data.product.name} />
              <div>
                <h3>{data.product.brand}</h3>
                <h3>{data.product.name}</h3>
                { data.product.category === 'clothes' && data.product.attributes.length > 0 &&
                  <div>
                    { data.product.attributes.map((item) => (
                      <div key={nanoid()}>
                        <h3>{item.name}</h3>
                        <div>
                          {item.items.map((itemAttribute) => (
                            <span key={nanoid()}>{itemAttribute.value}</span>
                          ))}
                        </div>
                      </div>
                    )) }
                    <p>PRICE</p>
                    { chooseCurrency( currency, data.product) }
                    <button type="buton">Add To Cart</button>
                    <Interweave content={data.product.description}/>
                  </div>
                }
                { data.product.category === 'tech' && data.product.attributes.length > 0 &&
                  <div>
                  { data.product.attributes.map((item) => (
                    <div key={nanoid()}>
                      { item.name === 'Color' &&
                        <div>
                          <h3>{item.name}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span key={nanoid()}>{value.value}</span>
                            ))}
                          </div>
                        </div>
                      }
                      { item.name === 'Capacity' &&
                        <div>
                          <h3>{item.name}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span key={nanoid()}>{value.value}</span>
                            ))}
                          </div>
                        </div>
                      }
                    </div>
                  )) }
                  <p>PRICE</p>
                  { chooseCurrency( currency, data.product) }
                  <button type="buton">Add To Cart</button>
                  <Interweave content={data.product.description}/>
                </div>
                }
              </div>
            </div>
          )
        }}
      </Query>
    )
  }

}

export default (props) => (
  <ProductDetail
    {...props}
    params={useParams()}
  />
);