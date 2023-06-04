import { FileUploader } from "react-drag-drop-files";

const FileUpload = ({ fileTypes, fileSetter }) => {

    const handleChange = (file) => fileSetter(file);

    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    )
}

export default FileUpload;