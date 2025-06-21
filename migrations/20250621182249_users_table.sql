-- UP

CREATE TABLE users (
    id UUID NOT NULL CONSTRAINT pk_users PRIMARY KEY DEFAULT(gen_random_uuid()),
    username VARCHAR(255) NOT NULL,
    email TEXT NOT NULL CONSTRAINT up_users_email UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL CONSTRAINT df_user_created_at DEFAULT(now()),
    updated_at TIMESTAMP NOT NULL CONSTRAINT df_user_updated_at DEFAULT(now()),
    deleted_at TIMESTAMP 
);   



-- DOWN

DROP TABLE users;