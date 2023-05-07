import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [detectedLanguageKey, setdetectedLanguageKey] = useState('');

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then(response => {
        setdetectedLanguageKey(response.data[0].language);
      });
  };

  return (
    <div>
      <div className="app-header">
        <h2 className="header">Translate Me</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              placeholder="Type Text to Translate.."
              onChange={e => setInputText(e.target.value)}
            />

            <select className="language-select">
              <option>Please Select Language..</option>
            </select>
            <Form.Field control={TextArea} placeholder="Your Result Translation.." />

            <Button color="orange" size="large" onClick={getLanguageSource}>
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
