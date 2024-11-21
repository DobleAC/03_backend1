const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const cache = require("./logger")

const driver = neo4j.driver(
    'neo4j://172.19.0.2',  // Usa el nombre del servicio y el puerto
    neo4j.auth.basic('neo4j', 'neo4j')
);

// Q01. Obtener la lista de productos que tienen menos de 10 unidades en stock.
router.route('/productos/stock/:stock')
    .all(cache)
    .get(async (req, res) => {
        const stock = parseInt(req.params.stock, 10);
        const Q1 = 'MATCH (p:Producto) WHERE p.stock < $stock RETURN p;';
        const session = driver.session();

        try {
            const result = await session.run(Q1, { stock });
            const productos = result.records.map(record => {
                const properties = record.get('p').properties;

                // Convertir `stock` a un número si es un entero de Neo4j
                properties.precio = neo4j.integer.toNumber(properties.precio);
                properties.stock = neo4j.integer.toNumber(properties.stock);
                
                
                return properties;
            });
            res.status(200).json({ productos });
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        } finally {
            await session.close();
        }
    });

// Q10 Encontrar los productos que se encuentran agotados (sin stock) en el inventario.
router.route('/productos/sinstock')
    .all(cache)
   .get( async (req, res) => { // Aplicamos cache como middleware
       const Q10 = 'MATCH (p:Producto) WHERE p.stock = 0 RETURN p;';
       const session = driver.session();

       try {
           const result = await session.run(Q10);
            const productos = result.records.map(record => {
                const properties = record.get('p').properties;

                // Convertir `stock` a un número si es un entero de Neo4j
                properties.precio = neo4j.integer.toNumber(properties.precio);
                properties.stock = neo4j.integer.toNumber(properties.stock);
                
                
                return properties;
            });
           res.status(200).json({ productos });
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los productos' });
       } 
   });
    //Q11. Obtener la lista de clientes.
   router.route('/clientes')
    .all(cache)
   .get( async (req, res) => { // Aplicamos cache como middleware
       const Q11 = 'MATCH (cli:Cliente) RETURN cli';
       const session = driver.session();

       try {
           const result = await session.run(Q11);
           const clientes = result.records.map(record => record.get('cli').properties);
           res.status(200).json({ clientes });
           
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los clientes' });
       }  finally {
           await session.close(); 
        }
   });
   //Q15.Eliminar todos los clientes que han realizado devoluciones..
   router.route('/cliente/devoluciones')
    .all(cache)
    .delete(async (req, res) => { // Aplicamos cache como middleware
        const Q15 = `
            MATCH (d:Devolucion)-[:PERTENECE_A]->(c:Cliente)
            WITH c, d, c AS clienteEliminado
            DETACH DELETE c, d
            RETURN clienteEliminado;
        `;
        const session = driver.session();

        try {
            const result = await session.run(Q15);
            const clientes = result.records.map(record => record.get('clienteEliminado').properties);
            res.status(200).json({ Message: "Clientes eliminados exitosamente", clientes });
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            res.status(500).json({ error: 'Error al obtener los clientes' });
        } finally {
            await session.close(); 
        }
    });



module.exports = router;
