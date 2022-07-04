import gql from 'graphql-tag';

const GET_CURRENCIES = gql`
  {
    currencies {
    label
    symbol
    }
  }
`;

export default GET_CURRENCIES;
