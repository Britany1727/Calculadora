import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";

const CalculatorApp = () => {
  const [display, setDisplay] = useState("");
  const [resultado, setResultado] = useState("");

  const a = (valor: string) => {
    if (valor === ".") {
      if (display === "") {
        setDisplay("0.");
        return;
      }
      const partes = display.split(/([+\-x÷])/);
      const uP = partes[partes.length - 1];
      if (uP.includes(".")) {
        return;
      }
    }
    setDisplay(display + valor);
  };

  const clear = async () => {
    setDisplay("");
    setResultado("");
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const del = async () => {
    setDisplay(display.slice(0, -1));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const changeSign = () => {
    if (!display) return;

    const p = display.split(/([+\-x÷])/);
    let lastPart = p[p.length - 1];

    if (!lastPart || isNaN(Number(lastPart))) return;

    if (lastPart.startsWith("-")) {
      lastPart = lastPart.slice(1);
    } else {
      lastPart = "-" + lastPart;
    }

    p[p.length - 1] = lastPart;
    setDisplay(p.join(""));
  };

  const fN = (title: string) => {
    if (!title) return "";
    return title.replace(/\d+/g, (num) => {
      return Number(num).toLocaleString("es-EC");
    });
  };

  const calculate = async () => {
    try {
      const expr = display
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      const result = eval(expr);
      setResultado(result.toString());
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setResultado("Error");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
      <Text style={{ fontSize: 50, color: "white", textAlign: "right" }}>
        {fN(display) || "0"}
      </Text>

      <Text style={{ fontSize: 50, color: "white", textAlign: "right" }}>
        {fN(resultado)}
      </Text>

      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="C"   onPress={clear}           color="#a3a3a3" />
          <Button title="±"   onPress={changeSign}       color="#a3a3a3" />
          <Button title="del" onPress={del}              color="#a3a3a3" />
          <Button title="÷"   onPress={() => a("÷")}     color="#ffbb27" />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="7" onPress={() => a("7")} />
          <Button title="8" onPress={() => a("8")} />
          <Button title="9" onPress={() => a("9")} />
          <Button title="x" onPress={() => a("x")} color="#ffbb27" />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="4" onPress={() => a("4")} />
          <Button title="5" onPress={() => a("5")} />
          <Button title="6" onPress={() => a("6")} />
          <Button title="-" onPress={() => a("-")} color="#ffbb27" />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="1" onPress={() => a("1")} />
          <Button title="2" onPress={() => a("2")} />
          <Button title="3" onPress={() => a("3")} />
          <Button title="+" onPress={() => a("+")} color="#ffbb27" />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="0" onPress={() => a("0")} />
          <Button title="." onPress={() => a(".")} />
          <Button title="=" onPress={calculate}    color="#ffbb27" />
        </View>
      </View>
    </View>
  );
};

export default CalculatorApp;