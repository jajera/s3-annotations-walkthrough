import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeVintage from "starlight-theme-vintage";
import { starlightBasePath } from "starlight-base-path";

export default defineConfig({
  site: "https://jajera.github.io",
  base: "/s3-annotations-walkthrough/",
  integrations: [
    starlight({
      title: "S3 Annotations Walkthrough",
      favicon: "/favicon.svg",
      description:
        "A guided walkthrough of the terraform-aws-s3-annotations-demo — S3 Annotations, serverless ingest, and a filterable image gallery.",
      plugins: [starlightThemeVintage(), starlightBasePath()],
      routeMiddleware: "./src/routeData.ts",
      customCss: ["./src/styles/splash-overrides.css"],
      social: [
        {
          icon: "github",
          label: "Demo Source",
          href: "https://github.com/jajera/s3-annotations-walkthrough",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/jajera/s3-annotations-walkthrough/edit/main/",
      },
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Concepts",
          items: [
            {
              label: "What are S3 Annotations?",
              slug: "introduction/what-are-s3-annotations",
            },
          ],
        },
        {
          label: "Architecture",
          items: [
            {
              label: "Pipeline overview",
              slug: "architecture/pipeline-overview",
            },
          ],
        },
        {
          label: "Deploy and Operate",
          items: [
            {
              label: "Prerequisites, apply, ingest, and teardown",
              slug: "deploy-and-operate/prerequisites-apply-teardown",
            },
          ],
        },
        {
          label: "Pipeline Deep Dive",
          items: [
            {
              label: "Ingest: copy and annotate",
              slug: "pipeline-deep-dive/ingest-copy-and-annotate",
            },
            {
              label: "Annotation payload",
              slug: "pipeline-deep-dive/annotation-payload",
            },
            {
              label: "API: query and presign",
              slug: "pipeline-deep-dive/api-query-and-presign",
            },
            {
              label: "Optional DynamoDB mirror",
              slug: "pipeline-deep-dive/optional-dynamodb-mirror",
            },
          ],
        },
        {
          label: "Gallery and Presentation",
          items: [
            {
              label: "Amplify gallery",
              slug: "gallery-and-presentation/amplify-gallery",
            },
            {
              label: "Presenter script",
              slug: "gallery-and-presentation/presenter-script",
            },
          ],
        },
        {
          label: "Reference",
          items: [
            {
              label: "Demo project file map",
              slug: "reference/demo-file-map",
            },
            {
              label: "External links",
              slug: "reference/external-links",
            },
          ],
        },
      ],
    }),
  ],
});
