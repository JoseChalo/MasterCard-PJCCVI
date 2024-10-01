create database pjCCVI
use pjCCVI

create table tarjetas (
	numero char(16),
	titular char(60),
	tipo char(8) check (tipo in ('credito', 'debito')),
	fecha_venc date,
	num_seguridad char(3),
	monto_autorizado numeric(14, 2),
	monto_disponible numeric(14, 2),
	Primary key (numero)
);


create table transacciones (
	id int primary key IDENTITY(1,1),
	monto numeric(14, 2),
	tipo char(8) check (tipo in ('consumo', 'pago'))
);

create table trans_echas(
	id int primary key IDENTITY(1,1),
	numeroTarjeta char(16),
	idTrans int,
	foreign key (numeroTarjeta) references tarjetas,
	foreign key (idTrans) references transacciones
);

create table users (
	gmail VARCHAR(100),
	contra VARCHAR(20),
	nombre VARCHAR(100),
	PRIMARY KEY (gmail)
);

create table cardsUser (
	id int primary key IDENTITY(1,1),
	numeroTarjeta char(16),
	idUser VARCHAR(100),
	foreign key (numeroTarjeta) references tarjetas,
	foreign key (idUser) references users
);

-- Insertar datos de ejemplo en la tabla tarjetas

INSERT INTO tarjetas (numero, titular, tipo, fecha_venc, num_seguridad, monto_autorizado, monto_disponible)
VALUES 
('1234567812345678', 'JoseChalo', 'credito', '2025-12-31', '123', 5000.00, 2500.00),
('2345678923456789', 'Regina', 'debito', '2024-10-30', '456', 1000.00, 500.00),
('3456789034567890', 'Nazareth', 'credito', '2026-03-15', '789', 7500.00, 3000.00),
('4567890145678901', 'CarlosMendoza', 'debito', '2024-08-20', '012', 2000.00, 1500.00),
('5678901256789012', 'LauraPerez', 'credito', '2025-07-25', '345', 6000.00, 4500.00);

Select * from tarjetas;
SELECT * from users;
SELECT * FROM cardsUser;

SELECT T.monto, T.tipo, T.id from transacciones T INNER JOIN 
	(SELECT * from trans_echas E INNER JOIN  tarjetas C ON E.numeroTarjeta = C.numero) A 
	ON T.id = A.idTrans where A.numero = 1234567812345678; 