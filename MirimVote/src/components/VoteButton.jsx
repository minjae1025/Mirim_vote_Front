import styled from '@emotion/styled';

const Button = styled.button`
  display: block;
  margin: 0 auto;
  background: #288157;
  color: #fff;
  font-size: 28px;
  font-weight: 400;
  border: none;
  border-radius: 12px;
  padding: 12px 64px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 40px;
  &:hover {
    background: #35603f;
  }
`;

export { Button };