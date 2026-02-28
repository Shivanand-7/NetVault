const express = require('express');
const app = express();
const port = 3000;

const globalHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        /* CSS Variables for Light/Dark Mode */
        :root {
            --bg-main: #fcfdfe;
            --text-main: #1e3a8a;
            --text-muted: #64748b;
            --card-bg: #ffffff;
            --border-color: #cbd5e1;
            --dropzone-bg: #fafafa;
            --btn-primary: #1e3a8a;
            --btn-primary-hover: #172554;
            --stat-bg: #f8fafc;
            --tag-bg: #eff6ff;
            --tag-text: #1d4ed8;
            --nav-shadow: rgba(0,0,0,0.03);
        }

        .dark-theme {
            --bg-main: #020617;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --card-bg: #0f172a;
            --border-color: #1e293b;
            --dropzone-bg: #020617;
            --btn-primary: #3b82f6;
            --btn-primary-hover: #2563eb;
            --stat-bg: #020617;
            --tag-bg: #1e293b;
            --tag-text: #60a5fa;
            --nav-shadow: rgba(0,0,0,0.5);
        }
        
        body { font-family: 'Poppins', sans-serif; margin: 0; background-color: var(--bg-main); color: var(--text-main); min-height: 100vh; overflow-x: hidden; transition: background-color 0.3s, color 0.3s; }
        
        /* Navbar */
        .navbar { background: var(--card-bg); padding: 1.2rem 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px var(--nav-shadow); transition: background-color 0.3s; }
        .logo { font-weight: 700; font-size: 1.5rem; color: var(--text-main); display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 1rem; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover, .nav-links a.active { color: var(--btn-primary); }

        /* Theme Toggle Button */
        .theme-toggle { background: transparent; border: 1px solid var(--border-color); color: var(--text-main); padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 1.2rem; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .theme-toggle:hover { background: var(--stat-bg); border-color: var(--text-muted); }

        /* Main Container & Hero */
        .hero { text-align: center; margin: 4rem 0 2rem 0; }
        .hero h1 { font-size: 2.8rem; font-weight: 600; margin: 0 0 10px 0; }
        .hero p { color: var(--text-muted); font-size: 1.1rem; margin: 0; }

        .container { max-width: 900px; margin: 0 auto; padding: 0 20px 4rem 20px; }
        
        /* Upload Card */
        .upload-card { background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-color); box-shadow: 0 20px 40px rgba(0,0,0,0.06); padding: 25px; margin-top: 2rem; transition: background-color 0.3s; }
        
        .dropzone { border: 2px dashed var(--border-color); border-radius: 12px; padding: 4rem 2rem; text-align: center; transition: all 0.3s; background: var(--dropzone-bg); position: relative; }
        .dropzone:hover { border-color: var(--text-muted); }
        
        .files-illustration { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
        .files-illustration svg { width: 50px; height: 50px; color: #fca5a5; }
        
        .dropzone h3 { margin: 0 0 20px 0; font-size: 1.3rem; font-weight: 500; }
        
        input[type="file"] { display: none; }
        .browse-btn { background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-main); padding: 10px 24px; border-radius: 8px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
        .browse-btn:hover { border-color: var(--text-muted); }
        
        .action-group { display: flex; justify-content: center; gap: 15px; margin-top: 25px; }
        .btn-primary { background: var(--btn-primary); color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 500; cursor: pointer; transition: 0.2s; font-size: 1rem; }
        .btn-primary:hover { background: var(--btn-primary-hover); }

        .card-footer { display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.8rem; color: var(--text-muted); padding: 0 10px; }

        textarea, input[type="text"] { width: 100%; padding: 15px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; font-size: 1rem; color: var(--text-main); box-sizing: border-box; outline: none; transition: 0.2s; margin-bottom: 20px; }
        textarea:focus, input[type="text"]:focus { border-color: var(--btn-primary); }

        /* Results & Stats */
        .results-panel { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border-color); padding: 25px; margin-top: 2rem; transition: background-color 0.3s; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }
        .stat-box { background: var(--stat-bg); border: 1px solid var(--border-color); padding: 15px; border-radius: 8px; text-align: center; }
        .stat-label { color: var(--text-muted); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
        .stat-value { color: var(--btn-primary); font-size: 1.5rem; font-weight: 700; }
        
        .entity-tag { display: inline-block; background: var(--tag-bg); color: var(--tag-text); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; margin: 0 8px 8px 0; font-weight: 500; border: 1px solid var(--border-color); }
        
        .raw-text { background: var(--stat-bg); padding: 15px; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 0.9rem; color: var(--text-muted); border: 1px solid var(--border-color); max-height: 200px; overflow-y: auto; white-space: pre-wrap; margin-top: 15px; }
        
        #imagePreview { display: none; max-width: 100%; max-height: 250px; margin: 0 auto 20px auto; border-radius: 8px; object-fit: contain; }
        
        .vault-item { border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 20px; }
        .vault-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    </style>
`;

const svgIcons = {
    folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#fbbf24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    fileImg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
};

const navBarHTML = (activePage) => `
    <nav class="navbar">
        <a href="/" class="logo">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#3b82f6" />
                        <stop offset="100%" stop-color="#1e3a8a" />
                    </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="url(#vaultGrad)"/>
                <path d="M9 13L16 17.5L23 13M16 17.5V25M16 6L9 10.5V19.5L16 24L23 19.5V10.5L16 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 
            NetVault
        </a>
        <div class="nav-links">
            <a href="/" class="${activePage === 'text' ? 'active' : ''}">Text Analyzer</a>
            <a href="/vision" class="${activePage === 'vision' ? 'active' : ''}">Image OCR</a>
            <a href="/vault" class="${activePage === 'vault' ? 'active' : ''}">Cloud Vault</a>
            <button class="theme-toggle" id="themeBtn" onclick="toggleTheme()" title="Toggle Dark Mode">🌙</button>
        </div>
    </nav>
`;

const clientScripts = `
    <script>
        // --- Dark Mode Logic ---
        const initTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if(savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                document.getElementById('themeBtn').innerText = '☀️';
            }
        };
        
        const toggleTheme = () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            document.getElementById('themeBtn').innerText = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
        
        document.addEventListener('DOMContentLoaded', initTheme);

        // --- App Logic ---
        let currentAnalysis = {};
        
        const formatEntities = (entities) => {
            let html = '';
            if(entities.emails && entities.emails.length > 0) entities.emails.forEach(e => html += \`<div class="entity-tag">📧 \${e}</div>\`);
            if(entities.urls && entities.urls.length > 0) entities.urls.forEach(u => html += \`<div class="entity-tag">🔗 \${u}</div>\`);
            if(entities.currency && entities.currency.length > 0) entities.currency.forEach(c => html += \`<div class="entity-tag">💰 \${c}</div>\`);
            
            if(html === '') return '<div style="color: var(--text-muted); font-size: 0.9rem;">No identifiable emails, links, or amounts found.</div>';
            return html;
        };

        const displayResults = (data) => {
            if(data.error) return alert("Error: " + data.error);
            currentAnalysis = data;
            
            document.getElementById('wordCount').innerText = data.words;
            document.getElementById('readTime').innerText = data.reading_time;
            document.getElementById('keywords').innerText = data.keywords.join(', ') || '-';
            
            document.getElementById('entitiesBox').innerHTML = formatEntities(data.entities);
            document.getElementById('rawDocText').innerText = data.text;
            
            document.getElementById('resultsSection').style.display = 'block';
        };

        const saveToCloud = () => {
            const title = document.getElementById('docTitle').value || 'Untitled Document';
            fetch('http://localhost:5000/api/vault', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, entities: currentAnalysis.entities, text: currentAnalysis.text })
            }).then(() => {
                const btn = document.getElementById('saveBtn');
                btn.innerText = "Saved Successfully!";
                btn.style.background = "#22c55e";
                setTimeout(() => {
                    document.getElementById('docTitle').value = '';
                    document.getElementById('resultsSection').style.display = 'none';
                    btn.innerText = "Save to Cloud";
                    btn.style.background = "var(--btn-primary)";
                }, 2000);
            });
        };

        const copyText = (elementId, btnElement) => {
            const textToCopy = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btnElement.innerText;
                btnElement.innerText = "Copied!";
                setTimeout(() => { btnElement.innerText = originalText; }, 2000);
            });
        };
    </script>
`;

const textHTML = `
<!DOCTYPE html><html><head><title>Text Analyzer | NetVault</title>${globalHead}</head><body>
    ${navBarHTML('text')}
    
    <div class="hero">
        <h1>Text Analytics Engine</h1>
        <p>Extract metadata, keywords, and entities from raw text payloads.</p>
    </div>

    <div class="container">
        <div class="upload-card">
            <h3 style="margin-top:0;">Input Document</h3>
            <textarea id="textInput" rows="6" placeholder="Paste your text here..."></textarea>
            <div style="text-align: center;">
                <button class="btn-primary" onclick="analyzeText()">Analyze Text</button>
            </div>
        </div>
        
        <div id="resultsSection" class="results-panel" style="display:none;">
            <div class="stats-grid">
                <div class="stat-box"><div class="stat-label">Total Words</div><div class="stat-value" id="wordCount">0</div></div>
                <div class="stat-box"><div class="stat-label">Est. Read Time</div><div class="stat-value" id="readTime">0</div></div>
                <div class="stat-box"><div class="stat-label">Top Keywords</div><div class="stat-value" id="keywords" style="font-size: 1.2rem;">-</div></div>
            </div>
            
            <h4 style="margin-bottom:10px;">Smart Entities</h4>
            <div id="entitiesBox" style="margin-bottom: 25px;"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin:0;">Raw Output</h4>
                <button onclick="copyText('rawDocText', this)" style="background:transparent; color:var(--text-main); border:1px solid var(--border-color); padding:5px 15px; border-radius:6px; cursor:pointer;">Copy</button>
            </div>
            <div id="rawDocText" class="raw-text"></div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed var(--border-color);">
                <h4 style="margin-top:0;">Save to Database</h4>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="docTitle" placeholder="Document Title..." style="margin:0;">
                    <button id="saveBtn" class="btn-primary" style="white-space: nowrap;" onclick="saveToCloud()">Save to Cloud</button>
                </div>
            </div>
        </div>
    </div>
    ${clientScripts}
    <script>
        const analyzeText = () => {
            const text = document.getElementById('textInput').value;
            if(!text) return;
            fetch('http://localhost:5000/api/analyze_text', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
            }).then(res => res.json()).then(displayResults);
        };
    </script>
</body></html>
`;

const visionHTML = `
<!DOCTYPE html><html><head><title>OCR Engine | NetVault</title>${globalHead}</head><body>
    ${navBarHTML('vision')}
    
    <div class="hero">
        <h1>Free Online OCR</h1>
        <p>Extract text from Images and Documents with one click.</p>
    </div>

    <div class="container">
        <div class="upload-card">
            <div class="dropzone">
                <img id="imagePreview" alt="Image Preview">
                
                <div id="uploadPrompt">
                    <div class="files-illustration">
                        ${svgIcons.fileImg}
                        ${svgIcons.fileText}
                    </div>
                    <h3>Drag & Drop files here to upload</h3>
                </div>

                <div class="action-group">
                    <label class="browse-btn">
                        ${svgIcons.folder} Browse Files
                        <input type="file" id="imageInput" accept="image/*" onchange="showPreview(event)">
                    </label>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn-primary" id="scanBtn" onclick="uploadImage()">Extract Text</button>
                <div id="loading" style="display:none; color: var(--btn-primary); margin-top: 15px; font-weight: 500;">Scanning image pixels...</div>
            </div>

            <div class="card-footer">
                <div>🛡️ Privacy Protected: We do not transmit or store any data without consent.</div>
                <div>Supported files ⓘ</div>
            </div>
        </div>
        
        <div id="resultsSection" class="results-panel" style="display:none;">
            <div class="stats-grid">
                <div class="stat-box"><div class="stat-label">Words Detected</div><div class="stat-value" id="wordCount">0</div></div>
                <div class="stat-box"><div class="stat-label">Est. Read Time</div><div class="stat-value" id="readTime">0</div></div>
                <div class="stat-box"><div class="stat-label">Top Keywords</div><div class="stat-value" id="keywords" style="font-size: 1.2rem;">-</div></div>
            </div>
            
            <h4 style="margin-bottom:10px;">Smart Entities</h4>
            <div id="entitiesBox" style="margin-bottom: 25px;"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin:0;">Raw Output</h4>
                <button onclick="copyText('rawDocText', this)" style="background:transparent; color:var(--text-main); border:1px solid var(--border-color); padding:5px 15px; border-radius:6px; cursor:pointer;">Copy</button>
            </div>
            <div id="rawDocText" class="raw-text"></div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed var(--border-color);">
                <h4 style="margin-top:0;">Save to Database</h4>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="docTitle" placeholder="Document Title (e.g., Receipt 001)" style="margin:0;">
                    <button id="saveBtn" class="btn-primary" style="white-space: nowrap;" onclick="saveToCloud()">Save to Cloud</button>
                </div>
            </div>
        </div>
    </div>
    ${clientScripts}
    <script>
        const showPreview = (event) => {
            if(event.target.files.length > 0){
                const src = URL.createObjectURL(event.target.files[0]);
                const preview = document.getElementById('imagePreview');
                preview.src = src;
                preview.style.display = 'block';
                document.getElementById('uploadPrompt').style.display = 'none';
            }
        };

        const uploadImage = () => {
            const fileInput = document.getElementById('imageInput');
            if(fileInput.files.length === 0) return alert("Please select an image first!");
            const formData = new FormData(); formData.append('file', fileInput.files[0]);
            
            document.getElementById('scanBtn').style.display = 'none';
            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultsSection').style.display = 'none';
            
            fetch('http://localhost:5000/api/upload_analyze', { method: 'POST', body: formData })
            .then(res => res.json()).then(data => {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('scanBtn').style.display = 'inline-block';
                displayResults(data);
            });
        };
    </script>
</body></html>
`;

const vaultHTML = `
<!DOCTYPE html><html><head><title>Cloud Vault | NetVault</title>${globalHead}</head><body>
    ${navBarHTML('vault')}
    
    <div class="hero">
        <h1>Secure Cloud Vault</h1>
        <p>Access your saved documents and metadata.</p>
    </div>

    <div class="container">
        <div class="upload-card" id="vaultList">
            <div style="text-align: center; color: var(--text-muted); padding: 20px;">Fetching records...</div>
        </div>
    </div>
    ${clientScripts}
    <script>
        const copyVaultText = (elementId, btnElement) => {
            const textToCopy = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btnElement.innerText;
                btnElement.innerText = "Copied!";
                setTimeout(() => { btnElement.innerText = originalText; }, 2000);
            });
        };

        const formatVaultEntities = (entities) => {
            if(!entities) return '';
            let html = '';
            if(entities.emails && entities.emails.length > 0) entities.emails.forEach(e => html += \`<div class="entity-tag">📧 \${e}</div>\`);
            if(entities.urls && entities.urls.length > 0) entities.urls.forEach(u => html += \`<div class="entity-tag">🔗 \${u}</div>\`);
            if(entities.currency && entities.currency.length > 0) entities.currency.forEach(c => html += \`<div class="entity-tag">💰 \${c}</div>\`);
            return html;
        };

        fetch('http://localhost:5000/api/vault')
        .then(res => res.json())
        .then(data => {
            if(data.documents.length === 0) {
                document.getElementById('vaultList').innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">No documents saved yet.</div>';
                return;
            }
            document.getElementById('vaultList').innerHTML = data.documents.map((doc, index) => \`
                <div class="vault-item">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <h3 style="margin: 0; font-weight: 600;">\${doc.title}</h3>
                        <button onclick="copyVaultText('rawVault\${index}', this)" style="background:transparent; color:var(--text-main); border:1px solid var(--border-color); padding:5px 15px; border-radius:6px; cursor:pointer;">Copy Text</button>
                    </div>
                    <div style="margin-bottom: 10px;">
                        \${formatVaultEntities(doc.entities)}
                    </div>
                    <div class="raw-text" id="rawVault\${index}">\${doc.text}</div>
                </div>
            \`).reverse().join('');
        });
    </script>
</body></html>
`;

app.get('/', (req, res) => res.send(textHTML));
app.get('/vision', (req, res) => res.send(visionHTML));
app.get('/vault', (req, res) => res.send(vaultHTML));

app.listen(port, () => console.log('Commercial UI running on port 3000'));
