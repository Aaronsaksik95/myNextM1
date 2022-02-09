import gql from "graphql-tag";

export const getMovies = gql`
    query getMovies($category: ID){
        getMovies(category:$category){
            id
            name
            image
            description
        }
    }
`;

export const getSearchMovie = gql`
    query getSearchMovie($name: String!){
        getSearchMovie(name:$name){
            id
            name
            image
            description
        }
    }
`;

export const getMovie = gql`
    query getMovie($id: ID!){
        getMovie(id:$id){
            id
            name
            image
            description
        }
    }
`;