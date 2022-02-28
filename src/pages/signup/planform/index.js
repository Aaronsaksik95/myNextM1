import React, { useEffect, useState } from "react";
import stripeService from "../../../services/stripe.service";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import withNotSub from "../../../HOC/withNotSub";

const Index = () => {
    const router = useRouter()
    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState("")

    const changeBool = (priceId) => {
        setPrice(priceId)
    }

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
        <div className={styles.planform}>
            <p className={styles.state}>ÉTAPE <strong>2</strong> SUR <strong>3</strong></p>
            <h2 className={styles.title__info}> Sélectionnez le forfait qui vous convient</h2>
            <p className={styles.info}> <span className={styles.info_red}>✓</span> Regardez autant que vous voulez. Sans publicité.</p>
            <p className={styles.info}> <span className={styles.info_red}>✓</span> Recommandations personnalisées.</p>
            <p className={styles.info}>  <span className={styles.info_red}>✓</span> Changez ou annulez votre forfait à tout moment.</p>
            <div className={styles.line_array}>
                <div className={styles.title}>
                </div>
                {
                    prices.map((price) => (
                        <button onClick={() => changeBool(price.id)} className={styles.pres_sub} key={price.id}>
                            <p>{price.metadata.name}</p>
                        </button>
                    ))
                }
            </div>
            <div className={styles.line_array}>
                <div className={styles.title}>
                    <p>Abonnement mensuel</p>
                </div>
                {
                    prices.map((price) => (
                        <div key={price.id}>
                            <p>
                                {price.unit_amount / 100}.00 €
                            </p>
                        </div>

                    ))
                }
            </div>
            <div className={styles.line_array}>
                <div className={styles.title}>
                    <p>Disponibilité</p>
                </div>
                <div>
                    <p>En illimité + nouveauté</p>
                </div>
                <div>
                    <p>En illimité</p>
                </div>
            </div>
            <div className={styles.line_array}>
                <div className={styles.title}>
                    <p>Qualité vidéo</p>
                </div>
                <div>
                    <p>Optimal</p>
                </div>
                <div>
                    <p>Optimal</p>
                </div>
            </div>
            <div className={styles.line_array}>
                <div className={styles.title}>
                    <p>Netflix sur votre TV, ordinateur, smartphone et tablette</p>
                </div>
                <div>
                    <p className={styles.valide}>✓</p>
                </div>
                <div>
                    <p className={styles.valide}>✓</p>
                </div>
            </div>
            <div className={styles.comment}>
                <p>La disponibilité de la HD (720p), de la Full HD (1080p), de l&apos;Ultra HD (4K) et de la HDR dépend de votre connexion Internet et des capacités de l&apos;appareil. Tous les contenus ne sont pas disponibles dans toutes les résolutions. Pour en savoir plus, veuillez consulter nos Conditions d&apos;utilisation.</p>
                <p>Seules les personnes qui vivent avec vous peuvent utiliser votre compte. Regardez Netflix en simultané sur 4 appareils différents avec le forfait Premium, sur 2 avec le forfait Standard, et sur 1 avec le forfait Essentiel.</p>
            </div>

            <button className="btn btn-red-long" onClick={() => { router.push(`/signup/payment/${price}`) }}>
                Suivant
            </button>
        </div>
    );
};

export default withNotSub(Index);
