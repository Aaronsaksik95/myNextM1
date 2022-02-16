import nextConfig from "../../next.config"

export default {
    async addWish(movie, token) {
        console.log(token, movie)
        return await fetch(`${nextConfig.env.API_URL}wish/`, {
            method: "POST",
            body: JSON.stringify({
                movie: movie
            }),
            headers: {
                "authorization": token,
                "content-type": "application/json"
            },
        }).then((res) => res.json())
    },

    async getWish(token) {
        return await fetch(`${nextConfig.env.API_URL}wish/`, {
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
        }).then((res) => res.json())
    },

    async verifyMovieExist(movie, token) {
        return await fetch(`${nextConfig.env.API_URL}wish/verify/${movie}`, {
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
        }).then((res) => res.json())
    },

    async deleteOneMovie(movie, token) {
        return await fetch(`${nextConfig.env.API_URL}wish/`, {
            method: "PUT",
            body: JSON.stringify({
                movie: movie
            }),
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
        }).then((res) => res.json())
    },
}