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

---

## 🚀 Quick Start: Run via Docker Hub (Recommended)
You do not need to clone this repository or install dependencies. If you have Docker installed, you can pull the pre-built images directly from the public registry and run them immediately.

**1. Run the Backend API (Port 5000):**
\`\`\`bash
docker run -d -p 5000:5000 --name netvault-backend shivanand77/backend:netvault
\`\`\`

**2. Run the Frontend UI (Port 3000):**
\`\`\`bash
docker run -d -p 3000:3000 --name netvault-frontend shivanand77/frontend:netvault
\`\`\`

**3. Access the Application:**
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 💻 Development: Build from Source
If you want to view the code, modify the UI, or build the images yourself:

1. Clone this repository:
   \`\`\`bash
   git clone https://github.com/Shivanand-7/NetVault.git
   cd NetVault
   \`\`\`
2. Build and spin up the containers using Docker Compose:
   \`\`\`bash
   docker compose up --build -d
   \`\`\`
3. Open your browser and navigate to `http://localhost:3000`.
