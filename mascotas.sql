CREATE TABLE mascotas(
id SERIAL,
nombre VARCHAR,
especie VARCHAR,
raza VARCHAR,
edad INTEGER,
genero VARCHAR,
CONSTRAINT pk_mascotas PRIMARY KEY (id)
)

SELECT * FROM mascotas

INSERT INTO mascotas (nombre, especie, raza, edad, genero) VALUES 
('Max', 'Perro', 'Labrador', 5, 'Masculino'),
('Bella', 'Perro', 'Chihuahua', 3, 'Femenino'),
('Oliver', 'Gato', 'Siamés', 2, 'Masculino'),
('Daisy', 'Gato', 'Persa', 4, 'Femenino'),
('Rocky', 'Perro', 'Bulldog', 6, 'Masculino'),
('Luna', 'Gato', 'Maine Coon', 1, 'Femenino'),
('Buddy', 'Perro', 'Golden Retriever', 7, 'Masculino'),
('Kitty', 'Gato', 'Bengalí', 5, 'Femenino'),
('Toby', 'Conejo', 'Mini Rex', 2, 'Masculino'),
('Coco', 'Loro', 'Amazonas', 12, 'Femenino'),
('Simba', 'Gato', 'Abisinio', 3, 'Masculino'),
('Daisy', 'Conejo', 'Holland Lop', 1, 'Femenino'),
('Rex', 'Perro', 'Pastor Alemán', 4, 'Masculino'),
('Goldie', 'Pez', 'Goldfish', 1, 'Femenino'),
('Luna', 'Hámster', 'Sirio', 2, 'Femenino');

SELECT * FROM mascotas