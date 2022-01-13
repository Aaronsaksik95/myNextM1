import React from 'react';

import { getMovies } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import nextConfig from "../../../next.config";

const Index = () => {
    const { loading, error, data } = useQuery(getMovies);
    
    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }

    console.log(data);

    return (
        <div className="shop__grid">
            {
                data.getMovies.map((movie) => (
                    <div className="movie__card" key={movie._id}>
                        {movie.name}
                        {movie.price}
                    </div>
                ) )
            }
        </div>
    );
}

export default Index;
