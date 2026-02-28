# NetVault – Containerized OCR and Analytics Platform

NetVault is a microservices-based web application built for Optical Character Recognition (OCR) and text analysis. It extracts metadata, keywords, and specific entities (emails, links, currency) from raw text and images.

## Features
* **Multi-Lingual OCR:** Extracts English, Malayalam, and Hindi text from images using the Tesseract OCR engine.
* **Smart Entity Extraction:** Uses custom Python Regular Expressions to find actionable data without relying on external cloud APIs.
* **Dark Mode UI:** Responsive interface with a theme toggle that saves user preferences locally.
* **Microservices Architecture:** Fully containerized deployment ensuring environment immutability.

## Tech Stack
* **Frontend:** Node.js, Express.js, HTML/CSS/JS
* **Backend:** Python, Flask, Tesseract OCR
* **Deployment:** Docker, Docker Compose

## How to Run Locally
1. Ensure Docker Desktop or Docker Engine is installed on your machine.
2. Clone this repository.
3. Open a terminal in the root directory and run:
   \`\`\`bash
   docker compose up --build -d
   \`\`\`
4. Open your browser and navigate to `http://localhost:3000`.
