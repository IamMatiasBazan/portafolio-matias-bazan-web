/**
 * Custom Cursor System - Style: Jhonny Lubo
 * Integrado por Antigravity para Matías Bazán
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detectar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Si es táctil, no iniciamos el cursor personalizado
    if (isTouchDevice) return;

    // 2. Crear elementos del cursor
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // 3. Variables de posición
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Velocidad de seguimiento (lerp)
    const delay = 0.15;

    // 4. Event listener para el movimiento del mouse
    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        
        // El punto central se actualiza instantáneamente
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Mostrar cursor si estaba oculto (primer movimiento)
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // 5. Animación fluida para el círculo exterior (Lerp)
    const animateOutline = () => {
        const distX = dotX - outlineX;
        const distY = dotY - outlineY;

        outlineX += distX * delay;
        outlineY += distY * delay;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateOutline);
    };

    animateOutline();

    // 6. Efectos al hacer Hover sobre elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .tag, .personal-card, .project-card, .btn-icon');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-active');
            cursorDot.classList.add('cursor-dot-active');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-active');
            cursorDot.classList.remove('cursor-dot-active');
        });
    });

    // 7. Ocultar el cursor si el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
});
