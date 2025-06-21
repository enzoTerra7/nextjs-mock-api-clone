-- UP

CREATE TABLE data_builder_types (
	name VARCHAR(255) NOT NULL CONSTRAINT pk_data_builder_types PRIMARY KEY
);

CREATE TABLE data_builders (
	id  UUID NOT NULL CONSTRAINT pk_data_builders PRIMARY KEY DEFAULT(gen_random_uuid()),
	name VARCHAR(255) NOT NULL,
	data_builder_type_id TEXT NOT NULL,

    CONSTRAINT fk_data_builders_data_builder_type_id 
        FOREIGN KEY (data_builder_type_id) REFERENCES data_builder_types(name) ON DELETE RESTRICT
);





-- DOWN

DROP TABLE data_builders;
DROP TABLE data_builder_types;