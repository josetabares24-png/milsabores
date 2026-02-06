import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isValidEmail, isValidPhone } from '@/lib/validation'

// Resend free tier uses onboarding@resend.dev as sender
// Once you verify your domain in Resend, set RESEND_FROM_EMAIL=reservas@milsaboresbrunch.com
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
// Free tier: only delivers to the Resend account email. After domain verification, change to milsaboreslx@gmail.com
const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL || 'josetabares24@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, date, time, guests, specialRequests, locale } = body

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
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

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone' },
        { status: 400 }
      )
    }

    // Translation texts based on locale
    const translations: Record<string, any> = {
      pt: {
        subject: '🎉 Reserva Confirmada - Mil Sabores Lisboa',
        greeting: 'Olá',
        confirmed: 'A sua reserva foi confirmada!',
        details: 'Detalhes da Reserva:',
        name_label: 'Nome',
        date_label: 'Data',
        time_label: 'Hora',
        guests_label: 'Número de Pessoas',
        phone_label: 'Telefone',
        email_label: 'Email',
        special_label: 'Pedidos Especiais',
        footer: 'Esperamos por si no Mil Sabores!',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Qualquer dúvida, contacte-nos: +351 21 347 0214',
      },
      en: {
        subject: '🎉 Reservation Confirmed - Mil Sabores Lisboa',
        greeting: 'Hello',
        confirmed: 'Your reservation has been confirmed!',
        details: 'Reservation Details:',
        name_label: 'Name',
        date_label: 'Date',
        time_label: 'Time',
        guests_label: 'Number of Guests',
        phone_label: 'Phone',
        email_label: 'Email',
        special_label: 'Special Requests',
        footer: 'We look forward to seeing you at Mil Sabores!',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Any questions, contact us: +351 21 347 0214',
      },
      es: {
        subject: '🎉 Reserva Confirmada - Mil Sabores Lisboa',
        greeting: 'Hola',
        confirmed: '¡Tu reserva ha sido confirmada!',
        details: 'Detalles de la Reserva:',
        name_label: 'Nombre',
        date_label: 'Fecha',
        time_label: 'Hora',
        guests_label: 'Número de Personas',
        phone_label: 'Teléfono',
        email_label: 'Email',
        special_label: 'Solicitudes Especiales',
        footer: '¡Te esperamos en Mil Sabores!',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Cualquier duda, contáctanos: +351 21 347 0214',
      },
      fr: {
        subject: '🎉 Réservation Confirmée - Mil Sabores Lisboa',
        greeting: 'Bonjour',
        confirmed: 'Votre réservation a été confirmée !',
        details: 'Détails de la réservation :',
        name_label: 'Nom',
        date_label: 'Date',
        time_label: 'Heure',
        guests_label: 'Nombre de personnes',
        phone_label: 'Téléphone',
        email_label: 'Email',
        special_label: 'Demandes spéciales',
        footer: 'Nous avons hâte de vous accueillir au Mil Sabores !',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Des questions ? Contactez-nous : +351 21 347 0214',
      },
      de: {
        subject: '🎉 Reservierung Bestätigt - Mil Sabores Lisboa',
        greeting: 'Hallo',
        confirmed: 'Ihre Reservierung wurde bestätigt!',
        details: 'Reservierungsdetails:',
        name_label: 'Name',
        date_label: 'Datum',
        time_label: 'Uhrzeit',
        guests_label: 'Anzahl der Gäste',
        phone_label: 'Telefon',
        email_label: 'E-Mail',
        special_label: 'Besondere Wünsche',
        footer: 'Wir freuen uns auf Ihren Besuch im Mil Sabores!',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Fragen? Kontakt: +351 21 347 0214',
      },
      it: {
        subject: '🎉 Prenotazione Confermata - Mil Sabores Lisboa',
        greeting: 'Ciao',
        confirmed: 'La tua prenotazione è stata confermata!',
        details: 'Dettagli della prenotazione:',
        name_label: 'Nome',
        date_label: 'Data',
        time_label: 'Ora',
        guests_label: 'Numero di persone',
        phone_label: 'Telefono',
        email_label: 'Email',
        special_label: 'Richieste speciali',
        footer: 'Non vediamo l\'ora di vederti al Mil Sabores!',
        address: 'Rua da Prata 152, 1100-619 Lisboa',
        contact: 'Domande? Contattaci: +351 21 347 0214',
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
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #FFF8E7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">

          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #F2B705 0%, #D4A004 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">Mil Sabores Lisboa</h1>
              <p style="margin: 10px 0 0; color: white; font-size: 16px; opacity: 0.95;">Brunch & Gelato Artesanal</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 10px; color: #2C3E50; font-size: 24px; font-weight: 700;">${t.greeting} ${name}! ✨</h2>
              <p style="margin: 0 0 30px; color: #2C3E50; font-size: 18px; font-weight: 600; color: #16A34A;">${t.confirmed}</p>

              <div style="background: linear-gradient(135deg, #FFF8E7 0%, #FEF3C7 100%); border-radius: 16px; padding: 24px; margin-bottom: 30px; border: 2px solid #F2B705;">
                <h3 style="margin: 0 0 20px; color: #2C3E50; font-size: 18px; font-weight: 700;">${t.details}</h3>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 15px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">${t.name_label}:</td>
                    <td style="padding: 8px 0; color: #2C3E50; font-weight: 600; text-align: right;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">${t.date_label}:</td>
                    <td style="padding: 8px 0; color: #2C3E50; font-weight: 600; text-align: right;">${new Date(date).toLocaleDateString(locale === 'pt' ? 'pt-PT' : locale === 'es' ? 'es-ES' : 'en-US')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">${t.time_label}:</td>
                    <td style="padding: 8px 0; color: #2C3E50; font-weight: 600; text-align: right;">${time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">${t.guests_label}:</td>
                    <td style="padding: 8px 0; color: #2C3E50; font-weight: 600; text-align: right;">${guests}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">${t.phone_label}:</td>
                    <td style="padding: 8px 0; color: #2C3E50; font-weight: 600; text-align: right;">${phone}</td>
                  </tr>
                  ${specialRequests ? `
                  <tr>
                    <td colspan="2" style="padding: 12px 0 0; color: #64748B; font-weight: 600;">${t.special_label}:</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 4px 0; color: #2C3E50;">${specialRequests}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <p style="margin: 0 0 10px; color: #2C3E50; font-size: 16px; line-height: 1.6;">${t.footer}</p>
              <p style="margin: 0 0 5px; color: #64748B; font-size: 14px;">📍 ${t.address}</p>
              <p style="margin: 0; color: #64748B; font-size: 14px;">📞 ${t.contact}</p>
            </td>
          </tr>

          <!-- Footer -->
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

    // If RESEND_API_KEY is not set, return error
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not set. Reservation:', { name, email, phone, date, time, guests })
      return NextResponse.json(
        { error: 'El sistema de reservas no esta configurado. Por favor, llama al +351 21 347 0214.' },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send both emails independently so one failure doesn't block the other
    const [customerResult, restaurantResult] = await Promise.allSettled([
      // Confirmation email to customer
      resend.emails.send({
        from: `Mil Sabores Lisboa <${FROM_EMAIL}>`,
        to: email,
        subject: t.subject,
        html: emailHtml,
      }),
      // Notification email to restaurant
      resend.emails.send({
        from: `Reservas Mil Sabores <${FROM_EMAIL}>`,
        to: RESTAURANT_EMAIL,
        subject: `Nueva Reserva - ${name} - ${date} ${time}`,
        html: `
          <h2>Nueva Reserva Recibida</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${phone}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Hora:</strong> ${time}</p>
          <p><strong>Personas:</strong> ${guests}</p>
          ${specialRequests ? `<p><strong>Solicitudes Especiales:</strong> ${specialRequests}</p>` : ''}
        `,
      }),
    ])

    if (customerResult.status === 'rejected') {
      console.error('Failed to send customer email:', customerResult.reason)
    }
    if (restaurantResult.status === 'rejected') {
      console.error('Failed to send restaurant notification:', restaurantResult.reason)
    }

    // Return success if at least the restaurant was notified
    if (customerResult.status === 'rejected' && restaurantResult.status === 'rejected') {
      return NextResponse.json(
        { error: 'No se pudieron enviar los emails. Tu reserva fue recibida, llama al +351 21 347 0214 para confirmar.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation confirmed',
    })
  } catch (error) {
    console.error('Error sending reservation email:', error)
    return NextResponse.json(
      { error: 'Failed to process reservation' },
      { status: 500 }
    )
  }
}
