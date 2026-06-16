import React from 'react';

import App from './src/components/App';
import '@fontsource/bitter/600.css';
import 'react-circular-progressbar/dist/styles.css';

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
