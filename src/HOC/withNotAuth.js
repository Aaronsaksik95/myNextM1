import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import authService from "../services/auth.service";

const withNotAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [verify, setVerify] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem("token");
            authService
                .verifyToken(token)
                .then((data) => {
                    if (!data.verify) {
                        localStorage.removeItem("token");
                        setVerify(false);
                    } else {
                        router.push("/browse");
                    }
                })
                .catch((err) => {
                    router.push("/browse");
                });
        }, []);
        if (!verify) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withNotAuth;
