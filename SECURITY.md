# Security Policy

## Supported Versions

The `main` branch is actively supported.

## Reporting a Vulnerability

Please do not open public issues for sensitive security problems.

Instead:

1. Share a private report with clear reproduction details.
2. Include affected files/endpoints and potential impact.
3. Provide proof-of-concept only when necessary.

We will acknowledge reports as quickly as possible and coordinate remediation.

## Secrets Handling

- Never commit `.env` files or credentials.
- Rotate keys immediately if exposure is suspected.
- Use least-privilege API keys in all environments.
