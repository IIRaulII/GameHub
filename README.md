# Game Hub

![Game Hub Logo](public/3raya.webp)

## Descripción

Game Hub es una aplicación web que ofrece una colección de juegos clásicos desarrollados con JavaScript vanilla. La aplicación presenta una interfaz de usuario intuitiva y atractiva, permitiendo a los usuarios disfrutar de diferentes juegos desde una única plataforma.

## Juegos Disponibles

### Tres en Raya
Un clásico juego de estrategia para dos jugadores donde el objetivo es conseguir tres símbolos iguales en línea (horizontal, vertical o diagonal).
- Selección de jugador inicial (X u O)
- Marcador persistente entre sesiones
- Reinicio de partida y marcador

### Puzzle de Memoria
Un juego de memoria donde debes encontrar todas las parejas de cartas en el menor tiempo posible.
- Cronómetro para medir tu tiempo
- Registro del mejor tiempo

### Piedra, Papel o Tijera
El clásico juego de azar donde compites contra la computadora eligiendo entre piedra, papel o tijera.
- Animaciones para las elecciones de la computadora
- Marcador persistente entre sesiones
- Reinicio de marcador

## Características Principales

- **Diseño Responsivo**: Adaptado para funcionar en dispositivos móviles y de escritorio
- **Interfaz Intuitiva**: Navegación sencilla entre juegos y menú principal
- **Almacenamiento Local**: Guarda puntuaciones y mejores tiempos entre sesiones
- **Animaciones Fluidas**: Mejora la experiencia de usuario con transiciones y efectos visuales
- **Código Modular**: Estructura organizada que facilita el mantenimiento y la expansión

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y media queries)
- JavaScript (ES6+)
- LocalStorage API
- Vite (para desarrollo y construcción)

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/game-hub.git
cd game-hub
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en la URL indicada (generalmente http://localhost:5173)

## Construcción para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/`.

## Estructura del Proyecto

```
game-hub/
├── public/                # Recursos estáticos (imágenes, etc.)
├── src/                   # Código fuente
│   ├── tres-en-raya/      # Archivos del juego Tres en Raya
│   ├── puzzle/            # Archivos del juego Puzzle de Memoria
│   ├── piedra-papel-tijera/ # Archivos del juego Piedra, Papel o Tijera
│   ├── app.js             # Lógica principal de la aplicación
│   ├── common-styles.css  # Estilos comunes para todos los juegos
│   ├── style.css          # Estilos generales de la aplicación
│   └── splash-styles.css  # Estilos para la pantalla de inicio
├── index.html             # Punto de entrada HTML
├── package.json           # Configuración de dependencias y scripts
└── README.md              # Documentación del proyecto
```

## Personalización

Puedes personalizar fácilmente los juegos modificando las variables CSS en los archivos de estilos correspondientes:

- Para cambiar los colores del tema, modifica las variables en `:root` en los archivos CSS
- Para ajustar el tamaño de los elementos de juego, modifica las variables de tamaño

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Autor

Desarrollado por Raúl Montoya Reina  - [raulmontoyareina@gmail.com]

