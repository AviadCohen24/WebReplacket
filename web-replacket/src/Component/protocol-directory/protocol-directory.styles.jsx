import styled, { keyframes } from 'styled-components';

const visibilityAnimation = keyframes`
  0% { opacity: 0; }
  20% { opacity: 0; }
  80% { opacity: 1; }
  100% { opacity: 1; }
`

export const DirectoryContainer = styled.div`
  margin: auto;
  padding-top: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  animation: ${visibilityAnimation} 2s linear forwards;;
`