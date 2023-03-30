import { createClassicConnexion } from "../config/database.js"

async function createDB() {
    await createClassicConnexion()
        .then(
            async con => {
                // On supprime les tables
                await con.query("DROP TABLE IF EXISTS reviews");
                await con.query("DROP TABLE IF EXISTS reservations");
                await con.query("DROP TABLE IF EXISTS media");
                await con.query("DROP TABLE IF EXISTS rooms");
                await con.query("DROP TABLE IF EXISTS user_roles");
                await con.query("DROP TABLE IF EXISTS roles");
                await con.query("DROP TABLE IF EXISTS guests");
                await con.query("DROP TABLE IF EXISTS owners");

                // Création des tables
                await con.query(`CREATE TABLE owners(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    company_name VARCHAR(255) NOT NULL,
                    address_number INT NOT NULL CHECK (address_number BETWEEN 1 AND 99999),
                    address_name VARCHAR(255) NOT NULL,
                    city_name VARCHAR(255) NOT NULL,
                    zip_code INT NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    email_verified_at DATETIME,
                    password VARCHAR(255) NOT NULL,
                    remember_token VARCHAR(255),
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME,
                    phone_number VARCHAR(10) NOT NULL,
                    kbis_number VARCHAR(9) NOT NULL UNIQUE,
                    profile_image VARCHAR(255)
                )`);

                await con.query(`CREATE TABLE guests(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    firstname VARCHAR(255) NOT NULL,
                    lastname VARCHAR(255) NOT NULL,
                    birthdate DATE NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    email_verified_at DATETIME,
                    password VARCHAR(255) NOT NULL,
                    remember_token VARCHAR(255),
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME,
                    phone_number VARCHAR(10) NOT NULL,
                    description VARCHAR(255),
                    profile_image VARCHAR(255)
                )`);

                await con.query(`CREATE TABLE roles(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )`);

                await con.query(`CREATE TABLE user_roles(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    guests_id INT,
                    owners_id INT,
                    role_id INT NOT NULL,
                    FOREIGN KEY(guests_id) REFERENCES guests(id),
                    FOREIGN KEY(owners_id) REFERENCES owners(id),
                    FOREIGN KEY(role_id) REFERENCES roles(id)
                )`);

                await con.query(`CREATE TABLE rooms(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    home_type VARCHAR(255) NOT NULL,
                    room_type VARCHAR(255) NOT NULL,
                    total_occupancy INT NOT NULL,
                    total_bedrooms INT NOT NULL,
                    summary VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    country VARCHAR(255) NOT NULL,
                    price INT NOT NULL,
                    published_at DATETIME NOT NULL,
                    owners_id INT NOT NULL,
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME NOT NULL,
                    latitude DOUBLE(8, 2) NOT NULL,
                    longitude DOUBLE(8, 2) NOT NULL,
                    FOREIGN KEY(owners_id) REFERENCES owners(id)
                )`);

                await con.query(`CREATE TABLE media(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    model_id INT NOT NULL,
                    model_type VARCHAR(255) NOT NULL,
                    file_name VARCHAR(255) NOT NULL,
                    mime_type VARCHAR(255),
                    CONSTRAINT fk_media_rooms_id FOREIGN KEY(model_id) REFERENCES rooms(id)
                )`);

                await con.query(`CREATE TABLE reservations(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    guests_id INT NOT NULL,
                    room_id INT NOT NULL,
                    start_date DATETIME NOT NULL,
                    end_date DATETIME NOT NULL,
                    price INT NOT NULL,
                    total INT NOT NULL,
                    created_at DATETIME NOT NULL,
                    updated_at DATETIME NOT NULL,
                    FOREIGN KEY(guests_id) REFERENCES guests(id),
                    FOREIGN KEY(room_id) REFERENCES rooms(id)
                )`);

                await con.query(`CREATE TABLE reviews(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    reservation_id INT NOT NULL,
                    rating INT NOT NULL,
                    comment VARCHAR(255) NOT NULL,
                    FOREIGN KEY(reservation_id) REFERENCES reservations(id)
                )`);

                // Remplissage des tables
                await con.query(`INSERT INTO owners (company_name, address_number, address_name, city_name, zip_code, email, email_verified_at, password, remember_token, created_at, updated_at, phone_number, kbis_number, profile_image) 
                    VALUES
                        ("Motel First", 12, "rue du Vieux Mans", "Le Mans", 72000, "motel-one@example.com", "2023-03-10 14:00:00", "password1", NULL, NOW(), NOW(), "0111111111", "000111222", "https://assets.teenvogue.com/photos/5fac139ceb9270b886b28be2/16:9/w_2560%2Cc_limit/EIP_101_Unit_00278R.jpg"),
                        ("Studio Two", 1, "rue de la Paix", "Paris", 75000, "studio-two@example.com", "2023-03-10 14:00:00", "password2", NULL, NOW(), NOW(), "0222222222", "222333444", "https://example.com/images/motel2.jpg"),
                        ("Hostel Three", 6, "rue de la Loire", "Nantes", 44000, "hostel-three@example.com", "2023-03-10 14:00:00", "password3", NULL, NOW(), NOW(), "0333333333", "444555666", "https://example.com/images/motel3.jpg"),
                        ("Room Four", 1, "rue de la Mer", "Caen", 14118, "room-four@example.com", "2023-03-10 14:00:00", "password4", NULL, NOW(), NOW(), "0444444444", "666777888", "https://example.com/images/motel4.jpg"),
                        ("Motel Five", 25, "rue du Palais Gallien", "Bordeaux", 33000, "motel-five@example.com", "2023-03-10 14:00:00", "password5", NULL, NOW(), NOW(), "0555555555", "888999000", "https://example.com/images/motel5.jpg"),
                        ("Studio Six", 25, "rue de la Liberté", "Lyon", 69000, "studio-six@example.com", "2023-03-10 14:00:00", "password6", NULL, NOW(), NOW(), "0666666666", "111222333", "https://example.com/images/motel6.jpg"),
                        ("Hostel Seven", 12, "rue du Vieux Port", "Marseille", 13000, "hostel-seven@example.com", "2023-03-10 14:00:00", "password7", NULL, NOW(), NOW(), "0777777777", "333444555", "https://example.com/images/motel7.jpg"),
                        ("Room Eight", 6, "rue de la Plage", "Nice", 06000, "room-eight@example.com", "2023-03-10 14:00:00", "password8", NULL, NOW(), NOW(), "0888888888", "555666777", "https://example.com/images/motel8.jpg")
                    `);

                await con.query(`INSERT INTO guests (firstname, lastname, birthdate, email, email_verified_at, password, remember_token, created_at, updated_at, phone_number, description, profile_image) 
            VALUES
                ("John", "Doe", "1970-01-01", "john.doe@gmail.com", NOW(), "John_Doe+123", NULL, NOW(), NOW(), "0123456789", "I am a guest user", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Mary", "Jane", "1980-01-01", "mary.juana@gmail.com", NOW(), "Mary_Jane+123", NULL, NOW(), NOW(), "0987654321", "I am a guest user", "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Jane", "Smith", "1990-01-01", "jane.smith@gmail.com", NOW(), "Jane_Smith+123", NULL, NOW(), NOW(), "1234567890", "I am a guest user", "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Bob", "Johnson", "1995-01-01", "bob.johnson@gmail.com", NOW(), "Bob_Johnson+123", NULL, NOW(), NOW(), "0987654321", "I am a guest user", "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"),
                ("Alice", "Kim", "2000-01-01", "alice.kim@gmail.com", NOW(), "Alice_Kim+123", NULL, NOW(), NOW(), "0156249376", "I am a guest user", "https://images.unsplash.com/photo-1619443143113-9fc54b5609ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
            `);

                await con.query(`INSERT INTO roles (name)
            VALUES  
                ("ROLE_ADMIN"),
                ("ROLE_OWNER"),
                ("ROLE_GUEST")
            `);

                await con.query(`INSERT INTO user_roles (owners_id, guests_id, role_id)  
            VALUES 
                (1, NULL, 2),
                (2, NULL, 2),
                (3, NULL, 2),
                (4, NULL, 2),
                (5, NULL, 2),
                (6, NULL, 2),
                (7, NULL, 2),
                (8, NULL, 2),
                (NULL, 1, 3),
                (NULL, 2, 3),
                (NULL, 3, 3),
                (NULL, 4, 3),
                (NULL, 5, 3)
            `);

                await con.query(`INSERT INTO rooms (home_type, room_type, total_occupancy, total_bedrooms, summary, address, city, country, price, published_at, owners_id, created_at, updated_at, latitude, longitude)
            VALUES 
                ("Appartement", "logement entier", 2, 1, "Jacuzzi et sauna privatif au coeur du Mans", "12 rue du Vieux Mans", "Le Mans", "France", 160, NOW(), 1, NOW(), NOW(), 43.2965, 5.3698),
                ("Loft", "logement entier", 2, 1, "Chambre lumineuse avec vue sur la Tour Eiffel", "1 Rue de la Paix", "Paris", "France", 80, NOW(), 2, NOW(), NOW(), 48.8566, 2.3522),
                ("Maison", "chambre privée", 2, 1, "Chambre partagée proche du centre", "6 Rue de la Loire", "Nantes", "France", 95, NOW(), 3, NOW(), NOW(), 47.2184, -1.5536),
                ("Appartement", "logement entier", 2, 1, "Chambre proche du Château et du mémorial de Caen", "1 Rue de la Mer", "Caen", "France", 80, NOW(), 4, NOW(), NOW(), 49.1812, -0.3719),
                ("Appartement", "chambre privée", 4, 2, "Chambe situé au coeur du centre ville de Bordeaux", "25 Rue du Palais Gallien", "Bordeaux", "France", 120, NOW(), 5, NOW(), NOW(), 44.8378, -0.5792),
                ("Appartement", "chambre privée", 4, 2, "Chambre cosy à proximité de la gare Depardieu", "25 Rue de la Liberté", "Lyon", "France", 120, NOW(), 6, NOW(), NOW(), 45.7640, 4.8357), 
                ("Appartement", "logement entier", 2, 1, "Chambre confort avec vue sur le Vieux Port", "12 rue du Vieux Port", "Marseille", "France", 160, NOW(), 7, NOW(), NOW(), 43.2965, 5.3698),
                ("Suite", "chambre privée", 2, 1, "Suite situé à 500 mètres de la mer", "6 Rue de la Plage", "Nice", "France", 95, NOW(), 8, NOW(), NOW(), 43.6957, 7.2716)
            `);

                await con.query(`INSERT INTO media (model_id, model_type, file_name, mime_type) 
            VALUES 
                (1, "room", "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80", "image/jpeg"),
                (2, "room", "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80", "image/jpeg"),
                (3, "room", "https://images.unsplash.com/photo-1617904163187-1ecbed91a6f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "image/jpeg"),
                (4, "room", "https://images.unsplash.com/photo-1612320648993-61c1cd604b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "image/jpeg"),
                (5, "room", "https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "image/jpeg"),
                (6, "room", "https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "image/jpeg"),
                (7, "room", "https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "image/jpeg"),
                (8, "room", "https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "image/jpeg")
            `);

                await con.query(`INSERT INTO reservations (guests_id, room_id, start_date, end_date, price, total, created_at, updated_at) 
            VALUES 
                (1, 1, "2023-03-25 14:00:00", "2023-03-27 12:00:00", 150, 750, NOW(), NOW());
            `);

                await con.query(`INSERT INTO reviews (reservation_id, rating, comment) 
            VALUES 
                (1, 4, "Très bon séjour ! Le logement était parfaitement propre et confortable.");
            `);
                console.log("Tables créées avec succès !");
            })
        .catch(error => { console.error(`Erreur lors de la création de la table : ${error}`); })
};

createDB();