import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete } from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";

import { ConfigurationContainer } from './send-packets-gui.styles'
import HeroBanner from "../../Component/HeroBanner/HeroBanner.component";
import FileUpload from "../../Component/Upload-file/upload-file.component";
import PROTOCOLS_DATA from "../../protocols-data";

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

const SendPacketsGUI = () => {
    const [NIC, setNIC] = useState([])
    const [selectedNIC, setSelectedNIC] = useState('')
    const [isSelectorOpen, setSelectorOpen] = useState(false)
    const [file, setFile] = useState(null)
    
    const loading = isSelectorOpen && NIC.length === 0;
    const protocol = PROTOCOLS_DATA.find(protocol => protocol.title === 'Send Packets')

    const ChangeSelectorStateHandler = () => setSelectorOpen(!isSelectorOpen);
    const SelectNICHandler = (event, newValue) => setSelectedNIC(newValue);

    useEffect(() => {
        let active = true;

        if(!loading)
            return undefined;
        (async () => {
            await sleep(1e3);

            if(active)
            {
                setNIC(['1425'])
            }
        })();

        return () => active = false;
    }, [loading])

    useEffect(() => {
        if(!isSelectorOpen)
            setNIC([]);
    })

    return (
        <div>
            <HeroBanner titles={ protocol } />
            <ConfigurationContainer>
                <Autocomplete id="NIC" sx={{ width: 300 }} 
                            open={isSelectorOpen} onOpen={ChangeSelectorStateHandler} onClose={ChangeSelectorStateHandler}
                            options={NIC} 
                            value={selectedNIC}
                            onChange={SelectNICHandler}
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
                <FileUpload fileTypes={["JPG"]} fileSetter={setFile} />
            </ConfigurationContainer>
        </div>
    )
}

export default SendPacketsGUI;