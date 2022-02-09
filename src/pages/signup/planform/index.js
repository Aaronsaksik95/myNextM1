import React, { useEffect, useState } from "react";
import stripeService from "../../../services/stripe.service";
import Link from 'next/link'
import withNotSub from "../../../HOC/withNotSub";

const Index = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        stripeService
            .getPrice(token)
            .then((prices) => {
                setPrices(prices.prices.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {console.log(prices[0])}
            {
                prices.map((price) => (
                    <div>
                        <Link href={`/signup/payment/${price.id}`}>
                            <a>Pack</a>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default withNotSub(Index);
