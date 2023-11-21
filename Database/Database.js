// Import the SQLite module from Expo, which allows us to interact with a local SQLite database.
import * as SQLite from "expo-sqlite";

// Define constants for the database configuration.
const database_name = "HikeApps.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

// Open or create the SQLite database using Expo's SQLite.openDatabase method.
const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

// Function to initialize the database and create the 'hikeDb' table if it doesn't exist.
const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikeDb (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hikeName TEXT,
          location TEXT,
          selectedDate TEXT,
          parkingAvailable TEXT,
          length TEXT,
          difficulty TEXT,
          description TEXT
        );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

// Function to retrieve all hikes from the 'hikeDb' table.
const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikeDb",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to insert a new hike into the 'hikeDb' table.
const addHike = (
  hikeName,
  location,
  selectedDate,
  parkingAvailable,
  length,
  difficulty,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikeDb (hikeName, location, selectedDate, parkingAvailable, length, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          hikeName,
          location,
          selectedDate,
          parkingAvailable,
          length,
          difficulty,
          description,
        ],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to delete a hike from the 'hikeDb' table based on its ID.
const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikeDb WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to delete all hikes from the 'hikeDb' table.
const deleteAllHike = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikeDb",
        [],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to update the details of a hike in the 'hikeDb' table based on its ID.
const updateHike = (
  id,
  hikeName,
  location,
  selectedDate,
  parkingAvailable,
  length,
  difficulty,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql =
        "UPDATE hikeDb SET hikeName = ?, location = ?, selectedDate = ?, parkingAvailable = ?, length = ?, difficulty = ?, description = ? WHERE id = ?";
      const params = [
        hikeName,
        location,
        selectedDate,
        parkingAvailable,
        length,
        difficulty,
        description,
        id,
      ];

      console.log("SQL:", sql);
      console.log("Parameters:", params);

      tx.executeSql(
        sql,
        params,
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve("Hike details updated successfully");
          } else {
            reject("Hike details update database failed");
          }
        },
        (_, error) => {
          console.error("SQL error:", error);
          reject(error);
        }
      );
    });
  });
};

// Function to retrieve a specific hike from the 'hikeDb' table based on its ID.
const getHikeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikeDb WHERE id = ?",
        [id],
        (_, { rows }) => {
          resolve(rows._array.length > 0 ? rows._array[0] : null);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Object containing all the database functions to be exported.
const Database = {
  initDatabase,
  addHike,
  getHikes,
  deleteHike,
  getHikeById,
  updateHike,
  deleteAllHike,
};

// Export the Database object for use in other modules.
export default Database;
