\# BQC Converter



Evidence-status-aware JavaScript reference implementation for:



\- BQC Research Framework v1.0

\- BQC Evidence Archive revision r0001



\## Status



```text

Framework:        BQC Research Framework v1.0

Framework status: Frozen / Complete / Ratified

Archive:          Evidence Archive r0001

Package:          0.1.0

Scope



This project is a narrowly scoped reference implementation of the evidence

recorded in BQC Evidence Archive r0001.



It can:



parse supported BQC tokens into z, y, and x;

report membership in the observed canonical kernel;

calculate the archival PF-0001 digit-sum projection;

return PF-0006-H2 values for recorded anchors only;

report known validity evidence;

preserve evidence status and record provenance.



It does not:



implement a complete alpha-tally decoder;

infer the unresolved functions T(z,y) or X(x);

generate canonical states beyond a0023;

infer PF-0006 values for unrecorded inputs;

present Candidate models as Verified facts.

Verified canonical kernel

a0000

a0001

a0011

a0012

a0022

a0023



The observed canonical frontier in Archive r0001 is a0023.



Installation



Clone the repository:



git clone https://github.com/funebra/bqc-converter.git

cd bqc-converter



No runtime dependencies are currently required.



Usage

const BQC = require("./src/bqc-converter.js");



const result = BQC.convert("a9090");



console.dir(result, {

&#x20;   depth: null

});

Tests

npm test

Example

npm run example

Evidence status



Every result distinguishes between statuses such as:



Observed

Established

Candidate

Verified

Rejected

Needs Revision

Unknown

Unresolved



Accepted into the archive does not mean independently verified.



Framework axiom

Frameworks do not prove claims.

Evidence does.



The framework organizes knowledge.

The archive earns knowledge.



Every archive statement must identify its domain, layer, evidence status,

and supporting record.



Claims without provenance are hypotheses, not archive knowledge.



Important limitation



PF-0006-H2 currently has the candidate form:



P(z,y,x) = T(z,y) + X(x)/10



The functions T and X remain unresolved. This implementation therefore

returns PF-0006 values only for explicitly recorded anchors.



Versioning

Package 0.1.0 ↔ Evidence Archive r0001



Future evidence revisions may receive later package versions.



The BQC Research Framework remains at version 1.0 unless the methodology

itself changes.



License



MIT





Save and close.



\---



\# 14. Add the framework document



Open:



```cmd

notepad docs\\FRAMEWORK.md



Add the ratified BQC Framework v1.0 material, including:



\# BQC Research Framework v1.0



```text

Status: Frozen / Complete / Ratified

Date: 2026-07-24

Framework Charter



The purpose of the BQC Research Framework is not to establish which BQC

theories are true.



Its purpose is to ensure that every BQC claim is documented, classified,

traceable, and open to revision according to evidence.



The Framework governs methodology.



The Evidence Archive governs scientific knowledge.





Then add the full layers, domains, lifecycle, record-ID format, statuses and versioning rules from the ratified framework.



Save and close.



\---



\# 15. Add Archive r0001



Open:



```cmd

notepad docs\\ARCHIVE-r0001.md



Start it with:



\# BQC Evidence Archive r0001



```text

Framework: BQC Research Framework v1.0

Archive revision: r0001

Date: 2026-07-24

Operational state

Canonical frontier: a0023



Generator:

&#x20;   G-0001-H1

&#x20;   Status: Needs Revision



Structure:

&#x20;   z/y/x decomposition

&#x20;   hierarchical alpha-tally carry

&#x20;   Status: Established within current evidence



Interpretation:

&#x20;   PF-0006-H2

&#x20;   Status: Candidate / anchor-consistent

Current records

Record	Domain	Layer	Content	Status

A1-0001	Canonical	1	Verified kernel through a0023	Observed

A2-0001	Canonical	2	G-0001-H1	Needs Revision

B3-0001	Structure	3	a0002 is invalid	Verified

B3-0002	Structure	3	z/y/x decomposition and carry	Established

C4-0001	Interpretation	4	PF-0001	Explicit rule

C4-0006	Interpretation	4	PF-0006-H2	Candidate

