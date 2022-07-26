import { PureComponent } from "react";
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import GET_PRODUCT from "../../graphql/getProduct";
import ProductDetailComponent from "./ProductDetailComponent";
import './ProductDetail.css'


class ProductDetail extends PureComponent {
  render() {
    const { id } = this.props.params;
    const { currency, addToCart, closeCurrencyOverlay } = this.props;
    return (
      <Query
        key="yes"
        query={GET_PRODUCT}
        variables={{ id }}
        fetchPolicy="network-only"
      >
        {({ loading, data}) => {
          if (loading) return null;
          return <ProductDetailComponent data={data} currency={currency} addToCart={addToCart} closeCurrencyOverlay={closeCurrencyOverlay} id={id}/>
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