import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import Navbar from "../layout/Navbar";
import JsEditor from "../editor/dynamic/JsEditor";
import HTMLEditor from "../editor/dynamic/HTMLEditor";
import CSSEditor from "../editor/dynamic/CSSEditor";
import ElementView from '../element/ElementView';
import TextField from '@material-ui/core/TextField';
import Footer from '../layout/Footer';

import ElementContext from '../../context/element/elementContext';
import ElementState from '../../context/element/elementState';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Contribute = () => {
  const classes = useStyles();
  const elementContext = useContext(ElementContext);
  

  const [jsCode, setJsCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [name, setName] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const onChangeJs = (e) => {
    {
      var finalCode = "";

      e.display.view.forEach((code) => {
        finalCode += code.line.text;
        finalCode += "\n";
      });
      setJsCode(finalCode);
    }
  };

  const onChangeHtml = (e) => {
    var finalCode = "";

    e.display.view.forEach((code) => {
      finalCode += code.line.text;
      finalCode += "\n";
    });
    setHtmlCode(finalCode);
  }

  const onChangeCss = (e) => {
    var finalCode = "";

    e.display.view.forEach((code) => {
      finalCode += code.line.text;
      finalCode +="\n";
    })
    setCssCode(finalCode);
  }

  const submit = () => {
    if(name == "" || screenshot == null){
      console.log('Name and image are required');
    }else{
      elementContext.uploadElement(name, htmlCode, jsCode, cssCode, screenshot);
    }
  }

  return (
    <ElementState>
    <div>
      <Navbar />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <JsEditor onChange={onChangeJs} />
        </Grid>
        <Grid item xs={4}>
          <HTMLEditor onChange={onChangeHtml} />
        </Grid>
        <Grid item xs={4}>
          <CSSEditor onChange={onChangeCss} />
        </Grid>
        <Grid item xs = {4}>
          <Button variant="contained" color="secondary" onClick={submit}>Submit</Button>
        </Grid>
        <Grid item xs = {4}>
          <TextField id="standard-basic" label="Name of the element" onChange={(e) => setName(e.target.value) } />
        </Grid>
        <Grid item xs = {4}>
          <input type="file" name="screenshot" onChange={(e) => setScreenshot(e.target.files[0])} />
        </Grid>
      </Grid>
      <ElementView html={htmlCode} css={cssCode} js={jsCode} />
      <Footer /> 
    </div>
    </ElementState>
  );
};

export default Contribute;
