import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
    return (
        <View>
            <Text>Sign In</Text>
            <Link href="/">
                <Text>Go to /</Text>
            </Link>

            <Link href="/signup">
                <Text>Go to /signup</Text>
            </Link>
        </View>
    )
}