
# Xops - Marketplace de Marcas Mexicanas

Plataforma que conecta a usuarios con marcas mexicanas auténticas y emergentes, ofreciendo productos únicos con historias reales.

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Estado**: React Context API
- **Animaciones**: Framer Motion
- **Íconos**: Lucide React

## 📦 Instalación y Setup

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd xops-marketplace
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:8080
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base de shadcn/ui
│   ├── auth/           # Componentes de autenticación
│   ├── admin/          # Componentes del panel admin
│   ├── home/           # Componentes de la página principal
│   └── shared/         # Componentes compartidos
├── contexts/           # Context providers (Auth, etc.)
├── pages/              # Páginas principales
│   └── admin/          # Páginas del panel administrativo
├── config/             # Configuración y datos mock
├── hooks/              # Custom hooks
├── lib/                # Utilidades y helpers
└── types/              # Definiciones de TypeScript
```

## 🔧 Configuración

### Datos Mock
Los datos de prueba se encuentran en `src/config/mockData.ts`:

```typescript
// Credenciales de demo
export const DEMO_CREDENTIALS = {
  brand: {
    email: 'marca@ejemplo.com',
    password: 'password'
  }
};

// Marcas destacadas
export const FEATURED_BRANDS = [
  { name: "Tlalli", category: "Artesanías" },
  // ...más marcas
];
```

### Configuración del sitio
La configuración general está en `src/config/mockData.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Xops",
  tagline: "Descubre México una marca a la vez",
  description: "Conectamos contigo con las marcas mexicanas...",
  routes: {
    home: '/',
    login: '/login',
    // ...más rutas
  }
};
```

## 👥 Tipos de Usuario

### Cliente
- Navegación de marcas y productos
- Carrito de compras
- Perfil y historial de pedidos
- **Demo**: `cliente@test.com` / `123456`

### Marca/Admin
- Panel administrativo
- Gestión de inventario
- Gestión de pedidos
- Escaneo QR
- **Demo**: `marca@ejemplo.com` / `password`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint
```

## 🎨 Personalización

### Colores y Tema
Los colores están definidos en `tailwind.config.ts`:

```typescript
colors: {
  xops: {
    blue: '#7bafd4',    // Color principal
    cream: '#f9f2eb',   // Fondo suave
    dark: '#2e2a2a',    // Texto oscuro
    light: '#ffffff'    // Blanco
  }
}
```

### Componentes
- **shadcn/ui**: Componentes pre-construidos en `src/components/ui/`
- **Personalizados**: Componentes específicos del proyecto organizados por funcionalidad

## 🔒 Autenticación

El sistema de auth usa React Context (`src/contexts/AuthContext.tsx`) con:
- Login/logout
- Registro de usuarios
- Manejo de estado de sesión
- Roles (cliente/marca/admin)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints de Tailwind CSS
- Componentes adaptativos
- Navegación responsive

## 🚀 Deployment

### Build de producción
```bash
npm run build
```

### Variables de entorno (si necesario)
Crear `.env` en la raíz:
```bash
VITE_API_URL=https://api.ejemplo.com
```

## 🤝 Desarrollo Colaborativo

### Convenciones de código
- TypeScript estricto
- Componentes funcionales con hooks
- Props tipadas
- Naming en español para UI, inglés para código

### Estructura de commits
```bash
git commit -m "feat: nueva funcionalidad de carrito"
git commit -m "fix: error en login de marca"
git commit -m "style: mejoras en componente de producto"
```

## 📋 TODO / Próximas funcionalidades

- [ ] Integración con API real
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Filtros avanzados de productos
- [ ] Sistema de reviews y ratings

## 🐛 Troubleshooting

### Errores comunes

1. **Puerto ocupado**: Cambiar puerto en `vite.config.ts`
2. **Dependencias**: Borrar `node_modules` y hacer `npm install`
3. **TypeScript**: Verificar imports y tipos

### Logs útiles
- Network tab para llamadas API
- Console para errores de JavaScript
- React DevTools para estado de componentes

## 📞 Soporte

Para dudas o problemas:
1. Revisar la documentación
2. Buscar en issues del repositorio
3. Crear nuevo issue con detalles del problema

---

**Proyecto desarrollado para conectar México con el mundo a través de sus marcas auténticas** 🇲🇽
