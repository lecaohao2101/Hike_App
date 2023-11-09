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


const UpdateScreen = ({ route, navigation }) => {
  
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

  

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    const loadHikeDetails = async () => {
      if (route.params?.id) {
        try {
          const details = await Database.getHikeById(route.params.id);
          if (details) {
            setHikeDetails({
              ...details,
              selectedDate: new Date(details.selectedDate),
            });
          } else {
            Alert.alert("Error", "Hike details not found.");
            navigation.goBack();
          }
        } catch (error) {
          console.error("Error fetching hike details:", error);
          Alert.alert("Error", "Unable to load hike details");
        }
      }
    };

    loadHikeDetails();
  }, [route.params?.id]);

  const handleSave = async () => {
    try {
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
      Alert.alert("Success", "Hike details updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating hike:", error);
      Alert.alert("Error", "Failed to update hike");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setHikeDetails({ ...hikeDetails, selectedDate: date });
    hideDatePicker();
  };

  const handleChange = (name, value) => {
    setHikeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <View>
      <Image
        style={styles.imageBackground}
        src="https://images.unsplash.com/photo-1643779375188-48de1ff2eb10?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <View>
        <Text style={styles.title}>Update</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.text}>Name of the hike</Text>
          <TextInput
            style={styles.input}
            value={hikeDetails.hikeName}
            onChangeText={(text) => handleChange("hikeName", text)}
          />
        </View>

        <View>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.input}
            value={hikeDetails.location}
            onChangeText={(text) => handleChange("location", text)}
          />
        </View>

        <View>
          <Text style={styles.text}>Date of the hike</Text>
          

          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={styles.date}>{hikeDetails.selectedDate.toLocaleDateString()} </Text>
        </TouchableOpacity>
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

        <View>
          <Text style={styles.text}>Length of the hike</Text>
          <TextInput
            style={styles.input}
            value={hikeDetails.length}
            onChangeText={(text) => handleChange("length", text)}
            keyboardType="numeric"
          />
        </View>

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

        <View>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.description}
            value={hikeDetails.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            title="Save Changes"
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton}>
            <Text
              style={styles.navButtonText}
              onPress={() => navigation.navigate("Form")}
            >
              Add
            </Text>
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

export default UpdateScreen;
