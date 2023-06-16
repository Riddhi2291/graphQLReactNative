import {gql} from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query getProductsList {
    getProductsList {
      category
      colors
      id
      price
      productName
      imgPath
    }
  }
`;

export const VIEW_PRODUCT = gql`
    query productDetail($getProductId: ID!) {
        getProduct(id: $getProductId) {
        productName
        category
        colors
        imgPath
        price
        id
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation addProduct($productName: String!, $category: String, $price: Int, $colors: [String!], $imgPath: String) {
        addProduct(productName: $productName, category: $category, price: $price, colors: $colors, imgPath: $imgPath)
    }
`;

export const EDIT_PRODuCT = gql`
    mutation editProduct($productName: String!, $category: String!, $price: Int!, $colors: [String!], $imgPath: String!) {
        updateProduct(productName: $productName, category: $category, price: $price, colors: $colors, imgPath: $imgPath)
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($deleteProductId: ID!) {
        deleteProduct(id: $deleteProductId)
    }
`;

// export const deleteProduct = useQuery(DELETE_USER, { variables: { id: 8 }});
// export const editProduct = useQuery(EDIT_USER, { variables: { id: 9, name: "Username", email: "email", job_title: "job" }});
// export const addProduct = useQuery(ADD_USER, { variables: { name: "Username", email: "email", job_title: "job" }});
