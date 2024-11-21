const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const cache = require("./logger");

const driver = neo4j.driver(
    'neo4j://172.19.0.2',  // Usa el nombre del servicio y el puerto
    neo4j.auth.basic('neo4j', 'neo4j')
);
//Q02. Encontrar los proveedores que suministran productos de una categoría en específico..
router.route('/provedores/categoria/:categoria')
    .all(cache)
    .get(async (req, res) => { // Aplicamos cache como middleware
        const categoria = req.params.categoria;
        const Q2 = "MATCH (prov:Proveedor)-[:SUMINISTRA]->(p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: $categoria}) RETURN DISTINCT prov";
        const session = driver.session();

        try {
            const result = await session.run(Q2, { categoria });
            const proveedores = result.records.map(record => record.get('prov').properties);
            res.status(200).json({ proveedores });
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            res.status(500).json({ error: 'Error al obtener los provedores' });
        } finally {
            await session.close(); 
        }
    });
//Q03. Obtener la lista de pedidos de compra que fueron realizados a un proveedor en específico.
router.route('/proveedores/:idproveedor')
    .all(cache)
    .get(async (req, res) => { // Aplicamos cache como middleware
        const idproveedor = req.params.idproveedor;
        const Q3 = "MATCH (prov:Proveedor {id: $idproveedor})<-[:PEDIDO_REALIZADO_A]-(pc:PedidoCompra) RETURN pc, prov";
        const session = driver.session();

        try {
            const result = await session.run(Q3, { idproveedor });

            // Extraer el proveedor del primer registro (evitando duplicados)
            const proveedor = result.records.length > 0 ? result.records[0].get('prov').properties : null;

            // Obtener todos los pedidos de compra asociados
            const PedidoCompra = result.records.map(record => {
                const properties = record.get('pc').properties;
                properties.valor = neo4j.integer.toNumber(properties.valor);
                properties.cantidad = neo4j.integer.toNumber(properties.cantidad);
                return properties;
            });

            res.status(200).json({ proveedor, PedidoCompra });
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            res.status(500).json({ error: 'Error al obtener el proveedor' });
        } finally {
            await session.close();
        }
    });

// Q05. Obtener la lista de todos los  proveedores.
router.route('/proveedores')
    .all(cache)
   .get( async (req, res) => { // Aplicamos cache como middleware
       const Q5 = 'MATCH (prov:Proveedor) RETURN prov;';
       const session = driver.session();

       try {
           const result = await session.run(Q5);
           const proveedores = result.records.map(record => record.get('prov').properties);
           res.status(200).json({ proveedores });
           
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los provedores' });
       }  finally {
           await session.close(); 
        }
   });
//Q08. Cambiar todos los productos suministrados por un proveedor a otro proveedor.
router.route('/proveedores/:idproveedor')
   .all(cache)
   .put(async (req, res) => { // Aplicamos cache como middleware
       const idproveedor = req.params.idproveedor;
       const idproveedorn = req.body.idproveedorn;
       const Q8 = `
           MATCH (provAnt:Proveedor {id: $idproveedor})-[r:SUMINISTRA]->(p:Producto) 
           MATCH (provNuevo:Proveedor {id: $idproveedorn}) 
           DELETE r 
           CREATE (provNuevo)-[:SUMINISTRA]->(p) 
           RETURN p;
       `;
        const session = driver.session();
       try {
           const result = await session.run(Q8, { idproveedor, idproveedorn });
           const proveedores = result.records.map(record => record.get('p').properties);
           res.status(200).json({ message:"Productos trasferidos exitosamente",proveedores });
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los proveedores' });
       } finally {
           await session.close(); 
       }
   });

//Q09. Obtener la lista de proveedores que han recibido pedidos de compra por más de $50,000 en total.

router.route('/proveedores/compras')
   .all(cache)
   .get( async (req, res) => { // Aplicamos cache como middleware
       const Q9 = 'MATCH (prov:Proveedor)<-[:PEDIDO_REALIZADO_A]-(pc:PedidoCompra) WITH prov, SUM(pc.valor) AS totalCompras WHERE totalCompras > 50000 RETURN prov;';
       const session = driver.session();

       try {
           const result = await session.run(Q9);
           const proveedores = result.records.map(record => record.get('prov').properties);
           res.status(200).json({proveedores});
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los proveedores '});
       } finally {
            await session.close(); 
        }
    });
// Q05. Obtener la lista de todos los  proveedores.
router.route('/proveedores')
    .all(cache)
   .get( async (req, res) => { // Aplicamos cache como middleware
       const Q5 = 'MATCH (prov:Proveedor) RETURN prov;';
       const session = driver.session();

       try {
           const result = await session.run(Q5);
           const proveedores = result.records.map(record => record.get('prov').properties);
           res.status(200).json({ proveedores });
           
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(500).json({ error: 'Error al obtener los provedores' });
       }  finally {
           await session.close(); 
        }
   });
//Q12 Eliminar todos los proveedores y sus nodos asociados..
   router.route('/proveedores/delete')
    .delete(async (req, res) => {
        const Q3 = `
            MATCH (p:Proveedor)
            OPTIONAL MATCH (p)-[r]-()
            DETACH DELETE p
            RETURN COUNT(p) AS eliminados;
        `;
        const session = driver.session();

        try {
            const result = await session.run(Q3);
            const eliminados = result.records[0].get('eliminados');
            res.status(200).json({ message: `Proveedores y sus nodos asociados eliminados: ${eliminados}` });
        } catch (error) {
            console.error("Error eliminando proveedores y sus nodos asociados:", error);
            res.status(500).json({ error: 'Error al eliminar los proveedores y sus nodos asociados' });
        } finally {
            await session.close();
        }
    });


//Q13 Todos los productos de una categoría específica eliminados del inventario.
   router.route('/categoria/:categoria')
    .all(cache)
    .delete(async (req, res) => { // Aplicamos cache como middleware
        const categoria = req.params.categoria;
        const Q13g = `
            MATCH (p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: $categoria}) 
            RETURN p
        `;
        const Q13 = "MATCH (p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: $categoria}) DETACH DELETE p;";
        const session = driver.session();

        try {
            
            const result = await session.run(Q13g, { categoria });
            const productos = result.records.map(record => record.get('p').properties);
            await session.run(Q13, { categoria });
            res.status(200).json({ message:"Productos elimnados",productos });
        } catch (error) {
            console.error("Error ejecutando la consulta:", error);
            res.status(500).json({ error: 'Error al obtener los provedores' });
        } finally {
            await session.close(); 
        }
    });
//Q14. Todos los pedidos de compra de un proveedor en particular son transferidos a otro proveedor por un cambio de contrato.
router.route('/proveedores/otro/:idproveedor')
   .all(cache)
   .put(async (req, res) => { // Aplicamos cache como middleware
       const idproveedor = req.params.idproveedor;
       const idproveedorn = req.body.idproveedorn;
       const Q14 = `
           MATCH (provAnt:Proveedor {id: $idproveedor})<-[:PEDIDO_REALIZADO_A]-(pc:PedidoCompra) 
           MATCH (provNuevo:Proveedor {id: $idproveedorn}) 
           MATCH (provAnt)<-[r:PEDIDO_REALIZADO_A]-(pc) 
           DELETE r 
           CREATE (provNuevo)-[:PEDIDO_REALIZADO_A]->(pc);
           return pc
       `;
        const session = driver.session();
       try {
           const result = await session.run(Q14, { idproveedor, idproveedorn });
           const proveedores = result.records.map(record => record.get('pc').properties);
           res.status(200).json({message:"Pedidos compras Trasferidos Exitosamente",proveedores });
       } catch (error) {
           console.error("Error ejecutando la consulta:", error);
           res.status(200).json({ message: 'Pedidos compras Trasferidos Exitosamente' });
       } finally {
           await session.close(); 
       }
   });
//q0 Crear un proveedor con sus relaciones 
router.route('/proveedores')
    .post(async (req, res) => {
        const { id, nombre, ciudad, telefono, email, productos } = req.body;
        
        const Q4Proveedor = `
            CREATE (prov:Proveedor {id: $id, nombre: $nombre, Ciudad: $ciudad, telefono: $telefono, email: $email})
            RETURN prov
        `;
        
        const Q4Relacion = `
            MATCH (prov:Proveedor {id: $id})
            UNWIND $productos AS codigo
            MATCH (p:Producto {codigo: codigo})
            CREATE (prov)-[:SUMINISTRA]->(p)
        `;

        const session = driver.session();

        try {
            // Crear el proveedor
            const resultProveedor = await session.run(Q4Proveedor, { id, nombre, ciudad, telefono, email });
            const proveedor = resultProveedor.records[0].get('prov').properties;

            // Crear las relaciones con los productos
            await session.run(Q4Relacion, { id, productos });

            res.status(201).json({ message: "Proveedor creado con éxito", proveedor });
        } catch (error) {
            console.error("Error al crear el proveedor:", error);
            res.status(500).json({ error: 'Error al crear el proveedor' });
        } finally {
            await session.close();
        }
    });

module.exports = router;