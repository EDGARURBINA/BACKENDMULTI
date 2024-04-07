import rateLimit from "express-rate-limit";

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: "Demasiados intentos de inicio de sesión, inténtalo de nuevo después de 1 hora"
});

const productLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 50, 
    message: "Demasiadas peticiones realizadas para esta ruta, intenta nuevamente más tarde"
});


const emprendedorasLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: "Demasiadas peticiones realizadas a rutas de emprendedoras, intenta de nuevo después de 1 hora"
});

const carritoLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 10, 
    message: "Demasiadas peticiones realizadas a rutas de carrito, intenta de nuevo después de 1 hora"
});


export {accountLimiter, productLimiter, emprendedorasLimiter, carritoLimiter};


