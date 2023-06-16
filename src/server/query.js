import {gql} from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query getProductsList {
    getProductsList {
        category
        colors
        id
        price
        productName
      }
  }
`;