CREATE TABLE categories (
    id bigint DEFAULT nextval('categories_sequence') NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL
);

CREATE TABLE contact (
    id bigint DEFAULT nextval('contact_sequence') NOT NULL,
    email_address varchar(256) NOT NULL,
    first_name varchar(256) NOT NULL,
    last_name varchar(256) NOT NULL,
    comments varchar(8096) NOT NULL,
    sent boolean DEFAULT false NOT NULL
);

CREATE TABLE mailing (
    id bigint DEFAULT nextval('mailing_sequence') NOT NULL,
    email_address varchar(256) NOT NULL,
    token varchar(255) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    sent boolean NOT NULL,
    immediate boolean DEFAULT false NOT NULL
);

CREATE TABLE packaging (
    id bigint DEFAULT nextval('packaging_sequence') NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE posters (
    id bigint DEFAULT nextval('posters_sequence') NOT NULL,
    "position" integer NOT NULL,
    content_type varchar(255) NOT NULL,
    last_update timestamp without time zone NOT NULL,
    category_id bigint NOT NULL,
    product_id bigint,
    caption varchar(512) DEFAULT 'Mensaje'::varchar NOT NULL
);

CREATE TABLE products (
    id bigint DEFAULT nextval('products_sequence') NOT NULL,
    category_id bigint NOT NULL,
    packaging_id bigint NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(4096) NOT NULL,
    url varchar(255) NOT NULL,
    show_format boolean DEFAULT false NOT NULL,
    is_visible boolean DEFAULT false NOT NULL,
    is_offer boolean DEFAULT false NOT NULL
);

CREATE TABLE products_formats (
    id bigint DEFAULT nextval('products_formats_sequence') NOT NULL,
    product_id bigint NOT NULL,
    format varchar(255) NOT NULL,
    quantity double precision NOT NULL,
    units double precision NOT NULL,
    wholesale double precision NOT NULL,
    retail double precision NOT NULL
);

CREATE TABLE products_pictures (
    id bigint DEFAULT nextval('products_pictures_sequence') NOT NULL,
    product_id bigint NOT NULL,
    content_type varchar(255) NOT NULL,
    last_update timestamp without time zone NOT NULL
);

CREATE TABLE registrations (
    id bigint DEFAULT nextval('registrations_sequence') NOT NULL,
    email_address varchar(256) NOT NULL,
    token varchar(255) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    sent boolean NOT NULL
);

CREATE TABLE roles (
    id bigint DEFAULT nextval('roles_sequence') NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE shopping_cart (
    id bigint DEFAULT nextval('shopping_cart_sequence') NOT NULL,
    user_session_id bigint NOT NULL,
    product_format_id bigint NOT NULL,
    quantity double precision NOT NULL
);

CREATE TABLE transactions_header (
    id bigint DEFAULT nextval('transactions_header_sequence') NOT NULL,
    user_id bigint NOT NULL,
    purchase_date timestamp without time zone NOT NULL,
    delivery_type integer NOT NULL,
    payment_type integer NOT NULL,
    total_purchase double precision NOT NULL,
    mail_sent boolean NOT NULL,
    comments varchar(4096)
);

CREATE TABLE transactions_detail (
    id bigint DEFAULT nextval('transactions_detail_sequence') NOT NULL,
    transaction_header_id bigint NOT NULL,
    product_format_id bigint NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL
);

CREATE TABLE users (
    id bigint DEFAULT nextval('users_sequence') NOT NULL,
    email_address varchar(256) NOT NULL,
    password varchar(255),
    first_name varchar(256),
    last_name varchar(256),
		full_name varchar(256),
    role_id bigint NOT NULL,
    address varchar(255),
    city varchar(255),
    telephone varchar(255),
    zipcode numeric(4,0),
    state numeric(2,0),
		provider varchar(255) NOT NULL,
		facebook_id varchar(255),
		google_id varchar(255)
);

CREATE TABLE users_sessions (
    id bigint DEFAULT nextval('users_sessions_sequence') NOT NULL,
    last_access timestamp without time zone NOT NULL,
    token varchar(255) NOT NULL,
    socket_id varchar(255) NOT NULL,
    user_id bigint
);
