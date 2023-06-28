import React from 'react';
import {Link} from "react-router-dom";
import {useCreateSurveyMutation} from "../store/softforms/softforms.api";

export function Navigation() {

    const [createSurvey] = useCreateSurveyMutation()

    const createSurveyQuery = () => {
        createSurvey().then(
            (res) => window.location.assign(`${window.location.origin}/edit/${res.data}`))
    }

    const logout = () => {
        localStorage.setItem("token", "")
    }

    return (
        <nav className="flex justify-between items-center h-[50px] px-10 shadow-md bg-fuchsia-700 text-white">
            <a href="/" className="font-bold">SoftForms</a>

            <span>
                <Link to="/" className="mr-10">Мои Формы</Link>
                <Link onClick={()=> createSurveyQuery()} className="mr-10"  >Создать форму</Link>
            </span>
                <Link to="/login" onClick={()=> logout()}>Выйти</Link>

        </nav>
    );
}

