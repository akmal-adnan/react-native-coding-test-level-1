import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FormInput from "../components/FormInput";

const ContactScreen = ({ setScreen }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [emailError, setEmailError] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDate = (date) => {
    console.log("A date has been picked: ", date);

    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let finalDate = dt + " / " + month + " / " + year;
    console.log(finalDate);
    setBirthday(finalDate);
    hideDatePicker();
  };

  const isValid = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  };

  const validate = (value) => {
    if (value == "") {
      setEmailError("");
    } else if (isValid(value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid Email");
    }
  };

  const pressSubmit = () => {
    var validation = true;

    if (!name) {
      validation = false;
    }

    if (!birthday) {
      validation = false;
    }

    if (!email) {
      validation = false;
    }

    if (emailError) {
      validation = false;
    }

    if (!name) {
      validation = false;
    }

    if (!validation) {
      Alert.alert("Please fill out all required fields.", null, [
        { text: "OK" },
      ]);
      return;
    } else {
      Alert.alert(
        "Success",
        `Name: ${name} ${"\n"} Email: ${email} ${"\n"} Birthday: ${birthday}`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Form Screen</Text>
      <Button title="Go to Main Screen" onPress={() => setScreen("main")} />

      <FormInput
        labelStyle={styles.form__label}
        inputStyle={styles.text__placeholder}
        containerStyle={styles.input__container}
        textInputStyle={styles.textinput__message}
        maxLength={50}
        charCount={name.length}
        label="Name"
        placeholder="John Doe"
        onChange={(value) => {
          setName(value);
        }}
        value={name}
      />

      <FormInput
        labelStyle={styles.form__label}
        inputStyle={styles.text__placeholder}
        containerStyle={styles.input__container}
        textInputStyle={styles.textinput__message}
        label="Email"
        placeholder="abc@email.com"
        onChange={(value) => {
          validate(value);
          setEmail(value);
        }}
        value={email}
        errorMsg={emailError}
      />

      <FormInput
        labelStyle={styles.form__label}
        inputStyle={styles.text__placeholder}
        containerStyle={styles.input__container}
        textInputStyle={styles.textinput__message}
        label="Birthday"
        placeholder="10 / 1 / 2023"
        editable={false}
        onChange={(value) => {
          setBirthday(value);
        }}
        value={birthday}
        appendComponent={
          <TouchableOpacity
            style={styles.date__button}
            onPress={showDatePicker}
          >
            <Text style={{ color: "white" }}>Pick Date</Text>
          </TouchableOpacity>
        }
      />

      <Pressable
        onPress={() => pressSubmit()}
        style={({ pressed }) => styles.submit__button(pressed)}
      >
        <Text style={{ fontSize: 16 }}>SUBMIT</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDate}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        display={Platform.OS === "ios" ? "inline" : "calendar"}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  form__label: {
    color: "black",
  },

  textinput__message: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 7,
    borderRadius: 8,
    backgroundColor: "#E8EBF2",
    borderColor: "#8EA0AA",
    borderWidth: 1.5,
    height: 45,
  },

  input__container: {
    paddingHorizontal: 16,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },

  text__placeholder: {
    textAlignVertical: "center",
    paddingVertical: 5,
    color: "#000000",
  },

  submit__button: (pressed) => ({
    backgroundColor: pressed ? "blue" : "skyblue",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 35,
  }),

  date__button: {
    justifyContent: "center",
    backgroundColor: "#8EA0AA",
    padding: 10,
    marginRight: -10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
