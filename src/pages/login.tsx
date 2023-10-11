import React from 'react';
import style from '../styles/login.module.scss'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import GoogleButton from "react-google-button"


type LogInProps = {

}

const login: React.FC<LogInProps> = () => {

    const { data: session } = useSession()
    console.log(session)
    const router = useRouter()



    async function handleClick(provider: string) {
        signIn(provider)
        console.log(session)
        if (session) {
            router.push("/")
        }

    }


    return (
        <div>
            <div className={style.container}>
                <h1>Me connecter</h1>
                <GoogleButton
                    onClick={() => handleClick("google")}
                    type={"light"}
                />

            </div>

        </div>
    );
};

export default login;