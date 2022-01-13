import nextConfig from "../../next.config"

export default {
    register(user) {
        return fetch(`${nextConfig.env.API_URL}users/register`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }).then((res) => res.json())
    },
    login(user) {
        return fetch(`${nextConfig.env.API_URL}users/login`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }).then((res) => res.json())
    },
    getUser(token) {
        return fetch(`${nextConfig.env.API_URL}users/get-user`, {
            headers: {
                "authorization":token
            }
        })
        .then(res => res.json())
    },
    updateUser(token, user) {
        return fetch(`${nextConfig.env.API_URL}users/update-user`, {
            method: "PUT",
            headers: {
                "authorization": token,
                "content-type":"application/json"
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
    },
    verifyToken(token) {
        return fetch(`${nextConfig.env.API_URL}users/verifytoken`, {
            headers: {
                "authorization":token
            }
        })
        .then(res => res.json())
    }
}