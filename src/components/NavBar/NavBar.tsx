import style from "./style.module.scss"
import React from 'react';

import Link from "next/link";

type NavBarProps = {

}

export const NavBar: React.FC<NavBarProps> = () => {
    return (
        <div className={style.navBar}>
            <ul>
                <li><Link href={"/"}><div className={style.image}><img src="#" alt="" /></div></Link></li>
                <li><Link href={"/login"} className={style.link}>Connexion</Link></li>
                <li>Cart</li>
            </ul>
        </div>
    );
};
