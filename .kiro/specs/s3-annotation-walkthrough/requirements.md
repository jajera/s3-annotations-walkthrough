# Requirements Document

## Introduction

This document defines the requirements for the S3 Annotations Walkthrough documentation site — an Astro Starlight-based static documentation site that presents the [terraform-aws-s3-annotations-demo](https://github.com/jajera/terraform-aws-s3-annotations-demo) project walkthrough as a structured, navigable multi-page guide. The site covers S3 Annotations concepts, serverless pipeline architecture, deployment operations, and the filterable image gallery.

**Source material:** content is migrated from `docs/walkthrough.md` in the demo repository, supplemented where noted from `README.md` (scheduler options, Amplify deploy flags, post-destroy verification, and local sample images).

The project uses Vitest with fast-check for property-based testing, Prettier for formatting, Markdownlint for MDX linting, and deploys to GitHub Pages via GitHub Actions.

## Glossary

- **Site**: The Astro Starlight documentation site generated from this project (`jajera/s3-annotations-walkthrough`)
- **Demo_Project**: The `terraform-aws-s3-annotations-demo` repository containing Terraform, Lambda, and Amplify source code
- **Source_Material**: The demo project's `docs/walkthrough.md` and `README.md` files used as the authoritative content source for migration
- **Content_Page**: An MDX file in `src/content/docs/` that represents a single documentation page
- **Build_Pipeline**: The Astro build process that compiles MDX content into static HTML
- **Deploy_Workflow**: The GitHub Actions workflow that builds and deploys the site to GitHub Pages
- **Test_Suite**: The Vitest + fast-check property-based test collection in `tests/properties/`
- **Validation_Script**: The TypeScript script in `scripts/` that runs formatting and lint checks
- **Sidebar_Navigation**: The Starlight sidebar configuration that organizes content pages into sections
- **Content_Collection**: The Astro content collection defined for the `docs` directory

## Requirements

### Requirement 1: Project Scaffolding

**User Story:** As a developer, I want the project initialized with Astro Starlight and all required tooling, so that I can develop and build the documentation site locally.

#### Acceptance Criteria

1. THE Site SHALL use Astro as the static site framework with Starlight as the documentation theme
2. THE Site SHALL include a `package.json` with dependencies for Astro, Starlight, MDX, Vitest, fast-check, Prettier, and markdownlint-cli2
3. THE Site SHALL include an `.nvmrc` file specifying Node.js version 22
4. THE Site SHALL include a `tsconfig.json` for TypeScript configuration
5. THE Site SHALL include an `astro.config.mjs` file configuring Starlight with the site title "S3 Annotations Walkthrough"
6. THE Site SHALL include a `.prettierrc` file for Prettier formatting configuration
7. THE Site SHALL include a `.markdownlint.json` file for Markdownlint rules configuration
8. THE Site SHALL include a `vitest.config.ts` file for test runner configuration
9. THE Site SHALL include a `.gitignore` file excluding `node_modules/`, `dist/`, and `.astro/` directories

### Requirement 2: NPM Scripts

**User Story:** As a developer, I want standardized npm scripts, so that I can run common development tasks with consistent commands.

#### Acceptance Criteria

1. WHEN the `dev` script is executed, THE Build_Pipeline SHALL start a local development server
2. WHEN the `build` script is executed, THE Build_Pipeline SHALL produce a production build in the `dist/` directory
3. WHEN the `preview` script is executed, THE Build_Pipeline SHALL serve the production build locally for preview
4. WHEN the `validate` script is executed, THE Validation_Script SHALL run formatting and lint checks against the content
5. WHEN the `format` script is executed, THE Site SHALL auto-format all files using Prettier
6. WHEN the `lint` script is executed, THE Site SHALL lint all MDX content files in `src/**/*.mdx` using markdownlint-cli2
7. WHEN the `test` script is executed, THE Test_Suite SHALL run all property-based tests in single-execution mode using `vitest --run`

### Requirement 3: Documentation Content Structure

**User Story:** As a reader, I want the S3 Annotations walkthrough content organized into logical sections and pages, so that I can navigate and understand the material progressively.

#### Acceptance Criteria

1. THE Site SHALL include a landing page at `src/content/docs/index.mdx` that:
   - Introduces the GeoNet open-data volcano camera demo and the Te Kaha (`TKAH.01`) camera context
   - States what the walkthrough covers (metadata on the S3 object via annotations) and what it does not cover (production monitoring, advanced ML)
   - Links to the Demo_Project repository and to each major content section
2. THE Sidebar_Navigation SHALL organize content pages into the section groups and page slugs defined in Requirement 5
3. THE Site SHALL include a Content_Page at `src/content/docs/introduction/what-are-s3-annotations.mdx` migrated from Source_Material section "The S3 Annotations story", including:
   - The metadata-colocation concept and comparison table (annotations vs object tags, user metadata, sidecar files)
   - The "no server-side query" tradeoff and application-side filter pattern
   - IAM permission requirements (`s3:PutObjectAnnotation`, `s3:GetObjectAnnotation`)
   - Platform limitations where annotations are not supported
   - Namespace `environment` and CLI examples (`list-object-annotations`, `get-object-annotation`)
4. THE Site SHALL include a Content_Page at `src/content/docs/architecture/pipeline-overview.mdx` migrated from Source_Material section "Architecture", including:
   - The ingest → store → query → gallery pipeline stages
   - The component table (GeoNet source, EventBridge Scheduler, Lambdas, S3, optional DynamoDB, API Gateway, Amplify)
   - Default AWS region (`ap-southeast-2`) and Terraform output commands
5. THE Site SHALL include a Content_Page at `src/content/docs/deploy-and-operate/prerequisites-apply-teardown.mdx` migrated from Source_Material sections "Deploy and operate" and relevant README content, including:
   - Prerequisites (Terraform ≥ 1.6, Node.js, Python 3.14, AWS CLI, `pip3`, `zip`)
   - `terraform init` / `terraform apply` flow and key variables (`enable_dynamodb`, `enable_scheduler`, `deploy_amplify_on_apply`, `private_bucket_name`)
   - Manual ingest invoke and expected response fields (`images_copied`, `images_annotated`, `annotation_failures`)
   - Optional EventBridge one-time scheduler (`enable_scheduler`, `schedule_time`) and `deploy_amplify_on_apply=false` manual Amplify deploy path
   - `terraform destroy` teardown and post-destroy verification (`terraform state list`)
6. THE Site SHALL include a Content_Page at `src/content/docs/pipeline-deep-dive/ingest-copy-and-annotate.mdx` migrated from Source_Material section "Ingest: copy object + write annotation", including the 7-day lookback window, per-image steps, and object key pattern
7. THE Site SHALL include a Content_Page at `src/content/docs/pipeline-deep-dive/annotation-payload.mdx` migrated from Source_Material section "Annotation payload", including filterable fields, provenance fields, `schema_version`, `model`, and example JSON
8. THE Site SHALL include a Content_Page at `src/content/docs/pipeline-deep-dive/api-query-and-presign.mdx` migrated from Source_Material section "API: read annotations + presign images", including query parameters, response shape, pagination (`offset`, `limit`), and the default read path (list keys → parallel `GetObjectAnnotation` → filter)
9. THE Site SHALL include a Content_Page at `src/content/docs/pipeline-deep-dive/optional-dynamodb-mirror.mdx` migrated from Source_Material section "Optional DynamoDB mirror", including when to enable it and that S3 remains canonical
10. THE Site SHALL include a Content_Page at `src/content/docs/gallery-and-presentation/amplify-gallery.mdx` migrated from Source_Material section "Gallery (Amplify)", including filter UI behavior, pagination, tag chips, and manual `./scripts/deploy-amplify.sh` deploy
11. THE Site SHALL include a Content_Page at `src/content/docs/gallery-and-presentation/presenter-script.mdx` migrated from Source_Material section "Presenter script", including the suggested ~30–45 minute demo flow
12. THE Site SHALL include a Content_Page at `src/content/docs/reference/demo-file-map.mdx` migrated from Source_Material section "File reference" and "Build notes", including paths to Lambda, Terraform, Amplify, scripts, sample images (`samples/volcano/`), boto3 ≥ 1.43 requirement, and local pytest instructions
13. WHEN migrating content from Source_Material, THE Content_Page SHALL preserve substantive tables, CLI commands, JSON examples, and external links (GeoNet open data, AWS Registry of Open Data, Te Kaha camera page) present in the source section
14. THE Content_Page body (excluding frontmatter) SHALL NOT be empty for any page listed in this requirement

### Requirement 4: Content Page Format

**User Story:** As a reader, I want each documentation page to follow a consistent format, so that the content is predictable and easy to consume.

#### Acceptance Criteria

1. THE Content_Page SHALL use MDX format with Starlight-compatible frontmatter including `title` and `description` fields
2. THE Content_Page SHALL use valid Markdown heading hierarchy starting at level 2 within the page body
3. THE Content_Page SHALL use fenced code blocks with language identifiers for all code examples
4. WHEN a Content_Page includes shell commands, THE Content_Page SHALL use `bash` or `shell` as the code block language identifier
5. WHEN a Content_Page includes Terraform configuration, THE Content_Page SHALL use `hcl` as the code block language identifier
6. WHEN a Content_Page includes JSON examples, THE Content_Page SHALL use `json` as the code block language identifier
7. WHEN a Content_Page includes Python examples, THE Content_Page SHALL use `python` as the code block language identifier
8. WHEN a Content_Page includes plain-text diagrams or key patterns without syntax highlighting, THE Content_Page SHALL use `text` or `plaintext` as the code block language identifier
9. WHEN a Content_Page includes images from Source_Material, THE Content_Page SHALL use Markdown image syntax with descriptive alt text

### Requirement 5: Sidebar Navigation Configuration

**User Story:** As a reader, I want a well-organized sidebar navigation, so that I can find and move between documentation sections efficiently.

#### Acceptance Criteria

1. THE Sidebar_Navigation SHALL be configured in `astro.config.mjs` using Starlight sidebar items
2. THE Sidebar_Navigation SHALL define the following section groups, labels, and page slugs in reading order:

   | Section group            | Page slug                                         | Page title                                 |
   | ------------------------ | ------------------------------------------------- | ------------------------------------------ |
   | _(root)_                 | `index`                                           | S3 Annotations Walkthrough                 |
   | Introduction             | `introduction/what-are-s3-annotations`            | What are S3 Annotations?                   |
   | Architecture             | `architecture/pipeline-overview`                  | Pipeline overview                          |
   | Deploy and Operate       | `deploy-and-operate/prerequisites-apply-teardown` | Prerequisites, apply, ingest, and teardown |
   | Pipeline Deep Dive       | `pipeline-deep-dive/ingest-copy-and-annotate`     | Ingest: copy and annotate                  |
   | Pipeline Deep Dive       | `pipeline-deep-dive/annotation-payload`           | Annotation payload                         |
   | Pipeline Deep Dive       | `pipeline-deep-dive/api-query-and-presign`        | API: query and presign                     |
   | Pipeline Deep Dive       | `pipeline-deep-dive/optional-dynamodb-mirror`     | Optional DynamoDB mirror                   |
   | Gallery and Presentation | `gallery-and-presentation/amplify-gallery`        | Amplify gallery                            |
   | Gallery and Presentation | `gallery-and-presentation/presenter-script`       | Presenter script                           |
   | Reference                | `reference/demo-file-map`                         | Demo project file map                      |

3. THE Sidebar_Navigation SHALL order pages within each section to follow a logical reading progression from introduction to advanced topics
4. WHEN a reader navigates the sidebar, THE Site SHALL highlight the currently active page

### Requirement 6: GitHub Actions Deployment

**User Story:** As a maintainer, I want automated deployment to GitHub Pages, so that documentation updates are published automatically when changes are merged.

#### Acceptance Criteria

1. THE Deploy_Workflow SHALL be defined in `.github/workflows/deploy.yml`
2. WHEN a push to the `main` branch occurs, THE Deploy_Workflow SHALL trigger a build and deployment
3. THE Deploy_Workflow SHALL install Node.js dependencies, run the build, and deploy the output to GitHub Pages
4. THE Deploy_Workflow SHALL configure the Astro build with the correct base path for GitHub Pages (`/s3-annotations-walkthrough/`)
5. IF the build fails, THEN THE Deploy_Workflow SHALL report the failure without deploying

### Requirement 7: Property-Based Testing

**User Story:** As a developer, I want property-based tests validating content structure, so that documentation quality is maintained automatically.

#### Acceptance Criteria

1. THE Test_Suite SHALL be located in the `tests/properties/` directory
2. THE Test_Suite SHALL use Vitest as the test runner and fast-check for property-based test generation
3. THE Test_Suite SHALL include a property test verifying that all MDX content files contain valid frontmatter with required `title` and `description` fields
4. THE Test_Suite SHALL include a property test verifying that all MDX content files maintain valid heading hierarchy (no skipped heading levels)
5. THE Test_Suite SHALL include a property test verifying that all fenced code blocks in MDX files include a language identifier
6. THE Test_Suite SHALL include a property test verifying that every page slug listed in Requirement 5 has a corresponding MDX file in `src/content/docs/`
7. THE Test_Suite SHALL include a property test verifying that every Content_Page listed in Requirement 5 has a non-empty body after frontmatter removal
8. WHEN the `test` script is executed, THE Test_Suite SHALL exit with code 0 if all properties hold and exit with a non-zero code if any property fails

### Requirement 8: Content Validation Script

**User Story:** As a developer, I want a validation script that checks formatting and linting, so that I can verify content quality before committing.

#### Acceptance Criteria

1. THE Validation_Script SHALL be located at `scripts/validate-content.ts`
2. WHEN executed, THE Validation_Script SHALL run Prettier in check mode against all project files
3. WHEN executed, THE Validation_Script SHALL run markdownlint-cli2 against all MDX files in `src/`
4. IF any check fails, THEN THE Validation_Script SHALL exit with a non-zero code and report which checks failed
5. IF all checks pass, THEN THE Validation_Script SHALL exit with code 0

### Requirement 9: Static Assets

**User Story:** As a site visitor, I want the documentation site to include visual assets from the demo walkthrough, so that architecture and UI concepts are easy to understand.

#### Acceptance Criteria

1. THE Site SHALL include a favicon file in the `public/` directory
2. THE Site SHALL render the favicon in the browser tab when any page is loaded
3. THE Site SHALL include the following images copied from the Demo_Project `docs/` directory into `public/images/`:
   - `architecture.png` — architecture diagram (used on the pipeline overview page)
   - `namespaces.png` — annotation namespaces diagram (used on the S3 Annotations introduction page)
   - `webapp.png` — gallery screenshot (used on the Amplify gallery page)
4. WHEN a Content_Page references a walkthrough image, THE Content_Page SHALL use a path relative to the Site base URL (e.g. `/s3-annotations-walkthrough/images/architecture.png` in production)

### Requirement 10: Site Configuration

**User Story:** As a reader, I want the documentation site to have proper metadata and navigation links, so that I can identify the site and access both the documentation and demo source repositories.

#### Acceptance Criteria

1. THE Site SHALL display "S3 Annotations Walkthrough" as the site title
2. THE Site SHALL include a header link to the Demo_Project repository (`https://github.com/jajera/terraform-aws-s3-annotations-demo`) labeled to indicate it is the demo source code
3. THE Site SHALL configure the base URL path as `/s3-annotations-walkthrough/` for GitHub Pages deployment
4. THE Site SHALL include edit page links pointing to the Site repository (`https://github.com/jajera/s3-annotations-walkthrough`) on GitHub
5. THE Site SHALL enable Starlight built-in search across all Content_Pages
