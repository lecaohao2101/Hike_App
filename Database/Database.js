import * as SQLite from "expo-sqlite";

const database_name = "HikeApps.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

//Create table
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

//Select all data
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

//insert data
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

//delete data
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

//Delete all data
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


//Update data
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

const Database = {
  initDatabase,
  addHike,
  getHikes,
  deleteHike,
  getHikeById,
  updateHike,
  deleteAllHike,
};

export default Database;
