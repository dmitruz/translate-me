// import './App.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [options, setOptions] = useState([]);
//   const [to, setTo] = useState('en');
//   const [from, setFrom] = useState('en');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');

//   const translate = () => {
//     // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

//     const params = new URLSearchParams();
//     params.append('q', input);
//     params.append('source', from);
//     params.append('target', to);
//     params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

//     axios
//       .post('https://libretranslate.de/translate', params, {
//         headers: {
//           accept: 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       })
//       .then(res => {
//         console.log(res.data);
//         setOutput(res.data.translatedText);
//       });
//   };

//   useEffect(() => {
//     axios
//       .get('https://libretranslate.de/languages', {
//         headers: { accept: 'application/json' },
//       })
//       .then(res => {
//         console.log(res.data);
//         setOptions(res.data);
//       });
//   }, []);

//   //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

//   return (
//     <div className="App">
//       <div>
//         From ({from}) :
//         <select onChange={e => setFrom(e.target.value)}>
//           {options.map(opt => (
//             <option key={opt.code} value={opt.code}>
//               {opt.name}
//             </option>
//           ))}
//         </select>
//         To ({to}) :
//         <select onChange={e => setTo(e.target.value)}>
//           {options.map(opt => (
//             <option key={opt.code} value={opt.code}>
//               {opt.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <textarea cols="50" rows="8" onInput={e => setInput(e.target.value)}></textarea>
//       </div>
//       <div>
//         <textarea cols="50" rows="8" value={output}></textarea>
//       </div>
//       <div>
//         <button onClick={e => translate()}>Translate</button>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [selectedLanguageKey, setLanguageKey] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState('');
  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then(response => {
        setdetectedLanguageKey(response.data[0].language);
      });
  };
  const translateText = () => {
    setResultText(inputText);

    getLanguageSource();

    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios.post(`https://libretranslate.de/translate`, data).then(response => {
      setResultText(response.data.translatedText);
    });
  };

  const languageKey = selectedLanguage => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then(response => {
      setLanguagesList(response.data);
    });

    getLanguageSource();
  }, [inputText]);
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

            <select className="language-select" onChange={languageKey}>
              <option>Please Select Language..</option>
              {languagesList.map(language => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>

            <Form.Field
              control={TextArea}
              placeholder="Your Result Translation.."
              value={resultText}
            />

            <Button color="orange" size="large" onClick={translateText}>
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
