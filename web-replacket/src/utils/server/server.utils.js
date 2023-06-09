import SERVER_ADDRESS from '../../SERVER_DATA.js';

export const getAvailableNIC = async () => {
    try{
        const response = await fetch(SERVER_ADDRESS.getNICListURL);
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
    if(nic && file.name){
        const data = {nic: nic, fileName: file.name}
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        try{
            const response = await fetch(SERVER_ADDRESS.sendPacketsPostRequestURL, {
                method: 'POST',
                body: jsonData,
                headers: {
                    'content-type': 'application/json',    
                    'Accept': 'application/json'
                }
            }).then(response => response);
    
            if(!response.ok){
                console.log(response);
                console.log("response isnt ok")
            }
            
        }
        catch(error){
            console.error('error sending send packets request', error)
            throw error;
        }
    }
}