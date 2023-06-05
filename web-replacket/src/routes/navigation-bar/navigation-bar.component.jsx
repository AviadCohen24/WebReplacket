import { NavigationBarContainer, LogoContainer, ReplacketIcon,
         ProtocolLink, ProtocolLinks } from './navigation-bar.styles.jsx'
import PROTOCOLS_DATA from '../../protocols-data.js';

import { Outlet } from "react-router-dom";


const NavigationBar = () => {
    return (
        <>
            <NavigationBarContainer>
                <LogoContainer to="/">
                    <ReplacketIcon />
                </LogoContainer>
                <ProtocolLinks>
                    {PROTOCOLS_DATA.map((protocol) => {
                        return(
                            <ProtocolLink key={protocol.title} to={protocol.url}>
                                <h1>{protocol.title}</h1>
                            </ProtocolLink>
                        )
                    })}
                </ProtocolLinks>
            </NavigationBarContainer>
            <Outlet/>
        </>
    )
}

export default NavigationBar;