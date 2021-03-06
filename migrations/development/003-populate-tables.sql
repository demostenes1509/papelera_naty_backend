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

INSERT INTO products (id,category_id,packaging_id,name,description,url,show_format,is_visible,is_offer) VALUES 
(1,1,2,'Bolsa de banditas elásticas','Bolsa de banditas elásticas','bolsa-bandas-elasticas',false,true,true),
(2,5,3,'Bolsas de camisetas económicas','Bolsas de camisetas económicas','bolsas-camisetas-economicas',false,true,true),
(3,5,2,'Bolsas de camisetas reforzadas','Bolsas de camisetas reforzadas','bolsas-camisetas-reforzadas',false,true,true),
(4,5,5,'Bolsas de consorcio','Bolsas de consorcio','bolsas-consorcio',false,true,true),
(5,5,2,'Bolsas de residuos','Bolsas de residuos','bolsas-residuos',false,true,true),
(6,5,2,'Bolsas de papel sulfito','Bolsas de papel sulfito','bolsas-papel-sulfito',false,true,true),
(7,5,2,'Bolsas de polipropileno','Bolsas de polipropileno','bolsas-polipropileno',false,true,true),
(8,2,3,'Productos de Aluminio','Productos de Aluminio','productos-aluminio',false,true,true),
(9,7,1,'Caja de madera','Caja de madera','caja-madera',false,true,true);


INSERT INTO products_formats (id,product_id,format,quantity,units,wholesale,retail) VALUES 
(1000,1,'1000 grs',1.0,10.0,576.0,65.0),
(1001,1,'500 grs',1.0,10.0,300.0,33.0),
(1002,1,'100 grs',1.0,10.0,80.0,10.0),
(1003,2,'20X30 blanca ',1.0,100.0,250.0,7.0),
(1004,2,'30X40 blanca ',1.0,100.0,144.0,8.0),
(1005,2,'30X40 (color) tiburon',1.0,100.0,105.0,8.0),
(1006,2,'40X50 (color) reforzada',1.0,100.0,200.0,11.0),
(1007,2,'40X50 (color) tiburon',1.0,100.0,180.0,10.0),
(1008,2,'45X60 (color) ',1.0,100.0,342.0,19.0),
(1009,2,'50X60 (color)',1.0,100.0,432.0,24.0),
(1010,2,'50X70 (color)',1.0,100.0,351.0,26.0),
(1011,2,'60X80 blanca ',1.0,100.0,203.0,45.0),
(1012,3,'20X30 (reforzada) blanca',1.0,100.0,350.0,8.0),
(1013,3,'30x40 (reforzada) blanca',1.0,100.0,165.0,10.0),
(1014,3,'40X50 (reforzada) blanca',1.0,100.0,265.0,15.0),
(1015,3,'45X60 (reforzada) blanca',1.0,100.0,324.0,24.0),
(1016,3,'50X60 (reforzada) blanca',1.0,100.0,516.0,28.0),
(1017,3,'50X70 (reforzada) blanca',1.0,100.0,405.0,30.0),
(1018,3,'60X80 (reforzada) blanca',1.0,100.0,495.0,55.0),
(1019,4,'60X90 CMS X 10 ',1.0,10.0,240.0,8.0),
(1020,4,'80X110CMS X 10',1.0,10.0,216.0,12.0),
(1021,4,'90X120CMS X 10',1.0,10.0,336.0,18.0),
(1022,4,'60X90 CMS X 50 reforzada',1.0,50.0,650.0,70.0),
(1023,4,'80X110CMS X 50 reforzada',1.0,50.0,960.0,140.0),
(1024,5,'45X60 X 10 ',1.0,10.0,260.0,3.0),
(1025,5,'50X70 X 10',1.0,10.0,320.0,5.0),
(1026,5,'45X60 X160 aprox / reforzada (rollo)',1.0,1.0,120.0,125.0),
(1027,5,'50X70 X170 aprox/ reforzada (rollo)',1.0,1.0,120.0,125.0),
(1028,6,'BOLSA Nº 1 ',1.0,100.0,198.0,11.0),
(1029,6,'BOLSA Nº 1L',1.0,100.0,216.0,12.0),
(1030,6,'BOLSA Nº 2',1.0,100.0,234.0,13.0),
(1031,6,'BOLSA Nº 2L',1.0,100.0,252.0,14.0),
(1032,6,'BOLSA Nº 3',1.0,100.0,252.0,14.0),
(1033,6,'BOLSA Nº 3L',1.0,100.0,270.0,15.0),
(1034,6,'BOLSA Nº 4',1.0,100.0,306.0,17.0),
(1035,6,'BOLSA Nº 4A',1.0,100.0,324.0,18.0),
(1036,6,'BOLSA Nº 5',1.0,100.0,378.0,21.0),
(1037,6,'BOLSA Nº 6',1.0,100.0,414.0,23.0),
(1038,6,'BOLSA Nº 6L',1.0,100.0,450.0,25.0),
(1039,6,'BOLSA Nº 7',1.0,100.0,270.0,30.0),
(1040,6,'BOLSA Nº 8',1.0,100.0,324.0,36.0),
(1041,7,'BOLSA PP 5 X 20 CMS.',1.0,100.0,45.0,5.0),
(1042,7,'BOLSA PP 5 X 25 CMS.',1.0,100.0,50.0,5.5),
(1043,7,'BOLSA PP 5 X 30 CMS.',1.0,100.0,55.0,6.0),
(1044,7,'BOLSA PP 6 X 15 CMS.',1.0,100.0,45.0,5.0),
(1045,7,'BOLSA PP 6 X 20 CMS.',1.0,100.0,50.0,5.5),
(1046,7,'BOLSA PP 6 X 25 CMS.',1.0,100.0,55.0,6.0),
(1047,7,'BOLSA PP 6 X 30 CMS.',1.0,100.0,63.0,7.0),
(1048,7,'BOLSA PP 8 X 10 CMS.',1.0,100.0,45.0,5.0),
(1049,7,'BOLSA PP 8 X 12 CMS.',1.0,100.0,45.0,5.0),
(1050,7,'BOLSA PP 8 X 15 CMS.',1.0,100.0,50.0,5.5),
(1051,7,'BOLSA PP 8 X 20 CMS.',1.0,100.0,63.0,7.0),
(1052,7,'BOLSA PP 8 X 25 CMS.',1.0,100.0,67.0,7.5),
(1053,7,'BOLSA PP 8 X 30 CMS.',1.0,100.0,81.0,9.0),
(1054,7,'BOLSA PP 10 X 15 CMS.',1.0,100.0,55.0,6.0),
(1055,7,'BOLSA PP 10 X 20 CMS.',1.0,100.0,63.0,7.0),
(1056,7,'BOLSA PP 10 X 25 CMS.',1.0,100.0,77.0,8.5),
(1057,7,'BOLSA PP 10 X 30 CMS.',1.0,100.0,90.0,10.0),
(1058,7,'BOLSA PP 12 X 15 CMS.',1.0,100.0,63.0,7.0),
(1059,7,'BOLSA PP 12 X 20 CMS.',1.0,100.0,77.0,8.5),
(1060,7,'BOLSA PP 12 X 25 CMS.',1.0,100.0,90.0,10.0),
(1061,7,'BOLSA PP 12 X 30 CMS.',1.0,100.0,100.0,11.0),
(1062,7,'BOLSA PP 12 X 35 CMS.',1.0,100.0,117.0,13.0),
(1063,7,'BOLSA PP 15 X 20 CMS.',1.0,100.0,90.0,10.0),
(1064,7,'BOLSA PP 15 X 25 CMS.',1.0,100.0,104.0,11.5),
(1065,7,'BOLSA PP 15 X 30 CMS.',1.0,100.0,117.0,13.0),
(1066,7,'BOLSA PP 15 X 35 CMS.',1.0,100.0,153.0,17.0),
(1067,7,'BOLSA PP 15 X 40 CMS.',1.0,100.0,162.0,18.0),
(1068,7,'BOLSA PP 15 X 45 CMS.',1.0,100.0,191.0,21.0),
(1069,7,'BOLSA PP 17 X 25 CMS.',1.0,100.0,126.0,14.0),
(1070,7,'BOLSA PP 20 X 20 CMS.',1.0,100.0,113.0,12.5),
(1071,7,'BOLSA PP 20 X 25 CMS.',1.0,100.0,135.0,15.0),
(1072,7,'BOLSA PP 20 X 30 CMS.',1.0,100.0,134.0,16.0),
(1073,7,'BOLSA PP 20 X 35 CMS.',1.0,100.0,191.0,21.0),
(1074,7,'BOLSA PP 20 X 40 CMS.',1.0,100.0,216.0,24.0),
(1075,7,'BOLSA PP 22 X 30 CMS.',1.0,100.0,171.0,19.0),
(1076,7,'BOLSA PP 22 X 35 CMS.',1.0,100.0,198.0,22.0),
(1077,7,'BOLSA PP 22 X 40 CMS.',1.0,100.0,225.0,25.0),
(1078,7,'BOLSA PP 25 X 30 CMS.',1.0,100.0,191.0,21.0),
(1079,7,'BOLSA PP 25 X 35 CMS.',1.0,100.0,216.0,24.0),
(1080,7,'BOLSA PP 25 X 40 CMS.',1.0,100.0,260.0,29.0),
(1081,7,'BOLSA PP 30 X 35 CMS.',1.0,100.0,270.0,31.0),
(1082,7,'BOLSA PP 30 X 40 CMS.',1.0,100.0,270.0,31.0),
(1083,7,'BOLSA PP 30 X 45 CMS.',1.0,100.0,350.0,39.0),
(1084,7,'BOLSA PP 35 X 40 CMS.',1.0,100.0,340.0,38.0),
(1085,7,'BOLSA PP 35 X 45 CMS.',1.0,100.0,350.0,39.0),
(1086,7,'BOLSA PP 35 X 50 CMS.',1.0,100.0,387.0,43.0),
(1087,7,'BOLSA PP 40 X 50 CMS.',1.0,100.0,477.0,53.0),
(1088,7,'BOLSA PP 40 X 60 CMS.',1.0,100.0,648.0,72.0),
(1089,7,'BOLSA PP 45 X 60 CMS.',1.0,100.0,762.0,82.0),
(1090,7,'BOLSA PP 45 X 70 CMS.',1.0,100.0,1000.0,135.0),
(1091,7,'BOLSA PP 50 X 60 CMS.',1.0,100.0,743.0,86.0),
(1092,7,'BOLSA PP 50 X 70 CMS.',1.0,100.0,990.0,145.0),
(1093,8,'BANDEJA F 50',1.0,100.0,768.0,105.0),
(1094,8,'BANDEJA F 75',1.0,100.0,912.0,125.0),
(1095,8,'BANDEJA F 100',1.0,100.0,439.0,160.0),
(1096,8,'BANDEJA F 200',1.0,100.0,616.0,350.0),
(1097,8,'TAPA P/F 50',1.0,100.0,201.0,55.0),
(1098,8,'TAPA P/F 75',1.0,100.0,250.0,65.0),
(1099,8,'TAPA P/F 100',1.0,100.0,277.0,100.0),
(1100,8,'TAPA P/F 200',1.0,100.0,219.0,160.0),
(1101,8,'PLATO P 14',1.0,100.0,893.0,120.0),
(1102,8,'PLATO P 17',1.0,100.0,864.0,104.0),
(1103,8,'PLATO P 20',1.0,100.0,669.0,120.0),
(1104,8,'PLATO P 21',1.0,100.0,367.0,133.0),
(1105,8,'PLATO P 23',1.0,100.0,472.0,170.0),
(1106,8,'PLATO P 26',1.0,100.0,533.0,192.0),
(1107,8,'PLATO P 29',1.0,100.0,371.0,268.0),
(1108,8,'PLATO P 33',1.0,100.0,480.0,347.0),
(1109,8,'BUDINERAS 1/2 KILO',1.0,100.0,931.0,126.0),
(1110,8,'BUDINERAS 1 KILO',1.0,100.0,448.0,243.0),
(1111,8,'FLANERA H 10',1.0,100.0,1170.0,85.0),
(1112,8,'FLANERA H 7',1.0,100.0,1170.0,85.0),
(1113,8,'TAPA P/FLANERA H 10',1.0,100.0,600.0,43.0),
(1114,8,'CENICERO DE ALUMINIO',1.0,100.0,161.0,35.0);

INSERT INTO roles (id,name) VALUES 
(1,'admin'),
(2,'client');

INSERT INTO users (id,email_address,password,first_name,last_name,role_id,address,city,telephone,zipcode,state,provider) VALUES 
(1,'mcarrizo@papeleranaty.com','dfce0b65360bbc54d7867f60e08b6586b21feebdc00499475845b6a415735b43','Maxi','Admin',1,null,null,null,null,null,'local'),
(2,'mcarrizo@hotmail.com','dfce0b65360bbc54d7867f60e08b6586b21feebdc00499475845b6a415735b43','Maxi','Client',2,null,null,null,null,null,'local');
