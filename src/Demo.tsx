import React from 'react';

import ReactDOM from 'react-dom/client';

import { helloGROWI } from './Hello';

const href = 'https://growi.org/';

const HelloGROWI = helloGROWI(() => <a href={href}>Hello, GROWI</a>);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelloGROWI
      href={href}
    >Hello, GROWI</HelloGROWI>
  </React.StrictMode>,
);
