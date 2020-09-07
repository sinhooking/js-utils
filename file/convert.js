/**
 * @param   
 *  `data:${dataType}, ${Buffer.from(response.data, 'binary').toString('base64')}`, filename
 * @description
 *  - "base64" convert to "File API"
 */
export function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}