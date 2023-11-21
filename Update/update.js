// Import necessary React components and libraries
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import styles from "./style";
import Database from "../Database/Database";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Define the UpdateScreen component
const UpdateScreen = ({ route, navigation }) => {
  // State variables to store data
  const [hikeDetails, setHikeDetails] = useState({
    id: "",
    hikeName: "",
    location: "",
    selectedDate: new Date(),
    parkingAvailable: "yes",
    length: "",
    difficulty: "",
    description: "",
  });

  // State variable to manage the visibility of the date picker
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // useEffect hook to load hike details when the component mounts or when the route parameter changes
  useEffect(() => {
    const loadHikeDetails = async () => {
      if (route.params?.id) {
        try {
          const details = await Database.getHikeById(route.params.id);
          if (details) {
            // Update state with fetched details, converting the date string to a Date object
            setHikeDetails({
              ...details,
              selectedDate: new Date(details.selectedDate),
            });
          } else {
            // Display an error message if details are not found and navigate back
            Alert.alert("Error", "Hike details not found.");
            navigation.goBack();
          }
        } catch (error) {
          console.error("Error fetching hike details:", error);
          Alert.alert("Error", "Unable to load hike details");
        }
      }
    };

    // Call the loadHikeDetails function
    loadHikeDetails();
  }, [route.params?.id]);

  // Function to handle the save action
  const handleSave = async () => {
    try {
      // Call the updateHike function from the Database, passing the updated details
      const result = await Database.updateHike(
        hikeDetails.id,
        hikeDetails.hikeName,
        hikeDetails.location,
        hikeDetails.selectedDate.toISOString(),
        hikeDetails.parkingAvailable,
        hikeDetails.length,
        hikeDetails.difficulty,
        hikeDetails.description
      );
      // Display a success message and navigate back
      Alert.alert("Success", "Hike details updated successfully");
      navigation.goBack();
    } catch (error) {
      // Display an error message if the update fails
      console.error("Error updating hike:", error);
      Alert.alert("Error", "Failed to update hike");
    }
  };

  // Function to show the date picker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Function to hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Function to handle the date selection in the date picker
  const handleConfirm = (date) => {
    // Update the selected date in the state and hide the date picker
    setHikeDetails({ ...hikeDetails, selectedDate: date });
    hideDatePicker();
  };

  // Function to handle changes in the form fields
  const handleChange = (name, value) => {
    // Update the state with the changed value
    setHikeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // JSX rendering of the UpdateScreen component
  return (
    <View>
      {/* Background Image */}
      <Image
        style={styles.imageBackground}
        src="https://images.unsplash.com/photo-1643779375188-48de1ff2eb10?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {/* Title */}
      <View>
        <Text style={styles.title}>Update</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Name of the Hike */}
        <View>
          <Text style={styles.text}>Name of the hike</Text>
          <TextInput
            style={styles.input}
            value={hikeDetails.hikeName}
            onChangeText={(text) => handleChange("hikeName", text)}
          />
        </View>

        {/* Location */}
        <View>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.input}
            value={hikeDetails.location}
            onChangeText={(text) => handleChange("location", text)}
          />
        </View>

        {/* Date of the Hike */}
        <View>
          <Text style={styles.text}>Date of the hike</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.date}>{hikeDetails.selectedDate.toLocaleDateString()} </Text>
          </TouchableOpacity>
          {/* Date Picker Modal */}
          {datePickerVisible && (
            <DateTimePickerModal
              date={hikeDetails.selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}
        </View>

        {/* Parking Available */}
        <View>
          <Text style={styles.text}>Parking available</Text>
          <RNPickerSelect
            style={styles.input}
            value={hikeDetails.parkingAvailable}
            onValueChange={(value) => handleChange("parkingAvailable", value)}
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
            value={hikeDetails.length}
            onChangeText={(text) => handleChange("length", text)}
            keyboardType="numeric"
          />
        </View>

        {/* Difficulty Levels */}
        <View>
          <Text style={styles.text}>Difficulty levels</Text>
          <RNPickerSelect
            style={styles.input}
            value={hikeDetails.difficulty}
            onValueChange={(text) => handleChange("difficulty", text)}
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
            value={hikeDetails.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
          />
        </View>

        {/* Save Changes Button */}
        <View>
          <TouchableOpacity
            style={styles.button}
            title="Save Changes"
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navBar}>
          {/* Add Hike Button */}
          <TouchableOpacity style={styles.navButton}>
            <Text
              style={styles.navButtonText}
              onPress={() => navigation.navigate("Form")}
            >
              Add
            </Text>
          </TouchableOpacity>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.navButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Export the UpdateScreen component for use in other modules.
export default UpdateScreen;
