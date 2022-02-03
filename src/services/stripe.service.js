import nextConfig from "../../next.config"

export default {
    createSession(body) {
        return fetch(`${nextConfig.env.API_URL}checkout/`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => res.json())
    }
}