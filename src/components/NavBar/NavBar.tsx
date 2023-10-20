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

    function onMouseEnterHandler(id: string) {
        const element: HTMLElement | null = document.getElementById(id)
        if (element) {
            element.style.visibility = "visible"
        }
    }
    function onMouseLeaverHandler(id: string) {
        const element: HTMLElement | null = document.getElementById(id)
        if (element) {
            element.style.visibility = "hidden"
        }
    }

    function clickOnHandler(id: string) {
        const element: HTMLElement | null = document.getElementById(id)
        if (element) {
            if (element.classList.contains(style.visible)) {
                element.classList.remove(style.visible);
            } else {
                element.classList.add(style.visible);
            }
        }
    }




    return (
        <div className={style.navBar}>
            <ul>
                <li className={style.logoContainer}>
                    <Link href={"/"}><div className={style.image}><Image className={style.image} width={60} height={60} src={"/r-logo.png"} alt={"Logo"} /></div></Link>
                </li>

                <li className={style.linkBox} onClick={() => { clickOnHandler("parchmentID") }}>
                    <div className={style.userIconContainer}>

                        {
                            user ? (<Image className={style.image} width={60} height={60} src={"/helmet.png"} alt={"Image de l'utilisateur"} />)
                                : (<Link href={"/login"} className={style.icon}><Image className={style.image} width={60} height={60} src={"/helmet.png"} alt={"Icon de connexion"} /></Link>)
                        }
                    </div>

                </li>

                <li className={style.options} id="parchmentID" >
                    
                    <div className={style.parchment}>
                        <Link href={"/routine/create"} className={style.parchmentLink}>
                            <div onMouseEnter={() => { onMouseEnterHandler("element1") }} onMouseLeave={() => onMouseLeaverHandler("element1")}><div id="element1" style={{ visibility: 'hidden' }}><Image className={style.blade} width={40} height={40} src={"/blade.svg"} alt={"selecteur"} /></div><p>Créer une routine</p></div>
                        </Link>


                        <div onMouseEnter={() => { onMouseEnterHandler("element2") }} onMouseLeave={() => onMouseLeaverHandler("element2")}><div id="element2" style={{ visibility: 'hidden' }}><Image className={style.blade} width={40} height={40} src={"/blade.svg"} alt={"selecteur"} /></div><p>Sauvegardes</p></div>

                        <div onMouseEnter={() => { onMouseEnterHandler("element3") }} onMouseLeave={() => onMouseLeaverHandler("element3")}><div id="element3" style={{ visibility: 'hidden' }}><Image className={style.blade} width={40} height={40} src={"/blade.svg"} alt={"selecteur"} /></div><p>Fiche du jour</p></div>

                        <div onMouseEnter={() => { onMouseEnterHandler("element4") }} onMouseLeave={() => onMouseLeaverHandler("element4")}><div id="element4" style={{ visibility: 'hidden' }}><Image className={style.blade} width={40} height={40} src={"/blade.svg"} alt={"selecteur"} /></div><p>Quitter</p></div>

                    </div>
                </li>
            </ul>

        </div>
    );
};
