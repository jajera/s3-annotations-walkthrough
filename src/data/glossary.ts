export const glossary: Record<string, string> = {
  amplify:
    "AWS Amplify Hosting — serves the React gallery SPA that filters images using annotation-backed metadata.",
  "api-gateway":
    "Amazon API Gateway HTTP API — exposes GET /images with CORS; invokes the query Lambda.",
  dynamodb:
    "Amazon DynamoDB — optional denormalized mirror of annotation fields for faster reads at larger scale; S3 remains canonical.",
  environment:
    "S3 Annotations namespace on each object in this demo (ANNOTATION_NAMESPACE). Holds the JSON metadata payload.",
  eventbridge:
    "Amazon EventBridge Scheduler — optional one-time trigger to run the ingest Lambda at a chosen UTC time.",
  geonet:
    "GeoNet — Aotearoa New Zealand's geological hazard monitoring programme. Sensors, cameras, and open data (including s3://geonet-open-data via the AWS Open Data Registry).",
  ngmc: "National Geohazards Monitoring Centre (Te Puna Mōrearea i te Rū) — GNS Science facility in Lower Hutt. Geohazard analysts monitor live GeoNet feeds 24/7 for earthquakes, volcanoes, tsunami, and landslides.",
  lambda:
    "AWS Lambda — serverless compute. This demo uses volcano-ingest (copy + annotate) and volcano-api (query + presign).",
  "s3-annotations":
    "Amazon S3 Annotations — attach structured JSON metadata to S3 objects via named namespaces (put_object_annotation / get_object_annotation).",
  "te-kaha":
    "Te Kaha (TKAH.01) — the single GeoNet volcano camera this demo ingests. West-facing site on the Bay of Plenty coast, Aotearoa New Zealand; captures a JPEG every 10 minutes with Whakaari/White Island on the horizon.",
  tkah: "Volcano site code for Te Kaha in GeoNet object key paths (TKAH/TKAH.01). This demo filters ingest to this prefix only.",
  whakaari:
    "Whakaari/White Island — active offshore volcano in the Bay of Plenty, Aotearoa New Zealand, monitored by GeoNet and visible from the Te Kaha camera used in this demo.",
};
