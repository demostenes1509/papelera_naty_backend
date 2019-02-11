INSERT INTO roles (id,name) VALUES 
(1,'admin'),
(2,'client');

INSERT INTO users (id,email_address,password,first_name,last_name,role_id,address,city,telephone,zipcode,state,provider) VALUES 
(1,'mcarrizo@papeleranaty.com','dfce0b65360bbc54d7867f60e08b6586b21feebdc00499475845b6a415735b43','Maxi','Admin',1,null,null,null,null,null,'local'),
(2,'mcarrizo@gmail.com','5c969619','Maxi','Client',2,null,null,null,null,null,'local');

INSERT INTO categories (id,name,url) VALUES 
(1,'Bandas elásticas','bandas-elasticas'),
(2,'Aluminio','aluminio'),
(3,'Blondas de papel','blondas-de-papel'),
(4,'Bobinas','bobinas'),
(5,'Bolsas','bolsas'),
(6,'Bombonera','bombonera'),
(7,'Cajas','cajas'),
(8,'Carteles','carteles'),
(9,'Cartón corrugado','carton-corrugado'),
(10,'Cintas','cintas'),
(11,'Cubiertos','cubiertos'),
(12,'Ensaladeras','ensaladeras'),
(13,'Etiquetas','etiquetas'),
(14,'Film strech','film-strech'),
(15,'Fundas','fundas'),
(16,'Guantes','guantes'),
(17,'Hilos y cintas','hilos-y-cintas'),
(18,'Láminas','laminas'),
(19,'Moldes de papel','moldes-de-papel'),
(20,'Moños','monos'),
(21,'Papeles','papeles'),
(22,'Pirotines','pirotines'),
(23,'Platos','platos'),
(24,'Portapanchos','portapanchos'),
(25,'Potes','potes'),
(26,'Precintos','precintos'),
(27,'Resmas','resmas'),
(28,'Rollos','rollos'),
(29,'Servilletas','servilletas'),
(30,'Sobres','sobres'),
(31,'Sorbetes','sorbetes'),
(32,'Talonarios','talonarios'),
(33,'Tapas','tapas'),
(34,'Torteras plásticas','torteras-plasticas'),
(35,'Trípodes','tripodes'),
(36,'Vasos','vasos');

INSERT INTO packaging (id,name) VALUES  
(1,'Caja'),
(2,'Bolsa'),
(3,'Paquete'),
(4,'Rollo'),
(5,'Kilo');

INSERT INTO registrations (email_address,token,verified,sent) 
VALUES ('demostenes1509@gmail.com','3041bd90-5397-11e5-9650-9bf126a5d21f',false,false);

INSERT INTO mailing (email_address,token,verified,sent,immediate) VALUES 
('demostenes1509@gmail.com','3041bd90-5397-11e5-9650-9bf126a5d21f',false,false,false),
('mcarrizo@yahoo.com','3041bd90-5397-11e5-9650-9bf126a5d21g',true,true,false),
('mcarrizo@hotmail.com','3041bd90-5397-11e5-9650-9bf126a5d21h',false,false,true);

/* Bandas elasticas */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(1,1,2,'Bolsa de banditas elásticas','Bolsa de banditas elásticas','bolsa-bandas-elasticas',false,true,true);

INSERT INTO products_formats (id,product_id,format,units,wholesale,retail,quantity) VALUES 
(1,1,'bolsa x 100 ',0.4,250.0,7.0,1);

/* Bolsas economicas */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(2,5,3,'Bolsas de camisetas económicas','Bolsas de camisetas económicas','bolsas-camisetas-economicas',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(2,'20X30 blanca ',0.4,250.0,7.0,1),
(2,'30X40 blanca ',100,144.0,8.0,1),
(2,'30X40 (color) tiburon',100,105.0,8.0,1),
(2,'40X50 (color) reforzada',100,200.0,11.0,1),
(2,'40X50 (color) tiburon',100,180.0,10.0,1),
(2,'45X60 (color) ',100,342.0,19.0,1),
(2,'50X60 (color)',100,432.0,24.0,1),
(2,'50X70 (color)',100,351.0,26.0,1),
(2,'60X80 blanca ',100,203.0,45.0,1);

/* Bolsas reforzadas */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(3,5,2,'Bolsas de camisetas reforzadas','Bolsas de camisetas reforzadas','bolsas-camisetas-reforzadas',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(3,'20X30 (reforzada) blanca',100,350.0,8.0,1),
(3,'30x40 (reforzada) blanca',100,165.0,10.0,1),
(3,'40X50 (reforzada) blanca',100,265.0,15.0,1),
(3,'45X60 (reforzada) blanca',100,324.0,24.0,1),
(3,'50X60 (reforzada) blanca',100,516.0,28.0,1),
(3,'50X70 (reforzada) blanca',100,405.0,30.0,1),
(3,'60X80 (reforzada) blanca',100,495.0,55.0,1);

/* Bolsas consorcio */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(4,5,5,'Bolsas de consorcio','Bolsas de consorcio','bolsas-consorcio',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(4,'60X90 CMS X 10 ',10,240.0,8.0,1),
(4,'80X110CMS X 10',10,216.0,12.0,1),
(4,'90X120CMS X 10',10,336.0,18.0,1),
(4,'60X90 CMS X 50 reforzada',50,650.0,70.0,1),
(4,'80X110CMS X 50 reforzada',50,960.0,140.0,1);

/* Bolsas residuos */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(5,5,2,'Bolsas de residuos','Bolsas de residuos','bolsas-residuos',false,true,true);

/* Bolsas papel sulfito */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(6,5,2,'Bolsas de papel sulfito','Bolsas de papel sulfito','bolsas-papel-sulfito',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(6,'BOLSA Nº 1 ',100,198.0,11.0,1),
(6,'BOLSA Nº 1L',100,216.0,12.0,1),
(6,'BOLSA Nº 2',100,234.0,13.0,1),
(6,'BOLSA Nº 2L',100,252.0,14.0,1),
(6,'BOLSA Nº 3',100,252.0,14.0,1),
(6,'BOLSA Nº 3L',100,270.0,15.0,1),
(6,'BOLSA Nº 4',100,306.0,17.0,1),
(6,'BOLSA Nº 4A',100,324.0,18.0,1),
(6,'BOLSA Nº 5',100,378.0,21.0,1),
(6,'BOLSA Nº 6',100,414.0,23.0,1),
(6,'BOLSA Nº 6L',100,450.0,25.0,1),
(6,'BOLSA Nº 7',100,270.0,30.0,1),
(6,'BOLSA Nº 8',100,324.0,36.0,1);

/* Bolsas polipropileno */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(7,5,2,'Bolsas de polipropileno','Bolsas de polipropileno','bolsas-polipropileno',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(7,'BOLSA PP 5 X 20 CMS.',100,45.0,5.0,1),
(7,'BOLSA PP 5 X 25 CMS.',100,50.0,5.5,1),
(7,'BOLSA PP 5 X 30 CMS.',100,55.0,6.0,1),
(7,'BOLSA PP 6 X 15 CMS.',100,45.0,5.0,1),
(7,'BOLSA PP 6 X 20 CMS.',100,50.0,5.5,1),
(7,'BOLSA PP 6 X 25 CMS.',100,55.0,6.0,1),
(7,'BOLSA PP 6 X 30 CMS.',100,63.0,7.0,1),
(7,'BOLSA PP 8 X 10 CMS.',100,45.0,5.0,1),
(7,'BOLSA PP 8 X 12 CMS.',100,45.0,5.0,1),
(7,'BOLSA PP 8 X 15 CMS.',100,50.0,5.5,1),
(7,'BOLSA PP 8 X 20 CMS.',100,63.0,7.0,1),
(7,'BOLSA PP 8 X 25 CMS.',100,67.0,7.5,1),
(7,'BOLSA PP 8 X 30 CMS.',100,81.0,9.0,1),
(7,'BOLSA PP 10 X 15 CMS.',100,55.0,6.0,1),
(7,'BOLSA PP 10 X 20 CMS.',100,63.0,7.0,1),
(7,'BOLSA PP 10 X 25 CMS.',100,77.0,8.5,1),
(7,'BOLSA PP 10 X 30 CMS.',100,90.0,10.0,1),
(7,'BOLSA PP 12 X 15 CMS.',100,63.0,7.0,1),
(7,'BOLSA PP 12 X 20 CMS.',100,77.0,8.5,1),
(7,'BOLSA PP 12 X 25 CMS.',100,90.0,10.0,1),
(7,'BOLSA PP 12 X 30 CMS.',100,100.0,11.0,1),
(7,'BOLSA PP 12 X 35 CMS.',100,117.0,13.0,1),
(7,'BOLSA PP 15 X 20 CMS.',100,90.0,10.0,1),
(7,'BOLSA PP 15 X 25 CMS.',100,104.0,11.5,1),
(7,'BOLSA PP 15 X 30 CMS.',100,117.0,13.0,1),
(7,'BOLSA PP 15 X 35 CMS.',100,153.0,17.0,1),
(7,'BOLSA PP 15 X 40 CMS.',100,162.0,18.0,1),
(7,'BOLSA PP 15 X 45 CMS.',100,191.0,21.0,1),
(7,'BOLSA PP 17 X 25 CMS.',100,126.0,14.0,1),
(7,'BOLSA PP 20 X 20 CMS.',100,113.0,12.5,1),
(7,'BOLSA PP 20 X 25 CMS.',100,135.0,15.0,1),
(7,'BOLSA PP 20 X 30 CMS.',100,134.0,16.0,1),
(7,'BOLSA PP 20 X 35 CMS.',100,191.0,21.0,1),
(7,'BOLSA PP 20 X 40 CMS.',100,216.0,24.0,1),
(7,'BOLSA PP 22 X 30 CMS.',100,171.0,19.0,1),
(7,'BOLSA PP 22 X 35 CMS.',100,198.0,22.0,1),
(7,'BOLSA PP 22 X 40 CMS.',100,225.0,25.0,1),
(7,'BOLSA PP 25 X 30 CMS.',100,191.0,21.0,1),
(7,'BOLSA PP 25 X 35 CMS.',100,216.0,24.0,1),
(7,'BOLSA PP 25 X 40 CMS.',100,260.0,29.0,1),
(7,'BOLSA PP 30 X 35 CMS.',100,270.0,31.0,1),
(7,'BOLSA PP 30 X 40 CMS.',100,270.0,31.0,1),
(7,'BOLSA PP 30 X 45 CMS.',100,350.0,39.0,1),
(7,'BOLSA PP 35 X 40 CMS.',100,340.0,38.0,1),
(7,'BOLSA PP 35 X 45 CMS.',100,350.0,39.0,1),
(7,'BOLSA PP 35 X 50 CMS.',100,387.0,43.0,1),
(7,'BOLSA PP 40 X 50 CMS.',100,477.0,53.0,1),
(7,'BOLSA PP 40 X 60 CMS.',100,648.0,72.0,1),
(7,'BOLSA PP 45 X 60 CMS.',100,762.0,82.0,1),
(7,'BOLSA PP 45 X 70 CMS.',100,1000.0,135.0,1),
(7,'BOLSA PP 50 X 60 CMS.',100,743.0,86.0,1),
(7,'BOLSA PP 50 X 70 CMS.',100,990.0,145.0,1);

/* Productos de Aluminio */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(8,2,3,'Productos de Aluminio','Productos de Aluminio','productos-aluminio',false,true,false);

INSERT INTO products_formats (product_id,format,units,wholesale,retail,quantity) VALUES 
(8,'BANDEJA F 50',100,768.0,105.0,1),
(8,'BANDEJA F 75',100,912.0,125.0,1),
(8,'BANDEJA F 100',100,439.0,160.0,1),
(8,'BANDEJA F 200',100,616.0,350.0,1),
(8,'TAPA P/F 50',100,201.0,55.0,1),
(8,'TAPA P/F 75',100,250.0,65.0,1),
(8,'TAPA P/F 100',100,277.0,100.0,1),
(8,'TAPA P/F 200',100,219.0,160.0,1),
(8,'PLATO P 14',100,893.0,120.0,1),
(8,'PLATO P 17',100,864.0,104.0,1),
(8,'PLATO P 20',100,669.0,120.0,1),
(8,'PLATO P 21',100,367.0,133.0,1),
(8,'PLATO P 23',100,472.0,170.0,1),
(8,'PLATO P 26',100,533.0,192.0,1),
(8,'PLATO P 29',100,371.0,268.0,1),
(8,'PLATO P 33',100,480.0,347.0,1),
(8,'BUDINERAS 1/2 KILO',100,931.0,126.0,1),
(8,'BUDINERAS 1 KILO',100,448.0,243.0,1),
(8,'FLANERA H 10',100,1170.0,85.0,1),
(8,'FLANERA H 7',100,1170.0,85.0,1),
(8,'TAPA P/FLANERA H 10',100,600.0,43.0,1),
(8,'CENICERO DE ALUMINIO',1,161.0,35.0,1);

/* Caja de madera */
INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(9,7,1,'Caja de madera','Caja de madera','caja-madera',false,true,false);

/* Products pictures */
INSERT INTO products_pictures (id,product_id,content_type,last_update) VALUES 
(1,1,'image/png',{ts '2016-03-23 12:48:26.500'});

