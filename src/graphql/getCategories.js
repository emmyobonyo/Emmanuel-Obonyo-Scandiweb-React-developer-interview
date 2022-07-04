import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
    {
        categories {
            name
        }
    }
`;

export default GET_CATEGORIES;
