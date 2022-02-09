import nextConfig from "../../next.config"

export default {
    getPrice(token) {
        return fetch(`${nextConfig.env.API_URL}stripe/prices/`, {
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
        }).then((res) => res.json())
    }
}