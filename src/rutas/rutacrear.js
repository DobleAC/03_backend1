//rutacrear.js
const express = require('express');
var router = express.Router();
const neo4j = require("neo4j-driver");
const cache = require("./cache");


var driver = neo4j.driver(
   'neo4j://172.19.0.2',
   neo4j.auth.basic('neo4j', 'neo4j')
);
// Q12 Eliminar todos los proveedores y sus nodos asociados.
// MATCH (prov:Proveedor) 
// DETACH DELETE prov; 

router.route('/Eliproveedor')
   .all(cache)
   .delete(async (req, res) => {
       const session = driver.session();
       await session.run('MATCH (prov:Proveedor) DETACH DELETE prov')
           .then(result => {
               proveedores = result.records.map(record => {
                   return record.get('prov').properties;
               })
               res.data = proveedores;
               res.json({ Proveedores: proveedores });
           })
           .catch(error => {
               console.log(error);
           })
           .then(() => session.close())
   });
//Q13 Todos los productos de una categoría específica eliminados del inventario.
//MATCH (p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: 'Laptops'})
//DETACH DELETE p; 

router.route('/Allproducto')
   .all(cache)
   .delete(async (req, res) => {
       const session = driver.session();
       await session.run('MATCH (p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: "Laptops"}) DETACH DELETE p')
           .then(result => {
               productos = result.records.map(record => {
                   return record.get('p').properties;
               })
               res.data = productos;
               res.json({ Productos: productos });
           })
           .catch(error => {
               console.log(error);
           })
           .then(() => session.close())
   });

//Q14 Transferir todos los pedidos de compra de un proveedor a otro
//MATCH (provAnt:Proveedor {id: 'PR004'})<-[:REALIZADO_A]-(pc:PedidoCompra) 
//MATCH (provNuevo:Proveedor {id: 'PR001'}) 
//MATCH (provAnt)<-[r:REALIZADO_A]-(pc) 
//DELETE r // Eliminar solo la relación
//CREATE (provNuevo)-[:REALIZADO_A]->(pc);

router.route('/Tranpedido')
   .all(cache)
   .delete(async (req, res) => {
       const session = driver.session();    

       await session.run('MATCH (provAnt:Proveedor {id: "PR004"})<-[:REALIZADO_A]-(pc:PedidoCompra) ' +
       'MATCH (provNuevo:Proveedor {id: "PR001"}) ' +
       'MATCH (provAnt)<-[r:REALIZADO_A]-(pc) ' +
       'DELETE r ' +
       'CREATE (provNuevo)-[:REALIZADO_A]->(pc)')
           .then(result => {
               pedidos = result.records.map(record => {
                   return record.get('pc').properties;
               })
               res.data = pedidos;
               res.json({ Pedidos: pedidos });
           })
           .catch(error => {
               console.log(error);
           })
           .then(() => session.close())
   });
//************************************************************************ 
// Ruta para crear un nuevo producto
router.route('/Crearproductos')
    .all(cache)
    .post(async (req, res) => {
        const { nombre, descripcion, precio, stock, categoriaNombre } = req.body; // Espera que el cuerpo tenga estos campos
        const session = driver.session();
        
        try {
            const result = await session.run(`
                MATCH (cat:Categoria {nombre: $categoriaNombre})
                CREATE (p:Producto {
                    nombre: $nombre,
                    descripcion: $descripcion,
                    precio: $precio,
                    stock: $stock
                })
                CREATE (cat)<-[:PERTENECE_A]-(p)
                RETURN p
            `, {
                nombre,
                descripcion,
                precio,
                stock,
                categoriaNombre
            });

            const nuevoProducto = result.records[0].get('p').properties;
            res.status(201).json({ Producto: nuevoProducto });
        } catch (error) {
            console.error('Error creando el producto:', error);
            res.status(500).json({ error: 'Error creando el producto' });
        } finally {
            await session.close();
        }
    });

//    Q08 Encontrar los productos que se encuentran agotados (sin stock) en el inventario.
//    MATCH (provAnt:Proveedor {id: 'PR001'})-[r:SUMINISTRA]->(p:Producto)
//    MATCH (provNuevo:Proveedor {id: 'PR004'})
//    DELETE r
//    CREATE (provNuevo)-[:SUMINISTRA]->(p)
//    RETURN p;

router.route('/agotados')
   .all(cache)
   .delete(async (req, res) => {
       const session = driver.session();
       await session.run('MATCH (provAnt:Proveedor {id: "PR001"})-[r:SUMINISTRA]->(p:Producto) ' +
       'MATCH (provNuevo:Proveedor {id: "PR004"}) ' +
       'DELETE r ' +
       'CREATE (provNuevo)-[:SUMINISTRA]->(p) ' +
       'RETURN p')
           .then(result => {
               productos = result.records.map(record => {
                   return record.get('p').properties;
               })
               res.data = productos;
               res.json({ Productos: productos });
           })
           .catch(error => {
               console.log(error);
           })
           .then(() => session.close())
   });
// Ruta para crear una nueva categoría
router.route('/CrearCategoria')
    .all(cache)
    .post(async (req, res) => {
        const { nombreCategoria } = req.body; // Espera que el cuerpo tenga el campo nombreCategoria
        const session = driver.session();
        
        try {
            // Crear la nueva categoría en la base de datos
            const result = await session.run(`
                CREATE (cat:Categoria {nombre: $nombreCategoria})
                RETURN cat
            `, { nombreCategoria });

            const nuevaCategoria = result.records[0].get('cat').properties;
            res.status(201).json({ Categoria: nuevaCategoria });
        } catch (error) {
            console.error('Error creando la categoría:', error);
            res.status(500).json({ error: 'Error creando la categoría' });
        } finally {
            await session.close();
        }
    });

module.exports = router;