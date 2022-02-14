import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import authService from "../services/auth.service";

const withNotSub = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verify, setVerify] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setTimeout(() => {
        authService
          .refreshToken(token)
          .then((data) => {
            if (data.verify) {
              localStorage.setItem("token", data.token);
              if (!data.isSub) {
                setVerify(false);
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
      }, 2000)

    }, []);
    if (!verify) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withNotSub;
