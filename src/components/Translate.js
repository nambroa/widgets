import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";

const options = [
  {
    label: "Afrikaans",
    value: "af",
  },
  {
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Czech",
    value: "cs",
  },
  {
    label: "Dutch",
    value: "nl",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "German",
    value: "de",
  },
  {
    label: "Hindi",
    value: "hi",
  },
  {
    label: "Spanish",
    value: "es",
  },
];
const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState("");
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input value={text} onChange={e => setText(e.target.value)}></input>
        </div>
      </div>
      <Dropdown
        label="Select a Language"
        onSelectedChange={setLanguage}
        selected={language}
        options={options}
      ></Dropdown>
      <hr></hr>
      <h3 className="ui header">Output</h3>
      <Convert language={language} text={text}></Convert>
    </div>
  );
};
export default Translate;
