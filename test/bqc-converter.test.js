"use strict";

const assert = require("node:assert/strict");
const BQC = require("../src/bqc-converter.js");

// Structural parsing
assert.deepEqual(
    BQC.parse("a9090").structure,
    { z: "a", y: "90", x: "90" }
);

// Canonical observation
{
    const result = BQC.convert("a0023");

    assert.equal(result.canonical.status, "Observed");
    assert.equal(result.canonical.member, true);
    assert.equal(result.canonical.frontier, "a0023");
}

// Known invalid configuration
{
    const result = BQC.convert("a0002");

    assert.equal(result.validity.status, "Invalid");
    assert.equal(result.validity.record, "B3-0001");
    assert.equal(result.canonical.member, false);
}

// PF-0001
{
    const result = BQC.convert("a9090");

    assert.equal(result.pf0001.value, 1.8);
    assert.equal(result.pf0001.status, "Explicit rule");
}

// PF-0006 recorded anchor
{
    const result = BQC.convert("a9090");

    assert.equal(result.pf0006.value, 59.9);
    assert.equal(result.pf0006.status, "Candidate");
    assert.equal(result.pf0006.anchorOnly, true);
}

// Prefix rollover anchor
{
    const result = BQC.convert("b0000");

    assert.deepEqual(
        result.structure,
        { z: "b", y: "00", x: "00" }
    );

    assert.equal(result.pf0006.value, 60.0);
}

// Unresolved PF-0006 token
{
    const result = BQC.convert("a3456");

    assert.equal(result.pf0006.value, null);
    assert.equal(result.pf0006.status, "Unresolved");
    assert.equal(result.validity.status, "Unknown");
}

// Reject malformed syntax
{
    const result = BQC.convert("a123");

    assert.equal(result.parsed, false);
}

console.log("All BQC converter tests passed.");