const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Obtener el tamaño de la ventana actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
// Tomar el alto de la ventana y asignarlo al alto del canvas
canvas.height = window_height;
// Tomar el ancho de la ventana y asignarlo al ancho del canvas
canvas.width = window_width;
// Cambiar el color de fondo del canvas
canvas.style.background = '#ff8';

// Clase que crea un circulo
class Circle {
    // Constructor de la clase
    constructor(x, y, radio, color, texto, speed) {
        this.x = x; // Posicion en x
        this.y = y; // Posicion en y
        this.radio = radio; // Radio del circulo
        this.color = color; // Color del circulo
        this.texto = texto; // Texto del circulo
        this.speed = speed; // Velocidad del circulo
        this.dx = (1 * this.speed)+.5; // Velocidad en x
        this.dy = (1 * this.speed)+.5; // Velocidad en y
    }
    // Metodo que dibuja el circulo
    dibujar(context) {
        context.beginPath(); // Iniciar el dibujo
        context.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false); // Dibujar el círculo
        context.strokeStyle = this.color; // Establecer el color del borde
        context.lineWidth = 3; // Establecer el grosor de la línea
        context.stroke(); // Dibujar el borde del círculo
        context.textAlign = 'center'; // Alinear el texto al centro horizontalmente
        context.textBaseline = 'middle'; // Alinear el texto al centro verticalmente
        context.fillText(this.texto, this.x, this.y); // Escribir el texto
        context.closePath(); // Finalizar el dibujo
    }
    update(context) {
        this.dibujar(context); // Dibujar el círculo
        if (this.x + this.radio > window_width) {
            // Si el circulo llega al borde derecho
            this.dx = -this.dx; // Cambiar la dirección de movimiento en x a la izquierda
        }
        if (this.x - this.radio < 0) {
            // Si el circulo llega al borde izquierdo
            this.dx = -this.dx; // Cambiar la dirección de movimiento en x a la derecha
        }
        if (this.y + this.radio > window_height) {
            // Si el circulo llega al borde inferior
            this.dy = -this.dy; // Cambiar la dirección de movimiento en y hacia arriba
        }
        if (this.y - this.radio < 0) {
            // Si el circulo llega al borde superior
            this.dy = -this.dy; // Cambiar la dirección de movimiento en y hacia abajo
        }
        this.x += this.dx; // Actualizar la posición en x
        this.y += this.dy; // Actualizar la posición en y
    }
}

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

let circles = []; // Array para almacenar los círculos

// Generar círculos
const circleCount = 5; // Cantidad de círculos
for (let i = 0; i < circleCount; i++) {
    let newCircle = new Circle(
        getRandomNumber(100, window_width-100),
        getRandomNumber(100, window_height-100),
        50,
        `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`, // Color aleatorio
        `Tec${i + 1}`, // Texto único
        3
    );
    circles.push(newCircle);
}

let updateCircles = function () {
    // Función que actualiza los círculos
    requestAnimationFrame(updateCircles); // Se llama a la función updateCircles
    ctx.clearRect(0, 0, window_width, window_height); // Limpiar el canvas
    circles.forEach(circle => {
        circle.update(ctx); // Se actualiza cada circulo en el array
    });
};

updateCircles(); // Se llama a la función updateCircles
