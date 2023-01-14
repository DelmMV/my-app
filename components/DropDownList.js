import React, { useContext, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import AppContext from "../contexts/AppContext";

export default function DropDownList() {
  const myTheme = require("../themes/dark/index");
  DropDownPicker.addTheme("MyThemeName", myTheme);
  DropDownPicker.setTheme("MyThemeName");

  const [open, setOpen] = useState(false);
  const { value, setValue } = useContext(AppContext);
  const [items, setItems] = useState([
    { label: "Все заказы", value: null },
    { label: "Потвержден", value: 5 },
    { label: "На доставке", value: 6 },
    { label: "Получен", value: 7 },
    { label: "Новый", value: 12 },
  ]);
  return (
    <DropDownPicker
      style={{
        zIndex: 0,
        color: "#FAEBD7",
        width: "95%",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        borderWidth: 1,
        backgroundColor: "#182533",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "#17312b",
      }}
      dropDownContainerStyle={{
        width: "95%",
        color: "#FAEBD7",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        borderColor: "#17312b",
      }}
      theme="MyThemeName"
      placeholder="Все заказы"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
