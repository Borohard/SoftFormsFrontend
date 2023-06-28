import React from 'react';

export function FormCard({form, deleteEl}) {

    const getQuestionsCount= () => {
        let questionCount = 0;
        form.pages.map((page) => {questionCount += page.questions.length })
        return questionCount
    }

    return (
        <div className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <a href={`${window.location.origin}/edit/${form.id}`}>
                    <h5
                        className="mb-2 text-2xl w-72 font-bold text-gray-900 dark:text-white
                                   overflow-hidden truncate
                        ">
                        {form.title}
                    </h5>
                </a>

                <p className="font-normal text-gray-600 dark:text-gray-400">
                    {`Количество блоков: ${getQuestionsCount()}`}
                </p>

                <p className="font-normal text-gray-600 dark:text-gray-400">
                    {"Дата создания: " + (form.created == null ? "отсутствует" :
                        new Date(form.created).getDate().toString() + '.' +
                        (new Date(form.created).getMonth()+1).toString() + '.' +
                        new Date(form.created).getFullYear().toString())}
                </p>

                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                    {"Дата изменения: " + (form.created == null ? "отсутствует" : (new Date(form.updated).getDate().toString() + '.' +
                            (new Date(form.updated).getMonth()+1).toString() + '.' +
                             new Date(form.updated).getFullYear().toString()) + "    " +
                             new Date(form.updated).getHours().toString() + ':' +
                             new Date(form.updated).getMinutes().toString())
                    }
                </p>

                <a href={`${window.location.origin}/edit/${form.id}`}
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">
                    Открыть
                </a>
                <button className="float-right mt-3 hover:text-red-800 font-semibold" type="button"  onClick={()=> deleteEl(form.id)}>Удалить</button>
            </div>
        </div>

    );
}

