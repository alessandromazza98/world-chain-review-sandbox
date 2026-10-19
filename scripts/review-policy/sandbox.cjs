'use strict';

const REPO = 'alessandromazza98/world-chain-review-sandbox';
const NAMES = ['Sandbox Codex completion', 'Sandbox Bugbot completion'];

function gates(checks, pr) {
  if (pr.base.repo.full_name !== REPO) throw new Error('Simulated AI signals are restricted to the personal sandbox.');
  const external = `sandbox-ai:${REPO}:${pr.number}:${pr.head.sha}`;
  return Object.fromEntries(NAMES.map((name, index) => {
    const check = checks.filter((item) => item.name === name && item.app?.slug === 'github-actions'
      && item.head_sha === pr.head.sha && item.external_id === external).sort((a, b) => b.id - a.id)[0];
    const state = !check || check.status !== 'completed' ? 'pending' : check.conclusion === 'success' ? 'success' : 'failure';
    return [index ? 'bugbot-review-gate' : 'codex-review-gate', { state,
      reason: `SIMULATED — ${name}: ${state}. No AI model reviewed this code.` }];
  }));
}

module.exports = { REPO, NAMES, gates };
