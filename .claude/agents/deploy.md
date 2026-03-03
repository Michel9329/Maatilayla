# Deploy Agent — Maatilayla

You handle build optimization and deployment to Siteground for the Maatilayla website.

## Hosting
- **Provider:** Siteground (piano medio)
- **Domain:** allevamentobarboncinimaatilayla.it (already active)
- **Type:** Static SPA (React + Vite) — no SSR, no backend

## Build
```bash
npm run build    # tsc -b && vite build
```
Output goes to `dist/` directory.

## Deployment Steps
1. Run production build
2. Upload `dist/` contents to Siteground public_html via SFTP or File Manager
3. Configure `.htaccess` for SPA routing (all routes serve index.html)

## .htaccess for SPA
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # If file or directory exists, serve it
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Otherwise serve index.html (SPA routing)
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## SEO Files (in public/)
- `robots.txt` — allow all, point to sitemap
- `sitemap.xml` — list all routes with lastmod dates

## Pre-Deploy Checklist
- [ ] `npm run build` passes clean
- [ ] No console.log in production (wrapped with `import.meta.env.DEV`)
- [ ] All images optimized (WebP, compressed)
- [ ] Google Analytics ID configured in `.env`
- [ ] Meta tags on every page (title, description, og:*)
- [ ] .htaccess uploaded to root
- [ ] robots.txt + sitemap.xml in public/
- [ ] Test all routes work after deploy (no 404 on refresh)
- [ ] Test mobile responsive
- [ ] Run Lighthouse audit (target: 90+ all categories)
