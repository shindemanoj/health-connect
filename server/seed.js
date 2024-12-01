const pool = require('./config/db');

const seedData = async () => {
    try {
        // Insert Gyms
        await pool.query(`
      INSERT INTO gyms (name, location, distance) VALUES
      ('Fitness World', 'Downtown Vancouver', 2.5),
      ('Gold’s Gym', 'West Vancouver', 5.0),
      ('24 Hour Fitness', 'North Vancouver', 3.2),
      ('Anytime Fitness', 'Burnaby', 4.1);
    `);

        // Insert Users
        await pool.query(`
      INSERT INTO users (name, email, password, credits) VALUES
      ('Alice Johnson', 'alice@example.com', '$2b$10$saltsaltsaltsaltsaltsaltsalt1', 10),
      ('Bob Smith', 'bob@example.com', '$2b$10$saltsaltsaltsaltsaltsaltsalt2', 15),
      ('Charlie Brown', 'charlie@example.com', '$2b$10$saltsaltsaltsaltsaltsaltsalt3', 20);
    `);

        // Insert Bookings
        await pool.query(`
      INSERT INTO bookings (user_id, gym_id, class_name) VALUES
      (1, 1, 'Yoga'),
      (2, 3, 'Crossfit'),
      (3, 2, 'Zumba');
    `);

        console.log('Seeding complete!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();