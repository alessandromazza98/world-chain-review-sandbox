# Review policy sandbox

This public personal fork demonstrates the World Chain review policy without
requiring Codex or Bugbot subscriptions. **Both AI completion signals are
simulated on every PR commit. No AI reviewer is being run.** The check summaries
say SIMULATED, and the adapter accepts those signals only in this repository.

Risk classification, CODEOWNERS, author confirmation, CI aggregation and GitHub's
requirement to resolve every review thread use the real implementation.
The inherited Rust, proof, deployment and release workflows are disabled here;
only policy tests, the large-file check, event notification, the controller and
the sandbox signal publisher are enabled. This is not a node CI environment.

## Try the important-risk PR

1. Open the demo PR and wait for CI and the two simulated AI gates.
2. Post `/approve` as the entire body of a comment in the PR conversation.
   The human gate becomes green because you are the author and code owner.
3. In **Files changed**, add a comment on a changed line using the `+` button and
   publish it. That creates an unresolved review thread and blocks merging even
   though all four policy checks are green. A top-level PR comment does not.
4. Click **Resolve conversation**. The merge requirement clears.
5. Post `/unapprove` to revoke your confirmation; the human gate fails again.
6. Push another commit. Human confirmation survives, while CI and simulated AI
   completion must be renewed for the new head.

Auto-merge is opt-in. The demo PR remains open for you to experiment with.

## Other risk levels

Changes under `docs/review-sandbox/` are low risk: an owner author needs no human
confirmation. Files under `review-sandbox/` use the default important tier.
Changes under `scripts/review-policy/` are critical: two distinct people are
required, so you need another collaborator who is also listed in CODEOWNERS to
complete that scenario. No one is invited automatically.

This sandbox tests the merge process and unresolved conversations. It does not
validate actual Codex or Bugbot identities, findings, timing or completion
formats; those still need a pilot with the real integrations on world-chain.
