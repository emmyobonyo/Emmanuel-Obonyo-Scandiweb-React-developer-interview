import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
query category($input: CategoryInput!) {
  category(input: $input) {
    products {
      id
      inStock
      name
      gallery
      brand
      category
      attributes {
        name
        items {
          value
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
}
`;

export default GET_PRODUCTS;
