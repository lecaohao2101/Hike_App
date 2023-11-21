// Import necessary React components and libraries
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Database from "../Database/Database";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./style";

// Define the FormScreen component
const FormScreen = ({ navigation }) => {
  // State variables to store input values
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [parkingAvailable, setParkingAvailable] = useState("");
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [description, setDescription] = useState("");

  // useEffect hook to initialize the database on component mount
  useEffect(() => {
    const initDB = async () => {
      try {
        await Database.initDatabase();
        console.log("Database initialized");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    // Call the function initDB
    initDB();
  }, []);

  // Function to handle adding a new hike
  const handleAddHike = async () => {
    // Format the selected date
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Validate required fields
    if (
      !name ||
      !location ||
      !formattedDate ||
      !parkingAvailable ||
      !length ||
      !difficulty
    ) {
      Alert.alert("Error", "All required fields must be filled ");
      return;
    }

    try {
      // Add the hike to the database
      const insertId = await Database.addHike(
        name,
        location,
        formattedDate,
        parkingAvailable,
        length,
        difficulty,
        description
      );

      // Reset state variables
      setName("");
      setLocation("");
      setDateTime(new Date());
      setParkingAvailable("");
      setLength("");
      setDifficulty("");
      setDescription("");

      if (insertId) {
        Alert.alert("Success", "Your hike has been added");
        // Navigate to the HikeDetail screen with the new hike's id
        // navigation.navigate("Home", { id: insertId });
      } else {
        Alert.alert("Error", "Failed to add hike");
      }
    } catch (error) {
      console.error("Error adding hike:", error);
      Alert.alert("Error", "Failed to add hike");
    }
  };

  // Functions for handling date picker visibility
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  // JSX rendering of the FormScreen component
  return (
    <View>
      {/* Background Image */}
      <Image
        style={styles.imageBackground}
        src="https://img.freepik.com/premium-photo/tropical-beach-with-palm-trees-sun-shining-through-palm-leaves_421632-685.jpg"
      />
      <View>
        {/* Title */}
        <Text style={styles.title}>Add New Hike</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Name of the Hike */}
        <View>
          <Text style={styles.text}>Name of the hike</Text>
          <TextInput
            style={styles.input}
            placeholder="Son Dong"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Location */}
        <View>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Quang Binh"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Date of the Hike */}
        <View>
          <Text style={styles.text}>Date of the hike</Text>
          <TextInput
            style={styles.input}
            value={dateTime ? new Date(dateTime).toLocaleDateString() : ""}
            onFocus={showDatePicker}
          />

          <DateTimePickerModal
            date={dateTime}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        {/* Parking Availability */}
        <View>
          <Text style={styles.text}>Parking available</Text>
          <RNPickerSelect
            style={styles.input}
            onValueChange={(value) => setParkingAvailable(value)}
            items={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />
        </View>

        {/* Length of the Hike */}
        <View>
          <Text style={styles.text}>Length of the hike</Text>
          <TextInput
            style={styles.input}
            placeholder="100"
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
          />
        </View>

        {/* Difficulty Levels */}
        <View>
          <Text style={styles.text}>Difficulty levels</Text>
          <RNPickerSelect
            onValueChange={(value) => setDifficulty(value)}
            items={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
        </View>

        {/* Description */}
        <View>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.description}
            placeholder="Description about the hike..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Add Button */}
        <View>
          <TouchableOpacity style={styles.button} onPress={handleAddHike}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            title="Detail"
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.navButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Export the FormScreen component for use in other modules.
export default FormScreen;
