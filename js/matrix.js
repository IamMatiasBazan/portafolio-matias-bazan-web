/**
 * Matrix Rain Effect for Matías Bazán Portfolio
 * Inspired by nuxon.com.ar
 */

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns;
const fontSize = 16;
const characters = '0123456789ABCDEF<>/{}-_[]()*&^%$#@!'.split('');
let drops = [];

// Ajustar el tamaño del canvas al contenedor (hero)
function resize() {
    const parent = canvas.parentElement;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Posición inicial aleatoria (fuera de pantalla)
    }
}

function draw() {
    // Fondo semitransparente para crear el efecto de estela (trail)
    // El color debe coincidir con el fondo de la sección hero
    ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Estilo de la fuente
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Seleccionar carácter aleatorio
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // El primer carácter de la gota es más brillante
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Dibujar el carácter
        // Colores basados en el diseño del portafolio (--accent y --primary-light)
        if (Math.random() > 0.98) {
             ctx.fillStyle = '#ffffff'; // Brillo ocasional
        } else {
             ctx.fillStyle = '#22d3ee'; // Cian (var(--accent))
        }
        
        ctx.fillText(text, x, y);

        // Reiniciar la gota si sale de la pantalla o aleatoriamente
        if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Mover la gota
        drops[i]++;
    }
}

// Inicializar y bucle de animación
window.addEventListener('resize', resize);
resize();

function animate() {
    draw();
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 30); // Controlar la velocidad (~30fps es suficiente para este efecto)
}

animate();
