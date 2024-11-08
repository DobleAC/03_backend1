# 03_backend1

# Introducción: 
El contenido del presente README incluye toda la información que se utilizó para desarrollar el escenario de datos en NEO4J.

# Link GitHub
    https://github.com/DobleAC/03_backend1.git
# Contenido 
1-. Introducción

2-. Problematica

    - Gestión de Inventarios. 
    - Productos:
    - Proveedores:
    - Pedidos de Compra:
    - Clientes:
    - Pedidos de Venta:
    - Devoluciones:
3-. Docker images

4-. Collección en Postman

5-. Escenario de datos 

6-. Q00 Script del escenario de datos.

7-. Query's cypher 

    - Q01

    - Q02 

    - Q03

    - Q04

    - Q05

    - Q06

    - Q07

    - Q08

    - Q09

    - Q10 

    - Q11

    - Q12

    - Q13

    - Q14

    - Q15
8-. Estructura VS COde 

9-. Instalar todas las dependencias

10-. Instalar las dependencias individualmente

11-. cache.js 

12-. logger.js 

13-. rutacrear.js

14-. rutaobtener.js

15-. server.js

16-. .dockerignore

17-. docker-compose.yml

18-. Dockerfile

19-. Problematica

###
# Problemario

### Gestión de Inventarios. 

    Una empresa de distribución de productos electrónicos requiere un sistema para gestionar sus inventarios, proveedores y la distribución de productos a clientes finales.
### Productos:
    Cada producto tiene un código, nombre, descripción, precio, y cantidad en stock.
    Los productos pertenecen a una categoría específica (por ejemplo, laptops, smartphones, televisores).
### Proveedores:
    Los proveedores son empresas que suministran productos. Cada proveedor tiene un ID, nombre de la empresa, país de origen, teléfono y correo electrónico de contacto.
    Un proveedor puede suministrar uno o varios productos.
### Pedidos de Compra:
    Los pedidos de compra contienen información sobre el producto pedido, la cantidad solicitada, el precio unitario, la fecha de pedido y la fecha de recepción.
    Cada pedido de compra está vinculado a un proveedor específico que suministra los productos solicitados.
### Clientes:
    Los clientes son las personas o empresas que compran los productos. Cada cliente tiene un ID, nombre, dirección, ciudad, teléfono y correo electrónico.
    Cada cliente puede hacer varios pedidos a lo largo del tiempo.
### Pedidos de Venta:
    Un pedido de venta se genera cuando un cliente compra uno o varios productos. Cada pedido incluye los productos solicitados, la cantidad, el precio de venta, y la fecha de entrega.
    Un cliente puede tener múltiples pedidos de venta a lo largo del tiempo.
### Devoluciones:
    Los productos pueden ser devueltos si presentan fallas. Se requiere registrar la fecha de devolución, el motivo de la devolución y si se reembolsa el dinero al cliente.
    Cada devolución está vinculada a un pedido de venta y a un cliente específico.

# Docker images 
docker pull alaacabralma/03_backend1:v.2

## Collección en Postman
//Q01
METODO: GET
URL:http://localhost:3000/api/productos

//Q02
METODO: GET
URL:http://localhost:3000/api/proveedores

//Q03
METODO: GET
URL:http://localhost:3000/api/pedidos

//Q05
METODO: GET
URL:http://localhost:3000/api/Obproveedor

//Q06
METODO: GET
URL:http://localhost:3000/api/Encontrardevoluciones

//Q07
METODO: GET
URL:http://localhost:3000/api/Listapedidos

//Agregar Categoria
POST: 
URL:http://localhost:3000/api/CrearCategoria

    JSON:
    {
        "nombreCategoria": "Tablets"
    }

//Q14Post
POST: 
URL:http://localhost:3000/api/Crearproductos

    JSON:
    {
        "nombre": "Laptop Lenovo",
        "descripcion": "Laptop ideal para Ing. en sistemas computacionales",
        "precio": 5000,
        "stock": 50,
        "categoriaNombre": "Laptops"
    }

//Q12
DELETE: 
URL:http://localhost:3000/api/Eliproveedor

//Q13
DELETE: 
URL:http://localhost:3000/api/Allproducto

//Q14
DELETE: 
URL:http://localhost:3000/api/Tranpedido

//Q08
DELETE: 
URL:http://localhost:3000/api/agotados



# Escenario de datos 
## Q00 Script del escenario de datos.
// Creación de categorías 

    CREATE (laptops:Categoria {nombre: 'Laptops'}) RETURN laptops;
    CREATE (smartphones:Categoria {nombre: 'Smartphones'}) RETURN smartphones;
    CREATE (televisores:Categoria {nombre: 'Televisores'}) RETURN televisores;

// Creación de productos

    CREATE (p1:Producto {codigo: 'P001', nombre: 'Laptop Gamer', descripcion: 'Laptop potente para juegos', precio: 12000, stock: 5});
    CREATE (p2:Producto {codigo: 'P002', nombre: 'Smartphone Pro', descripcion: 'Smartphone de alta gama', precio: 800, stock: 20});
    CREATE (p3:Producto {codigo: 'P003', nombre: 'Televisor 4K', descripcion: 'Televisor con resolución 4K', precio: 600, stock: 0});
    CREATE (p4:Producto {codigo: 'P004', nombre: 'Laptop Ultra', descripcion: 'Laptop ultraligera', precio: 30000, stock: 8});
    CREATE (p5:Producto {codigo: 'P005', nombre: 'Smartphone Básico', descripcion: 'Smartphone económico', precio: 200, stock: 15});
    CREATE (p6:Producto {codigo: 'P006', nombre: 'Laptop de Estudio', descripcion: 'Ideal para estudiantes', precio: 900, stock: 10});
    CREATE (p7:Producto {codigo: 'P007', nombre: 'Smartphone Lite', descripcion: 'Smartphone básico', precio: 150, stock: 25});
    CREATE (p8:Producto {codigo: 'P008', nombre: 'Televisor Smart', descripcion: 'Televisor inteligente', precio: 750, stock: 3});
    CREATE (p9:Producto {codigo: 'P009', nombre: 'Lapto Lenovo EStudiante', descripcion: 'Laptop lenovo para estudiante', precio: 50000, stock: 30});
    CREATE (p10:Producto {codigo: 'P010', nombre: 'Smartphone Nokia', descripcion: 'Smartphone Nokia', precio: 25000, stock: 12});


// Relación productos-categorías

    MATCH (p1:Producto {codigo: 'P001'}), (laptops:Categoria {nombre: 'Laptops'}) 
    MERGE (p1)-[:PERTENECE_A]->(laptops);

    MATCH (p2:Producto {codigo: 'P002'}), (smartphones:Categoria {nombre: 'Smartphones'}) 
    MERGE (p2)-[:PERTENECE_A]->(smartphones);

    MATCH (p3:Producto {codigo: 'P003'}), (televisores:Categoria {nombre: 'Televisores'}) 
    MERGE (p3)-[:PERTENECE_A]->(televisores);

    MATCH (p4:Producto {codigo: 'P004'}), (laptops:Categoria {nombre: 'Laptops'}) 
    MERGE (p4)-[:PERTENECE_A]->(laptops);

    MATCH (p5:Producto {codigo: 'P005'}), (smartphones:Categoria {nombre: 'Smartphones'}) 
    MERGE (p5)-[:PERTENECE_A]->(smartphones);

    MATCH (p6:Producto {codigo: 'P006'}), (laptops:Categoria {nombre: 'Laptops'}) 
    MERGE (p6)-[:PERTENECE_A]->(laptops);

    MATCH (p7:Producto {codigo: 'P007'}), (smartphones:Categoria {nombre: 'Smartphones'}) 
    MERGE (p7)-[:PERTENECE_A]->(smartphones);

    MATCH (p8:Producto {codigo: 'P008'}), (televisores:Categoria {nombre: 'Televisores'}) 
    MERGE (p8)-[:PERTENECE_A]->(televisores);

    MATCH (p9:Producto {codigo: 'P009'}), (laptops:Categoria {nombre: 'Laptops'}) 
    MERGE (p9)-[:PERTENECE_A]->(laptops);

    MATCH (p10:Producto {codigo: 'P010'}), (smartphones:Categoria {nombre: 'Smartphones'}) 
    MERGE (p10)-[:PERTENECE_A]->(smartphones);


// Creación de proveedores

    CREATE (prov1:Proveedor {id: 'PR001', nombre: 'Proveedor A', pais: 'USA', telefono: '123456789', email: 'contacto@proveedora.com'}),
        (prov2:Proveedor {id: 'PR002', nombre: 'Proveedor B', pais: 'México', telefono: '987654321', email: 'contacto@proveedorb.com'}),
        (prov3:Proveedor {id: 'PR003', nombre: 'Proveedor C', pais: 'México', telefono: '987654576', email: 'contacto@proveedorc.com'}),
        (prov4:Proveedor {id: 'PR004', nombre: 'Proveedor D', pais: 'USA', telefono: '123456421', email: 'contacto@proveedord.com'});

// Relación proveedores-productos

    MATCH (prov1:Proveedor {id:'PR001'}), (p1:Producto {codigo: 'P001'})
    CREATE (prov1)-[:SUMINISTRA]->(p1);

    MATCH (prov3:Proveedor {id:'PR003'}), (p2:Producto {codigo: 'P002'})
    CREATE (prov3)-[:SUMINISTRA]->(p2);

    MATCH (prov2:Proveedor {id:'PR002'}), (p3:Producto {codigo: 'P003'})
    CREATE (prov2)-[:SUMINISTRA]->(p3);

    MATCH (prov4:Proveedor {id:'PR004'}), (p4:Producto {codigo: 'P004'})
    CREATE (prov4)-[:SUMINISTRA]->(p4);

    MATCH (prov1:Proveedor {id:'PR001'}), (p6:Producto {codigo: 'P006'})
    CREATE (prov1)-[:SUMINISTRA]->(p6);

    MATCH (prov3:Proveedor {id:'PR003'}), (p7:Producto {codigo: 'P007'})
    CREATE (prov3)-[:SUMINISTRA]->(p7);

    MATCH (prov2:Proveedor {id:'PR002'}), (p8:Producto {codigo: 'P008'})
    CREATE (prov2)-[:SUMINISTRA]->(p8);

    MATCH (prov1:Proveedor {id:'PR001'}), (p9:Producto {codigo: 'P009'})
    CREATE (prov1)-[:SUMINISTRA]->(p9);

    MATCH (prov2:Proveedor {id:'PR002'}), (p10:Producto {codigo: 'P010'})
    CREATE (prov2)-[:SUMINISTRA]->(p10);


// Creación de clientes

    CREATE (cli1:Cliente {id: 'C001', nombre: 'Juan Perez', direccion: 'Calle 1', ciudad: 'Ciudad A', telefono: '555123456', email: 'JuanPerez@mail.com'}),
        (cli2:Cliente {id: 'C002', nombre: 'Sophia Lopez', direccion: 'Calle 2', ciudad: 'Ciudad B', telefono: '555654321', email: 'SophiaLopez@mail.com'}),
        (cli3:Cliente {id: 'C003', nombre: 'Carlos Pérez', direccion: 'Avenida 5', ciudad: 'Ciudad C', telefono: '555123456', email: 'CarlosP@mail.com'}),
        (cli4:Cliente {id: 'C004', nombre: 'María Garcia', direccion: 'Calle 8', ciudad: 'Ciudad D', telefono: '555987654', email: 'MariaGarcia@mail.com'}),
        (cli5:Cliente {id: 'C005', nombre: 'Javier Martínez', direccion: 'Calle 10', ciudad: 'Ciudad E', telefono: '555321654', email: 'JavierM@mail.com'}),
        (cli6:Cliente {id: 'C006', nombre: 'Ana Torres', direccion: 'Calle 3', ciudad: 'Ciudad F', telefono: '555654321', email: 'AnaTorres@mail.com'}),
        (cli7:Cliente {id: 'C007', nombre: 'Luis García', direccion: 'Calle 4', ciudad: 'Ciudad G', telefono: '555987321', email: 'LuisGarcia@mail.com'}),
        (cli8:Cliente {id: 'C008', nombre: 'Elena Jiménez', direccion: 'Calle 5', ciudad: 'Ciudad H', telefono: '555321987', email: 'ElenaJimenez@mail.com'});

// Creación de pedidos de venta

    CREATE (pedidoVenta1:PedidoVenta {id: 'PV1', codigo: 'P001', nombre: 'Laptop Gamer', cantidad: 1, fecha: '2023-10-01', precioTotal: 12000}),
        (pedidoVenta2:PedidoVenta {id: 'PV2', codigo: 'P002', nombre: 'Smartphone Pro', cantidad: 1, fecha: '2023-10-02', precioTotal: 800}),
        (pedidoVenta3:PedidoVenta {id: 'PV3', codigo: 'P003', nombre: 'Televisor 4K', cantidad: 1, fecha: '2023-10-03', precioTotal: 600}),
        (pedidoVenta4:PedidoVenta {id: 'PV4', codigo: 'P004', nombre: 'Laptop Ultra', cantidad: 1, fecha: '2023-10-04', precioTotal: 30000}),
        (pedidoVenta5:PedidoVenta {id: 'PV5', codigo: 'P005', nombre: 'Smartphone Básico', cantidad: 2, fecha: '2023-10-05', precioTotal: 400}),
        (pedidoVenta6:PedidoVenta {id: 'PV6', codigo: 'P006', nombre: 'Laptop de Estudio', cantidad: 1, fecha: '2023-10-06', precioTotal: 900}),
        (pedidoVenta7:PedidoVenta {id: 'PV7', codigo: 'P007', nombre: 'Smartphone Lite', cantidad: 3, fecha: '2023-10-07', precioTotal: 450}),
        (pedidoVenta8:PedidoVenta {id: 'PV8', codigo: 'P008', nombre: 'Televisor Smart', cantidad: 1, fecha: '2023-10-08', precioTotal: 750}),
        (pedidoVenta9:PedidoVenta {id: 'PV9', codigo: 'P009', nombre: 'Laptop Lenovo Estudiante', cantidad: 1, fecha: '2023-10-09', precioTotal: 50000}),
        (pedidoVenta10:PedidoVenta {id: 'PV10', codigo: 'P010', nombre: 'Smartphone Nokia', cantidad: 1, fecha: '2023-10-10', precioTotal: 25000});

// Relación pedidos de venta con productos

    MATCH (pedidoVenta1:PedidoVenta {id: 'PV1'}), (p1:Producto {codigo: 'P001'})
    CREATE (pedidoVenta1)-[:CONTENIENDO]->(p1);

    MATCH (pedidoVenta2:PedidoVenta {id: 'PV2'}), (p2:Producto {codigo: 'P002'})
    CREATE (pedidoVenta2)-[:CONTENIENDO]->(p2);

    MATCH (pedidoVenta3:PedidoVenta {id: 'PV3'}), (p3:Producto {codigo: 'P003'})
    CREATE (pedidoVenta3)-[:CONTENIENDO]->(p3);

    MATCH (pedidoVenta4:PedidoVenta {id: 'PV4'}), (p4:Producto {codigo: 'P004'})
    CREATE (pedidoVenta4)-[:CONTENIENDO]->(p4);

    MATCH (pedidoVenta5:PedidoVenta {id: 'PV5'}), (p5:Producto {codigo: 'P005'})
    CREATE (pedidoVenta5)-[:CONTENIENDO]->(p5);

    MATCH (pedidoVenta6:PedidoVenta {id: 'PV6'}), (p6:Producto {codigo: 'P006'})
    CREATE (pedidoVenta6)-[:CONTENIENDO]->(p6);

    MATCH (pedidoVenta7:PedidoVenta {id: 'PV7'}), (p7:Producto {codigo: 'P007'})
    CREATE (pedidoVenta7)-[:CONTENIENDO]->(p7);

    MATCH (pedidoVenta8:PedidoVenta {id: 'PV8'}), (p8:Producto {codigo: 'P008'})
    CREATE (pedidoVenta8)-[:CONTENIENDO]->(p8);

    MATCH (pedidoVenta9:PedidoVenta {id: 'PV9'}), (p9:Producto {codigo: 'P009'})
    CREATE (pedidoVenta9)-[:CONTENIENDO]->(p9);

    MATCH (pedidoVenta10:PedidoVenta {id: 'PV10'}), (p10:Producto {codigo: 'P010'})
    CREATE (pedidoVenta10)-[:CONTENIENDO]->(p10);


// Relación clientes-pedidos de venta

    MATCH (cli1:Cliente {id: 'C001'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli1)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli2:Cliente {id: 'C002'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli2)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli3:Cliente {id: 'C003'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli3)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli4:Cliente {id: 'C004'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli4)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli5:Cliente {id: 'C005'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli5)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli6:Cliente {id: 'C006'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
    CREATE (cli6)-[:REALIZA]->(pedidoVenta1);

    MATCH (cli2:Cliente {id: 'C002'}), (pedidoVenta2:PedidoVenta {id: 'PV2'})
    CREATE (cli2)-[:REALIZA]->(pedidoVenta2);

    MATCH (cli3:Cliente {id: 'C003'}), (pedidoVenta3:PedidoVenta {id: 'PV3'})
    CREATE (cli3)-[:REALIZA]->(pedidoVenta3);

    MATCH (cli4:Cliente {id: 'C004'}), (pedidoVenta4:PedidoVenta {id: 'PV4'})
    CREATE (cli4)-[:REALIZA]->(pedidoVenta4);

    MATCH (cli5:Cliente {id: 'C005'}), (pedidoVenta5:PedidoVenta {id: 'PV5'})
    CREATE (cli5)-[:REALIZA]->(pedidoVenta5);

    MATCH (cli6:Cliente {id: 'C006'}), (pedidoVenta6:PedidoVenta {id: 'PV6'})
    CREATE (cli6)-[:REALIZA]->(pedidoVenta6);

    MATCH (cli7:Cliente {id: 'C007'}), (pedidoVenta7:PedidoVenta {id: 'PV7'})
    CREATE (cli7)-[:REALIZA]->(pedidoVenta7);

    MATCH (cli8:Cliente {id: 'C008'}), (pedidoVenta8:PedidoVenta {id: 'PV8'})
    CREATE (cli8)-[:REALIZA]->(pedidoVenta8);


// Crear relaciones entre pedidos de venta y devoluciones

    MATCH (p1:PedidoVenta {id: 'PV1'}), (d1:Devolucion {id: 'DV1'})
    CREATE (d1)-[:DEVOLUCION_DE]->(p1);

    MATCH (p2:PedidoVenta {id: 'PV2'}), (d2:Devolucion {id: 'DV2'})
    CREATE (d2)-[:DEVOLUCION_DE]->(p2);

// Creación de devoluciones

    CREATE (devolucion1:Devolucion {id: 'DV1', fecha: '2023-10-05', motivo: 'Falla de fábrica', reembolso: true}),
        (devolucion2:Devolucion {id: 'DV2', fecha: '2023-10-06', motivo: 'Producto defectuoso', reembolso: false});

// Relación devoluciones-clientes

    MATCH (cli4:Cliente {id: 'C004'}), (devolucion1:Devolucion {id: 'DV1'})
    CREATE (devolucion1)-[:PERTENECE_A]->(cli4);

    MATCH (cli2:Cliente {id: 'C002'}), (devolucion2:Devolucion {id: 'DV2'})
    CREATE (devolucion2)-[:PERTENECE_A]->(cli2);

// Creación de pedidos de compra

    CREATE (p1:PedidoCompra {
        id: 'PC002',
        fecha: '2024-10-05',
        valor: 30000
    })
    WITH p1
    MATCH (proveedor:Proveedor {nombre: 'Proveedor B'})
    CREATE (p1)-[:REALIZADO_A]->(proveedor)
    RETURN p1;

    CREATE (p2:PedidoCompra {
        id: 'PC003',
        fecha: '2024-10-10',
        valor: 15000
    })

    WITH p2
    MATCH (proveedor:Proveedor {nombre: 'Proveedor C'})
    CREATE (p2)-[:REALIZADO_A]->(proveedor)
    RETURN p2;

    CREATE (p3:PedidoCompra {
        id: 'PC004',
        fecha: '2024-10-15',
        valor: 200000
    })
    WITH p3
    MATCH (proveedor:Proveedor {nombre: 'Proveedor D'})
    CREATE (p3)-[:REALIZADO_A]->(proveedor)
    RETURN p3;

    CREATE (p4:PedidoCompra {
        id: 'PC005',
        fecha: '2024-10-20',
        valor: 250000
    })
    WITH p4
    MATCH (proveedor:Proveedor {nombre: 'Proveedor A'})
    CREATE (p4)-[:REALIZADO_A]->(proveedor)
    RETURN p4;

    CREATE (p5:PedidoCompra {
        id: 'PC006',
        fecha: '2024-10-25',
        valor: 45000
    })
    WITH p5
    MATCH (proveedor:Proveedor {nombre: 'Proveedor B'})
    CREATE (p5)-[:REALIZADO_A]->(proveedor)
    RETURN p5;

// Pedido de compra 7

    CREATE (p6:PedidoCompra {
        id: 'PC007',
        fecha: '2024-10-30',
        valor: 60000
    })
    WITH p6
    MATCH (proveedor:Proveedor {nombre: 'Proveedor C'})
    CREATE (p6)-[:REALIZADO_A]->(proveedor)
    RETURN p6;

// Pedido de compra 8
    
    CREATE (p7:PedidoCompra {
        id: 'PC008',
        fecha: '2024-11-02',
        valor: 120000
    })
    WITH p7
    MATCH (proveedor:Proveedor {nombre: 'Proveedor D'})
    CREATE (p7)-[:REALIZADO_A]->(proveedor)
    RETURN p7;

// Pedido de compra 9
    
    CREATE (p8:PedidoCompra {
        id: 'PC009',
        fecha: '2024-11-05',
        valor: 80000
    })
    WITH p8
    MATCH (proveedor:Proveedor {nombre: 'Proveedor A'})
    CREATE (p8)-[:REALIZADO_A]->(proveedor)
    RETURN p8;

// Pedido de compra 10
    
    CREATE (p9:PedidoCompra {
        id: 'PC010',
        fecha: '2024-11-10',
        valor: 95000
    })
    WITH p9
    MATCH (proveedor:Proveedor {nombre: 'Proveedor B'})
    CREATE (p9)-[:REALIZADO_A]->(proveedor)
    RETURN p9;

// Pedido de compra 11
    
    CREATE (p10:PedidoCompra {
        id: 'PC011',
        fecha: '2024-11-15',
        valor: 150000
    })
    WITH p10
    MATCH (proveedor:Proveedor {nombre: 'Proveedor C'})
    CREATE (p10)-[:REALIZADO_A]->(proveedor)
    RETURN p10;




###
# Query's cypher 

Q01 Obtener la lista de productos que tienen menos de 10 unidades en stock.

    MATCH (p:Producto) 
    WHERE p.stock < 10 
    RETURN p;

Q02 Obtener la lista de pedidos de compra que fueron realizados a un proveedor en específico.

    MATCH (prov:Proveedor)-[:SUMINISTRA]->(p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: 'Laptops'}) 
    RETURN DISTINCT prov;

Q03 Obtener la lista de pedidos de compra que fueron realizados a un proveedor en específico.

    MATCH (prov:Proveedor {id: 'PR001'})<-[:REALIZADO_A]-(pc:PedidoCompra) 
    RETURN pc;

Q04 Encontrar los productos que han sido comprados por más de 5 clientes diferentes.

    MATCH (c:Cliente)-[:REALIZA]->(p:PedidoVenta)
    WITH p, COUNT(DISTINCT c) AS totalClientes
    WHERE totalClientes > 5
    RETURN p.id AS ProductoID, p.nombre AS NombreProducto, totalClientes


Q05  Obtener la lista de todos los  proveedores.

    MATCH (prov:Proveedor) 
    RETURN prov;

Q06 Encontrar los pedidos de venta que tienen una devolución

    MATCH (p:PedidoVenta)<-[:DEVOLUCION_DE]-(d:Devolucion)
    RETURN p.id AS PedidoID, p.nombre AS NombreProducto, d.id AS DevolucionID, d.motivo AS MotivoDevolucion;

Q07 Listar los pedidos de venta que tienen un valor total mayor a $10,000.

    MATCH (pv:PedidoVenta) 
    WHERE pv.precioTotal > 10000 
    RETURN pv;

Q08 Cambiar todos los productos suministrados por un proveedor a otro proveedor.

    MATCH (provAnt:Proveedor {id: 'PR004'})-[r:SUMINISTRA]->(p:Producto)
    MATCH (provNuevo:Proveedor {id: 'PR001'})
    DELETE r
    CREATE (provNuevo)-[:SUMINISTRA]->(p)
    RETURN p;

Q09 Obtener la lista de proveedores que han recibido pedidos de compra por más de $50,000 en total.

    MATCH (prov:Proveedor)<-[:REALIZADO_A]-(pc:PedidoCompra)
    WITH prov, SUM(pc.valor) AS totalCompras
    WHERE totalCompras > 50000
    RETURN prov;

Q10 Encontrar los productos que se encuentran agotados (sin stock) en el inventario.

    MATCH (p:Producto) 
    WHERE p.stock = 0 
    RETURN p;

Q11  Obtener la lista de clientes.

    MATCH (cli:Cliente) 
    RETURN cli;

Q12 Eliminar todos los proveedores y sus nodos asociados.

    MATCH (prov:Proveedor) 
    DETACH DELETE prov;

Q13 Todos los productos de una categoría específica eliminados del inventario.

    MATCH (p:Producto)-[:PERTENECE_A]->(cat:Categoria {nombre: 'Laptops'})
    DETACH DELETE p;

Q14 Transferir todos los pedidos de compra de un proveedor a otro

    MATCH (provAnt:Proveedor {id: 'PR004'})<-[:REALIZADO_A]-(pc:PedidoCompra) 
    MATCH (provNuevo:Proveedor {id: 'PR001'}) 
    MATCH (provAnt)<-[r:REALIZADO_A]-(pc) 
    DELETE r // Eliminar solo la relación
    CREATE (provNuevo)-[:REALIZADO_A]->(pc);

Q15 Eliminar todos los clientes que han realizado devoluciones..

    MATCH (d:Devolucion)-[:PERTENECE_A]->(c:Cliente)
            WITH c, d, c AS clienteEliminado
            DETACH DELETE c, d
            RETURN clienteEliminado;


## Estructura VS COde 

    03_BACKEND1
    │
    ├── node_modules/
    │
    └── src
        ├── rutas
        │   ├── cache.js
        │   ├── logger.js
        │   ├── rutacrear.js
        │   └── rutaobtener.js
        │
        └── server.js
    │
    ├── .dockerignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    └── README.md

# Instalar todas las dependencias
    
    npm install

# Instalar las dependencias individualmente 

    npm install body-parser
    npm install express
    npm install neo4j-driver
    npm install redis

# cache.js 

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

# logger.js 

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

# rutacrear.js

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
        await session.run('MATCH (provAnt:Proveedor {id: "PR004"})-[r:SUMINISTRA]->(p:Producto) ' +
        'MATCH (provNuevo:Proveedor {id: "PR001"}) ' +
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

# rutaobtener.js

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

    // Q06 Encontrar los pedidos de venta que tienen una devolución
    // MATCH (p:PedidoVenta)<-[:DEVOLUCION_DE]-(d:Devolucion)
    // RETURN p.id AS PedidoID, p.nombre AS NombreProducto, d.id AS DevolucionID, d.motivo AS MotivoDevolucion;

    router.route('/Encontrardevoluciones')
    .all(cache)
    .get(async (req, res) => {
        const session = driver.session();
        await session.run('MATCH (p:PedidoVenta)<-[:DEVOLUCION_DE]-(d:Devolucion) RETURN p.id AS PedidoID, p.nombre AS NombreProducto, d.id AS DevolucionID, d.motivo AS MotivoDevolucion')
            .then(result => {
                devoluciones = result.records.map(record => {
                    return record.get('p').properties;
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

# server.js

    //server.js
    const express = require('express');
    const app = express();
    const neo4j = require("neo4j-driver");
    const bodyParser = require('body-parser');
    const PORT = 3000;


    // const rutaPruebaMateria = require('./rutas/rutasalumnos');
    // const rutaPruebaAlumno = require('./rutas/rutasmaterias');
    const logger = require('./rutas/logger');
    const rutaobtener = require('./rutas/rutaobtener');
    const rutacrear = require('./rutas/rutacrear');

    //middlewares
    app.use(logger);

    app.use(bodyParser.urlencoded({extended: true }));
    app.use(bodyParser.json());

    app.use('/api', rutaobtener, rutacrear);
    app.listen(PORT, () => { console.log('Server en http://localhost:' + PORT) });

# .dockerignore

    node_modules
    npm-debug.log

# docker-compose.yml

    version: '3'

    services:
    neo4j:
        image: neo4j
        container_name: neo1
        ports:
        - "7474:7474"
        - "7687:7687"
        environment:
        - NEO4J_AUTH=none
        networks:
        labs:
            ipv4_address: 172.19.0.2
    redis:
        image: redis/redis-stack:latest
        container_name: redis1
        ports:
        - "6379:6379"
        - "8001:8001"
        networks:
        labs:
            ipv4_address: 172.19.0.3
    ruta-api:
        image: alaacabralma/03_backend1:v.2 
        container_name: ruta-api
        ports:
        - "3000:3000"
        depends_on: 
        - neo4j
        - redis
        networks:
        labs:
            ipv4_address: 172.19.0.4
    networks:
    labs:
        driver: bridge
        ipam:
        config:
            - subnet: 172.19.0.0/16
  
# Dockerfile

    FROM node
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD [ "npm", "start" ]