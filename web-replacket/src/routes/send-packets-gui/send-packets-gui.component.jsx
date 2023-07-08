import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import * as signalR from '@microsoft/signalr';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { selectProgressValue, selectNIC, selectFile } from "../../store/SendPackets/sendPackets.selector";
import { ConfigurationContainer } from './send-packets-gui.styles'
import { setFile, setNIC, setProgressValue } from '../../store/SendPackets/sendPackets.action'
import { sendPacketsRequest, getAvailableNIC } from '../../utils/server/server.utils'

import Button from '../../Component/Button/button.component'
import HeroBanner from "../../Component/HeroBanner/HeroBanner.component";
import FileUpload from "../../Component/Upload-file/upload-file.component";
import LinearProgressWithLabel from "../../Component/LinearProgressWithLabel/linear-progress-with-label.component";
import PROTOCOLS_DATA from "../../protocols-data";

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

const SendPacketsGUI = () => {
    const [availableNIC, setAvailableNIC] = useState([])
    const [isSelectorOpen, setSelectorOpen] = useState(false)
    const dispatch = useDispatch();

    const file = useSelector(selectFile);
    const fileTypes = ["pcap"];

    const selectedNIC = useSelector(selectNIC)
    const progressValue = useSelector(selectProgressValue)

    const loading = isSelectorOpen && availableNIC.length === 0;
    const protocol = PROTOCOLS_DATA.find(protocol => protocol.title === 'Send Packets')

    const ChangeSelectorStateHandler = () => setSelectorOpen(!isSelectorOpen);
    const FileChangedHandler = (newFile) => dispatch(setFile(newFile));
    const changeNICHandler = (event, newNIC) => dispatch(setNIC(newNIC));
    const handleSendRequest = () => sendPacketsRequest(selectedNIC, file);
    const changeProgressValueHandler = (newValue) => dispatch(setProgressValue(newValue));

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:7184/progresshub') // The default SignalR hub URL
          .build();
    
        connection.on('ReceiveProgress', (newProgress) => {
            console.log(`progress value ${newProgress}`)
            changeProgressValueHandler(newProgress);
        });
    
        async function startConnection() {
          try {
            await connection.start();
            console.log('SignalR connected');
          } catch (error) {
            console.error('SignalR connection error:', error);
          }
        }
    
        startConnection();
    
        return () => {
          connection.stop();
        };
      }, []);

    useEffect(() => {
        let active = true;

        if(!loading)
            return undefined;
        (async () => {
            if(active)
            {
                try{
                    const availableNIC = await getAvailableNIC();
                    setAvailableNIC(availableNIC);
                }
                catch(error){
                    setAvailableNIC(["Unable to load available NICs"])
                    changeNICHandler(null, null);
                }
            }
        })();

        return () => active = false;
    }, [loading])

    useEffect(() => {
        if(!isSelectorOpen)
            setAvailableNIC([]);
    }, [isSelectorOpen])

    return (
        <div>
            <HeroBanner titles={ protocol } />
            <ConfigurationContainer>
                <Autocomplete id="NIC" sx={{ width: 300 }} 
                            open={isSelectorOpen} onOpen={ChangeSelectorStateHandler} onClose={ChangeSelectorStateHandler}
                            options={availableNIC} 
                            value={selectedNIC}
                            onChange={changeNICHandler}
                            renderInput={(params) => (
                                <TextField {...params} label="Network interface controller"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                    ),
                                }}
                                />
                            )}/>
                <FileUpload fileTypes={fileTypes} fileSetter={FileChangedHandler} 
                            label={`${file? file.name : "Upload or drop a file right here"}`}
                            />
                <Box sx={{ width: '35%' }}>
                    <LinearProgressWithLabel value={progressValue} />
                </Box>
                <Button onClick={handleSendRequest}>Start sending</Button>
            </ConfigurationContainer>
        </div>
    )
}

export default SendPacketsGUI;