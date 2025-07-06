import "@/app/global.css";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

const SafeScreen = ({ children }: Props) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      className="bg-red-600"
      style={{
        paddingTop: inset.top,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;