import React from 'react';
import style from '../styles/login.module.scss'
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';


type LogInProps = {

}

const login: React.FC<LogInProps> = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (!res) {
            setError("L'utilisateur n'existe pas ou le mot de passe est incorrect")
        }
    }


    return (
        <div>
            <div className={style.formContainer}>
                <form action="" onSubmit={handleForm}>
                    {error && <div className={style.error}>{error}</div>}
                    <div>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id='email'
                            placeholder='email'
                            required
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id='password'
                            placeholder='password'
                            required
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div>Pas encore de compte ? <Link href={"/register"}>S'inscrire</Link> </div>
                    <button type="submit">Connexion</button>
                </form>
            </div>
        </div>
    );
};

export default login;