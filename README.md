# Al-Intimaa Safety — Bilingual Promotional Site

This is a minimal, responsive, bilingual (English/Arabic) static site scaffold for a safety company (alarm systems, fire extinguishers, maintenance).

Files added:

- [index.html](index.html) — main landing page with language toggle
- [css/styles.css](css/styles.css) — styles and responsive layout
- [js/script.js](js/script.js) — language toggle script

How to preview

Open `index.html` in a browser, or serve the folder with a simple static server (recommended):

Python 3 (simple):
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Next steps (optional):
- Replace contact info and phone/email
- Add real logo and images
- Hook the contact form to an email or backend
- Deploy to GitHub Pages, Netlify or Vercel

Deploying to GitHub Pages

1. The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml` that publishes the repository root to GitHub Pages on each push to `main`.

2. To enable Pages in your repository (first time):
	- Go to your repository on GitHub → Settings → Pages and confirm the Pages status. The action will create the published content automatically.

3. Access your site after the workflow runs at `https://<OWNER>.github.io/<REPO>/` (replace `<OWNER>` and `<REPO>` with your GitHub username/organization and repo name).

Notes:
- If you use a custom domain, add a `CNAME` file to the repository root and configure DNS accordingly.
- First deployment may take a minute; check the Actions tab for progress and logs.

# intimaa