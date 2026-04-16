import * as Haptics from "expo-haptics";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    color?: string;
};

const Button = ({ title, onPress, color = "#666666" }: ButtonProps) => {
    const hPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
};

return (
    <TouchableOpacity
        onPress={hPress}
        style={{
            backgroundColor: color,
            padding: 20,
            borderRadius: 40,
            flex: 1,
            margin: 5,
    }}
    >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            {title}
        </Text>
    </TouchableOpacity>
    );
};

export default Button;