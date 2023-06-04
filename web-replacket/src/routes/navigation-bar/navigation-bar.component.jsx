import { NavigationBarContainer, LogoContainer, ReplacketIcon,
         ProtocolLink, ProtocolLinks } from './navigation-bar.styles.jsx'

import { Outlet } from "react-router-dom";


const NavigationBar = () => {
    return (
        <>
            <NavigationBarContainer>
                <LogoContainer to="/">
                    <ReplacketIcon />
                </LogoContainer>
                <ProtocolLinks>
                    
                </ProtocolLinks>
            </NavigationBarContainer>
            <Outlet/>
        </>
    )
}

export default NavigationBar;