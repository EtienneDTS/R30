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
        console.log(session)
        if (session) {
            router.push("/")
        }

    }


    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1>Me connecter</h1>
                <GoogleButton
                    onClick={() => handleClick("google")}
                    type={"light"}
                />

            </div>
            <button onClick={()=>signOut()}>deconnecter</button>

        </div>
    );
};

export default login;