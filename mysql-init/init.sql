CREATE DATABASE IF NOT EXISTS it04_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE it04_db;

CREATE TABLE IF NOT EXISTS persons (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(100)    NOT NULL,
    last_name     VARCHAR(100)    NOT NULL,
    email         VARCHAR(255)    NOT NULL,
    phone         VARCHAR(20)     NOT NULL,
    birth_day     VARCHAR(20)     NOT NULL,
    occupation_id INT             NOT NULL,
    profile       LONGTEXT        NOT NULL,
    sex           CHAR(1)         NOT NULL,
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
