import React, { useContext, useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import AppContext from "../contexts/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DropDownList2() {
  const myTheme = require("../themes/dark/index");
  DropDownPicker.addTheme("MyThemeName", myTheme);
  DropDownPicker.setTheme("MyThemeName");

  const [open, setOpen] = useState(false);
  const { value2, setValue2 } = useContext(AppContext);
  const [items, setItems] = useState([
    { label: "Яндекс карты", value: "yandex-maps" },
    { label: "2ГИС", value: "dgis" },
    { label: "Google карты", value: "google-maps" },
  ]);

  async function data() {
    const data = await AsyncStorage.getItem("Provider", setValue2(value2));
    if (data !== null) {
      setValue2(data);
    }
  }

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("Provider", value2);
    console.log(`${value2}  setitem`);
  }, [value2]);

  return (
    <DropDownPicker
      style={{
        zIndex: 0,
        color: "#FAEBD7",
        marginTop: 5,
        borderWidth: 1,
        backgroundColor: "#182533",
        borderColor: "#17312b",
      }}
      dropDownContainerStyle={{
        width: "100%",
        color: "#FAEBD7",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        borderColor: "#17312b",
      }}
      theme="MyThemeName"
      placeholder={value2}
      open={open}
      value={value2}
      items={items}
      setOpen={setOpen}
      setValue={setValue2}
      setItems={setItems}
    />
  );
}
