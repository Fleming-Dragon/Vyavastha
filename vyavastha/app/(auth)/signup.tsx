import { styles } from "@/assets/styles/auth.styles";
import { userSchema, UserSchemaTypes } from "@/utils/zod";
import { Checkbox } from "expo-checkbox";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as z from "zod";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<UserSchemaTypes>({
    fName: "",
    lName: "",
    email: "",
    pass: "",
    cPass: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserSchemaTypes, string>>
  >({});

  useEffect(() => {
    setErrors({});
  }, []);

  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      setErrors({});
      setLoading(true);
      userSchema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      Alert.alert("Success!", "User registered successfully!");
      setFormData({
        fName: "",
        lName: "",
        email: "",
        pass: "",
        cPass: "",
      });
    } catch (error: any) {
      console.error(error);
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof UserSchemaTypes, string>> = {};
        error.errors.forEach((err: any) => {
          const field = err.path[0] as keyof UserSchemaTypes;
          if (field) fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "android" ? 0 : 100}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <Image
              style={styles.logoStyles}
              source={require("@/assets/images/logo.png")}
            />
            <Text style={styles.title}>Getting Started with Vyavastha! 🥳</Text>
            <Text style={styles.subTitle}>
              Alright, Now Let&apos;s Get to Know You!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.authFormContainerMultipleTextInFlex}>
              <TextInput
                autoCapitalize="none"
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                value={formData.fName}
                placeholder="First Name"
                onChangeText={(fName) => {
                  setFormData({ ...formData, fName });
                }}
              />
              <TextInput
                autoCapitalize="none"
                style={[styles.input, { flex: 1 }]}
                value={formData.lName}
                placeholder="Last Name"
                onChangeText={(lName) => {
                  setFormData({ ...formData, lName });
                }}
              />
            </View>
            {errors.fName && (
              <Text style={styles.errorText}>{errors.fName}</Text>
            )}
            {errors.lName && (
              <Text style={styles.errorText}>{errors.lName}</Text>
            )}
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              value={formData.email}
              placeholder="Enter Email"
              onChangeText={(email) => {
                setFormData({ ...formData, email });
              }}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              value={formData.pass}
              placeholder="Enter Password"
              onChangeText={(pass) => {
                setFormData({ ...formData, pass });
              }}
              secureTextEntry={!isChecked}
            />
            {errors.pass && <Text style={styles.errorText}>{errors.pass}</Text>}
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              value={formData.cPass}
              placeholder="Confirm Password"
              onChangeText={(cPass) => {
                setFormData({ ...formData, cPass });
              }}
              secureTextEntry={!isChecked}
            />
            {errors.cPass && (
              <Text style={styles.errorText}>{errors.cPass}</Text>
            )}
          </View>
          <View style={styles.showPassBox}>
            <Checkbox
              value={isChecked}
              disabled={loading}
              onValueChange={() => setIsChecked(!isChecked)}
              color={isChecked ? "#004abf" : undefined}
            />
            <Text style={styles.showPassBoxText}>Show Password</Text>
          </View>
          {errorMsg && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{`ERROR: ${errorMsg}`}</Text>
            </View>
          )}
          <View>
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <Text>
              Don&apos;t have an account?{" "}
              <Link href="/signin">
                <Text style={styles.linkText}>Sign in</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
