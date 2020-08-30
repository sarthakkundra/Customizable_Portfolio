import React, { useReducer } from "react";
import axios from "axios";
import { encode } from 'js-base64';

import ElementContext from "./elementContext";
import ElementReducer from "./elementReducer";

import {
  GET_ELEMENTS,
  ELEMENTS_ERROR,
  SEARCH_ELEMENT,
  CLEAR_ELEMENTS,
  SET_LOADING,
} from "../types";

const ElementState = (props) => {
  const initialState = {
    elements: null,
    loading: false,
    element: null,
    filtered: null,
  };


const [state, dispatch] = useReducer(ElementReducer, initialState);

// Get all the elements
const getElements = async () => {
  try {

    const data = await axios.get("/api/elements");

    dispatch({ type: GET_ELEMENTS, payload: data.data.elements });
  } catch (e) {
    console.error(e);
  }
};

// Search for elements
const searchElements = (text) => {

  try {

    console.log(state.elements);
    dispatch({ type: SEARCH_ELEMENT, payload: text });
    console.log(state.filtered)
  } catch (e) {
    console.error(e);
  }
}

const uploadElement = async (name, HTMLCode, JSCode, CSSCode, screenshot) => {

  console.log(URL.createObjectURL(createurl(encode(await screenshot.text()))))
  // console.log(encode(await screenshot.text()));
  // const string = encode(await screenshot.text());
  // try {
    
  //     await axios({
  //       method: 'post',
  //       url: '/api/elements/img',
  //       data: {
  //         string
  //       }
  //     })
  // } catch (err) {
  //   console.log(err);
  // }
  try {
    await axios({
      method: 'post',
      url: '/api/elements',
      data: {
        name: name,
        HTMLCode,
        JSCode,
        CSSCode,
        screenshot
      }
    });
  } catch (e) {
      console.log(e);
  }
}
// Clear elements

// Set Loading
const setLoading = () => dispatch({ type: SET_LOADING });

return (
  <ElementContext.Provider
    value={{
      elements: state.elements,
      element: state.element,
      loading: state.loading,
      filtered: state.filtered,
      getElements,
      searchElements,
      uploadElement
    }}
  >
    {props.children}
  </ElementContext.Provider>
);
}

const createurl = (b64String) => {

  const byteCharacters = atob(b64String);

  const byteNumbers = new Array(byteCharacters.length);
  for(let i = 0; i < byteCharacters.length; i++){
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], {type: 'image/jpg'});
  return blob;
}
export default ElementState;
