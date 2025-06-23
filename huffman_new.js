import { BinaryHeap } from "./heap.js";

export {HuffmanCoder}

class TreeNode{
    constructor(value, left=null, right=null){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class HuffmanCoder{
    constructor(){
        this.mapp = new Map();
        this.revMap = new Map();
    }

    stringyfy(node){

    }

    display(){}

    destringify(data){}

    getMappings(){
        let res = "";
        for(const [key, value] of this.mapp){
            res += `${key} → ${value}\n`;
        }
        return res;
    }

    dfs(node,path){
        if(node == null) return;
        if(node.value.length === 1){
            this.mapp.set(node.value, path);
            this.revMap.set(path, node.value);
            return;
        }

        this.dfs(node.left, path + '0');
        this.dfs(node.right, path + '1');
    }

    encode(data){
        this.heap = new BinaryHeap();

        const mp = new Map();

        for(let i=0; i<data.length; i++){
            if(mp.has(data[i])){
                mp.set(data[i], mp.get(data[i]) + 1);
            }else{
                mp.set(data[i], 1);
            }
        }

        for(const [key, freq] of mp){
            // let freq = mp[key];
            let node = new TreeNode(key, null, null);
            this.heap.insert([-freq,node]);
        }

        while(this.heap.size() > 1){
            let left = this.heap.extractMax();
            let right = this.heap.extractMax();
            
            let newFreq = -left[0] - right[0];

            let newVal = left[1].value + right[1].value;

            let newNode = new TreeNode(newVal,left[1],right[1]);

            this.heap.insert([-newFreq, newNode]);
        }

        let huffmanTree = this.heap.extractMax()[1];

        this.mapp.clear();
        this.dfs(huffmanTree, "");

        let encodedData = "";

        for(let i=0; i<data.length; i++){
            encodedData += this.mapp.get(data[i]);
        }  

        // compression ratio
        let originalSize = data.length * 8; // assuming each character is 8 bits
        let compressedSize = encodedData.length; // in bits
        let metaDataSize = 0;
        for(const [key, value] of this.mapp){
            metaDataSize += key.length * 8 + value.length; // key length in bits + value length in bits
        }

        let totalSize = compressedSize + metaDataSize;

        let ratio = (totalSize / originalSize).toFixed(2);
        

        let info = "Compression Complete with Compression ratio : " + '\n' + ratio;
        let tree_structure = this.getMappings();
        return [encodedData,tree_structure,info];

    }

    decode(data){
        console.log("Recieved data for decoding: ", data);


        let encodedData = data.split('\n')[0]; // first line is the encoded data
        let tree_structure = data.split('\n').slice(1).join('\n'); // rest is the tree structure
        this.revMap.clear();

        for(const line of tree_structure.split('\n')){
            if(line.trim() === "") continue; // skip empty lines
            let [char, code] = line.split(' → ');
            this.revMap.set(code, char);
        }

        // debugging
        console.log("Decoded Huffman Tree Structure:");
        for(const [key, value] of this.revMap){
            console.log(`${key} → ${value}`);
        }

        let decodedData = "";
        let currentCode = "";

        for(let i=0; i<encodedData.length; i++){
            if(this.revMap.has(currentCode)){
                decodedData += this.revMap.get(currentCode);
                currentCode = "";
            }
            currentCode += encodedData[i];
        }
        if(this.revMap.has(currentCode)){
            decodedData += this.revMap.get(currentCode);
            currentCode = "";
        }


        return [decodedData];

    }

}