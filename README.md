# S3 Annotations Walkthrough

Structured documentation site for the
[terraform-aws-s3-annotations-demo](https://github.com/jajera/terraform-aws-s3-annotations-demo)
project — an Astro Starlight guide covering S3 Annotations concepts, serverless
pipeline architecture, deployment operations, and the filterable image gallery.

**Live site:** [jajera.github.io/s3-annotations-walkthrough](https://jajera.github.io/s3-annotations-walkthrough/)

**Demo source:** [terraform-aws-s3-annotations-demo](https://github.com/jajera/terraform-aws-s3-annotations-demo)

## What this repo is

This repository publishes the walkthrough that was originally maintained as a
single file in the demo repo
([`docs/walkthrough.md`](https://github.com/jajera/terraform-aws-s3-annotations-demo/blob/main/docs/walkthrough.md)).
Content is split into navigable pages:

| Section                  | Topics                                                    |
| ------------------------ | --------------------------------------------------------- |
| Introduction             | What S3 Annotations are, tradeoffs, IAM, platform limits  |
| Architecture             | Ingest → store → query → gallery pipeline                 |
| Deploy and Operate       | Prerequisites, `terraform apply`, ingest, teardown        |
| Pipeline Deep Dive       | Ingest, annotation payload, API, optional DynamoDB mirror |
| Gallery and Presentation | Amplify UI and presenter script                           |
| Reference                | Demo project file map and build notes                     |

## Prerequisites

- [Node.js](https://nodejs.org/) **22** (see `.nvmrc`)
- npm

## Local development

```bash
npm ci
npm run dev
```

Open the URL printed by Astro (typically `http://localhost:4321/s3-annotations-walkthrough/`).

## Scripts

| Script             | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start local development server                     |
| `npm run build`    | Production build to `dist/`                        |
| `npm run preview`  | Serve the production build locally                 |
| `npm run validate` | Prettier check + markdownlint on MDX               |
| `npm run format`   | Auto-format with Prettier                          |
| `npm run lint`     | Lint MDX files in `src/`                           |
| `npm run test`     | Property-based content tests (Vitest + fast-check) |

Run the full quality gate before committing:

```bash
npm run validate && npm run test && npm run build
```

## Deployment

Pushes to `main` trigger
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which validates,
tests, builds, and deploys to GitHub Pages at `/s3-annotations-walkthrough/`.

## Content source

Walkthrough content is migrated from the demo repository:

- [`docs/walkthrough.md`](https://github.com/jajera/terraform-aws-s3-annotations-demo/blob/main/docs/walkthrough.md) — primary source
- [`README.md`](https://github.com/jajera/terraform-aws-s3-annotations-demo/blob/main/README.md) — scheduler, Amplify deploy flags, teardown notes

Diagrams and screenshots live in `public/images/` (copied from the demo `docs/` directory).

## Specs

Requirements, design, and implementation tasks for this site are in
[`.kiro/specs/s3-annotations-walkthrough/`](.kiro/specs/s3-annotations-walkthrough/).
