//rutaobtener.js
const express = require('express');
var router = express.Router();
const neo4j = require("neo4j-driver");
const cache = require("./cache");


var driver = neo4j.driver(
   'neo4j://172.19.0.2',
   neo4j.auth.basic('neo4j', 'neo4j')
);


//Q1. Obtener todos los productos que tengan stock = 0
//MATCH (p:Producto) 
//WHERE p.stock = 0 
//RETURN p; 

router.route('/productos')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (p:Producto) WHERE p.stock = 0 RETURN p')
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
 
//Q02 Obtener la lista de pedidos de compra que fueron realizados a un proveedor en específico.
//MATCH (prov:Proveedor)-[:SUMINISTRA]->(p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: 'Laptops'}) 
//RETURN DISTINCT prov; 

router.route('/proveedores')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (prov:Proveedor)-[:SUMINISTRA]->(p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: "Laptops"}) RETURN DISTINCT prov')
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

 //Q03 Encontrar los productos que han sido comprados por más de 5 clientes diferentes.
//MATCH (prov:Proveedor {id: 'PR001'})<-[:REALIZADO_A]-(pc:PedidoCompra) 
//RETURN pc;

router.route('/pedidos')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (prov:Proveedor {id: "PR001"})<-[:REALIZADO_A]-(pc:PedidoProducto) RETURN pc')
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


//Q05  Obtener la lista de todos los  proveedores.
//MATCH (prov:Proveedor) 
//RETURN prov;

router.route('/Obproveedor')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (prov:Proveedor) RETURN prov')
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
 //cual es la url para la Q05 en postman para obtener la lista de todos los proveedores en la base de datos de neo4j 

//  Q06 Encontrar los pedidos de venta que tienen una devolución
// MATCH (dv:Devolucion)-[:PERTENECE_A]->(pv:PedidoVenta) 
// RETURN pv; 

router.route('/Encontrardevoluciones')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (dv:Devolucion)-[:PERTENECE_A]->(pv:PedidoVenta) RETURN pv')
         .then(result => {
             devoluciones = result.records.map(record => {
                 return record.get('pv').properties;
             })
             res.data = devoluciones;
             res.json({ Devoluciones: devoluciones });
         })
         .catch(error => {
             console.log(error);
         })
         .then(() => session.close())
 });


//  Q07 Listar los pedidos de venta que tienen un valor total mayor a $10,000.
//  MATCH (pv:PedidoVenta) 
//  WHERE pv.precioTotal > 10000 
//  RETURN pv;

router.route('/Listapedidos')
 .all(cache)
 .get(async (req, res) => {
     const session = driver.session();
     await session.run('MATCH (pv:PedidoVenta) WHERE pv.precioTotal > 10000 RETURN pv')
         .then(result => {
             pedidos = result.records.map(record => {
                 return record.get('pv').properties;
             })
             res.data = pedidos;
             res.json({ Pedidos: pedidos });
         })
         .catch(error => {
             console.log(error);
         })
         .then(() => session.close())
 });


module.exports = router;