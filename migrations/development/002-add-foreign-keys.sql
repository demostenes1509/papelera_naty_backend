ALTER TABLE categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);

ALTER TABLE categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE categories
    ADD CONSTRAINT categories_url_key UNIQUE (url);

ALTER TABLE contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);

ALTER TABLE mailing
    ADD CONSTRAINT mailing_pkey PRIMARY KEY (id);

ALTER TABLE mailing
    ADD CONSTRAINT mailing_token_key UNIQUE (token);

ALTER TABLE packaging
    ADD CONSTRAINT packaging_name_key UNIQUE (name);

ALTER TABLE packaging
    ADD CONSTRAINT packaging_pkey PRIMARY KEY (id);

ALTER TABLE posters
    ADD CONSTRAINT posters_pkey PRIMARY KEY (id);

ALTER TABLE posters
    ADD CONSTRAINT posters_position_key UNIQUE ("position");

ALTER TABLE products_formats
    ADD CONSTRAINT products_formats_pkey PRIMARY KEY (id);

ALTER TABLE products_formats
    ADD CONSTRAINT products_formats_product_id_format_key UNIQUE (product_id, format);

ALTER TABLE products
    ADD CONSTRAINT products_name_key UNIQUE (name);

ALTER TABLE products_pictures
    ADD CONSTRAINT products_pictures_pkey PRIMARY KEY (id);

ALTER TABLE products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE products
    ADD CONSTRAINT products_url_key UNIQUE (url);

ALTER TABLE registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);

ALTER TABLE registrations
    ADD CONSTRAINT registrations_token_key UNIQUE (token);

ALTER TABLE roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);

ALTER TABLE roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);

ALTER TABLE shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (id);

ALTER TABLE transactions_detail
    ADD CONSTRAINT transactions_detail_pkey PRIMARY KEY (id);

ALTER TABLE transactions_header
    ADD CONSTRAINT transactions_header_pkey PRIMARY KEY (id);

ALTER TABLE users
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);

ALTER TABLE users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE users_sessions
    ADD CONSTRAINT users_sessions_token_key UNIQUE (token);

ALTER TABLE users_sessions
    ADD CONSTRAINT zintro_user_sessions_pkey PRIMARY KEY (id);

CREATE UNIQUE INDEX mailing_email ON mailing USING btree (email_address);

CREATE UNIQUE INDEX registrations_email ON registrations USING btree (email_address);

ALTER TABLE posters
    ADD CONSTRAINT posters_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE posters
    ADD CONSTRAINT posters_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE products_formats
    ADD CONSTRAINT products_formats_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE products
    ADD CONSTRAINT products_packaging_id_fkey FOREIGN KEY (packaging_id) REFERENCES packaging(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE products_pictures
    ADD CONSTRAINT products_pictures_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE shopping_cart
    ADD CONSTRAINT shopping_cart_product_format_id_fkey FOREIGN KEY (product_format_id) REFERENCES products_formats(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE shopping_cart
    ADD CONSTRAINT shopping_cart_user_session_id_fkey FOREIGN KEY (user_session_id) REFERENCES users_sessions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE transactions_detail
    ADD CONSTRAINT transactions_detail_product_format_id_fkey FOREIGN KEY (product_format_id) REFERENCES products_formats(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE transactions_detail
    ADD CONSTRAINT transactions_detail_transaction_header_id_fkey FOREIGN KEY (transaction_header_id) REFERENCES transactions_header(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE transactions_header
    ADD CONSTRAINT transactions_header_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE users_sessions
    ADD CONSTRAINT users_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
