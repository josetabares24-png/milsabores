import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isValidEmail } from '@/lib/validation'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL || 'milsaboreslx@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, locale } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    // Translation texts based on locale
    const translations: Record<string, any> = {
      pt: {
        subject_prefix: '📧 Mensagem Recebida',
        greeting: 'Olá',
        received: 'Recebemos a sua mensagem!',
        response: 'Responderemos em breve. Obrigado pelo seu contacto.',
        original_subject: 'Assunto',
        original_message: 'Mensagem',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Telefone: +351 21 347 0214',
      },
      en: {
        subject_prefix: '📧 Message Received',
        greeting: 'Hello',
        received: 'We have received your message!',
        response: 'We will respond shortly. Thank you for contacting us.',
        original_subject: 'Subject',
        original_message: 'Message',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Phone: +351 21 347 0214',
      },
      es: {
        subject_prefix: '📧 Mensaje Recibido',
        greeting: 'Hola',
        received: '¡Hemos recibido tu mensaje!',
        response: 'Responderemos pronto. Gracias por contactarnos.',
        original_subject: 'Asunto',
        original_message: 'Mensaje',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Teléfono: +351 21 347 0214',
      },
      fr: {
        subject_prefix: '📧 Message Reçu',
        greeting: 'Bonjour',
        received: 'Nous avons bien reçu votre message !',
        response: 'Nous vous répondrons sous peu. Merci de nous avoir contactés.',
        original_subject: 'Sujet',
        original_message: 'Message',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Téléphone : +351 21 347 0214',
      },
      de: {
        subject_prefix: '📧 Nachricht erhalten',
        greeting: 'Hallo',
        received: 'Wir haben Ihre Nachricht erhalten!',
        response: 'Wir werden uns in Kürze bei Ihnen melden. Vielen Dank für Ihre Kontaktaufnahme.',
        original_subject: 'Betreff',
        original_message: 'Nachricht',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Telefon: +351 21 347 0214',
      },
      it: {
        subject_prefix: '📧 Messaggio Ricevuto',
        greeting: 'Ciao',
        received: 'Abbiamo ricevuto il tuo messaggio!',
        response: 'Ti risponderemo a breve. Grazie per averci contattato.',
        original_subject: 'Oggetto',
        original_message: 'Messaggio',
        footer: 'Mil Sabores Lisboa',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Telefono: +351 21 347 0214',
      },
    }

    const t = translations[locale || 'pt'] || translations['en']

    // Email HTML template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #FFF8E7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">

          <tr>
            <td style="background: linear-gradient(135deg, #F2B705 0%, #D4A004 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">Mil Sabores Lisboa</h1>
              <p style="margin: 10px 0 0; color: white; font-size: 16px; opacity: 0.95;">Brunch & Gelato Artesanal</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 10px; color: #2C3E50; font-size: 24px; font-weight: 700;">${t.greeting} ${name}! ✨</h2>
              <p style="margin: 0 0 20px; color: #16A34A; font-size: 18px; font-weight: 600;">${t.received}</p>
              <p style="margin: 0 0 30px; color: #64748B; font-size: 16px; line-height: 1.6;">${t.response}</p>

              <div style="background: #F8FAFC; border-radius: 16px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #F2B705;">
                <p style="margin: 0 0 8px; color: #64748B; font-size: 13px; font-weight: 600; text-transform: uppercase;">${t.original_subject}</p>
                <p style="margin: 0 0 16px; color: #2C3E50; font-size: 16px; font-weight: 600;">${subject}</p>
                <p style="margin: 0 0 8px; color: #64748B; font-size: 13px; font-weight: 600; text-transform: uppercase;">${t.original_message}</p>
                <p style="margin: 0; color: #2C3E50; font-size: 15px; line-height: 1.6;">${message}</p>
              </div>

              <p style="margin: 0 0 5px; color: #64748B; font-size: 14px;">📍 ${t.address}</p>
              <p style="margin: 0; color: #64748B; font-size: 14px;">📞 ${t.contact}</p>
            </td>
          </tr>

          <tr>
            <td style="background: #F8FAFC; padding: 24px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0 0 10px; color: #64748B; font-size: 13px;">
                <a href="https://instagram.com/milsaboreslx" style="color: #F2B705; text-decoration: none; font-weight: 600;">Instagram</a> •
                <a href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A" style="color: #F2B705; text-decoration: none; font-weight: 600;">Google Maps</a>
              </p>
              <p style="margin: 0; color: #94A3B8; font-size: 12px;">© 2026 Mil Sabores Lisboa</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not set. Contact:', { name, email, subject })
      return NextResponse.json(
        { error: 'El sistema de contacto no esta configurado. Escribe a milsaboreslx@gmail.com directamente.' },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send both emails independently
    const [customerResult, restaurantResult] = await Promise.allSettled([
      // Confirmation email to customer
      resend.emails.send({
        from: `Mil Sabores Lisboa <${FROM_EMAIL}>`,
        to: email,
        subject: `${t.subject_prefix} - Mil Sabores Lisboa`,
        html: emailHtml,
      }),
      // Notification email to restaurant
      resend.emails.send({
        from: `Contacto Mil Sabores <${FROM_EMAIL}>`,
        to: RESTAURANT_EMAIL,
        subject: `Nuevo Contacto - ${name} - ${subject}`,
        html: `
          <h2>Nuevo Mensaje de Contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      }),
    ])

    if (customerResult.status === 'rejected') {
      console.error('Failed to send customer email:', customerResult.reason)
    }
    if (restaurantResult.status === 'rejected') {
      console.error('Failed to send restaurant notification:', restaurantResult.reason)
    }

    if (customerResult.status === 'rejected' && restaurantResult.status === 'rejected') {
      return NextResponse.json(
        { error: 'No se pudo enviar el mensaje. Escribe directamente a milsaboreslx@gmail.com' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
