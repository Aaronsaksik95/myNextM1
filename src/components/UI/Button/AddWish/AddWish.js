import React, { useState, useEffect } from 'react';
import styles from "./AddWish.module.scss";
import wishService from '../../../../services/wish.service'
import valide from '../../../../../public/valide.png'


function AddWish(props) {
    const [exist, setExist] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        wishService
            .verifyMovieExist(props.id, token)
            .then((data) => {
                setExist(data.exist)
            })
    }, [])

    const addMovieWish = (movie) => {
        const token = localStorage.getItem("token")
        wishService
            .addWish(movie, token)
            .then((data) => {
                if (data.addWish) {
                    setExist(true)
                }
            })
    }

    const deleteMovieWish = (movie) => {
        const token = localStorage.getItem("token")
        wishService
            .deleteOneMovie(movie, token)
            .then(() => {
                setExist(false)
            })
    }

    return (
        <div>
            {exist ? (
                <button className='btn_around btn_around_black' onClick={() => deleteMovieWish(props.id)}><img src={valide.src} alt="" /></button>
            ) : (
                <button className='btn_around btn_around_black' onClick={() => addMovieWish(props.id)}>+</button>

            )
            }
        </div>
    );
}

export default AddWish;