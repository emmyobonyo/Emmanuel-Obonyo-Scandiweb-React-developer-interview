import gql from 'graphql-tag';

const GET_ATTRIBUTES = gql`
query category($input: CategoryInput!) {
  category(input: $input) {
    products {
      attributes {
        id
        name
        type
        items {
          value
          id
          displayValue
        }
      }
    }
  }
}
`;

export default GET_ATTRIBUTES;
