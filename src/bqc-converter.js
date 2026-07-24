"use strict";

/**
 * BQC Converter
 * Framework: BQC Research Framework v1.0
 * Evidence Archive: r0001
 *
 * Scope:
 * - Parses BQC tokens into z/y/x components.
 * - Reports membership in the observed canonical kernel.
 * - Computes PF-0001 for four-decimal-digit a-prefix tokens.
 * - Returns PF-0006 values only for recorded anchors.
 * - Reports known validity evidence.
 *
 * This module does not:
 * - generate canonical states,
 * - implement the unresolved T(z,y) or X(x) decoders,
 * - infer PF-0006 values beyond recorded anchors,
 * - treat candidate interpretations as verified.
 */

const BQC_FRAMEWORK = Object.freeze({
    name: "BQC Research Framework",
    version: "1.0",
    status: "Frozen / Complete / Ratified",
    archiveRevision: "r0001",
    canonicalFrontier: "a0023"
});

const CANONICAL_KERNEL = Object.freeze([
    "a0000",
    "a0001",
    "a0011",
    "a0012",
    "a0022",
    "a0023"
]);

const CANONICAL_SET = new Set(CANONICAL_KERNEL);

/**
 * Layer-3 evidence known in archive r0001.
 *
 * Most syntactically parseable tokens remain Unknown because a complete
 * alpha-tally validity algorithm has not yet been specified.
 */
const VALIDITY_RECORDS = Object.freeze({
    a0000: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },
    a0001: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },
    a0011: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },
    a0012: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },
    a0022: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },
    a0023: {
        status: "Valid",
        evidenceStatus: "Observed",
        record: "A1-0001",
        reason: "Member of the verified canonical kernel."
    },

    a0002: {
        status: "Invalid",
        evidenceStatus: "Verified",
        record: "B3-0001",
        reason: "Violates right-to-left alpha-tally logic."
    },

    a9900: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded structural/PF-0006 anchor."
    },
    a9990: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded structural/PF-0006 anchor."
    },
    a9000: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded structural/PF-0006 anchor."
    },
    a9001: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded PF-0006 anchor."
    },
    a9090: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded structural/PF-0006 anchor."
    },
    b0000: {
        status: "Valid",
        evidenceStatus: "Established",
        record: "B3-0002",
        reason: "Recorded prefix-rollover anchor."
    }
});

/**
 * PF-0006-H2 anchor table.
 *
 * Values are returned only for explicitly recorded anchors.
 * Their shared evidence status remains Candidate.
 */
const PF0006_ANCHORS = Object.freeze({
    a0000: 0.0,
    a0011: 0.2,

    a0100: 2.0,

    a1000: 20.0,
    a1001: 20.1,
    a1101: 22.1,

    a2000: 40.0,
    a2001: 40.1,
    a2011: 40.2,
    a2012: 40.3,
    a2022: 40.4,
    a2055: 41.0,
    a2077: 41.4,
    a2200: 42.0,

    a9900: 58.0,
    a9990: 58.9,
    a9000: 59.0,
    a9001: 59.1,
    a9090: 59.9,

    b0000: 60.0
});

/**
 * Parse a token using the archived z/y/x structural form.
 *
 * Current published form:
 *   z = one symbolic prefix character
 *   y = first two digits
 *   x = final two digits
 *
 * Longer symbolic prefixes such as "this_word" require a separately
 * specified delimiter or grammar and are not inferred here.
 */
function parseBQC(input) {
    if (typeof input !== "string") {
        return {
            ok: false,
            error: "Input must be a string."
        };
    }

    const normalized = input.trim();
    const match = normalized.match(/^([A-Za-z])(\d{2})(\d{2})$/);

    if (!match) {
        return {
            ok: false,
            input: normalized,
            error: "Expected one alphabetic prefix followed by four decimal digits."
        };
    }

    return {
        ok: true,
        input: normalized,
        structure: {
            z: match[1],
            y: match[2],
            x: match[3]
        }
    };
}

/**
 * PF-0001: digit sum divided by 10.
 *
 * This is an archival interpretation and does not establish BQC validity
 * or canonical membership.
 */
function computePF0001(parsed) {
    const digits = `${parsed.structure.y}${parsed.structure.x}`;

    const sum = [...digits].reduce(
        (total, digit) => total + Number(digit),
        0
    );

    return {
        value: sum / 10,
        status: "Explicit rule",
        record: "C4-0001",
        interpretationOnly: true
    };
}

function getCanonicalStatus(token) {
    if (CANONICAL_SET.has(token)) {
        return {
            status: "Observed",
            member: true,
            frontier: BQC_FRAMEWORK.canonicalFrontier,
            record: "A1-0001"
        };
    }

    return {
        status: "Unknown",
        member: false,
        frontier: BQC_FRAMEWORK.canonicalFrontier,
        record: null
    };
}

function getValidityStatus(token) {
    const record = VALIDITY_RECORDS[token];

    if (record) {
        return { ...record };
    }

    return {
        status: "Unknown",
        evidenceStatus: null,
        record: null,
        reason: "No complete Layer-3 validity decoder exists in archive r0001."
    };
}

function getPF0006(token) {
    if (!Object.prototype.hasOwnProperty.call(PF0006_ANCHORS, token)) {
        return {
            value: null,
            status: "Unresolved",
            modelStatus: "Candidate",
            record: "C4-0006",
            hypothesis: "PF-0006-H2",
            reason: "Input is not a recorded PF-0006 anchor."
        };
    }

    return {
        value: PF0006_ANCHORS[token],
        status: "Candidate",
        record: "C4-0006",
        hypothesis: "PF-0006-H2",
        anchorOnly: true
    };
}

function convertBQC(input) {
    const parsed = parseBQC(input);

    if (!parsed.ok) {
        return {
            input,
            parsed: false,
            error: parsed.error,
            framework: BQC_FRAMEWORK
        };
    }

    const token = parsed.input;

    return {
        input: token,
        parsed: true,
        structure: parsed.structure,

        canonical: getCanonicalStatus(token),
        validity: getValidityStatus(token),

        pf0001: computePF0001(parsed),
        pf0006: getPF0006(token),

        provenance: {
            framework: `${BQC_FRAMEWORK.name} v${BQC_FRAMEWORK.version}`,
            archive: `Evidence Archive ${BQC_FRAMEWORK.archiveRevision}`
        }
    };
}

const BQC = Object.freeze({
    framework: BQC_FRAMEWORK,
    canonicalKernel: [...CANONICAL_KERNEL],
    parse: parseBQC,
    convert: convertBQC
});

// CommonJS export.
if (typeof module !== "undefined" && module.exports) {
    module.exports = BQC;
}

// Browser global.
if (typeof window !== "undefined") {
    window.BQC = BQC;
}