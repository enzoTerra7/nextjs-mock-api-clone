-- UP

CREATE TABLE projects (
    id UUID NOT NULL CONSTRAINT pk_projects PRIMARY KEY DEFAULT(gen_random_uuid()),
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL, 
    
    CONSTRAINT fk_projects_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- DOWN

DROP TABLE projects;