import plyWorker from '../PLYLoader';

const FILE_PATH = `/uploads/some.ply`
const loader = new Worker(plyWorker);


loader.addEventListener("message", function (event) {
                
    var dataBuffer = event.data.buffer;
    var vertices = new Float32Array(dataBuffer);
    var buffer = new THREE.BufferAttribute(vertices, 3);

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position',  buffer);
    geometry.computeVertexNormals();
    
    const options = {};
    let material = new THREE.MeshStandardMaterial({ ...options});
    var child = new THREE.Mesh(geometry, material);
    child.castShadow = true;
    child.receiveShadow = true;
    child.geometry.verticesNeedUpdate = true;
    
    loader.terminate();

    return child;
}, false);

loader.postMessage(FILE_PATH);