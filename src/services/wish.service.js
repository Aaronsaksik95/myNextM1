import nextConfig from "../../next.config"

export default {
    async addWish(movie, token) {
        return await fetch(`${nextConfig.env.API_URL}wish/`, {
            method:"POST",
            body:{
                movie: movie
            },
            headers: {
                "content-type": "application/json",
                "authorization": token
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

    async deleteOneMovie(movie, token) {
        return await fetch(`${nextConfig.env.API_URL}wish/`, {
            method: "PUT",
            body:{
                movie: movie
            },
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
        }).then((res) => res.json())
    },
}