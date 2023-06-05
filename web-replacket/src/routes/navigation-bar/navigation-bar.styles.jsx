import styled from "styled-components";
import { Link } from 'react-router-dom';
import { ReactComponent as ReplacketSvg } from '../../assets/replacketIcon.svg'


export const NavigationBarContainer = styled.div`
  height: 70px;
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding-left: 25px;
`

export const ReplacketIcon = styled(ReplacketSvg)`
  width: 80px;
  height: 80px;
`

export const ProtocolLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export const ProtocolLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`