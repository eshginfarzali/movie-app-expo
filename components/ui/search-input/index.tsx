import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchInputProps {
  query: string;
  setQuery: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  return (
    <View style={styles.inputContainer}>
      <TabBarIcon
        name={"search"}
        color={Colors.secendaryText}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        placeholderTextColor={Colors.searchText}
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.searchText,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.card_background,
    paddingLeft: 40,
  },
  input: {
    flex: 1,
    padding: 13,
    color: Colors.text,
    backgroundColor: "transparent",
  },
  icon: {
    position: "absolute",
    left: 10,
  },
});
