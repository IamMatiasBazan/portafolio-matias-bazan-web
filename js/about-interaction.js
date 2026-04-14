/**
 * About Section 3D Laptop Interaction
 * Implementado por Antigravity para Matías Bazán
 */

document.addEventListener('DOMContentLoaded', () => {
    const mockup = document.querySelector('.about__mockup');
    const laptop = document.querySelector('.about__laptop');

    if (!mockup || !laptop) return;

    mockup.addEventListener('mousemove', (e) => {
        const rect = mockup.getBoundingClientRect();
        
        // Coordenadas relativas al centro del contenedor
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Cálculo del ángulo de rotación (intensidad: 15 grados máx)
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((centerY - y) / centerY) * 15;

        // Aplicar la transformación de forma suave
        laptop.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    mockup.addEventListener('mouseleave', () => {
        // Resetear a la posición original con suavidad
        laptop.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});
