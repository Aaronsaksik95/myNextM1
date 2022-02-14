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

export const CREATE_MOVIE = gql`
  mutation createMovie(
        $name: String, 
        $time: Int, 
        $image: String, 
        $video: String, 
        $description: String, 
        $year: Int, 
        $category: [ID], 
        $actor: [String]) {
    createMovie(name: $name, time: $time, image: $image, video: $video, description: $description, year: $year, category: $category, actor: $actor) {
        name
        time
        image
        video
        description
        year
        category{name}
        actor
    }
  }
`;