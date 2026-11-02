"""Resume object storage.

Local disk is allowed only for development. Production requires an S3-compatible
object store so resumes are not tied to the API container filesystem.
"""
import os
from pathlib import Path

ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()
STORAGE_BACKEND = os.getenv("STORAGE_BACKEND", "local").lower()
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./storage/resumes"))
S3_BUCKET = os.getenv("S3_BUCKET", "")
S3_REGION = os.getenv("S3_REGION", "")
S3_ENDPOINT_URL = os.getenv("S3_ENDPOINT_URL", "")

if ENVIRONMENT == "production" and STORAGE_BACKEND != "s3":
    raise RuntimeError("Production requires STORAGE_BACKEND=s3; local resume storage is disabled")
if STORAGE_BACKEND == "s3" and not S3_BUCKET:
    raise RuntimeError("S3_BUCKET is required when STORAGE_BACKEND=s3")

_s3 = None

def _client():
    global _s3
    if _s3 is None:
        import boto3
        _s3 = boto3.client("s3", region_name=S3_REGION or None, endpoint_url=S3_ENDPOINT_URL or None)
    return _s3

def put_bytes(key: str, content: bytes, content_type: str) -> None:
    if STORAGE_BACKEND == "s3":
        _client().put_object(Bucket=S3_BUCKET, Key=key, Body=content, ContentType=content_type, ServerSideEncryption="AES256")
        return
    path = UPLOAD_DIR / key
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)

def delete(key: str) -> None:
    if STORAGE_BACKEND == "s3":
        _client().delete_object(Bucket=S3_BUCKET, Key=key)
        return
    (UPLOAD_DIR / key).unlink(missing_ok=True)
