import { Autocomplete, Box, CircularProgress,
         TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { selectProgressValue, selectNIC, selectFileName } from "../../store/SendPackets/sendPackets.selector";
import { ConfigurationContainer } from './send-packets-gui.styles'
import { setFile, setNIC } from '../../store/SendPackets/sendPackets.action'
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

    const fileName = useSelector(selectFileName);
    const selectedNIC = useSelector(selectNIC)
    const progressValue = useSelector(selectProgressValue)
    const fileTypes = ["pcap"];
    const loading = isSelectorOpen && availableNIC.length === 0;
    const protocol = PROTOCOLS_DATA.find(protocol => protocol.title === 'Send Packets')

    const ChangeSelectorStateHandler = () => setSelectorOpen(!isSelectorOpen);
    const FileChangedHandler = (file) => dispatch(setFile(file));
    const changeNICHandler = (event, newNIC) => dispatch(setNIC(newNIC));
    const handleSendRequest = () => sendPacketsRequest();

    useEffect(() => {
        let active = true;

        if(!loading)
            return undefined;
        (async () => {
            if(active)
            {
                setAvailableNIC(getAvailableNIC());
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
                            label={`${fileName? fileName : "Upload or drop a file right here"}`}
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