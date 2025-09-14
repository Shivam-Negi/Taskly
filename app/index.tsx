import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialItems: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialItems);
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
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new item..."
        style={styles.textInput}
        value={newItem}
        onChangeText={setNewItem}
        // keyboardType="email-address"
        returnKeyType="done"
        onSubmitEditing={handleAddItem}
      />
      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 50,
    fontSize: 18,
  },
});
