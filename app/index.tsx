import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem) {
      const newShoppingList = [
        {
          id: new Date().toString(),
          name: newItem,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setNewItem("");
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
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
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimestamp)}
        />
      )}
    ></FlatList>
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
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
