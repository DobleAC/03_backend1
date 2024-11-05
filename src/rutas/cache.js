//cache.js
const redis = require('redis');
const client = redis.createClient({
socket:{
port:6379,
host:'172.19.0.3'
}
});
const cache = async function (req, res, next) {
let fecha = new Date();
await client.connect();
await client.set(fecha.toLocaleDateString() + ":" + fecha.getHours() + "-" +
fecha.getMinutes() + "-" + fecha.getSeconds(), " - " + req.method + " " +
req.route.path);
await client.disconnect();
next()
}
module.exports = cache;


/*
const redis = require('redis');
const client = redis.createClient({
    socket: {
        port: 6379,
        host: '172.17.0.3'
    }
});

// Conectar a Redis al iniciar la aplicación
client.connect().catch(err => console.error('Error connecting to Redis:', err));

const cache = async (req, res, next) => {
    res.on('finish', async () => {
        try {
            // Generar una clave única para la solicitud
            const key = `${req.method}:${req.originalUrl}`;
            const valor = JSON.stringify({
                clave: key,
                time: new Date().toISOString(),
                req: {
                    method: req.method,
                    url: req.originalUrl,
                    headers: req.headers,
                    body: req.body
                },
                res: {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    response: req.method === 'GET' ? res.locals.response || null : null
                }
            });

            // Comprobar si el cliente está conectado antes de guardar
            if (client.isOpen) {
                await client.set(key, valor);
                console.log(valor);
            } else {
                console.error('Redis client is not connected.');
            }
        } catch (error) {
            console.error('Error saving to Redis:', error);
        }
    });

    next();
};

// Cerrar la conexión de Redis adecuadamente al cerrar la aplicación
const cleanup = async () => {
    await client.quit();
    console.log('Redis client disconnected.');
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = cache;
*/

/*
const redis = require('redis');
const client = redis.createClient({
    socket: {
        port: 6379,
        host: '172.17.0.3'
    }
});

// Conectar a Redis al iniciar la aplicación
client.connect().catch(err => console.error('Error connecting to Redis:', err));

// Función para formatear la fecha
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}:${hours}-${minutes}-${seconds}`;
};

const cache = async function (req, res, next) {
    // Espera a que se complete la respuesta
    res.on('finish', async () => {
        try {
            const timestamp = formatDate(new Date());
            const key = `${req.method}:${Date.now()}:${req.originalUrl}`;
            const valor = JSON.stringify({
                clave: key,
                time: timestamp,
                req: {
                    method: req.method,
                    url: req.originalUrl,
                    headers: req.headers,
                    body: req.body
                },
                res: {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    response: req.method === 'GET' ? res.locals.response || null : null
                }
            });

            // Guardar en Redis
            await client.set(key, valor);
            console.log(valor);
        } catch (error) {
            console.error('Error saving to Redis:', error);
        }
    });

    next();
};

// Desconectar el cliente de Redis cuando la aplicación se cierra
process.on('exit', async () => {
    await client.quit();
});

module.exports = cache;
*/