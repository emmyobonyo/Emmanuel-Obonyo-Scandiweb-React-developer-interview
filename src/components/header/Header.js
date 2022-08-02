import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { nanoid } from 'nanoid';
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import GET_CATEGORIES from '../../graphql/getCategories';
import Product from '../Products/Product';
import ProductDetail from '../Products/ProductDetail';
import logo from '../../assets/images/a-logo.png';
import cart from '../../assets/images/cart.png';
import GET_CURRENCIES from '../../graphql/getCurrencies';
import Cart from '../carts/Cart';
import CartOverlay from '../carts/CartOverlay';
import downIcon from '../../assets/images/down.png';
import upIcon from '../../assets/images/up.png';
import './Header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currency: localStorage.getItem('symbol') || '$',
      cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
      itemInCart: false,
      itemAddedToCart: false,
      total: '$',
      quantity: 0,
      cartOverlay: false,
      currencyOverlay: false,
      disabled: false,
    };
  }

  componentDidUpdate() {
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
  }

  addToCart = (product) => {
    const alreadyInCart = this.state.cartItems.some(item => item.attributes === product.attributes)
    if( alreadyInCart ) {
      this.setState({ itemInCart: true })
      setTimeout(() => {
        this.setState({ itemInCart: false });
      }, 3000)
    } else {
      product.count = 1;
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, product],
        itemAddedToCart: true
      }))
      setTimeout(() => {
        this.setState({ itemAddedToCart: false})
      }, 3000)
    }
  }

  removeFromCart = (id) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.filter(item => item.id !== id)
    }))
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
  }

  onChange = (event) => {
    const { dataset } = event.target;
    console.log(dataset.value)
    localStorage.setItem("symbol", `${dataset.value}`)
    this.setState({ currency: dataset.value, currencyOverlay: false});
  }

  getTotal = () => {
    let total = 0
    this.state.cartItems.map((item) => {
      item.prices.map((price) => {
        if(price.currency.symbol == this.state.currency){
          total += price.amount * item.count
        }
      })
    })
    this.setState({
      total: total
    })
  }

  increment = (items) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map((item) => {
        return item.attributes === items.attributes ? {...item, count: item.count + 1} : item
      })
    }))
  }

  decrement = (items, count) => {
    if (count < 2) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.filter(item => item.attributes !== items.attributes)
      }))
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map((item) => {
          return item.attributes === items.attributes ? {...item, count: item.count - 1} : item
        })
      }))
    }
  }

  getQuantity = () => {
    let quantity = 0
    for(let i = 0; i<this.state.cartItems.length; i++) {
      const count = this.state.cartItems[i].count
      quantity += count
    }
    this.setState({
      quantity: quantity
    })
  }

  render() {
    console.log(this.state)
    const { onHover, onLeaveHover, hover} = this.props;
    this.getTotal();
    this.getQuantity();
    const showCartOverlay = () => {
      this.setState({
        cartOverlay: true,
        disabled: true,
      })
    }
    const hideCartOverlay = () => {
      this.setState({
        cartOverlay: false,
        disabled: false,
      })
    }
    const onMouseEnter = () => {
      if (this.state.cartOverlay) {
        hideCartOverlay()
        onLeaveHover()
      } else {
        showCartOverlay()
        onHover()
      }
    }
    const closeCurrencyOverlay = (e) => {
      if( this.state.cartOverlay ) {
        onMouseEnter()
      }
      this.setState({
        currencyOverlay: false,
      })
      console.log('currency')
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
    const onClickCartOverlay = (e) => {
      console.log('close')
      this.setState({
        cartOverlay: true,
      })
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
    const changeCurrencyOverlay = (e) => {
      if (this.state.cartOverlay) {
        onMouseEnter()
      }
      this.setState(prevState => ({
        currencyOverlay: !prevState.currencyOverlay,
      }))
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
    console.log(this.state)
    const { currency } = this.state;
    return (
      <div className='header-div' onClick={closeCurrencyOverlay}>
        <nav>
          <div className="nav-ul">
            <Query query={GET_CATEGORIES}>
              { ({ loading, data }) => {
                if (loading) return null;
                return data.categories.map((category) => (
                  <NavLink to={`/${category.name}`} key={nanoid()} className="nav-li" activeClassName='active'>{category.name.toUpperCase()}</NavLink>
                ));
              }}
            </Query>
          </div>
          <Link to='/'><img src={logo} alt="logo" /></Link>
          <div className='nav-right'>
            <div className='currency-div'>
              <div onClick={changeCurrencyOverlay}>
                <span><b>{ `${ this.state.currency }` }</b></span>
                <img className='currency-icon' src={ this.state.currencyOverlay ? downIcon : upIcon }/>
              </div>
              { this.state.currencyOverlay &&
              <ul className='ul'>
                <Query query={GET_CURRENCIES}>
                  { ({ loading, data }) => {
                    if (loading) return null;
                    return data.currencies.map((currency) => (
                      <li className='li'
                        key={nanoid()}
                        data-value={currency.symbol}
                        onClick={this.onChange}
                      >
                        {`${currency.symbol} ${currency.label}`}
                      </li>
                    ));
                  }}
                </Query>
              </ul>
              }
            </div>
            <div className='cart-icons' onClick={onMouseEnter}>
              {this.state.cartItems.length > 0 && <div className='icon-quantity'>{this.state.quantity}</div>}
              <img src={cart} alt="cart" className="cart" />
            </div>
          </div>
        </nav>
        <div className={hover ? 'hover' : ''}></div>
        { this.state.cartOverlay ?  <CartOverlay cartItems={this.state.cartItems} currency={currency} increment={this.increment} decrement={this.decrement} total={this.state.total} onMouseOver={showCartOverlay} quantity={this.state.quantity} onClickCartOverlay={onClickCartOverlay} closeCurrencyOverlay={closeCurrencyOverlay}/> : ''}
        { this.state.itemInCart ? <p className='itemInCartParagraph'>Item already in cart</p> : this.state.itemAddedToCart && <p className='itemAddedToCart'>Item Added to the cart </p>}
        <Routes>
          <Route path="/" element={<Product homepage="all" currency={currency} addToCart={this.addToCart} closeCurrencyOverlay={closeCurrencyOverlay} disabled={this.state.disabled} />} />
          <Route path="/:category" element={<Product currency={currency} addToCart={this.addToCart} closeCurrencyOverlay={closeCurrencyOverlay} disabled={this.state.disabled} />}/>
          <Route path="/product/:id" element={ <ProductDetail currency={currency} addToCart={this.addToCart} closeCurrencyOverlay={closeCurrencyOverlay}/>} />
          <Route path="/cart" element={ <Cart cartItems={this.state.cartItems} currency={currency} increment={this.increment} decrement={this.decrement} total={this.state.total} closeCurrencyOverlay={closeCurrencyOverlay} quantity={this.state.quantity} /> }/>
        </Routes>
      </div>
    );
  }
}

export default Header;
