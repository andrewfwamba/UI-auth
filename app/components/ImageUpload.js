import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import client from "../api/client";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import UploadProgress from "./UploadProgress";
import { useLogin } from "../context/LoginProvider";
// import { Getuserdetails } from "../utilities/getuserdetails";
// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("db.Userdbs"); // returns Database object

const ImageUpload = (props) => {
  const { setIsLoggedIn } = useLogin();

  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState("");
  const route = useRoute();
  const [progress, setProgress] = useState(0);
  const { token } = route.params;
  // const user = Getuserdetails();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry we need camera roll permission to make this work");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });
    try {
      const res = await client.post("/upload-profile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${token}`,
        },
        onUploadProgress: ({ loaded, total }) => setProgress(loaded / total),
      });
      console.log(res.data);
      if (res.data.success) {
        // updateurl(res.data.avatar);

        Alert.alert("", "Profile uploaded successfully");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={openImageLibrary}
            style={styles.uploadBtnContainer}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>
          {/* {progress ? <Text>{progress}</Text> : null} */}
          <Text style={styles.skip}>Skip</Text>
          {profileImage ? (
            <Text
              onPress={uploadProfileImage}
              style={[
                styles.skip,
                {
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: 8,
                  elevation: 3,
                },
              ]}
            >
              Upload
            </Text>
          ) : null}
        </View>
      </View>
      {progress ? <UploadProgress progress={progress} /> : null}
    </>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});
