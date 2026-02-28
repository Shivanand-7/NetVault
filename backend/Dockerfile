FROM python:3.9-slim

WORKDIR /app

# The Flex: Installing English, Hindi, and Malayalam OCR engines into the container OS
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-hin \
    tesseract-ocr-mal

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python", "app.py"]
