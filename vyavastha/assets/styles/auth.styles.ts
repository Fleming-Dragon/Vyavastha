import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoStyles: {
    height: 200,
    width: 300,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  authFormContainerMultipleTextInFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  inputContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
  },
  container: {
    padding: 20,
    marginTop: "auto",
  },
  button: {
    backgroundColor: "black",
    margin: 4,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  containerTop: {
    alignItems: "center",
  },
  linkText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    flex: 1,
    justifyContent: "center",
  },
  showPassBox: {
    flex: 1,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  showPassBoxText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: 600,
  },
  errorContainer: {
    marginVertical: 4,
    padding: 8,
    backgroundColor: "#ffe0e0",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
