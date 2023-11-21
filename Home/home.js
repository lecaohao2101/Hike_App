// Import necessary React components and libraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Database from "../Database/Database";
import styles from "./style";

// Define the HomeScreen component
const HomeScreen = ({ navigation }) => {
  // State variables to store data
  const [hikes, setHikes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredHikes, setFilteredHikes] = useState([]);

  // Function to load hikes from the database
  const loadHikes = async () => {
    try {
      const allHikes = await Database.getHikes();
      setHikes(allHikes);
      setFilteredHikes(allHikes);
    } catch (error) {
      console.error("Error fetching hikes:", error);
      Alert.alert("Error", "Unable to load hikes");
    }
  };

  // useEffect and useFocusEffect hooks to load hikes on component mount and focus
  useEffect(() => {
    loadHikes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadHikes();
    }, [])
  );

  // Function to handle search functionality
  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = hikes.filter((item) => {
        const itemData = item.hikeName.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredHikes(newData);
    } else {
      setFilteredHikes(hikes);
    }
  };

  // Function to delete all hikes
  const deleteAllHikes = async () => {
    try {
      await Database.deleteAllHike();
      setHikes([]);
      setFilteredHikes([]);
      Alert.alert("Success", "All hikes have been deleted.");
    } catch (error) {
      console.error("Error deleting all hikes:", error);
      Alert.alert("Error", "Failed to delete all hikes");
    }
  };

  // Function to delete a specific hike
  const deleteHike = async (hikeId) => {
    try {
      await Database.deleteHike(hikeId);
      const newHikesList = hikes.filter((hike) => hike.id !== hikeId);
      setHikes(newHikesList);
      setFilteredHikes(newHikesList);
      Alert.alert("Success", "Hike successfully deleted");
    } catch (error) {
      console.error("Error deleting hike:", error);
      Alert.alert("Error", "Failed to delete hike");
    }
  };

  // Function to navigate to the edit screen
  const editHike = (hikeId) => {
    navigation.navigate("Update", { id: hikeId });
  };

  // Function to render each hike item in the FlatList
  const renderHikeItem = ({ item }) => {
    const date = new Date(item.selectedDate).toDateString();
    return (
      <View style={styles.hikeItem}>
        <Text style={styles.Text}>Name of the hike: {item.hikeName}</Text>
        <Text style={styles.Text}>Location: {item.location}</Text>
        <Text style={styles.Text}>Date of the hike: {date}</Text>
        <Text style={styles.Text}>
          Parking available: {item.parkingAvailable}
        </Text>
        <Text style={styles.Text}>Length: {item.length}</Text>
        <Text style={styles.Text}>Difficulty levels: {item.difficulty}</Text>
        <Text style={styles.Text}>Description: {item.description}</Text>

        <View style={styles.button}>
          <Button
            title="Update"
            color="green"
            onPress={() => editHike(item.id)}
          />

          <Button
            title="Delete"
            color="red"
            onPress={() => deleteHike(item.id)}
          />
        </View>
      </View>
    );
  };

  // JSX rendering of the HomeScreen component
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        style={styles.imageBackground}
        src="https://th.bing.com/th/id/OIG.J5_PmGQi8aC.psciAXxX?pid=ImgGn"
      />

      {/* Title */}
      <View>
        <Text style={styles.title}>Home</Text>
      </View>

      {/* Search and Delete All Hikes Section */}
      <View style={styles.searchDeleteAll}>
        {/* Search Input */}
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search hikes..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Delete All Hikes Button */}
        <View style={styles.deleteAll}>
          <Button
            title="Delete All Hikes"
            color="red"
            onPress={deleteAllHikes}
          />
        </View>
      </View>

      {/* FlatList to display hikes */}
      <FlatList
        data={filteredHikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

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
  );
};

// Export the HomeScreen component for use in other modules.
export default HomeScreen;
