import { useNavigate } from 'react-router-dom';
import Button from '../Button/button.component'

const ProtocolDirectoryItem = ({ protocol }) => {
    const { title, url } = protocol;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(url) 
    
    return (
        <Button onClick={onNavigateHandler}>
            {title}
        </Button>
    )
}

export default ProtocolDirectoryItem