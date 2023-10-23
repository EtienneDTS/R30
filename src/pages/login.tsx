import React from 'react';
import style from '../styles/login.module.scss'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import GoogleButton from "react-google-button"


type LogInProps = {

}

const login: React.FC<LogInProps> = () => {

    const { data: session } = useSession()
    const router = useRouter()



    async function handleClick(provider: string) {
        signIn(provider)
        
        if (session) {
            router.push("/")
        }

    }


    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.title}>Connexion</div>
                <div className={style.btn}>
                    <div className={style.googleBtn}>
                        <GoogleButton
                            onClick={() => handleClick("google")}
                            type={"dark"}
                         />
                    </div>

                </div>


            </div>


        </div>
    );
};

export default login;