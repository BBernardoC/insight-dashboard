from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    files = request.files.getlist('files')
    results = []

    for f in files:
        filename = secure_filename(f.filename or "unknown")
        try:
            # Use pandas to read all sheets and return a small summary (rows/cols + head)
            xls = pd.ExcelFile(f)
            sheets = {}
            for sheet_name in xls.sheet_names:
                df = xls.parse(sheet_name)
                sheets[sheet_name] = {
                    "rows": int(df.shape[0]),
                    "columns": int(df.shape[1]),
                    "head": df.head(5).fillna("").to_dict(orient="records"),
                }
            results.append({"filename": filename, "sheets": sheets})
        except Exception as e:
            results.append({"filename": filename, "error": str(e)})

    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
