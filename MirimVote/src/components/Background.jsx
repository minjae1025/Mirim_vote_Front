import { Global, css } from '@emotion/react';

const Background = () => (
  <Global
    styles={css`
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background: #E6FFEA;
      }

    `}
  />
);

export default Background;
