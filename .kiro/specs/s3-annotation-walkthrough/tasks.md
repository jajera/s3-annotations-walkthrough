# Implementation Plan: S3 Annotations Walkthrough

## Overview

This plan implements an Astro Starlight documentation site from scratch, covering project scaffolding, configuration, MDX content pages (11 pages across 6 sections), property-based tests, a validation script, static assets, and a GitHub Actions deployment workflow. TypeScript is used for tests and scripts; JavaScript for Astro configuration.

## Tasks

- [x] 1. Set up project scaffolding and configuration
  - [x] 1.1 Create package.json with dependencies and scripts
    - Initialize `package.json` with project name `s3-annotations-walkthrough`
    - Add dependencies: `astro`, `@astrojs/starlight`
    - Add devDependencies: `vitest`, `fast-check`, `prettier`, `markdownlint-cli2`, `tsx`, `typescript`
    - Add scripts: `dev`, `build`, `preview`, `validate`, `format`, `lint`, `test` per design
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 1.2 Create configuration files (.nvmrc, tsconfig.json, .prettierrc, .markdownlint.json, vitest.config.ts)
    - `.nvmrc` with Node.js version `22`
    - `tsconfig.json` extending Astro's TypeScript config
    - `.prettierrc` with formatting rules
    - `.markdownlint.json` with lint rules appropriate for MDX content
    - `vitest.config.ts` configuring the test runner
    - _Requirements: 1.3, 1.4, 1.6, 1.7, 1.8_

  - [x] 1.3 Create .gitignore file
    - Exclude `node_modules/`, `dist/`, and `.astro/` directories
    - _Requirements: 1.9_

  - [x] 1.4 Create astro.config.mjs with Starlight integration and sidebar
    - Configure `site` and `base` for GitHub Pages (`/s3-annotations-walkthrough/`)
    - Set title to "S3 Annotations Walkthrough"
    - Configure `social` link to demo repository with label "Demo Source"
    - Configure `editLink.baseUrl` to docs repository
    - Define full sidebar navigation structure with all 11 pages across 6 section groups
    - _Requirements: 1.1, 1.5, 5.1, 5.2, 5.3, 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 1.5 Create src/content/config.ts and src/env.d.ts
    - Define content collection schema extending Starlight's `docsSchema` with required `description` field
    - Create Astro type declarations file
    - _Requirements: 1.1, 4.1_

- [x] 2. Checkpoint - Ensure scaffolding is complete
  - Ensure all configuration files are in place, ask the user if questions arise.

- [x] 3. Create static assets and public directory
  - [x] 3.1 Create favicon and image placeholders
    - Create `public/favicon.svg` with an appropriate SVG favicon
    - Create `public/images/` directory with placeholder files for `architecture.png`, `namespaces.png`, and `webapp.png`
    - Note: actual images should be copied from the demo repository's `docs/` directory
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 4. Implement MDX content pages — Landing and Introduction
  - [x] 4.1 Create landing page (src/content/docs/index.mdx)
    - Add frontmatter with title "S3 Annotations Walkthrough" and description
    - Introduce GeoNet open-data volcano camera demo and Te Kaha (`TKAH.01`) camera
    - State scope (metadata via annotations) and non-scope (production monitoring, advanced ML)
    - Link to demo repository
    - Provide navigation links to each major section
    - _Requirements: 3.1, 4.1, 4.2, 3.14_

  - [x] 4.2 Create introduction page (src/content/docs/introduction/what-are-s3-annotations.mdx)
    - Add frontmatter with title "What are S3 Annotations?" and description
    - Migrate content from Source_Material "The S3 Annotations story" section
    - Include metadata-colocation concept and comparison table
    - Include "no server-side query" tradeoff and application-side filter pattern
    - Include IAM permission requirements and platform limitations
    - Include namespace `environment` and CLI examples
    - Reference `namespaces.png` image with descriptive alt text
    - _Requirements: 3.3, 4.1, 4.2, 4.3, 4.4, 4.6, 4.8, 4.9, 9.4, 3.13, 3.14_

- [x] 5. Implement MDX content pages — Architecture and Deploy
  - [x] 5.1 Create architecture page (src/content/docs/architecture/pipeline-overview.mdx)
    - Add frontmatter with title "Pipeline overview" and description
    - Migrate content from Source_Material "Architecture" section
    - Include pipeline stages (ingest → store → query → gallery)
    - Include component table
    - Include default AWS region and Terraform output commands
    - Reference `architecture.png` image with descriptive alt text
    - _Requirements: 3.4, 4.1, 4.2, 4.3, 4.5, 4.9, 9.4, 3.13, 3.14_

  - [x] 5.2 Create deploy and operate page (src/content/docs/deploy-and-operate/prerequisites-apply-teardown.mdx)
    - Add frontmatter with title "Prerequisites, apply, ingest, and teardown" and description
    - Migrate content from Source_Material "Deploy and operate" section and relevant README content
    - Include prerequisites list (Terraform ≥ 1.6, Node.js, Python 3.14, AWS CLI, pip3, zip)
    - Include `terraform init` / `terraform apply` flow and key variables
    - Include manual ingest invoke and response fields
    - Include optional EventBridge scheduler and manual Amplify deploy path
    - Include `terraform destroy` and post-destroy verification
    - _Requirements: 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 3.13, 3.14_

- [x] 6. Implement MDX content pages — Pipeline Deep Dive
  - [x] 6.1 Create ingest page (src/content/docs/pipeline-deep-dive/ingest-copy-and-annotate.mdx)
    - Add frontmatter with title "Ingest: copy and annotate" and description
    - Migrate content about 7-day lookback window, per-image steps, and object key pattern
    - _Requirements: 3.6, 4.1, 4.2, 4.3, 4.4, 4.8, 3.13, 3.14_

  - [x] 6.2 Create annotation payload page (src/content/docs/pipeline-deep-dive/annotation-payload.mdx)
    - Add frontmatter with title "Annotation payload" and description
    - Migrate content about filterable fields, provenance fields, `schema_version`, `model`, and example JSON
    - _Requirements: 3.7, 4.1, 4.2, 4.3, 4.6, 3.13, 3.14_

  - [x] 6.3 Create API query page (src/content/docs/pipeline-deep-dive/api-query-and-presign.mdx)
    - Add frontmatter with title "API: query and presign" and description
    - Migrate content about query parameters, response shape, pagination, and default read path
    - _Requirements: 3.8, 4.1, 4.2, 4.3, 4.4, 4.6, 3.13, 3.14_

  - [x] 6.4 Create optional DynamoDB page (src/content/docs/pipeline-deep-dive/optional-dynamodb-mirror.mdx)
    - Add frontmatter with title "Optional DynamoDB mirror" and description
    - Migrate content about when to enable and S3 remaining canonical
    - _Requirements: 3.9, 4.1, 4.2, 4.3, 3.13, 3.14_

- [x] 7. Implement MDX content pages — Gallery, Presentation, and Reference
  - [x] 7.1 Create Amplify gallery page (src/content/docs/gallery-and-presentation/amplify-gallery.mdx)
    - Add frontmatter with title "Amplify gallery" and description
    - Migrate content about filter UI behavior, pagination, tag chips, and manual deploy script
    - Reference `webapp.png` image with descriptive alt text
    - _Requirements: 3.10, 4.1, 4.2, 4.3, 4.4, 4.9, 9.4, 3.13, 3.14_

  - [x] 7.2 Create demo file map page (src/content/docs/reference/demo-file-map.mdx)
    - Add frontmatter with title "Demo project file map" and description
    - Migrate content about paths to Lambda, Terraform, Amplify, scripts, sample images
    - Include boto3 ≥ 1.43 requirement and local pytest instructions
    - _Requirements: 3.12, 4.1, 4.2, 4.3, 4.7, 3.13, 3.14_

- [x] 8. Checkpoint - Ensure content pages are complete
  - Ensure all 11 MDX content pages are created with proper frontmatter, heading hierarchy, and code block language identifiers. Ask the user if questions arise.

- [x] 9. Implement property-based tests
  - [x] 9.1 Create shared slug manifest (tests/fixtures/required-slugs.ts)
    - Define `REQUIRED_SLUGS` constant array with all 11 page slugs
    - Keep in sync with sidebar configuration in `astro.config.mjs`
    - _Requirements: 7.6_

  - [x] 9.2 Create frontmatter property test (tests/properties/frontmatter.test.ts)
    - **Property 1: Frontmatter validity**
    - Use fast-check `fc.constantFrom(...)` to sample from all MDX files
    - Assert each file has valid YAML frontmatter with non-empty `title` and `description`
    - **Validates: Requirements 4.1, 7.3**

  - [x] 9.3 Create heading hierarchy property test (tests/properties/headings.test.ts)
    - **Property 2: Heading hierarchy validity**
    - Use fast-check to verify no skipped heading levels in any MDX file
    - **Validates: Requirements 4.2, 7.4**

  - [x] 9.4 Create code block language property test (tests/properties/code-blocks.test.ts)
    - **Property 3: Code block language identifiers**
    - Use fast-check to verify all fenced code blocks include a language identifier
    - **Validates: Requirements 4.3, 7.5**

  - [x] 9.5 Create slug correspondence property test (tests/properties/slugs.test.ts)
    - **Property 4: Slug-to-file correspondence**
    - Use fast-check with `REQUIRED_SLUGS` to verify each slug has a corresponding MDX file
    - **Validates: Requirements 5.2, 7.6**

  - [x] 9.6 Create content body property test (tests/properties/content-body.test.ts)
    - **Property 5: Non-empty page body**
    - Use fast-check with `REQUIRED_SLUGS` to verify each page has non-empty content after frontmatter removal
    - **Validates: Requirements 3.14, 7.7**

  - [x] 9.7 Create static assets property test (tests/properties/static-assets.test.ts)
    - **Property 6: Required static assets**
    - Use fast-check to verify `architecture.png`, `namespaces.png`, and `webapp.png` exist in `public/images/`
    - **Validates: Requirements 9.3**

- [x] 10. Implement validation script and GitHub Actions workflow
  - [x] 10.1 Create validation script (scripts/validate-content.ts)
    - Run Prettier in check mode against all project files
    - Run markdownlint-cli2 against all MDX files in `src/`
    - Report which checks failed with clear labels
    - Exit non-zero if any check fails, exit 0 if all pass
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 10.2 Create GitHub Actions deployment workflow (.github/workflows/deploy.yml)
    - Trigger on push to `main` branch and `workflow_dispatch`
    - Build job: checkout, validate, test, then use `withastro/action@v3` for build
    - Deploy job: use `actions/deploy-pages@v4` with proper permissions
    - Configure Node.js 22 and correct base path
    - Fail closed — deploy is skipped if build fails
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP (none marked optional in this plan — all tests are integral to the content validation strategy)
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Static asset images should be copied from the demo repository's `docs/` directory — placeholder files are created during scaffolding
- The implementation language is TypeScript for tests/scripts and JavaScript for Astro configuration

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["1.4", "1.5"] },
    { "id": 2, "tasks": ["3.1", "9.1"] },
    { "id": 3, "tasks": ["4.1", "4.2", "5.1", "5.2"] },
    { "id": 4, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 5, "tasks": ["7.1", "7.2"] },
    { "id": 6, "tasks": ["9.2", "9.3", "9.4", "9.5", "9.6", "9.7"] },
    { "id": 7, "tasks": ["10.1", "10.2"] }
  ]
}
```
