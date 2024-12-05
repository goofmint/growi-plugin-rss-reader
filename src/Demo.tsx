import React from 'react';

import ReactDOM from 'react-dom/client';

import { rssReader } from './RSSReader';

const href = 'https://qiita.com/tags/growi/feed';

const RSSReader = rssReader(() => <a href={href}>RSS</a>);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RSSReader
      href={href}
    >
      RSS
    </RSSReader>
  </React.StrictMode>,
);
