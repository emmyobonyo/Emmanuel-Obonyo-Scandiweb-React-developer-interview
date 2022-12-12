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
    const getURLParamsHandler = () => {
      const queryString = window.location.search
      if (queryString) {
        const urlParams = new URLSearchParams(queryString)
        const name = urlParams.get('name')
        const value = urlParams.get('value')
        console.log(`This is the ${value}`)
        this.setState({ name, nameValue: value })
      } else {
        const name = null
        const value = null
        this.setState({ name, nameValue: value })
      }
    }
    getURLParamsHandler()
    const changeProductState = (e) => {
      let value = e.target.value || e.target.id
      let newValue
      if (value.charAt(0) === '#') {
        console.log('yes')
        newValue = value.substring(1)
      } else {
        newValue = value
      }
      console.log(value)
      const key = e.target.parentElement.firstChild.innerText
      if (!category) {
        this.props.navigate(`/all/?name=${key}&value=${newValue}`)
      } else {
        this.props.navigate(`/${category}/?name=${key}&value=${newValue}`)
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
