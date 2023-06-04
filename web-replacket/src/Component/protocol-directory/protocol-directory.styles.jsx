import styled, { keyframes } from 'styled-components';

const visibilityAnimation = keyframes`
  0% { opacity: 0; }
  20% { opacity: 0; }
  80% { opacity: 1; }
  100% { opacity: 1; }
`

export const DirectoryContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  animation: ${visibilityAnimation} 2s linear forwards;;
`