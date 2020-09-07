const workercode = () => {
    /* eslint-disable */
    importScripts(self.origin + '/three.js', self.origin +'/PLYLoader.js');
    /* eslint-disable */
    self.onmessage = function(oEvent) {
      var loader = new THREE.PLYLoader();
  
      loader.load(self.origin + oEvent.data, function ( geometry ) {
        geometry.computeVertexNormals();
        const buffer = geometry.getAttribute('position').array.buffer;
        /* eslint-disable */
        self.postMessage({buffer: buffer}, [buffer]);
      });
    }
  };
  
  let code = workercode.toString();
  
  code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
  const blob = new Blob([code], { type: "application/javascript" });
  // const worker_script = URL.createObjectURL(blob);
  
  export default URL.createObjectURL(blob);;