import { PureComponent } from "react";
import { useParams } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { nanoid } from 'nanoid';
import { Interweave } from 'interweave';
import GET_PRODUCT from "../../graphql/getProduct";
import ChangeCurrencyLogic from "./changeCurrencyLogic";
import './ProductDetail.css'


class ProductDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
    }
  }

  changeImage = (src) => {
    this.setState({
      image: src
    })
  }

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
          return (
            <div className="product-detail" onClick={closeCurrencyOverlay}>
              <div className="product-detail-images">
                { data.product.gallery.map((image) => (
                  <img onClick={() => this.changeImage(image)} className="detail-page-thumnails" src={image} alt={data.product.name} key={nanoid()}/>
                )) }
              </div>
              <img src={ this.state.image || data.product.gallery[0]} alt={data.product.name} className="detail-page-image"/>
              <div className="detail-page-details">
                <h3 className="product-detail-brand">{data.product.brand}</h3>
                <h3 className="product-detail-name">{data.product.name}</h3>
                { data.product.category === 'clothes' && data.product.attributes.length > 0 &&
                  <div>
                    { data.product.attributes.map((item) => (
                      <div key={nanoid()}>
                        <h4 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h4>
                        <div>
                          {item.items.map((itemAttribute) => (
                            <span className="product-detail-items" key={nanoid()}>{itemAttribute.value}</span>
                          ))}
                        </div>
                      </div>
                    )) }
                    <h4 style={{marginBottom: 10, marginTop: 30}}>PRICE</h4>
                    <ChangeCurrencyLogic currency={currency} id={id}/>
                    <button onClick={() => addToCart(data.product)} className="detail-page-button" style={{ marginTop: 20, marginBottom: 20}} type="buton">ADD TO CART</button>
                    <Interweave content={data.product.description}/>
                  </div>
                }
                { data.product.category === 'tech' && data.product.attributes.length > 0 &&
                  <div>
                  { data.product.attributes.map((item) => (
                    <div key={nanoid()}>
                      { item.name === 'Color' &&
                        <div>
                          <h3 style={{ marginBottom: 10, marginTop: 40 }}>{`${item.name.toUpperCase()}:`}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span className="swatches" key={nanoid()} style={{ backgroundColor: value.value, }}></span>
                            ))}
                          </div>
                        </div>
                      }
                      { item.name === 'Capacity' &&
                        <div>
                          <h3>{item.name}</h3>
                          <div>
                            {item.items.map((value) => (
                              <span className="detail-page-capacity" key={nanoid()}>{value.value}</span>
                            ))}
                          </div>
                        </div>
                      }
                    </div>
                  )) }
                  <h4>PRICE</h4>
                  <ChangeCurrencyLogic currency={currency} id={id}/>
                  <button onClick={() => addToCart(data.product)} className="detail-page-button" style={{ marginTop: 20, marginBottom: 20}}>ADD TO CART</button>
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