import style from '../styles/login.module.scss'
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

type RegisterProps = {
    
}

const register: React.FC<RegisterProps> = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password2: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function checkEmailExists(email: string) {
        const response = await fetch('/api/query/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }

        return false;
    }

    async function formValid() {
        let valid : boolean = true;
        const newErrors = { ...formErrors };
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).{8,}$/;

        const emailExist = await checkEmailExists(formData.email)
        if (emailExist.exists) {
            newErrors.email = emailExist.message
            valid = false;
        } else {
            newErrors.email = '';
        }

        // Valider le mot de passe
        if (formData.password !== formData.password2) {
            newErrors.password = 'Les mots de passe ne correspondent pas.';
            valid = false;
        }
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial (!@#$%^&*), et faire au moins 8 caractères de long."
            valid = false
        }
        else {
            newErrors.password = '';
        }

        // Ajoutez d'autres validations pour les champs supplémentaires ici

        setFormErrors(newErrors);
        return valid;
    }

    function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!formValid()) {return}

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                router.push('/login')
            })
            .catch((error) => {
                console.error(error);
                alert('Une erreur s\'est produite lors de la création de l\'utilisateur');
            });
    }
    return (
        <div>
            <div className={style.formContainer}>
                <form onSubmit={handleForm}>
                    <div>
                        {formErrors.email && (
                            <p className="error">{formErrors.email}</p>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName">Prénom:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Nom de famille:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Nom de famille"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        {formErrors.password && (
                            <p className="error">{formErrors.password}</p>
                        )}
                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password2">Confirmer le mot de passe:</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="Confirmer le mot de passe"
                            value={formData.password2}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        Déjà un compte ? <Link href="/login">Se connecter</Link>
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
};


export default register;