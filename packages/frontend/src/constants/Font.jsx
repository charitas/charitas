import { injectGlobal } from 'styled-components';

const NotoSansFont = `
  font-family: 'Noto Sans', sans-serif;
  src: url('https://fonts.googleapis.com/css?family=Noto+Sans');
`;

const NotoSerif = `
  font-family: 'Noto Serif', serif;
  src: url('https://fonts.googleapis.com/css?family=Noto+Serif');
`;
// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    ${NotoSansFont}
  }

  body, h1, h3, h4, h2, input, div {
    ${NotoSansFont}
  }

  .StyledHome {
    ${NotoSerif}
  }
`;
