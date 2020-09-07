export const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (e) => resolve({
            result: reader.result,
        });

        reader.onerror = (e) => reject(e)
    })
}

async function largFileHandleExample() {
    const { result } = await readFile(file)
    const data = result.split(',')[1];
    
    const FILE_NAME = file.name;
    const CHUNK_SIZE = 1024;
    const FILE_SIZE = data.length;
    
    const exampleUpload = () => {
        const paramsData = {
            data: {
                filename: FILE_NAME,
                filelength: FILE_SIZE,
                filepos: fileSlicePosition,
                data: data.substring(fileSlicePosition, fileSlicePosition + CHUNK_SIZE)
            }
        }

        // socket or ajax here
        //Sajax({ url: ...url, ...paramsData })

        fileSlicePosition = fileSlicePosition + CHUNK_SIZE;

        //is finished
        if (fileSlicePosition > FILE_SIZE) {
            return fileSlicePosition = FILE_SIZE;
        }

        return exampleUpload();
    }

    exampleUpload();
}