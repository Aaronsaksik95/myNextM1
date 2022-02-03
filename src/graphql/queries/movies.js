import gql from "graphql-tag";

export const getMovies = gql`
    query {getMovies{id,name,image,description}}
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