# 🐾 TaskPet

Una mascota virtual de escritorio que te ayuda a no olvidar tus tareas pendientes. Construida con Electron, pensada para estudiantes olvidadizos (como yo) que necesitan un recordatorio amigable y no invasivo.

## ✨ Características

- **Mascota flotante** en tu escritorio, siempre visible, transparente y sin bordes.
- **Recordatorios personalizables**: elige una fecha/hora específica o "recuérdame en X minutos", con la opción de repetir el aviso cada cierto intervalo hasta completar la tarea.
- **Notificaciones nativas del sistema operativo** cuando llega la hora de un recordatorio.
- **Lista de tareas** con secciones de pendientes y completadas, y botón para eliminar definitivamente.
- **Descripción expandible** al hacer clic en una tarea.
- **Sincronización automática con Moodle**: importa tus tareas directamente desde el calendario `.ics` de tu universidad cada 15 días, evitando duplicados y filtrando asistencias.
- **Acceso directo a la plataforma**: si la tarea trae un link de Moodle, un solo clic la marca como completada y abre el link en tu navegador.

## 🛠️ Tecnologías

- [Electron](https://www.electronjs.org/) — aplicación de escritorio multiplataforma
- [node-ical](https://www.npmjs.com/package/node-ical) — lectura de calendarios `.ics`
- JavaScript, HTML, CSS puro (sin frameworks)

## 📦 Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Jonnmp/TaskPet.git
   cd TaskPet
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. (Opcional) Configura la sincronización con tu calendario de Moodle:

   Crea un archivo `calendar-config.json` en la raíz del proyecto (este archivo está en `.gitignore` y no se sube a GitHub, ya que contiene información privada):
   ```json
   {
       "icsURL": "TU_URL_DE_CALENDARIO_ICS_AQUI"
   }
   ```
   Puedes obtener esta URL desde tu perfil de Moodle, en la opción de exportar/suscribirse al calendario.

4. Corre la aplicación:
   ```
   npm start
   ```

## 📁 Estructura del proyecto

```
taskpet/
├── package.json
├── calendar-config.json    (no incluido en el repo, debes crearlo tú)
├── tasks-data.json         (se genera automáticamente al usar la app)
└── src/
    ├── main/
    │   └── main.js              # Proceso principal: ventanas, scheduler, IPC
    ├── services/
    │   ├── TaskManager.js       # Lógica de tareas (crear, completar, eliminar, recordatorios)
    │   └── CalendarSync.js      # Sincronización con calendario Moodle (.ics)
    └── renderer/
        ├── index.html/.js       # Ventana principal (mascota)
        ├── form.html/.js        # Formulario para agregar tareas
        └── tasklist.html/.js    # Lista de tareas pendientes/completadas
```

## 🗺️ Roadmap

- [x] Modelo de datos de tareas y persistencia en JSON
- [x] Reglas de recordatorio (fecha específica, minutos relativos, repetición)
- [x] Ventana funcional con scheduler y notificaciones nativas
- [x] Formulario conectado vía IPC
- [x] Diseño visual de la mascota y la lista de tareas
- [x] Sincronización automática con calendario Moodle
- [ ] Migrar de `.ics` a la API oficial de Moodle (Web Services), para poder detectar automáticamente qué tareas ya fueron entregadas
- [ ] Versión móvil

## 📝 Notas

Este es mi primer proyecto en Electron y en JavaScript, desarrollado como parte de mi formación en la carrera. Cada línea fue escrita entendiendo su propósito, no copiada sin comprender — si encuentras algo que se pueda mejorar, ¡las sugerencias son bienvenidas!

## 📄 Licencia

ISC