import { PureComponent } from 'react'
import ProductComponent from './ProductComponent'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import Common from '../../assets/images/Common.png'

class ProductItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data.category.products,
      onHover: false,
    }
  }

  showAddToCartButton = (id) => {
    const product = this.state.data.filter((item) => item.id === id)
    product[0].hover = true
    this.setState({
      onHover: true,
    })
  }

  hideAddToCartButton = (id) => {
    const product = this.state.data.filter((item) => item.id === id)
    product[0].hover = false
    this.setState({
      onHover: false,
    })
  }

  render() {
    const { disabled, addToCart, currency, name, value } = this.props
    let newValue = `#${value}`
    return name == null && value == null
      ? this.state.data.map((product) => (
          <div key={nanoid()}>
            {!product.inStock ? (
              <div>
                <ProductComponent
                  product={product}
                  disabled={disabled}
                  currency={currency}
                  showAddToCartButton={this.showAddToCartButton}
                  hideAddToCartButton={this.hideAddToCartButton}
                />
                {product.attributes.length === 0 &&
                  this.state.onHover &&
                  product.hover &&
                  product.inStock && (
                    <img
                      src={Common}
                      alt='add-to-cart'
                      onClick={() => addToCart(product)}
                      className='add-to-cart-button'
                    />
                  )}
              </div>
            ) : product.attributes.length === 0 ? (
              <div
                className='add-to-cart-product-div'
                onMouseEnter={() => this.showAddToCartButton(product.id)}
                onMouseLeave={() => this.hideAddToCartButton(product.id)}
              >
                <Link to={`/product/${product.id}`}>
                  <ProductComponent
                    product={product}
                    disabled={disabled}
                    currency={currency}
                    showAddToCartButton={this.showAddToCartButton}
                    hideAddToCartButton={this.hideAddToCartButton}
                  />
                </Link>
                {product.attributes.length === 0 &&
                  product.hover &&
                  product.inStock && (
                    <img
                      src={Common}
                      alt='add-to-cart'
                      onClick={() => addToCart(product)}
                      className='add-to-cart-button'
                    />
                  )}
              </div>
            ) : (
              <div className='add-to-cart-product-div'>
                <Link to={`/product/${product.id}`}>
                  <ProductComponent
                    product={product}
                    disabled={disabled}
                    currency={currency}
                    showAddToCartButton={this.showAddToCartButton}
                    hideAddToCartButton={this.hideAddToCartButton}
                  />
                  {product.attributes.length === 0 &&
                    this.state.onHover &&
                    product.hover &&
                    product.inStock && (
                      <img
                        src={Common}
                        alt='add-to-cart'
                        onClick={() => addToCart(product)}
                        className='add-to-cart-button'
                      />
                    )}
                </Link>
              </div>
            )}
          </div>
        ))
      : this.state.data.map((product) =>
          product.attributes.map((attribute) =>
            attribute.name === name
              ? attribute.items.map((item) =>
                  item.value === value || item.value === newValue ? (
                    <div key={nanoid()}>
                      {!product.inStock ? (
                        <div>
                          <ProductComponent
                            product={product}
                            disabled={disabled}
                            currency={currency}
                            showAddToCartButton={this.showAddToCartButton}
                            hideAddToCartButton={this.hideAddToCartButton}
                          />
                        </div>
                      ) : product.attributes.length === 0 ? (
                        <div
                          className='add-to-cart-product-div'
                          onMouseEnter={() =>
                            this.showAddToCartButton(product.id)
                          }
                          onMouseLeave={() =>
                            this.hideAddToCartButton(product.id)
                          }
                        >
                          <Link to={`/product/${product.id}`}>
                            <ProductComponent
                              product={product}
                              disabled={disabled}
                              currency={currency}
                              showAddToCartButton={this.showAddToCartButton}
                              hideAddToCartButton={this.hideAddToCartButton}
                            />
                          </Link>
                          {product.attributes.length === 0 &&
                            product.hover &&
                            product.inStock && (
                              <img
                                src={Common}
                                alt='add-to-cart'
                                onClick={() => addToCart(product)}
                                className='add-to-cart-button'
                              />
                            )}
                        </div>
                      ) : (
                        <div className='add-to-cart-product-div'>
                          <Link to={`/product/${product.id}`}>
                            <ProductComponent
                              product={product}
                              disabled={disabled}
                              currency={currency}
                              showAddToCartButton={this.showAddToCartButton}
                              hideAddToCartButton={this.hideAddToCartButton}
                            />
                            {product.attributes.length === 0 &&
                              this.state.onHover &&
                              product.hover &&
                              product.inStock && (
                                <img
                                  src={Common}
                                  alt='add-to-cart'
                                  onClick={() => addToCart(product)}
                                  className='add-to-cart-button'
                                />
                              )}
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    console.log(`no match ${item.value} and ${value}`)
                  )
                )
              : console.log('some stuff')
          )
        )
  }
}

export default ProductItem
