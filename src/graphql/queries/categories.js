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