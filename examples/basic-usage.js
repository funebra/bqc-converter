"use strict";

const BQC = require("../src/bqc-converter.js");

const examples = [
    "a0000",
    "a0002",
    "a0023",
    "a9000",
    "a9090",
    "b0000",
    "a3456"
];

for (const token of examples) {
    console.log(`\n--- ${token} ---`);
    console.dir(BQC.convert(token), {
        depth: null,
        colors: true
    });
}