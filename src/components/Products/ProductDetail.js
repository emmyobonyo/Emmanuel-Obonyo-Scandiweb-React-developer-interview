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
                <img src={image} />
              )) }
              <img src={data.product.gallery[0]} />
              <div>
                <h3>{data.product.brand}</h3>
                <h3>{data.product.name}</h3>
                { data.product.category == 'clothes' && data.product.attributes.length > 0 &&
                  <p>clothes</p>
                }
                { data.product.category == 'tech' && data.product.attributes.length > 0 &&
                  <p>Tech</p>
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