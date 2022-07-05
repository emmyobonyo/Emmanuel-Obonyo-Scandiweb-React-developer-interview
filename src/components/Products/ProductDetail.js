import { PureComponent } from "react";
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import GET_PRODUCT from "../../graphql/getProduct";


class ProductDetail extends PureComponent {
  render() {
    const { id } = this.props.params;

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
                <img src={image} alt={data.product.name} />
              )) }
              <img src={data.product.gallery[0]} alt={data.product.name} />
              <div>
                <h3>{data.product.brand}</h3>
                <h3>{data.product.name}</h3>
                { data.product.category === 'clothes' && data.product.attributes.length > 0 &&
                  <div>
                    { data.product.attributes.map((item) => (
                      <div>
                        <h3>{item.name}</h3>
                        <div>
                          {item.items.map((itemAttribute) => (
                            <span>{itemAttribute.value}</span>
                          ))}
                        </div>
                      </div>
                    )) }
                  </div>
                }
                { data.product.category === 'tech' && data.product.attributes.length > 0 &&
                  <div>
                  { data.product.attributes.map((item) => (
                    <div>
                      { item.name === 'Color' &&
                        <div>
                          <h3>{item.name}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span>{value.value}</span>
                            ))}
                          </div>
                        </div>
                      }
                      { item.name === 'Capacity' &&
                        <div>
                          <h3>{item.name}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span>{value.value}</span>
                            ))}
                          </div>
                        </div>
                      }
                      <p>PRICE</p>
                    </div>
                  )) }
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