import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem) {
      const newShoppingList = [
        { id: new Date().toString(), name: newItem },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setNewItem("");
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          placeholder="Add a new item..."
          style={styles.textInput}
          value={newItem}
          onChangeText={setNewItem}
          // keyboardType="email-address"
          returnKeyType="done"
          onSubmitEditing={handleAddItem}
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      data={shoppingList}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 50,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
});
