-- UP

CREATE TABLE routes_types (
	name VARCHAR(255) NOT NULL CONSTRAINT pk_routes_types PRIMARY KEY
);

CREATE TABLE routes (
	id UUID NOT NULL CONSTRAINT pk_routes PRIMARY KEY DEFAULT(gen_random_uuid()),
	route_type VARCHAR(255) NOT NULL,
	schema JSONB NOT NULL,
	project_id UUID NOT NULL,
	data_builder_id UUID NOT NULL,

    CONSTRAINT fk_routes_route_type
        FOREIGN KEY (route_type) REFERENCES routes_types(name) ON DELETE RESTRICT,
    CONSTRAINT fk_routes_project_id
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_routes_data_builder_id
        FOREIGN KEY (data_builder_id) REFERENCES projects(id) ON DELETE CASCADE
);


-- DOWN

DROP TABLE routes;
DROP TABLE routes_types;