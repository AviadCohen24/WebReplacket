import SERVER_ADDRESS from "../../SERVER_DATA.JS"
import { selectFile, selectNIC} from '../../store/SendPackets/sendPackets.selector'

import { useSelector } from "react-redux";

export const getAvailableNIC = async () => {
    try{
        const response = await fetch(SERVER_ADDRESS.getAvailableNIC);
        if(!response.ok)
            throw new Error("Network error while trying get available NICs")
        const data = await response.json();
        return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}


export const sendPacketsRequest = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nic = useSelector(selectNIC);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const file = useSelector(selectFile);
    const data = JSON.stringify({nic, file})
    try{
        const response = await fetch(SERVER_ADDRESS.sendPacketsUrl, {
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'application/json',
            }
        });

        if(!response.ok){
            throw new Error('Send packets respone wasn`t ok')
        }

        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('error sending send packets request', error)
        throw error;
    }
}