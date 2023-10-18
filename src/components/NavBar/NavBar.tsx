import style from "./style.module.scss"
import React from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

type NavBarProps = {

}

export const NavBar: React.FC<NavBarProps> = () => {

    const { data: session } = useSession()
    const user = { ...session?.session.user }
    console.log("user", user)

    return (
        <div className={style.navBar}>
            <ul>
                <li><Link href={"/"}><div className={style.image}><img src="#" alt="" /></div></Link></li>
                <li>
                    {
                        user ? (<Link href={"/login"} className={style.link}><Image className={style.image} width={60} height={60} src={user.image ? user.image : "/person-bounding-box.svg"} alt={"Image de l'utilisateur"} /></Link>)
                            : (<Link href={"/login"} className={style.icon}><Image className={style.image} width={60} height={60} src={"/public/person-fill-add.svg"} alt={"Icon de connexion"} /></Link>)
                    }
                </li>

                <li>
                    <Link href={"/routine/create"}><Image className={style.icon} width={60} height={60} src={"/file-earmark-plus-fill.svg"} alt={"Icon création de routine"}/></Link>

                </li>
            </ul>
        </div>
    );
};
