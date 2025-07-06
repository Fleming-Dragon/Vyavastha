import API from "@/utils/axios";
import { BASE_API } from "@/utils/constants";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthRoutesLayout() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await API.get(`${BASE_API}/verify-token`);
        setToken(res.data?.token);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (token) return <Redirect href={"/"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
