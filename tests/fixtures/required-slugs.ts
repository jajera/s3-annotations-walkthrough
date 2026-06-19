export const REQUIRED_SLUGS = [
  "index",
  "introduction/what-are-s3-annotations",
  "architecture/pipeline-overview",
  "deploy-and-operate/prerequisites-apply-teardown",
  "pipeline-deep-dive/ingest-copy-and-annotate",
  "pipeline-deep-dive/annotation-payload",
  "pipeline-deep-dive/api-query-and-presign",
  "pipeline-deep-dive/optional-dynamodb-mirror",
  "gallery-and-presentation/amplify-gallery",
  "gallery-and-presentation/presenter-script",
  "reference/demo-file-map",
  "reference/external-links",
] as const;

export const REQUIRED_IMAGES = [
  "architecture.png",
  "namespaces.png",
  "webapp.png",
] as const;

export const REQUIRED_PUBLIC_FILES = ["og-image.png", "og-image.svg"] as const;
