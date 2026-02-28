from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from collections import Counter
import pytesseract
from PIL import Image

app = Flask(__name__)
CORS(app)

cloud_vault = []
stop_words = {'the', 'is', 'in', 'and', 'to', 'a', 'of', 'for', 'it', 'on', 'with', 'as', 'this', 'that', 'are', 'be', 'from', 'by', 'at'}

def extract_entities(text):
    emails = list(set(re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)))
    urls = list(set(re.findall(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', text)))
    currency = list(set(re.findall(r'[\$€₹]\s*\d+(?:,\d{3})*(?:\.\d{2})?', text)))
    return {"emails": emails, "urls": urls, "currency": currency}

def process_text_data(text):
    words = re.findall(r'\b\w+\b', text.lower())
    word_count = len(words)
    reading_time = max(1, round(word_count / 200))
    filtered_words = [w for w in words if w not in stop_words and len(w) > 3]
    top_keywords = [word[0] for word in Counter(filtered_words).most_common(4)]
    entities = extract_entities(text)
    
    return {
        "text": text,
        "words": word_count,
        "reading_time": f"{reading_time} min read",
        "keywords": top_keywords,
        "entities": entities
    }

@app.route('/api/analyze_text', methods=['POST'])
def analyze_text():
    return jsonify(process_text_data(request.json.get('text', '')))

@app.route('/api/upload_analyze', methods=['POST'])
def upload_analyze():
    if 'file' not in request.files: return jsonify({"error": "No file uploaded"}), 400
    try:
        img = Image.open(request.files['file'].stream)
        # Instructing Tesseract to look for Eng, Mal, and Hin
        extracted_text = pytesseract.image_to_string(img, lang='eng+mal+hin').strip()
        
        if not extracted_text: return jsonify({"error": "No text detected."})
        return jsonify(process_text_data(extracted_text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/vault', methods=['GET', 'POST'])
def manage_vault():
    if request.method == 'POST':
        data = request.json
        new_doc = {
            "id": len(cloud_vault) + 1,
            "title": data.get('title', 'Untitled Document'),
            "entities": data.get('entities', {}),
            "text": data.get('text', '')
        }
        cloud_vault.append(new_doc)
        return jsonify({"message": "Saved"}), 201
    return jsonify({"documents": cloud_vault}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
