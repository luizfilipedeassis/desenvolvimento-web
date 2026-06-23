# Simple Landing

Landing page responsiva criada com React, Vite e Netlify Functions.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Formulário de contato no Netlify

A função está em `netlify/functions/send-email.ts` e usa Nodemailer, seguindo o guia de Netlify Functions.

Configure estas variáveis em Site configuration > Environment variables:

- `SMTP_HOST`: servidor SMTP.
- `SMTP_PORT`: porta SMTP, normalmente `587`.
- `SMTP_SECURE`: `false` para STARTTLS ou `true` para SSL.
- `SMTP_USER`: e-mail remetente.
- `SMTP_PASS`: senha/app password do e-mail.
- `CONTACT_EMAIL`: e-mail que recebe as mensagens.
- `ALLOWED_ORIGIN`: URL publicada no Netlify.

Para testar localmente com as functions:

```bash
npx netlify dev
```
