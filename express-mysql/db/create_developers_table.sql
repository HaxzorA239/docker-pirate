-- SIMPLE DATABASE CONFIGURATION FOR APPLICATION
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET @@global.time_zone = "+00:00";
--
-- Database: `Universidad`
--
DROP DATABASE IF EXISTS Universidad;
CREATE DATABASE Universidad;
USE Universidad;
--
-- Structure for the database: `Estudiantes`
--
CREATE TABLE `Estudiantes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `id_type` varchar(255) NOT NULL,
    `id_value` varchar(255) NOT NULL,
    `area` varchar(255) NOT NULL,
    `age` int NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Structure for the database: `Materias`
--
CREATE TABLE `Materias` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(255) NOT NULL,
    `aula` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Structure for the database: `Estudiantes_Materias`
--
CREATE TABLE `Estudiantes_Materias` (
    `id_estudiante` INT NOT NULL,
    `id_materia` INT NOT NULL,
    `calificacion`   INT,
    `estado` BIT,
    PRIMARY KEY(`id_estudiante`, `id_materia`),
    FOREIGN KEY (`id_estudiante`) REFERENCES `Estudiantes`(`id`),
    FOREIGN KEY (`id_materia`) REFERENCES `Materias`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- Add some sample data for the data of table: `Estudiantes`
--
INSERT INTO `Estudiantes` (
        `name`,
        `lastname`,
        `id_type`,
        `id_value`,
        `area`,
        `age`
    )
VALUES ('Susy', 'Castillo', '18240889', '1234', 'Sistemas', 23),
    ('Alan', 'Jimenez', '18240823', '0823', 'Sistemas', 23),
    ('Alan', 'Sánchez', '18240823', '0863', 'Sistemas', 22),
    ('Omar', 'Pérez', '18240823', '0828', 'Sistemas', 22);
COMMIT;
--
-- Add some sample data for the data of table: `Estudiantes`
--
INSERT INTO `Materias` (
        `nombre`,
        `aula`
    )
VALUES ('Desarrollo de aplicaciones', 'D-14'),
    ('Despliegue de Aplicaciones', 'D-06'),
    ('Matemáticas Discretas', 'D-12'),
    ('Bases de Datos', 'C-04');
COMMIT;