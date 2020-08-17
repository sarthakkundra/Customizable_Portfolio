import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Navbar from "../layout/Navbar";
import JsEditor from "../editor/dynamic/JsEditor";
import HTMLEditor from "../editor/dynamic/HTMLEditor";
import CSSEditor from "../editor/dynamic/CSSEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Contribute = () => {
  const classes = useStyles();

  const [jsCode, setJsCode] = useState("//Write your JavaScript here :)");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCSSCode] = useState("");

  const onChange = (e) => {
    {
      console.log(e)
    }
  };

  return (
    <div>
      <Navbar />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <JsEditor onChange={onChange} js={jsCode} />
        </Grid>
        <Grid item xs={4}>
          <HTMLEditor />
        </Grid>
        <Grid item xs={4}>
          <CSSEditor />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contribute;
