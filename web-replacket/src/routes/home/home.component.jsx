import { Outlet } from 'react-router-dom'

import HeroBanner from '../../Component/HeroBanner/HeroBanner.component';
import ProtocolsDirectory from '../../Component/protocol-directory/protocol-directory.component';

const titles = {
    title: 'Replacket',
    subTitle: 'The Best Sender Data Tool',
    description: 'Master the Art of Data Transfer: Simplify Communication by Seamlessly ' +  
    'Sending Data Across Diverse Protocols with Replacket - Redefining Data Transfer!'
}

const Home = () => {
    
    return (
        <>
            <Outlet />
            <HeroBanner titles={titles} />
            <ProtocolsDirectory /> 
        </>
    )
}

export default Home;