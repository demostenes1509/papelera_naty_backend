--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: categories_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.categories_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_sequence OWNER TO maximiliano;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.categories (
    id bigint DEFAULT nextval('public.categories_sequence'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    url character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO maximiliano;

--
-- Name: configuration_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.configuration_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configuration_sequence OWNER TO maximiliano;

--
-- Name: configuration; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.configuration (
    id bigint DEFAULT nextval('public.configuration_sequence'::regclass) NOT NULL
);


ALTER TABLE public.configuration OWNER TO maximiliano;

--
-- Name: contact_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.contact_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_sequence OWNER TO maximiliano;

--
-- Name: contact; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.contact (
    id bigint DEFAULT nextval('public.contact_sequence'::regclass) NOT NULL,
    email_address character varying(256) NOT NULL,
    first_name character varying(256) NOT NULL,
    last_name character varying(256) NOT NULL,
    comments character varying(8096) NOT NULL,
    sent boolean DEFAULT false NOT NULL
);


ALTER TABLE public.contact OWNER TO maximiliano;

--
-- Name: mailing_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.mailing_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mailing_sequence OWNER TO maximiliano;

--
-- Name: mailing; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.mailing (
    id bigint DEFAULT nextval('public.mailing_sequence'::regclass) NOT NULL,
    email_address character varying(256) NOT NULL,
    token character varying(255) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    sent boolean NOT NULL,
    immediate boolean DEFAULT false NOT NULL
);


ALTER TABLE public.mailing OWNER TO maximiliano;

--
-- Name: packaging_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.packaging_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packaging_sequence OWNER TO maximiliano;

--
-- Name: packaging; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.packaging (
    id bigint DEFAULT nextval('public.packaging_sequence'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.packaging OWNER TO maximiliano;

--
-- Name: posters_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.posters_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posters_sequence OWNER TO maximiliano;

--
-- Name: posters; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.posters (
    id bigint DEFAULT nextval('public.posters_sequence'::regclass) NOT NULL,
    "position" integer NOT NULL,
    content_type character varying(255) NOT NULL,
    last_update timestamp without time zone NOT NULL,
    category_id bigint NOT NULL,
    product_id bigint,
    caption character varying(512) DEFAULT 'Mensaje'::character varying NOT NULL
);


ALTER TABLE public.posters OWNER TO maximiliano;

--
-- Name: products_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.products_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_sequence OWNER TO maximiliano;

--
-- Name: products; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.products (
    id bigint DEFAULT nextval('public.products_sequence'::regclass) NOT NULL,
    category_id bigint NOT NULL,
    packaging_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(4096) NOT NULL,
    url character varying(255) NOT NULL,
    show_format boolean DEFAULT false NOT NULL,
    is_visible boolean DEFAULT false NOT NULL,
    is_offer boolean DEFAULT false NOT NULL
);


ALTER TABLE public.products OWNER TO maximiliano;

--
-- Name: products_formats_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.products_formats_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_formats_sequence OWNER TO maximiliano;

--
-- Name: products_formats; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.products_formats (
    id bigint DEFAULT nextval('public.products_formats_sequence'::regclass) NOT NULL,
    product_id bigint NOT NULL,
    format character varying(255) NOT NULL,
    quantity double precision NOT NULL,
    units double precision NOT NULL,
    wholesale double precision NOT NULL,
    retail double precision NOT NULL
);


ALTER TABLE public.products_formats OWNER TO maximiliano;

--
-- Name: products_pictures_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.products_pictures_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_pictures_sequence OWNER TO maximiliano;

--
-- Name: products_pictures; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.products_pictures (
    id bigint DEFAULT nextval('public.products_pictures_sequence'::regclass) NOT NULL,
    product_id bigint NOT NULL,
    content_type character varying(255) NOT NULL,
    last_update timestamp without time zone NOT NULL
);


ALTER TABLE public.products_pictures OWNER TO maximiliano;

--
-- Name: registrations_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.registrations_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registrations_sequence OWNER TO maximiliano;

--
-- Name: registrations; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.registrations (
    id bigint DEFAULT nextval('public.registrations_sequence'::regclass) NOT NULL,
    email_address character varying(256) NOT NULL,
    token character varying(255) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    sent boolean NOT NULL
);


ALTER TABLE public.registrations OWNER TO maximiliano;

--
-- Name: roles_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.roles_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_sequence OWNER TO maximiliano;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.roles (
    id bigint DEFAULT nextval('public.roles_sequence'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO maximiliano;

--
-- Name: shopping_cart_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.shopping_cart_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shopping_cart_sequence OWNER TO maximiliano;

--
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.shopping_cart (
    id bigint DEFAULT nextval('public.shopping_cart_sequence'::regclass) NOT NULL,
    user_session_id bigint NOT NULL,
    product_format_id bigint NOT NULL,
    quantity double precision NOT NULL
);


ALTER TABLE public.shopping_cart OWNER TO maximiliano;

--
-- Name: transactions_detail_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.transactions_detail_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_detail_sequence OWNER TO maximiliano;

--
-- Name: transactions_detail; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.transactions_detail (
    id bigint DEFAULT nextval('public.transactions_detail_sequence'::regclass) NOT NULL,
    transaction_header_id bigint NOT NULL,
    product_format_id bigint NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.transactions_detail OWNER TO maximiliano;

--
-- Name: transactions_header_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.transactions_header_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_header_sequence OWNER TO maximiliano;

--
-- Name: transactions_header; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.transactions_header (
    id bigint DEFAULT nextval('public.transactions_header_sequence'::regclass) NOT NULL,
    user_id bigint NOT NULL,
    purchase_date timestamp without time zone NOT NULL,
    delivery_type integer NOT NULL,
    payment_type integer NOT NULL,
    total_purchase double precision NOT NULL,
    mail_sent boolean NOT NULL,
    comments character varying(4096)
);


ALTER TABLE public.transactions_header OWNER TO maximiliano;

--
-- Name: users_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.users_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_sequence OWNER TO maximiliano;

--
-- Name: users; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.users (
    id bigint DEFAULT nextval('public.users_sequence'::regclass) NOT NULL,
    email_address character varying(256) NOT NULL,
    password character varying(255) NOT NULL,
    first_name character varying(256) NOT NULL,
    last_name character varying(256) NOT NULL,
    role_id bigint NOT NULL,
    address character varying(255),
    city character varying(255),
    telephone character varying(255),
    zipcode numeric(4,0),
    state numeric(2,0)
);


ALTER TABLE public.users OWNER TO maximiliano;

--
-- Name: users_sessions_sequence; Type: SEQUENCE; Schema: public; Owner: maximiliano
--

CREATE SEQUENCE public.users_sessions_sequence
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_sessions_sequence OWNER TO maximiliano;

--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: maximiliano
--

CREATE TABLE public.users_sessions (
    id bigint DEFAULT nextval('public.users_sessions_sequence'::regclass) NOT NULL,
    last_access timestamp without time zone NOT NULL,
    token character varying(255) NOT NULL,
    user_id bigint
);


ALTER TABLE public.users_sessions OWNER TO maximiliano;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.categories (id, name, url) FROM stdin;
1	Bandas elásticas	bandas-elasticas
2	Aluminio	aluminio
3	Blondas de papel	blondas-de-papel
4	Bobinas	bobinas
5	Bolsas	bolsas
6	Bombonera	bombonera
7	Cajas	cajas
8	Carteles	carteles
9	Cartón corrugado	carton-corrugado
10	Cintas	cintas
11	Cubiertos	cubiertos
12	Ensaladeras	ensaladeras
13	Etiquetas	etiquetas
14	Film strech	film-strech
15	Fundas	fundas
16	Guantes	guantes
17	Hilos y cintas	hilos-y-cintas
18	Láminas	laminas
19	Moldes de papel	moldes-de-papel
20	Moños	monos
21	Papeles	papeles
22	Pirotines	pirotines
23	Platos	platos
24	Portapanchos	portapanchos
25	Potes	potes
26	Precintos	precintos
27	Resmas	resmas
28	Rollos	rollos
29	Servilletas	servilletas
30	Sobres	sobres
31	Sorbetes	sorbetes
32	Talonarios	talonarios
33	Tapas	tapas
34	Torteras plásticas	torteras-plasticas
35	Trípodes	tripodes
36	Vasos	vasos
\.


--
-- Name: categories_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.categories_sequence', 1000, false);


--
-- Data for Name: configuration; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.configuration (id) FROM stdin;
\.


--
-- Name: configuration_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.configuration_sequence', 1000, false);


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.contact (id, email_address, first_name, last_name, comments, sent) FROM stdin;
\.


--
-- Name: contact_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.contact_sequence', 1000, false);


--
-- Data for Name: mailing; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.mailing (id, email_address, token, verified, sent, immediate) FROM stdin;
\.


--
-- Name: mailing_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.mailing_sequence', 1000, false);


--
-- Data for Name: packaging; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.packaging (id, name) FROM stdin;
1	Caja
2	Bolsa
3	Paquete
4	Rollo
5	Kilo
\.


--
-- Name: packaging_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.packaging_sequence', 1000, false);


--
-- Data for Name: posters; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.posters (id, "position", content_type, last_update, category_id, product_id, caption) FROM stdin;
\.


--
-- Name: posters_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.posters_sequence', 1000, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.products (id, category_id, packaging_id, name, description, url, show_format, is_visible, is_offer) FROM stdin;
1	1	2	Bolsa de banditas elásticas	Bolsa de banditas elásticas	bolsa-bandas-elasticas	f	t	t
2	5	3	Bolsas de camisetas económicas	Bolsas de camisetas económicas	bolsas-camisetas-economicas	f	t	t
3	5	2	Bolsas de camisetas reforzadas	Bolsas de camisetas reforzadas	bolsas-camisetas-reforzadas	f	t	f
4	5	5	Bolsas de consorcio	Bolsas de consorcio	bolsas-consorcio	f	t	f
5	5	2	Bolsas de residuos	Bolsas de residuos	bolsas-residuos	f	t	f
6	5	2	Bolsas de papel sulfito	Bolsas de papel sulfito	bolsas-papel-sulfito	f	t	f
7	5	2	Bolsas de polipropileno	Bolsas de polipropileno	bolsas-polipropileno	f	t	f
8	2	3	Productos de Aluminio	Productos de Aluminio	productos-aluminio	f	t	f
9	7	1	Caja de madera	Caja de madera	caja-madera	f	t	t
\.


--
-- Data for Name: products_formats; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.products_formats (id, product_id, format, quantity, units, wholesale, retail) FROM stdin;
1000	1	1000 grs	1	10	576	65
1001	1	500 grs	1	10	300	33
1002	1	100 grs	1	10	80	10
1003	2	20X30 blanca 	1	100	250	7
1004	2	30X40 blanca 	1	100	144	8
1005	2	30X40 (color) tiburon	1	100	105	8
1006	2	40X50 (color) reforzada	1	100	200	11
1007	2	40X50 (color) tiburon	1	100	180	10
1008	2	45X60 (color) 	1	100	342	19
1009	2	50X60 (color)	1	100	432	24
1010	2	50X70 (color)	1	100	351	26
1011	2	60X80 blanca 	1	100	203	45
1012	3	20X30 (reforzada) blanca	1	100	350	8
1013	3	30x40 (reforzada) blanca	1	100	165	10
1014	3	40X50 (reforzada) blanca	1	100	265	15
1015	3	45X60 (reforzada) blanca	1	100	324	24
1016	3	50X60 (reforzada) blanca	1	100	516	28
1017	3	50X70 (reforzada) blanca	1	100	405	30
1018	3	60X80 (reforzada) blanca	1	100	495	55
1019	4	60X90 CMS X 10 	1	10	240	8
1020	4	80X110CMS X 10	1	10	216	12
1021	4	90X120CMS X 10	1	10	336	18
1022	4	60X90 CMS X 50 reforzada	1	50	650	70
1023	4	80X110CMS X 50 reforzada	1	50	960	140
1024	5	45X60 X 10 	1	10	260	3
1025	5	50X70 X 10	1	10	320	5
1026	5	45X60 X160 aprox / reforzada (rollo)	1	1	120	125
1027	5	50X70 X170 aprox/ reforzada (rollo)	1	1	120	125
1028	6	BOLSA Nº 1 	1	100	198	11
1029	6	BOLSA Nº 1L	1	100	216	12
1030	6	BOLSA Nº 2	1	100	234	13
1031	6	BOLSA Nº 2L	1	100	252	14
1032	6	BOLSA Nº 3	1	100	252	14
1033	6	BOLSA Nº 3L	1	100	270	15
1034	6	BOLSA Nº 4	1	100	306	17
1035	6	BOLSA Nº 4A	1	100	324	18
1036	6	BOLSA Nº 5	1	100	378	21
1037	6	BOLSA Nº 6	1	100	414	23
1038	6	BOLSA Nº 6L	1	100	450	25
1039	6	BOLSA Nº 7	1	100	270	30
1040	6	BOLSA Nº 8	1	100	324	36
1041	7	BOLSA PP 5 X 20 CMS.	1	100	45	5
1042	7	BOLSA PP 5 X 25 CMS.	1	100	50	5.5
1043	7	BOLSA PP 5 X 30 CMS.	1	100	55	6
1044	7	BOLSA PP 6 X 15 CMS.	1	100	45	5
1045	7	BOLSA PP 6 X 20 CMS.	1	100	50	5.5
1046	7	BOLSA PP 6 X 25 CMS.	1	100	55	6
1047	7	BOLSA PP 6 X 30 CMS.	1	100	63	7
1048	7	BOLSA PP 8 X 10 CMS.	1	100	45	5
1049	7	BOLSA PP 8 X 12 CMS.	1	100	45	5
1050	7	BOLSA PP 8 X 15 CMS.	1	100	50	5.5
1051	7	BOLSA PP 8 X 20 CMS.	1	100	63	7
1052	7	BOLSA PP 8 X 25 CMS.	1	100	67	7.5
1053	7	BOLSA PP 8 X 30 CMS.	1	100	81	9
1054	7	BOLSA PP 10 X 15 CMS.	1	100	55	6
1055	7	BOLSA PP 10 X 20 CMS.	1	100	63	7
1056	7	BOLSA PP 10 X 25 CMS.	1	100	77	8.5
1057	7	BOLSA PP 10 X 30 CMS.	1	100	90	10
1058	7	BOLSA PP 12 X 15 CMS.	1	100	63	7
1059	7	BOLSA PP 12 X 20 CMS.	1	100	77	8.5
1060	7	BOLSA PP 12 X 25 CMS.	1	100	90	10
1061	7	BOLSA PP 12 X 30 CMS.	1	100	100	11
1062	7	BOLSA PP 12 X 35 CMS.	1	100	117	13
1063	7	BOLSA PP 15 X 20 CMS.	1	100	90	10
1064	7	BOLSA PP 15 X 25 CMS.	1	100	104	11.5
1065	7	BOLSA PP 15 X 30 CMS.	1	100	117	13
1066	7	BOLSA PP 15 X 35 CMS.	1	100	153	17
1067	7	BOLSA PP 15 X 40 CMS.	1	100	162	18
1068	7	BOLSA PP 15 X 45 CMS.	1	100	191	21
1069	7	BOLSA PP 17 X 25 CMS.	1	100	126	14
1070	7	BOLSA PP 20 X 20 CMS.	1	100	113	12.5
1071	7	BOLSA PP 20 X 25 CMS.	1	100	135	15
1072	7	BOLSA PP 20 X 30 CMS.	1	100	134	16
1073	7	BOLSA PP 20 X 35 CMS.	1	100	191	21
1074	7	BOLSA PP 20 X 40 CMS.	1	100	216	24
1075	7	BOLSA PP 22 X 30 CMS.	1	100	171	19
1076	7	BOLSA PP 22 X 35 CMS.	1	100	198	22
1077	7	BOLSA PP 22 X 40 CMS.	1	100	225	25
1078	7	BOLSA PP 25 X 30 CMS.	1	100	191	21
1079	7	BOLSA PP 25 X 35 CMS.	1	100	216	24
1080	7	BOLSA PP 25 X 40 CMS.	1	100	260	29
1081	7	BOLSA PP 30 X 35 CMS.	1	100	270	31
1082	7	BOLSA PP 30 X 40 CMS.	1	100	270	31
1083	7	BOLSA PP 30 X 45 CMS.	1	100	350	39
1084	7	BOLSA PP 35 X 40 CMS.	1	100	340	38
1085	7	BOLSA PP 35 X 45 CMS.	1	100	350	39
1086	7	BOLSA PP 35 X 50 CMS.	1	100	387	43
1087	7	BOLSA PP 40 X 50 CMS.	1	100	477	53
1088	7	BOLSA PP 40 X 60 CMS.	1	100	648	72
1089	7	BOLSA PP 45 X 60 CMS.	1	100	762	82
1090	7	BOLSA PP 45 X 70 CMS.	1	100	1000	135
1091	7	BOLSA PP 50 X 60 CMS.	1	100	743	86
1092	7	BOLSA PP 50 X 70 CMS.	1	100	990	145
1093	8	BANDEJA F 50	1	100	768	105
1094	8	BANDEJA F 75	1	100	912	125
1095	8	BANDEJA F 100	1	100	439	160
1096	8	BANDEJA F 200	1	100	616	350
1097	8	TAPA P/F 50	1	100	201	55
1098	8	TAPA P/F 75	1	100	250	65
1099	8	TAPA P/F 100	1	100	277	100
1100	8	TAPA P/F 200	1	100	219	160
1101	8	PLATO P 14	1	100	893	120
1102	8	PLATO P 17	1	100	864	104
1103	8	PLATO P 20	1	100	669	120
1104	8	PLATO P 21	1	100	367	133
1105	8	PLATO P 23	1	100	472	170
1106	8	PLATO P 26	1	100	533	192
1107	8	PLATO P 29	1	100	371	268
1108	8	PLATO P 33	1	100	480	347
1109	8	BUDINERAS 1/2 KILO	1	100	931	126
1110	8	BUDINERAS 1 KILO	1	100	448	243
1111	8	FLANERA H 10	1	100	1170	85
1112	8	FLANERA H 7	1	100	1170	85
1113	8	TAPA P/FLANERA H 10	1	100	600	43
1114	8	CENICERO DE ALUMINIO	1	100	161	35
\.


--
-- Name: products_formats_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.products_formats_sequence', 1114, true);


--
-- Data for Name: products_pictures; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.products_pictures (id, product_id, content_type, last_update) FROM stdin;
\.


--
-- Name: products_pictures_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.products_pictures_sequence', 1000, false);


--
-- Name: products_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.products_sequence', 1000, false);


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.registrations (id, email_address, token, verified, sent) FROM stdin;
\.


--
-- Name: registrations_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.registrations_sequence', 1000, false);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.roles (id, name) FROM stdin;
1	admin
2	client
\.


--
-- Name: roles_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.roles_sequence', 1000, false);


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.shopping_cart (id, user_session_id, product_format_id, quantity) FROM stdin;
\.


--
-- Name: shopping_cart_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.shopping_cart_sequence', 1000, false);


--
-- Data for Name: transactions_detail; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.transactions_detail (id, transaction_header_id, product_format_id, quantity, price) FROM stdin;
\.


--
-- Name: transactions_detail_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.transactions_detail_sequence', 1000, false);


--
-- Data for Name: transactions_header; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.transactions_header (id, user_id, purchase_date, delivery_type, payment_type, total_purchase, mail_sent, comments) FROM stdin;
\.


--
-- Name: transactions_header_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.transactions_header_sequence', 1000, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.users (id, email_address, password, first_name, last_name, role_id, address, city, telephone, zipcode, state) FROM stdin;
1000	mcarrizo@ternopel.com	5c969619	Maxi	Admin	1	\N	\N	\N	\N	\N
1001	mcarrizo@gmail.com	5c969619	Maxi	Client	2	\N	\N	\N	\N	\N
1002	smarmo@ternopel.com	42929c	Sergio	Admin	1	\N	\N	\N	\N	\N
1003	smarmo@gmail.com	42929c	Sergio	Client	2	\N	\N	\N	\N	\N
1004	sergiy@ternopel.com	5c969619	Sergiy	Gorodilovsky	1	\N	\N	\N	\N	\N
1005	sergiygor2010@hotmail.com	5c969619	Sergiy	Gorodilovsky	2	\N	\N	\N	\N	\N
\.


--
-- Name: users_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.users_sequence', 1005, true);


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: maximiliano
--

COPY public.users_sessions (id, last_access, token, user_id) FROM stdin;
\.


--
-- Name: users_sessions_sequence; Type: SEQUENCE SET; Schema: public; Owner: maximiliano
--

SELECT pg_catalog.setval('public.users_sessions_sequence', 1000, false);


--
-- Name: categories_name_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories_url_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_url_key UNIQUE (url);


--
-- Name: configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT configuration_pkey PRIMARY KEY (id);


--
-- Name: contact_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: mailing_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.mailing
    ADD CONSTRAINT mailing_pkey PRIMARY KEY (id);


--
-- Name: mailing_token_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.mailing
    ADD CONSTRAINT mailing_token_key UNIQUE (token);


--
-- Name: packaging_name_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.packaging
    ADD CONSTRAINT packaging_name_key UNIQUE (name);


--
-- Name: packaging_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.packaging
    ADD CONSTRAINT packaging_pkey PRIMARY KEY (id);


--
-- Name: posters_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_pkey PRIMARY KEY (id);


--
-- Name: posters_position_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_position_key UNIQUE ("position");


--
-- Name: products_formats_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products_formats
    ADD CONSTRAINT products_formats_pkey PRIMARY KEY (id);


--
-- Name: products_formats_product_id_format_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products_formats
    ADD CONSTRAINT products_formats_product_id_format_key UNIQUE (product_id, format);


--
-- Name: products_name_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products_pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products_pictures
    ADD CONSTRAINT products_pictures_pkey PRIMARY KEY (id);


--
-- Name: products_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_url_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_url_key UNIQUE (url);


--
-- Name: registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);


--
-- Name: registrations_token_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_token_key UNIQUE (token);


--
-- Name: roles_name_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: shopping_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (id);


--
-- Name: transactions_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.transactions_detail
    ADD CONSTRAINT transactions_detail_pkey PRIMARY KEY (id);


--
-- Name: transactions_header_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.transactions_header
    ADD CONSTRAINT transactions_header_pkey PRIMARY KEY (id);


--
-- Name: users_email_address_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_token_key UNIQUE (token);


--
-- Name: zintro_user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT zintro_user_sessions_pkey PRIMARY KEY (id);


--
-- Name: mailing_email; Type: INDEX; Schema: public; Owner: maximiliano
--

CREATE UNIQUE INDEX mailing_email ON public.mailing USING btree (email_address);


--
-- Name: registrations_email; Type: INDEX; Schema: public; Owner: maximiliano
--

CREATE UNIQUE INDEX registrations_email ON public.registrations USING btree (email_address);


--
-- Name: posters_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: posters_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: products_formats_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products_formats
    ADD CONSTRAINT products_formats_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: products_packaging_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_packaging_id_fkey FOREIGN KEY (packaging_id) REFERENCES public.packaging(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: products_pictures_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.products_pictures
    ADD CONSTRAINT products_pictures_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: shopping_cart_product_format_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_product_format_id_fkey FOREIGN KEY (product_format_id) REFERENCES public.products_formats(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: shopping_cart_user_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_user_session_id_fkey FOREIGN KEY (user_session_id) REFERENCES public.users_sessions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: transactions_detail_product_format_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.transactions_detail
    ADD CONSTRAINT transactions_detail_product_format_id_fkey FOREIGN KEY (product_format_id) REFERENCES public.products_formats(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: transactions_detail_transaction_header_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.transactions_detail
    ADD CONSTRAINT transactions_detail_transaction_header_id_fkey FOREIGN KEY (transaction_header_id) REFERENCES public.transactions_header(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: transactions_header_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.transactions_header
    ADD CONSTRAINT transactions_header_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: users_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: maximiliano
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

