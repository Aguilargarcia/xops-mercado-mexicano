
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, Palette, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Configuración del perfil
    storeName: 'Mi Tienda Xops',
    ownerName: 'Juan Pérez',
    email: 'juan@mitienda.com',
    phone: '+52 55 1234 5678',
    address: 'Calle Principal #123, Ciudad de México',
    
    // Configuración de notificaciones
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    
    // Configuración de seguridad
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Configuración de la tienda
    currency: 'MXN',
    language: 'es',
    timezone: 'America/Mexico_City',
    
    // Configuración de datos
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'store', name: 'Tienda', icon: Palette },
    { id: 'data', name: 'Datos', icon: Database }
  ];

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Guardando configuración:', settings);
    // Aquí se guardarían los cambios
  };

  return (
    <AdminLayout>
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-xops-dark">Configuración</h1>
              <p className="text-gray-600 mt-2">Personaliza tu cuenta y preferencias</p>
            </div>
            <Button onClick={handleSave} className="btn-primary shadow-lg">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menú de pestañas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-4 border-0 shadow-lg">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-xops-blue text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-xops-blue'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </motion.div>

          {/* Contenido de la pestaña activa */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <Card className="p-8 border-0 shadow-lg">
              {/* Pestaña de Perfil */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-xops-dark">Información del Perfil</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Tienda
                      </label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => handleInputChange('storeName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Propietario
                      </label>
                      <input
                        type="text"
                        value={settings.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <textarea
                      value={settings.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Pestaña de Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-xops-dark">Preferencias de Notificaciones</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Notificaciones por Email', description: 'Recibe actualizaciones importantes por correo' },
                      { key: 'smsNotifications', label: 'Notificaciones SMS', description: 'Recibe alertas por mensaje de texto' },
                      { key: 'pushNotifications', label: 'Notificaciones Push', description: 'Notificaciones en tiempo real en el navegador' },
                      { key: 'orderAlerts', label: 'Alertas de Pedidos', description: 'Notificar cuando lleguen nuevos pedidos' },
                      { key: 'lowStockAlerts', label: 'Alertas de Inventario Bajo', description: 'Avisar cuando los productos tengan poco stock' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="font-medium text-xops-dark">{setting.label}</p>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[setting.key as keyof typeof settings] as boolean}
                            onChange={(e) => handleInputChange(setting.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-xops-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-xops-blue"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pestaña de Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-xops-dark">Configuración de Seguridad</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="font-medium text-xops-dark">Autenticación de Dos Factores</p>
                        <p className="text-sm text-gray-600">Agregar una capa extra de seguridad</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-xops-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-xops-blue"></div>
                      </label>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiempo de Sesión (minutos)
                      </label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      >
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="120">2 horas</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña de Tienda */}
              {activeTab === 'store' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-xops-dark">Configuración de la Tienda</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Moneda
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      >
                        <option value="MXN">Peso Mexicano (MXN)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona Horaria
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                      >
                        <option value="America/Mexico_City">Ciudad de México</option>
                        <option value="America/Tijuana">Tijuana</option>
                        <option value="America/Cancun">Cancún</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña de Datos */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-xops-dark">Gestión de Datos</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="font-medium text-xops-dark">Respaldo Automático</p>
                        <p className="text-sm text-gray-600">Crear copias de seguridad automáticamente</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoBackup}
                          onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-xops-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-xops-blue"></div>
                      </label>
                    </div>
                    
                    <div className="p-4 border border-gray-100 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frecuencia de Respaldo
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-xops-blue focus:border-transparent"
                        disabled={!settings.autoBackup}
                      >
                        <option value="daily">Diario</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1">
                        Exportar Datos
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Crear Respaldo
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
