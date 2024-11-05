//longer.js
const redis = require('redis');

// Crea el cliente Redis
const client = redis.createClient({
    socket: {
        port: 6379,
        host: '172.19.0.3'
    }
});

// Conectar al cliente Redis al iniciar el servidor
client.connect().catch(err => {
    console.error('Error connecting to Redis:', err);
});

// Middleware que registra la solicitud y la respuesta y la almacena en Redis
const loggingAndCacheMiddleware = async (req, res, next) => {
    // Asegúrate de que res.data esté definido para las respuestas
    res.data = null;

    res.on('finish', async () => {
        const key = `${req.method}:${Date.now()}:${req.originalUrl}`; // Corrección aquí
        const valor = {
            clave: key,
            time: new Date().toISOString(), // Cambiado a formato ISO
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                response: res.data // Esto ahora se obtiene para ambos métodos
            }
        };

        // Imprimir el valor en consola
        console.log('Se guardó correctamente el cache:', JSON.stringify(valor)); // Corrección aquí

        // Guardar en Redis directamente el array de resultados
        const redisKey = `log:${valor.req.method}:${valor.time}`; // Corrección aquí
        
        // Serializa la respuesta para almacenarla en Redis
        const redisValue = JSON.stringify(valor.res.response);

        try {
            await client.set(redisKey, redisValue);
        } catch (error) {
            console.error('Error storing data in Redis:', error);
        }
    });

    next();
};

// Exportar el middleware
module.exports = loggingAndCacheMiddleware;

// Manejo de la desconexión de Redis cuando finaliza la aplicación
process.on('SIGINT', async () => {
    await client.quit();
    console.log('Redis client disconnected');
    process.exit(0);
});
