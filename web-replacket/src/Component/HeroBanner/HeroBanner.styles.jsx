import styled, { keyframes } from 'styled-components';

const appearAnimation = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 1; }
`;

const slideAnimation = keyframes`
  0% { margin-left: -400px; }
  20% { margin-left: -400px; }
  35% { margin-left: 0px; }
  100% { margin-left: 0; }
`;

const revealAnimation = keyframes`
  0% { opacity: 0; width: 0; }
  20% { opacity: 1; width: 0; }
  30% { width: calc(51% - 620px); }
  80% { opacity: 1; }
  100% { opacity: 1; width: calc(51% - 620px); }
`;

const subtitleRevealAnimation = keyframes`
  0%{ opacity: 0; transform: translate(0, 100%);}
  100%{ opacity: 1; transform: translate(0,0);}
`

export const TitlesContainer = styled.div`
  font-family: Montserrat;
  height: 100%;
  text-align: center;
  color: #181716;
  font-size: 45px;
  padding-top: 7vh;
  overflow: hidden;
`;

export const Title = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 65px;

  &:first-of-type {
    animation: ${appearAnimation} 3s linear forwards;
  }

  &:last-of-type {
    animation: ${revealAnimation} 4s linear forwards;
  }

  &:last-of-type span {
    padding-left: 25px;
    font-size: 45px;
    color: #6C3910;
    animation: ${slideAnimation} 2s linear forwards;
  }
`;

export const DescriptionText = styled.h1`
  font-size: 36px;
  overflow: hidden;
  display: inline-block;
  white-space: overwrap;
  animation: ${subtitleRevealAnimation} 2s linear forwards;
`