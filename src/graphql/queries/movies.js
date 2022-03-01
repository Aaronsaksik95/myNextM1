import gql from "graphql-tag";

export const getMovies = gql`
    query getMovies($category: ID, $superSub: Boolean){
        getMovies(category:$category, superSub:$superSub){
            id
            name
            image
            video
            actor
            year
            time
            description
            category{name id}
        }
    }
`;

export const getSearchMovie = gql`
    query getSearchMovie($name: String!, $superSub: Boolean){
        getSearchMovie(name:$name, superSub:$superSub){
            id
            name
            image
            video
            actor
            year
            time
            description
            superSub
            category{name id}
        }
    }
`;

export const getMovie = gql`
    query getMovie($id: ID!){
        getMovie(id:$id){
            id
            name
            image
            video
            year
            actor
            time
            description
            category{name id}
        }
    }
`;

export const getMovieNewest = gql`
    query getMovieNewest($category: ID, $superSub: Boolean){
        getMovieNewest(category:$category, superSub:$superSub){
            id
            name
            image
            video
            actor
            year
            time
            description
            category{name id}
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
        $superSub: Boolean,
        $category: [ID], 
        $actor: [String]) {
    createMovie(name: $name, time: $time, image: $image, video: $video, description: $description, year: $year, superSub: $superSub, category: $category, actor: $actor) {
        name
        time
        image
        video
        description
        year
        superSub
        category{name}
        actor
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(id: $id) {
        message
    }
  }
`;