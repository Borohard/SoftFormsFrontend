import React, {useEffect, useState} from 'react';
import {useDeleteSurveyMutation, useUserSurveysQuery} from "../store/softforms/softforms.api";
import {FormCard} from "../components/FormCard";

export function HomePage() {
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState()
    let {isLoading, isError, data=[]}= useUserSurveysQuery(localStorage.getItem('token'))
    const [deleteSurvey] = useDeleteSurveyMutation();


    useEffect(()=> setFilteredData(
        search ?
            (data?.filter((survey) => survey.title.toLowerCase().includes(search.toLowerCase()))) : data),
        [data, search]

    )

    const deleteSurveyQuery = (surveyId) => {
        deleteSurvey(surveyId).then(
            data = data?.filter((survey) => survey.id !== surveyId))
        setFilteredData(
            search ?
                (data?.filter((survey) => survey.title.toLowerCase().includes(search.toLowerCase()))) : data)
        console.log(data)
        window.location.reload()
    }


    console.log(filteredData)
    return (
        <div>
            <div className="flex justify-center pt-10 mx-auto ">
                <div className="relative w-[560px]">
                    <input
                        type="text"
                        className="border border-fuchsia-600 rounded-lg py-2 px-4 w-full h-[42px] mb-2 placeholder: placeholder-gray-700 focus:outline-fuchsia-800 focus:placeholder-gray-400"
                        placeholder="Введите название формы..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}/>
                </div>
            </div>

            <div className="ml-10 mt-4 mb-10">
                <h1 className="text-4xl">Мои формы</h1>
                {
                    isLoading ? <p className="text-center mt-1">Загрузка...</p>
                        : isError ? <p className="text-center text-red-600">Что-то пошло не так...</p>
                            : (
                                <div className="mt-6 grid grid-cols-4 gap-8">
                                    { filteredData?.length !==0 ? (
                                        filteredData?.map(survey => (
                                                <FormCard form={survey} deleteEl={deleteSurveyQuery} key={survey.id}/> ))
                                    ) : <h3 className="msg mt-1 text-3xl">У Вас пока нет форм :(</h3> }
                                </div>
                            )
                }
            </div>
        </div>
    );
}


