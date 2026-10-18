# Security policy

## Supported versions

Only the latest local beta line is maintained before 1.0. No published package or hosted service currently exists.

## Reporting

Do not open a public issue containing an undisclosed vulnerability, private key, token, customer record, or exploit detail. Report privately to the repository owner through the private channel they designate when the repository is hosted. Until then, keep the report local and include affected versions, reproduction steps, impact, and a suggested mitigation when known.

## Scope

Nexaline UI processes DOM elements and application-provided strings. It does not provide HTML sanitization, authentication, authorization, CSRF protection, storage encryption, or backend validation. Applications must escape untrusted server-rendered content and must not inject untrusted SVG or HTML through component APIs.
