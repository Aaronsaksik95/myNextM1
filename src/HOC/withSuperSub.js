import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import authService from "../services/auth.service";

const withSub = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verify, setVerify] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      authService
        .verifyToken(token)
        .then((data) => {
          if (data.verify) {
            if (data.superSub) {
              setVerify(true);
            }
            else {
              router.push("/browse");
            }
          }
          else {
            localStorage.removeItem("token");
            router.push("/");
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          router.push("/");
        });
    }, []);
    if (verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withSub;
