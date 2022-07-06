import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
query category($input: CategoryInput!) {
  category(input: $input) {
    products {
      id
      name
      gallery
      attributes {
        name
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
