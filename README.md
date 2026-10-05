# Medical Portal POC

Lab architecture:
Browser -> NGINX -> OAuth2 Proxy -> Microsoft Entra ID -> React frontend
Browser API calls -> NGINX -> Node.js :5000 -> PostgreSQL

This is a synthetic medical demo for learning only. Do not use real patient/PHI data.

## Build frontend
cd frontend
npm install
npm run build

## Run backend
cd backend
npm install
cp .env.example .env
npm start

## PostgreSQL
Create database `medical_poc`, create the `medical_app` user, then run database/schema.sql while connected to medical_poc.

## OAuth2 Proxy
Install OAuth2 Proxy separately. Copy oauth2-proxy.cfg.example to its real config, then set tenant ID, client ID, client secret, cookie secret and redirect URL.

Example Entra redirect URI:
https://poc.example.com/oauth2/callback

Use a dedicated POC Entra app registration. Never reuse a client's production secret.

## NGINX
nginx/medical-poc.conf demonstrates:
- /oauth2/ -> OAuth2 Proxy :4180
- /oauth2/auth -> OAuth2 Proxy :4180
- /api/ -> Node.js :5000
- / -> React dist

Change server_name and HTTPS certificate settings before production-like testing.

## Lab order
1. PostgreSQL
2. Node.js backend
3. React frontend
4. NGINX
5. OAuth2 Proxy + Microsoft Entra ID
6. HTTPS
7. Azure Front Door
