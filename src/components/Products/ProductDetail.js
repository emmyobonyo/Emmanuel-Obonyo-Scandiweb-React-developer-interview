import { PureComponent } from "react";
import { useParams } from 'react-router-dom';

class ProductDetail extends PureComponent {
  render() {
    const { id } = this.props.params;

    return (
      <h1>{id}</h1>
    )
  }

}

export default (props) => (
  <ProductDetail
    {...props}
    params={useParams()}
  />
);