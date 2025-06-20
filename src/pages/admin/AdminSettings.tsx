
import { motion } from 'framer-motion';
import { Settings, User, Palette, Bell, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AdminSettings = () => {
  const settingsSections = [
    {
      title: 'Perfil de Usuario',
      description: 'Configura tu información personal',
      icon: User,
      items: ['Datos personales', 'Cambiar contraseña', 'Preferencias']
    },
    {
      title: 'Personalización',
      description: 'Personaliza la apariencia de tu dashboard',
      icon: Palette,
      items: ['Tema', 'Colores de marca', 'Logo personalizado']
    },
    {
      title: 'Notificaciones',
      description: 'Gestiona tus alertas y notificaciones',
      icon: Bell,
      items: ['Email', 'Push notifications', 'Alertas de inventario']
    },
    {
      title: 'Seguridad',
      description: 'Configuración de seguridad y privacidad',
      icon: Shield,
      items: ['Autenticación 2FA', 'Sesiones activas', 'Logs de actividad']
    }
  ];

  return (
    <div className="min-h-screen bg-xops-cream p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-xops-dark mb-2">Configuración</h1>
          <p className="text-gray-600">Personaliza tu experiencia en el dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-xops-blue/10 to-xops-blue/20 rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-xops-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xops-dark mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-gray-500">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
