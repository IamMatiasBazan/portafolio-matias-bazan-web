/**
 * Video Modal & Electric Effect System
 * Integrado por Antigravity para Matías Bazán
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar estructura del modal general en el body (por si se requiere en el futuro)
    const modalHTML = `
        <div id="video-modal" class="v-modal">
            <div class="v-modal__overlay"></div>
            <div class="v-modal__content">
                <button id="v-modal-close" class="v-modal__close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="v-modal__video-container">
                    <iframe id="v-modal-iframe" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <!-- Contenedor general para chispas SVG -->
        <svg id="electric-sparks-svg" class="lightning-container" preserveAspectRatio="none"></svg>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const sparksSvg = document.getElementById('electric-sparks-svg');
    const electricFrame = document.querySelector('.electric-frame');

    // 2. Función para generar chispas aleatorias alrededor del video
    const createSpark = () => {
        if (!electricFrame) return;

        const rect = electricFrame.getBoundingClientRect();
        const spark = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        // Determinar un lado aleatorio (0: top, 1: right, 2: bottom, 3: left)
        const side = Math.floor(Math.random() * 4);
        let x1, y1, x2, y2;
        const padding = 20;

        switch(side) {
            case 0: // Top
                x1 = rect.left + Math.random() * rect.width;
                y1 = rect.top - padding;
                break;
            case 1: // Right
                x1 = rect.right + padding;
                y1 = rect.top + Math.random() * rect.height;
                break;
            case 2: // Bottom
                x1 = rect.left + Math.random() * rect.width;
                y1 = rect.bottom + padding;
                break;
            case 3: // Left
                x1 = rect.left - padding;
                y1 = rect.top + Math.random() * rect.height;
                break;
        }

        // El destino de la chispa es un punto cercano
        x2 = x1 + (Math.random() - 0.5) * 60;
        y2 = y1 + (Math.random() - 0.5) * 60;

        // Crear camino jagged (en zigzag)
        let d = `M ${x1} ${y1}`;
        const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 30;
        const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 30;
        d += ` L ${midX} ${midY} L ${x2} ${y2}`;

        spark.setAttribute("d", d);
        spark.setAttribute("class", "electric-spark");
        spark.setAttribute("style", `opacity: ${Math.random()}`);
        
        sparksSvg.appendChild(spark);

        // Eliminar rápido para el efecto flicker
        setTimeout(() => {
            spark.remove();
        }, 100 + Math.random() * 200);
    };

    // Generar chispas constantemente si estamos en el área
    setInterval(() => {
        if (electricFrame) {
            // Solo generar si el frame es visible en pantalla para rendimiento
            const rect = electricFrame.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                createSpark();
            }
        }
    }, 150);

    // 3. Manejo de Modal General (opcional para otros usos)
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('v-modal-iframe');
    const closeBtn = document.getElementById('v-modal-close');

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('is-open');
            iframe.src = ''; 
            document.body.style.overflow = '';
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
});
