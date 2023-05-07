import React from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

export default function App() {
  return (
    <div>
      <div className="app-header">
        <h2 className="header">Translate Me</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field control={TextArea} placeholder="Type Text to Translate.." />

            <select className="language-select">
              <option>Please Select Language..</option>
            </select>

            <Form.Field control={TextArea} placeholder="Your Result Translation.." />

            <Button color="orange" size="large">
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
