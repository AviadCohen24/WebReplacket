import { FileUploader } from "react-drag-drop-files";

const FileUpload = ({ fileTypes, fileSetter, label }) => {
    const handleChange = (file) => fileSetter(file);

    return (
        <FileUploader handleChange={handleChange} label={label} 
                      name="file" 
                      types={fileTypes}/>
    )
}

export default FileUpload;