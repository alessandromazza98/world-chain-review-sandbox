'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { REPO, NAMES, gates } = require('./sandbox.cjs');

test('sandbox simulation requires current head signals and never runs outside the sandbox', () => {
  const pr = { number: 1, head: { sha: 'current' }, base: { repo: { full_name: REPO } } };
  const checks = NAMES.map((name, id) => ({ id, name, app: { slug: 'github-actions' }, head_sha: 'current',
    external_id: `sandbox-ai:${REPO}:1:current`, status: 'completed', conclusion: 'success' }));
  assert(Object.values(gates(checks, pr)).every((result) => result.state === 'success' && result.reason.includes('SIMULATED')));
  assert(Object.values(gates(checks, { ...pr, head: { sha: 'new' } })).every((result) => result.state === 'pending'));
  assert(Object.values(gates(checks.map((check) => ({ ...check, conclusion: 'cancelled' })), pr)).every((result) => result.state === 'failure'));
  assert.throws(() => gates(checks, { ...pr, base: { repo: { full_name: 'worldcoin/world-chain' } } }), /restricted/);
});
