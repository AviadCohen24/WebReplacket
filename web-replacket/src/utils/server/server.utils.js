import SERVER_ADDRESS from '../../SERVER_DATA.js';

export const getAvailableNIC = async () => {
    try{
        const response = await fetch(SERVER_ADDRESS.getNICList);
        if(!response.ok)
            throw new Error("Network error while trying get available NICs")
        const data = await response.json();
        return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}


export const sendPacketsRequest = async (nic, file) => {
    file["nic"] = nic
    try{
        const response = await fetch('https://localhost:7184/PacketSender', {
            method: 'POST',
            body: {data: file},
            headers: {
                'content-type': 'application/json',
            }
        }).then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
        });

        const result = await response.json();
        return result;
    }
    catch(error){
        console.error('error sending send packets request', error)
        throw error;
    }
}