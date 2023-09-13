import React from 'react';
import style from '../styles/login.module.scss'
import Link from 'next/link';

type LogInProps = {

}

const login: React.FC<LogInProps> = () => {

    function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("cbon")
        alert("clické")

    }

    return (
        <div>
            <div className={style.formContainer}>
                <form action="" onSubmit={handleForm}>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email" id='email' placeholder='email' required/>
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input type="password" id='password' placeholder='password'required/>
                    </div>
                    <div>Pas encore de compte ? <Link href={"/register"}>S'inscrire</Link> </div>
                    <button type="submit">Connexion</button>
                </form>
            </div>
        </div>
    );
};

export default login;