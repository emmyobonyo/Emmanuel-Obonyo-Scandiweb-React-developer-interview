import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query product($id : String!) {
    product(id : $id) {
      id
      name
      gallery
      category
      brand
      description
      attributes {
        id
        name
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`
export default GET_PRODUCT;