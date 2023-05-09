// import React, { useState, useEffect } from 'react';
// import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
// import axios from 'axios';

// export default function App() {
//   const [inputText, setInputText] = useState('');
//   const [resultText, setResultText] = useState('');
//   const [selectedLanguageKey, setLanguageKey] = useState('');
//   const [languagesList, setLanguagesList] = useState([]);
//   const [detectLanguageKey, setdetectedLanguageKey] = useState('');
//   const getLanguageSource = () => {
//     axios
//       .post(`https://libretranslate.de/detect`, {
//         q: inputText,
//       })
//       .then(response => {
//         setdetectedLanguageKey(response.data[0].language);
//       });
//   };
//   const translateText = () => {
//     setResultText(inputText);

//     getLanguageSource();

//     let data = {
//       q: inputText,
//       source: detectLanguageKey,
//       target: selectedLanguageKey,
//     };
//     axios.post(`https://libretranslate.de/translate`, data).then(response => {
//       setResultText(response.data.translatedText);
//     });
//   };

//   const languageKey = selectedLanguage => {
//     setLanguageKey(selectedLanguage.target.value);
//   };

//   useEffect(() => {
//     axios.get(`https://libretranslate.de/languages`).then(response => {
//       setLanguagesList(response.data);
//     });

//     getLanguageSource();
//   }, [inputText]);
//   return (
//     <div>
//       <div className="app-header">
//         <h2 className="header">Translate Me</h2>
//       </div>

//       <div className="app-body">
//         <div>
//           <Form>
//             <Form.Field
//               control={TextArea}
//               placeholder="Type Text to Translate.."
//               onChange={e => setInputText(e.target.value)}
//             />

//             <select className="language-select" onChange={languageKey}>
//               <option>Please Select Language..</option>
//               {languagesList.map(language => {
//                 return <option value={language.code}>{language.name}</option>;
//               })}
//             </select>

//             <Form.Field
//               control={TextArea}
//               placeholder="Your Result Translation.."
//               value={resultText}
//             />

//             <Button color="orange" size="large" onClick={translateText}>
//               <Icon name="translate" />
//               Translate
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from 'react';
import countries from './components/data';
const App = () => {
  useEffect(() => {
    const fromText = document.querySelector('.from-text');
    const toText = document.querySelector('.to-text');
    const exchageIcon = document.querySelector('.exchange');
    const selectTag = document.querySelectorAll('select');
    const icons = document.querySelectorAll('.row i');
    const translateBtn = document.querySelector('button');
    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected =
          id === 0
            ? country_code === 'en-GB'
              ? 'selected'
              : ''
            : country_code === 'uk-UA'
            ? 'selected'
            : '';
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
      }
    });

    exchageIcon.addEventListener('click', () => {
      console.log('helo');
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      console.log(tempText);
      console.log(tempLang);
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

    fromText.addEventListener('keyup', () => {
      if (!fromText.value) {
        toText.value = '';
      }
    });

    translateBtn.addEventListener('click', () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute('placeholder', 'Translating...');
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach(data => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute('placeholder', 'Translation');
        });
    });

    icons.forEach(icon => {
      icon.addEventListener('click', ({ target }) => {
        if (!fromText.value || !toText.value) return;
        if (target.classList.contains('fa-copy')) {
          if (target.id === 'from') {
            navigator.clipboard.writeText(fromText.value);
          } else {
            navigator.clipboard.writeText(toText.value);
          }
        } else {
          let utterance;
          if (target.id === 'from') {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;
          } else {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
          }
          speechSynthesis.speak(utterance);
        }
      });
    });
  }, []);
  return (
    <>
      <div className="container">
        <h2 class="header-text">Translate Me</h2>
        <div className="wrapper">
          <div className="text-input">
            <textarea spellcheck="false" className="from-text" placeholder="Enter text"></textarea>
            <textarea
              spellcheck="false"
              readonly
              disabled
              className="to-text"
              placeholder="Translation"
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i id="from" className="fas fa-volume-up"></i>
                <i id="from" className="fas fa-copy"></i>
              </div>
              <select></select>
            </li>
            <li className="exchange">
              <i className="fas fa-exchange-alt"></i>
            </li>
            <li className="row to">
              <select></select>
              <div className="icons">
                <i id="to" className="fas fa-volume-up"></i>
                <i id="to" className="fas fa-copy"></i>
              </div>
            </li>
          </ul>
        </div>
        <button>Translate Text</button>
      </div>
    </>
  );
};

export default App;
