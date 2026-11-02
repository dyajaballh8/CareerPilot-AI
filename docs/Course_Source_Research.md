# Course source research — Phase 1

Phase 1 uses traditional course discovery and stores normalized metadata only. The provider layer now supports multiple official or approved feeds without scraping.

## Selected production sources

**Coursera** is supported through its official OAuth API, subject to a Business/Campus/Government agreement, registered application, enabled scopes, and organization content endpoint. It is the primary commercial catalog source when the required account access is available.

**edX Course Catalog / Enterprise API** is the selected replacement for DataCamp. edX publishes catalog and enterprise API documentation, and the adapter accepts an approved catalog endpoint with optional bearer credentials. Only metadata and canonical URLs should be persisted.

**MIT OpenCourseWare** is an optional open-learning source. It should be connected through an official feed or a dataset/API whose license allows the intended use, with attribution and canonical URLs retained.

## Explicitly excluded

DataCamp scraping is excluded. The official DataCamp Terms of Use prohibit automated searches, scraping, mining, and use of the service to build a similar or competitive product without authorization. DataCamp can only be added later if the team obtains a written partner/API agreement.

## Normalization contract

Every source maps into: `title`, `provider`, `category`, `level`, `duration`, `price`, `description`, and `source_url`. The ingestion adapter accepts either a JSON array or `{ "items": [...] }`, and the sync endpoint upserts by provider and title.

## Configuration

Set `COURSERA_*`, `EDX_CATALOG_URL`/`EDX_API_KEY`, and `MIT_OCW_CATALOG_URL` only after access and licensing are confirmed. Secrets belong in the deployment secret manager. The default seeded catalog remains available for local development only.

## References

- Coursera API onboarding: https://dev.coursera.com/get-started
- edX Course Catalog API guide: https://course-catalog-api-guide.readthedocs.io/en/latest/intro_edx_apis.html
- edX Enterprise API docs: https://enterprise-api-doc.edx.org/
- MIT OpenCourseWare: https://ocw.mit.edu/
- DataCamp Terms: https://www.datacamp.com/terms-of-use
