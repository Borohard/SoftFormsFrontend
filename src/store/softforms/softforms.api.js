import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const softFormsApi = createApi({
    reducerPath: 'softForms/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5267/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        userSurveys: build.query({
            query: () => ({
                url: 'Survey',
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }),
        }),
        deleteSurvey: build.mutation({
            query: (surveyId) => ({
                url: 'Survey',
                method: 'DELETE',
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                params: {
                    surveyId:surveyId
                }
            })
        }),
        editSurvey: build.mutation({
            query: (body) => ({
                url: 'Survey',
                method: 'PUT',
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                body
            })
        }),
        getSurveyById: build.query(),
        createSurvey: build.mutation(
            {
                query: () => ({
                    url: 'Survey/Create/',
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                })
            }
        )

    })
})

export const {useUserSurveysQuery, useDeleteSurveyMutation, useEditSurveyMutation, useGetSurveyByIdQuery, useCreateSurveyMutation} = softFormsApi
