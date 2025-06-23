import { HuffmanCoder } from "./huffman_new.js";

const coder = new HuffmanCoder();

const input = "helloworld";
coder.encode(input);

// To view the mappings
console.log("Code mappings:");
coder.getMappings();
