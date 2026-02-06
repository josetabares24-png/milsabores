'use client'

import { motion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Link } from '@/i18n/routing'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-mango/10 px-6 py-3 rounded-full mb-6">
            <Cookie className="text-mango" size={20} />
            <span className="text-mango text-sm font-bold tracking-widest uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate mb-8">
            Política de Cookies
          </h1>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-slate/10 space-y-8 text-slate/80 leading-relaxed">
            <p className="text-sm text-slate/50">Última actualización: febrero 2026</p>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                cuando visitas un sitio web. Permiten que el sitio recuerde tus acciones y
                preferencias durante un período de tiempo, para que no tengas que configurarlas
                cada vez que vuelvas a visitarlo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">2. Cookies que Utilizamos</h2>

              <div className="space-y-4 mt-4">
                <div className="p-4 bg-slate/5 rounded-2xl">
                  <h3 className="font-bold text-slate mb-2">Cookies Esenciales</h3>
                  <p className="text-sm">
                    Necesarias para el funcionamiento básico del sitio web. Incluyen cookies
                    de sesión y preferencia de idioma. No se pueden desactivar.
                  </p>
                </div>

                <div className="p-4 bg-slate/5 rounded-2xl">
                  <h3 className="font-bold text-slate mb-2">Cookies de Rendimiento</h3>
                  <p className="text-sm">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web,
                    recopilando información de forma anónima. Esto nos permite mejorar la
                    experiencia de navegación.
                  </p>
                </div>

                <div className="p-4 bg-slate/5 rounded-2xl">
                  <h3 className="font-bold text-slate mb-2">Cookies de Terceros</h3>
                  <p className="text-sm">
                    Utilizamos servicios de terceros como Google Maps (para mostrar nuestra
                    ubicación) que pueden establecer sus propias cookies. Estas cookies están
                    sujetas a las políticas de privacidad de dichos terceros.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">3. Gestión de Cookies</h2>
              <p>
                Puedes controlar y gestionar las cookies a través de la configuración de tu
                navegador. Ten en cuenta que desactivar ciertas cookies puede afectar a la
                funcionalidad del sitio web.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-sm">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">4. Duración de las Cookies</h2>
              <p>
                Las cookies de sesión se eliminan al cerrar el navegador. Las cookies persistentes
                permanecen en tu dispositivo durante un período determinado o hasta que las elimines
                manualmente. Las cookies de preferencia de idioma se mantienen durante 30 días.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate mb-4">5. Más Información</h2>
              <p>
                Para más información sobre cómo tratamos tus datos personales, consulta nuestra{' '}
                <Link href="/privacidad" className="text-mango font-bold hover:underline">
                  Política de Privacidad
                </Link>.
              </p>
              <p className="mt-3">
                Si tienes preguntas, contacta con nosotros en{' '}
                <a href="mailto:milsaboreslx@gmail.com" className="text-mango font-bold hover:underline">
                  milsaboreslx@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
