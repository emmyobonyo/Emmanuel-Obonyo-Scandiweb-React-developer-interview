import { PureComponent } from 'react'
import { withRouter } from './withRouter'
import { useParams } from 'react-router-dom'
import { Query } from '@apollo/client/react/components'
import GET_PRODUCTS from '../../graphql/getProducts'
import ProductItem from './ProductItem'
import Filter from './Filter'
import './Product.css'

class Product extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      stateChanged: false,
      name: null,
      nameValue: null,
    }
  }

  render() {
    // console.log(this.state.nameVlaue)
    const changeProductState = (e) => {
      const value = e.target.value
      const key = e.target.parentElement.firstChild.innerText
      if (!category) {
        this.props.navigate(`/all/?${key}=${value}`)
      } else {
        this.props.navigate(`/${category}/?${key}=${value}`)
        this.setState({ name: key, nameValue: value })
      }
    }
    console.log(this.state)
    const { category } = this.props.params
    const { homepage, currency, addToCart, closeCurrencyOverlay, disabled } =
      this.props
    return (
      <div
        className='products'
        onClick={() => closeCurrencyOverlay()}
      >
        <h1 className='category'>{!homepage ? category : homepage}</h1>
        <div className='product-listing-page'>
          <div className='product-listing-filter'>
            <Filter changeProductState={changeProductState} />
          </div>
          <div className='product-items'>
            <Query
              key='yes'
              query={GET_PRODUCTS}
              variables={{
                input: { title: `${!category ? homepage : category}` },
              }}
              fetchPolicy='network-only'
            >
              {({ loading, data }) => {
                if (loading) return null
                console.log(data)
                return (
                  <ProductItem
                    data={data}
                    disabled={disabled}
                    addToCart={addToCart}
                    currency={currency}
                    name={this.state.name}
                    value={this.state.nameValue}
                  />
                )
              }}
            </Query>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter((props) => (
  <Product
    {...props}
    params={useParams()}
  />
))
