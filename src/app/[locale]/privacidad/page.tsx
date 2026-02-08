'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size="xl" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-6 py-3 rounded-full">
              <Shield className="text-pastel" size={20} />
              <span className="text-pastel text-sm font-bold tracking-widest uppercase">
                Legal
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate mb-8">
            Política de Privacidad
          </h1>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-slate/10 space-y-8 text-slate/80 leading-relaxed">
            <p className="text-sm text-slate/50">Última actualización: febrero 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">1. Responsable del Tratamiento</h2>
              <p>
                <strong>Mil Sabores Lisboa</strong><br />
                Rua da Prata 152, 1100-619 Lisboa, Portugal<br />
                Email: milsaboreslx@gmail.com<br />
                Teléfono: +351 21 347 0214
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">2. Datos que Recopilamos</h2>
              <p>Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Reservas:</strong> nombre, email, teléfono, fecha, hora y número de personas.</li>
                <li><strong>Formulario de contacto:</strong> nombre, email y el contenido de tu mensaje.</li>
                <li><strong>Navegación:</strong> datos técnicos como dirección IP, tipo de navegador y páginas visitadas (a través de cookies).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">3. Finalidad del Tratamiento</h2>
              <p>Utilizamos tus datos para:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Gestionar y confirmar reservas de mesa.</li>
                <li>Responder a consultas y solicitudes de contacto.</li>
                <li>Mejorar la experiencia de navegación en nuestro sitio web.</li>
                <li>Cumplir con obligaciones legales aplicables.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">4. Base Legal</h2>
              <p>
                El tratamiento de datos se basa en tu consentimiento expreso al enviar formularios,
                en la ejecución de un contrato (gestión de reservas) y en nuestro interés legítimo
                de mejorar nuestros servicios. Cumplimos con el Reglamento General de Protección
                de Datos (RGPD) de la Unión Europea.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">5. Conservación de Datos</h2>
              <p>
                Los datos de reservas se conservan durante un máximo de 12 meses desde la fecha
                de la reserva. Los datos de contacto se mantienen hasta resolver la consulta y
                un máximo de 6 meses después. Puedes solicitar la eliminación de tus datos en
                cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">6. Compartición de Datos</h2>
              <p>
                No vendemos ni compartimos tus datos personales con terceros con fines comerciales.
                Solo compartimos datos con proveedores de servicios necesarios para el funcionamiento
                del sitio web (alojamiento, envío de emails de confirmación) y cuando sea requerido
                por ley.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">7. Tus Derechos</h2>
              <p>De acuerdo con el RGPD, tienes derecho a:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Acceso:</strong> solicitar una copia de tus datos personales.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong>Eliminación:</strong> solicitar la eliminación de tus datos.</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, escríbenos a{' '}
                <a href="mailto:milsaboreslx@gmail.com" className="text-pastel font-bold hover:underline">
                  milsaboreslx@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">8. Seguridad</h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger tus datos personales
                contra acceso no autorizado, pérdida o destrucción. Nuestro sitio web utiliza
                conexión segura HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">9. Cookies</h2>
              <p>
                Utilizamos cookies para mejorar tu experiencia. Puedes consultar nuestra{' '}
                <Link href="/cookies" className="text-pastel font-bold hover:underline">
                  Política de Cookies
                </Link>{' '}
                para más información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">10. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en{' '}
                <a href="mailto:milsaboreslx@gmail.com" className="text-pastel font-bold hover:underline">
                  milsaboreslx@gmail.com
                </a>{' '}
                o llamando al{' '}
                <a href="tel:+351213470214" className="text-pastel font-bold hover:underline">
                  +351 21 347 0214
                </a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
