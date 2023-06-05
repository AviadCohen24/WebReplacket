import { Autocomplete, Box, CircularProgress,
         TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { selectProgressValue, selectNIC, selectFilePath } from "../../store/SendPackets/sendPackets.selector";
import { ConfigurationContainer } from './send-packets-gui.styles'
import { setFilePath, setNIC } from '../../store/SendPackets/sendPackets.action'

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

    const selectedNIC = useSelector(selectNIC)
    const progressValue = useSelector(selectProgressValue)
    const fileTypes = ["pcap"];
    const loading = isSelectorOpen && availableNIC.length === 0;
    const protocol = PROTOCOLS_DATA.find(protocol => protocol.title === 'Send Packets')

    const ChangeSelectorStateHandler = () => setSelectorOpen(!isSelectorOpen);
    const FileChangedHandler = (file) => dispatch(setFilePath(file));
    const changeNICHandler = (event, newNIC) => {dispatch(setNIC(newNIC));}

    useEffect(() => {
        let active = true;

        if(!loading)
            return undefined;
        (async () => {
            await sleep(1e3);

            if(active)
            {
                setAvailableNIC(['1425'])
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
                <FileUpload fileTypes={fileTypes} fileSetter={FileChangedHandler} />
                <Box sx={{ width: '35%' }}>
                    <LinearProgressWithLabel value={progressValue} />
                </Box>
            </ConfigurationContainer>
        </div>
    )
}

export default SendPacketsGUI;