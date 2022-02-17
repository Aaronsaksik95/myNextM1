import gql from "graphql-tag";

export const getCategories = gql`
    query {getCategories{id,name}}
`;

export const getCategorie = gql`
    query getCategorie($id: ID!){
        getCategorie(id:$id){
            id
            name
        }
    }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory(
        $name: String) {
    createCategory(name: $name) {
        name
    }
  }
`;