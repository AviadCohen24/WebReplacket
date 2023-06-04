import PROTOCOLS_DATA from '../../protocols-data';
import { DirectoryContainer } from './protocol-directory.styles';

import ProtocolDirectoryItem from '../protocol-directory-item/protocol-directory-item.component'

const ProtocolsDirectory = () => {

    return(
        <DirectoryContainer>
            {PROTOCOLS_DATA.map((protocol) => (
                <ProtocolDirectoryItem key={protocol.id} protocol={protocol} /> 
            ))}
        </DirectoryContainer>
    )
} 

export default ProtocolsDirectory;