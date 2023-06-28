import React, {Fragment, useEffect, useState} from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
//Material UI Components
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//Icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
//Form Elements
import {
  TextFieldInput,
  TextArea,
  NumberInput,
  RadioInput
} from "./elements";
import DateInput from "./elements/DateInput";
import TimeInput from "./elements/TimeInput";
import { formEl } from "./constants.js";
//Components
import Header from "./Header";
import {useEditSurveyMutation, useGetSurveyByIdQuery} from "../../store/softforms/softforms.api";

const FormBuilder = () => {

  const initVal = formEl[0]?.value;

  const [updateSurvey] = useEditSurveyMutation();
  const surveyId = document.location.pathname.slice(6 ,100)
  const {isLoading, isError, data} =  useGetSurveyByIdQuery(document.location.pathname.slice(6 ,100))

  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [dynamicData, setDynamicData] = useState([])
  const [formData, setFormData] = useState("Text")
  const items = dynamicData


  const [pages, setPages] = useState([])

  useEffect(()=> isLoading ? setPages([])
      : isError ? console.log(isError.toString())
          : setPages(data.pages), [isLoading, data, isError])

  useEffect(()=> isLoading ? setSurveyTitle('')
      : isError ? console.log(isError.toString())
          : setSurveyTitle(data.title), [isLoading, data, isError])

  useEffect(()=> isLoading ? setDynamicData([])
      : isError ? console.log(isError.toString())
          : setDynamicData(getQuestions()), [isLoading, data, isError])

  useEffect(()=> isLoading ? setSurveyDescription('')
      : isError ? console.log(isError.toString())
          : setSurveyDescription(data.description), [isLoading, data, isError])



  const getQuestions = () => {
    let questions = []
    data.pages.map((page) => page.questions.map(question => {questions = [...questions, question]}))
    console.log('questions: ' + questions)
    return questions
  }

  console.log("pages: " + pages)
  // console.log(useGetSurveyByIdQuery(surveyId))
  // console.log(items)
  console.log(dynamicData)
  // console.log('заголовок ' + surveyTitle)


  //Function to add new element
  const addElement = () =>  {
    const newQuestion = {
      id: uuid(),
      title: "",
      questionType: formData.toString(),
      isRequired: false,
      options: []
    };
    setDynamicData((prevState) => [...prevState, newQuestion]);
    setFormData(initVal);
  };

  //Function to delete element
  const deleteEl = (id) => {
    setDynamicData((prevState) => prevState.filter((val) => val.id !== id));
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index+1), newEl, ...elArray.slice(index+1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId, elType) => {
    let elIdx = dynamicData.findIndex( (el) =>el.id === elId);
    let newElement = {
      id: uuid(),
      title: '',
      questionType: elType,
      isRequired: false,
    }
    let newArr = addAfter(dynamicData,elIdx,newElement)
    setDynamicData(newArr)
  };

  //Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setDynamicData(items);
  };

  //Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        return { ...el, title: e.target.value };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Function to Handle Required
  const handleRequired = (id) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        return { ...el, isRequired: !el.isRequired };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        return { ...el, questionType: type };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Function to Handle Options
  const addOption = (id, newOption) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        let objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Function to Handle Date
  const handleDate = (id, dateVal) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        return { ...el, date: dateVal };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Function to Handle Time
  const handleTime = (id, dateVal) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === id) {
        return { ...el, time: dateVal };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };


  const handleOptionValues = (questionId, optionId, optionValue) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === questionId) {

        const index = el?.options.findIndex(x => x.id === optionId)
        let newOptions = [...el.options]
            newOptions.splice(index, 1, {id: optionId, value: optionValue})

        return {...el, options: newOptions}
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  const deleteOption = (elId, optionId) => {
    let newArr = dynamicData.map((el) => {
      if (el.id === elId) {
        let newOptions =
          el?.options && el?.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setDynamicData(newArr);
  };

  //Render items
  const renderElements = ({ item }) => {
    switch (item.questionType) {
      case "Text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "Textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "Number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "Radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case "Date":
        return (
            <DateInput
                item={item}
                handleValue={handleValue}
                deleteEl={deleteEl}
                handleRequired={handleRequired}
                handleElType={handleElType}
                handleDate={handleDate}
                duplicateElement={duplicateElement}
            />
        );
      case "Time":
        return (
            <TimeInput
                item={item}
                handleValue={handleValue}
                deleteEl={deleteEl}
                handleRequired={handleRequired}
                handleElType={handleElType}
                handleTime={handleTime}
                duplicateElement={duplicateElement}
            />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <div className="pb-16">
      <Grid container spacing={1} direction="row" justifyContent="center" className="mt-10">
        {
          isLoading ? <p className="text-center mt-1">Загрузка...</p>
              : isError ? <p className="text-center text-red-600">Что-то пошло не так...</p>
                : (
                    <Grid item md={6}>
                    <Header
                        title={surveyTitle}
                        setTitle={setSurveyTitle}
                        description={surveyDescription}
                        setDescription={setSurveyDescription}
                    />
                    <Nestable
                        items={items}
                        renderItem={renderElements}
                        maxDepth={1}
                        onChange={handleOnChangeSort}
                    />
                  </Grid>)
        }

        <Grid item md={2}>
          <Tooltip className="sticky top-24 pt-1" title="Добавить элемент" aria-label="add-element">
            <IconButton className="my-2"
                color="primary"
              aria-label="add-element"
              onClick={addElement}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip className="sticky left-20 top-24" title="Сохранить форму" aria-label="add-element">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
            onClick={() => { updateSurvey({
              id: surveyId,
              userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              title: surveyTitle,
              description: surveyDescription,
              pages: [{
                id: uuid(),
                questions: dynamicData
              }],

              updated: data.updated,
              created: data.created
            })
              window.location.assign(`${window.location.origin}/`)
            }}
            >
              Сохранить форму
            </button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};
export default FormBuilder;
