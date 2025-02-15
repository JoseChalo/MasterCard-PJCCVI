create database pjCCVI
use pjCCVI;
use master;
--DROP DATABASE pjCCVI;

create table tarjetas (
	numero char(16),
	titular char(60),
	tipo char(8) check (tipo in ('credito', 'debito')),
	fecha_venc date,
	num_seguridad char(3),
	monto_autorizado DECIMAL(14, 2),
	monto_disponible DECIMAL(14, 2),
	Primary key (numero)
);

create table transacciones (
	id int primary key IDENTITY(1,1),
	monto DECIMAL(14, 2),
	proveniente VARCHAR(100),
	fecha DATE,
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

INSERT INTO tarjetas VALUES 
('1234567812345678', 'Jose Chalo', 'credito', '2025-12-01', '123', 5000.00, 5000.00);

INSERT INTO users VALUES ('josechalo2003@gmail.com', 'chalo', 'Jose Chalo');

INSERT INTO cardsUser VALUES ('1234567812345678', 'josechalo2003@gmail.com');

SELECT * FROM users WHERE gmail = 'josechalo2003@gmail.com';

use pjCCVI;
SELECT * FROM tarjetas;
SELECT * FROM users;
SELECT * FROM cardsUser;

SELECT * FROM transacciones;
SELECT * FROM trans_echas;
SELECT * FROM tarjetas;

SELECT T.monto, T.tipo, T.id from transacciones T INNER JOIN 
	(SELECT * from trans_echas E INNER JOIN  tarjetas C ON E.numeroTarjeta = C.numero) A 
	ON T.id = A.idTrans where A.numero = 1234567812345678; 

SELECT FORMAT(fecha_venc, 'yyyy-MM') AS fecha_venc
FROM tarjetas;

SELECT T.titular AS nombre, T.numero AS ultimosDigitos, FORMAT(T.fecha_venc, 'yyyy-MM') AS fechaVencimiento, T.monto_disponible AS monto, monto_autorizado
FROM tarjetas T
INNER JOIN cardsUser CU ON T.numero = CU.numeroTarjeta
INNER JOIN users U ON U.gmail = CU.idUser
WHERE U.gmail = 'josechalo2003@gmail.com';


UPDATE tarjetas SET monto_disponible = 2299.00 where numero = 1234567812345678;



SELECT T.titular AS nombre, RIGHT(T.numero, 4) AS ultimosDigitos, 
FORMAT(T.fecha_venc, 'yyyy-MM') AS fechaVencimiento, 
T.monto_disponible, T.monto_autorizado, T.numero
FROM tarjetas T
INNER JOIN cardsUser CU ON T.numero = CU.numeroTarjeta
INNER JOIN users U ON U.gmail = CU.idUser
WHERE U.gmail = 'josechalo2003@gmail.com';
