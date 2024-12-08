const pool = require('../config/db');

const seedData = async () => {
    try {
        // Insert Gyms with description
        await pool.query(`
            INSERT INTO gyms (id, name, location, distance, description) VALUES
                                                                             (9, 'Iron Paradise', 'Downtown Vancouver', 2.5, 'A top-notch gym offering strength training and bodybuilding facilities.'),
                                                                             (10, 'Fitness World', 'West Vancouver', 5.0, 'A fitness center offering a wide range of classes and modern equipment for all fitness levels.'),
                                                                             (11, 'Gold’s Gym', 'North Vancouver', 3.2, 'A legendary gym with professional trainers, diverse classes, and a wide variety of equipment.'),
                                                                             (12, '24 Hour Fitness', 'Burnaby', 4.1, 'Open 24/7, offering flexibility for workouts at any time of day with comprehensive fitness services.');
        `);

        // Insert Gym Classes
        await pool.query(`
            INSERT INTO classes (gym_id, "name", schedule, capacity) VALUES
                                                                         (10, 'Yoga', '2024-12-01 08:00:00', 25),
                                                                         (10, 'Pilates', '2024-12-01 10:00:00', 20),
                                                                         (10, 'Spin', '2024-12-01 12:00:00', 15),
                                                                         (12, 'Crossfit', '2024-12-01 09:00:00', 20),
                                                                         (12, 'Strength Training', '2024-12-01 11:00:00', 20),
                                                                         (12, 'Yoga', '2024-12-01 13:00:00', 25),
                                                                         (11, 'Zumba', '2024-12-01 08:00:00', 30),
                                                                         (11, 'HIIT', '2024-12-01 10:00:00', 25),
                                                                         (11, 'Bootcamp', '2024-12-01 12:00:00', 20),
                                                                         (9, 'Boxing', '2024-12-01 08:00:00', 20),
                                                                         (9, 'Yoga', '2024-12-01 10:00:00', 25),
                                                                         (9, 'Crossfit', '2024-12-01 12:00:00', 30);
        `);

        console.log('Seeding complete!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();