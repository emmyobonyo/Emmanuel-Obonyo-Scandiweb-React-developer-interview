import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { nanoid } from 'nanoid';
import { Link, Routes, Route } from 'react-router-dom';
import GET_CATEGORIES from '../../graphql/getCategories';
import Product from '../Products/Product';
import ProductDetail from '../Products/ProductDetail';
import logo from '../../assets/images/a-logo.png';
import cart from '../../assets/images/cart.png';
import GET_CURRENCIES from '../../graphql/getCurrencies';
import Cart from '../carts/Cart';
import './Header.css';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      symbol: '$',
      cartItems: [],
      itemInCart: false,
    };
  }

  addToCart = (product) => {
    const alreadyInCart = this.state.cartItems.some(item => item.id === item.id)
    if( alreadyInCart ) {
      this.setState({ itemInCart: true })
      setTimeout(() => {
        this.setState({ itemInCart: false });
      }, 3000)
    } else {
      product.count = 1;
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, product]
      }))
    }
  }

  removeFromCart = (id) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.filter(item => item.id !== id)
    }))
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({ currency: value, symbol: value });
  }

  render() {
    console.log(this.state)
    const { currency, symbol } = this.state;
    return (
      <div>
        <nav>
          <div className="nav-ul">
            <Query query={GET_CATEGORIES}>
              { ({ loading, data }) => {
                if (loading) return null;
                return data.categories.map((category) => (
                  <Link to={`/${category.name}`} key={nanoid()} className="nav-li">{category.name.toUpperCase()}</Link>
                ));
              }}
            </Query>
          </div>
          <Link to='/'><img src={logo} alt="logo" /></Link>
          <div>
            {/* <Currency /> */}
            <select id="currency" onChange={this.onChange} value={symbol}>
              <Query query={GET_CURRENCIES}>
                { ({ loading, data }) => {
                  if (loading) return null;
                  return data.currencies.map((currency) => (
                    <option
                      key={nanoid()}
                      value={currency.label}
                    >
                      {`${currency.symbol} ${currency.label}`}
                    </option>
                  ));
                }}
              </Query>
            </select>
            <Link to='/cart'><img src={cart} alt="cart" /></Link>
          </div>
        </nav>
        { this.state.itemInCart && <p>Item already in cart</p>}
        <Routes>
          <Route path="/" element={<Product homepage="all" currency={currency} addToCart={this.addToCart}/>} />
          <Route path="/:category" element={<Product currency={currency} addToCart={this.addToCart}/>} />
          <Route path="/product/:id" element={ <ProductDetail currency={currency} addToCart={this.addToCart} />} />
          <Route path="/cart" element={ <Cart /> }/>
        </Routes>
      </div>
    );
  }
}

export default Header;
