import { injectGlobal } from 'styled-components';

const NotoSerifFont = `
  font-family: 'Noto Serif', serif;
  src: url('https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700,700i');
`;

const NotoSansFont = `
  font-family: 'Noto Sans', sans-serif;
  src: url('https://fonts.googleapis.com/css?family=Noto+Sans');
`;

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    ${NotoSerifFont}
  }

  body, h1, h3, h4, div {
    ${NotoSerifFont}
  }

  .MuiButton-label-11, h2, input {
    ${NotoSansFont}
  }
`;
