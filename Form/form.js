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

const FormScreen = ({ navigation }) => {
  //Create useState to store input value
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [parkingAvailable, setParkingAvailable] = useState("yes");
  const [length, setLength] = useState("");
  const [difficulty, setDifficulty] = useState("High");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const initDB = async () => {
      try {
        await Database.initDatabase();
        console.log("Database initialized");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDB();
  }, []);
  const handleAddHike = async () => {
    const originalDate = new Date(dateTime);
    console.log(originalDate);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;


    if (
      !name ||
      !location ||
      !formattedDate ||
      !parkingAvailable ||
      !length ||
      !difficulty ||
      !description
    ) {
      Alert.alert("Error", "All required fields must be filled ");
      return;
    }

    try {
      const insertId = await Database.addHike(
        name,
        location,
        formattedDate,
        parkingAvailable,
        length,
        difficulty,
        description
      );

      console.log("Hike added with ID:", insertId);
      setName("");
      setLocation("");
      setDateTime(new Date());
      setParkingAvailable("yes");
      setLength("");
      setDifficulty("High");
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

  return (
    <View>
      <Image
        style={styles.imageBackground}
        src="https://th.bing.com/th/id/OIG.J5_PmGQi8aC.psciAXxX?pid=ImgGn"
      />
      <View>
        <Text style={styles.title}>Add New Hike</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.text}>Name of the hike</Text>
          <TextInput
            style={styles.input}
            placeholder="Son Dong"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Quang Binh"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View>
          <Text style={styles.text}>Date of the hike</Text>
          <TextInput
            style={styles.input}
            placeholder="21/01/2020"
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

        <View>
          <TouchableOpacity style={styles.button} onPress={handleAddHike}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

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

export default FormScreen;
