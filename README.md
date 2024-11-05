# 03_backend1
## docker images ##
docker pull alaacabralma/03_backend1:v.2

## Collección en Postman##
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
json:
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



## Escenario de datos ##
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
CREATE (pedidoVenta1:PedidoVenta {id: 'PV1', codigo: 'P001', nombre: 'Laptop Gamer', cantidad:1, fecha: '2023-10-01', precioTotal: 50000}),
       (pedidoVenta2:PedidoVenta {id: 'PV2', codigo: 'P002', nombre: 'Smartphone Pro', cantidad:1, fecha: '2023-10-02', precioTotal: 800}),
       (pedidoVenta3:PedidoVenta {id: 'PV3', codigo: 'P002', nombre: 'Smartphone Pro', cantidad:5, fecha: '2023-09-02', precioTotal: 4000}),
       (pedidoVenta4:PedidoVenta {id: 'PV4', codigo: 'P006', nombre: 'Laptop de Estudio', cantidad: 1, fecha: '2023-10-10', precioTotal: 12000}),
       (pedidoVenta5:PedidoVenta {id: 'PV5', codigo: 'P007', nombre: 'Smartphone Lite', cantidad: 2, fecha: '2023-10-11', precioTotal: 300});

CREATE (pedidoVenta6:PedidoVenta {id: 'PV6', codigo: 'P008', nombre: 'Televisor Smart', cantidad: 1, fecha: '2023-10-12', precioTotal: 750}),
       (pedidoVenta7:PedidoVenta {id: 'PV7', codigo: 'P009', nombre: 'Laptop Lenovo Estudiante', cantidad: 1, fecha: '2023-10-15', precioTotal: 50000}),
       (pedidoVenta8:PedidoVenta {id: 'PV8', codigo: 'P010', nombre: 'Smartphone Nokia', cantidad: 3, fecha: '2023-10-16', precioTotal: 75000}), // Suponiendo que el precio por unidad sea 25000
       (pedidoVenta9:PedidoVenta {id: 'PV9', codigo: 'P001', nombre: 'Laptop Gamer', cantidad: 2, fecha: '2023-10-18', precioTotal: 100000}), // Suponiendo que el precio por unidad sea 50000
       (pedidoVenta10:PedidoVenta {id: 'PV10', codigo: 'P007', nombre: 'Smartphone Lite', cantidad: 5, fecha: '2023-10-20', precioTotal: 1500}); // Suponiendo que el precio por unidad sea 300

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

// Relación clientes-pedidos de venta
MATCH (cli1:Cliente {id: 'C001'}), (pedidoVenta1:PedidoVenta {id: 'PV1'})
CREATE (cli1)-[:REALIZA]->(pedidoVenta1);

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


// Relación clientes-pedidos de venta
// Relación del cliente C001 con el pedido PV1
MATCH (cli1:Cliente {id:'C001'}), (pedidoVenta1:PedidoVenta {id: 'PV1'}) 
CREATE (cli1)-[:HACE]->(pedidoVenta1);

// Relación del cliente C002 con el pedido PV2
MATCH (cli2:Cliente {id:'C002'}), (pedidoVenta2:PedidoVenta {id: 'PV2'}) 
CREATE (cli2)-[:HACE]->(pedidoVenta2);

// Relación del cliente C003 con el pedido PV3
MATCH (cli3:Cliente {id:'C003'}), (pedidoVenta3:PedidoVenta {id: 'PV3'}) 
CREATE (cli3)-[:HACE]->(pedidoVenta3);

// Relación del cliente C004 con el pedido PV4
MATCH (cli4:Cliente {id:'C004'}), (pedidoVenta4:PedidoVenta {id: 'PV4'}) 
CREATE (cli4)-[:HACE]->(pedidoVenta4);

// Relación del cliente C005 con el pedido PV5
MATCH (cli5:Cliente {id:'C005'}), (pedidoVenta5:PedidoVenta {id: 'PV5'}) 
CREATE (cli5)-[:HACE]->(pedidoVenta5);

// Relación del cliente C001 con el pedido PV6
MATCH (cli1:Cliente {id:'C001'}), (pedidoVenta6:PedidoVenta {id: 'PV6'}) 
CREATE (cli1)-[:HACE]->(pedidoVenta6);

// Relación del cliente C002 con el pedido PV7
MATCH (cli2:Cliente {id:'C002'}), (pedidoVenta7:PedidoVenta {id: 'PV7'}) 
CREATE (cli2)-[:HACE]->(pedidoVenta7);

// Relación del cliente C003 con el pedido PV8
MATCH (cli3:Cliente {id:'C003'}), (pedidoVenta8:PedidoVenta {id: 'PV8'}) 
CREATE (cli3)-[:HACE]->(pedidoVenta8);

// Relación del cliente C004 con el pedido PV9
MATCH (cli4:Cliente {id:'C004'}), (pedidoVenta9:PedidoVenta {id: 'PV9'}) 
CREATE (cli4)-[:HACE]->(pedidoVenta9);

// Relación del cliente C005 con el pedido PV10
MATCH (cli5:Cliente {id:'C005'}), (pedidoVenta10:PedidoVenta {id: 'PV10'}) 
CREATE (cli5)-[:HACE]->(pedidoVenta10);



// Creación de devoluciones
CREATE (devolucion1:Devolucion {id: 'DV1', fecha: '2023-10-05', motivo: 'Falla de fábrica', reembolso: true}),
       (devolucion2:Devolucion {id: 'DV2', fecha: '2023-10-06', motivo: 'Producto defectuoso', reembolso: false});

// Relación devoluciones-pedidos de venta
MATCH (pedidoVenta1:PedidoVenta {id: 'PV1'}), (devolucion1:Devolucion {id: 'DV1'})
CREATE (devolucion1)-[:PERTENECE_A]->(pedidoVenta1);

MATCH (pedidoVenta2:PedidoVenta {id: 'PV2'}), (devolucion2:Devolucion {id: 'DV2'})
CREATE (devolucion2)-[:PERTENECE_A]->(pedidoVenta2);





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

// Relación de productos con la nueva categoría "Sucursal General"
MATCH (sucursalGeneral:Categoria {nombre: 'Sucursal General'}),
      (p2:Producto {codigo: 'P002'}), // Smartphone Pro
      (p5:Producto {codigo: 'P005'}), // Smartphone Básico
      (p7:Producto {codigo: 'P007'})  // Smartphone Lite
CREATE (p2)-[:PERTENECE_A]->(sucursalGeneral),
       (p5)-[:PERTENECE_A]->(sucursalGeneral),
       (p7)-[:PERTENECE_A]->(sucursalGeneral);

#####################################################
