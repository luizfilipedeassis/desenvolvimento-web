import type { Handler, HandlerEvent } from '@netlify/functions'
import nodemailer from 'nodemailer'

interface ContactPayload {
  email: string
  message: string
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? ''

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN || origin,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
})

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers.origin ?? ''

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Método não permitido.' }),
    }
  }

  let payload: ContactPayload

  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Body inválido.' }),
    }
  }

  const email = payload.email?.trim()
  const message = payload.message?.trim()

  if (!email || !message) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Informe o e-mail e o motivo do contato.' }),
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'E-mail inválido.' }),
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `<${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: '[FitWear] Nova mensagem',
      text: [
        `E-mail: ${email}`,
        '',
        'Motivo do contato:',
        message,
      ].join('\n'),
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Motivo do contato:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })

    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ message: 'E-mail enviado com sucesso.' }),
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)

    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        error: 'Falha ao enviar o e-mail. Tente novamente mais tarde.',
      }),
    }
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export { handler }