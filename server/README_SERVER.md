Local Python server to parse XLSX files with pandas

Prereqs:
- Python 3.8+

Quick start (PowerShell):

```powershell
# create venv
python -m venv .venv
# activate
.venv\Scripts\Activate.ps1
# install
pip install -r requirements.txt
# run
python app.py
```

Server listens on `http://localhost:5000` and exposes:
- `POST /upload` - multipart/form-data with one or more `files` fields. Returns JSON with a summary per sheet (rows, columns and head rows).

Notes:
- The endpoint returns only a small summary (first 5 rows) to keep responses small. You can adapt `app.py` to return full data or to store results on disk/db.
- CORS is enabled for convenience in development. In production, restrict origins.
