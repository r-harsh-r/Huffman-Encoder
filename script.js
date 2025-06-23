// import { HuffmanCoder } from './huffman.js';
import { HuffmanCoder } from './huffman_new.js';

onload = function () {
    // Get reference to elements
    const treearea = document.getElementById('treearea');
    const encode = document.getElementById('encode');
    const decode = document.getElementById('decode');
    const temptext = document.getElementById('temptext');
    const upload = document.getElementById('uploadedFile');

    const coder = new HuffmanCoder();

    upload.addEventListener('change',()=>{ alert("File uploaded") });

    encode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            alert("No file uploaded !");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                alert("Text can not be empty ! Upload another file !");
                return;
            }

            let [encodedData ,tree_structure,info ] = coder.encode(text);

            let newText = encodedData + '\n' + tree_structure;
            
            downloadFile(uploadedFile.name.split('.')[0] +'_encoded.txt', newText);
            treearea.innerText = tree_structure;
            // treearea.style.marginTop = '2000px';
            temptext.innerText = info;
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

    decode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            alert("No file uploaded !");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                alert("Text can not be empty ! Upload another file !");
                return;
            }
            let [decoded] = coder.decode(text);
            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);
            // console.log(tree_structure);
            // treearea.innerText = tree_structure;
            // treearea.style.marginTop = '2000px';
            let info = "Decompression Complete";
            temptext.innerText = info;
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

};

function downloadFile(fileName, data){
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}