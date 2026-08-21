import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const categories: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Bakery",
  "Pantry",
  "Snacks",
];
const priorities: GroceryPriority[] = ["low", "medium", "high"];

const categoryIcons = {
  Produce: "leaf",
  Dairy: "cow",
  Bakery: "bread-slice",
  Pantry: "box-open",
  Snacks: "cookie-bite",
};

const priorityIcons = {
  high: "bolt",
  medium: "compass",
  low: "seedling",
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");
  const [submitting, setSubmitting] = useState(false);

  const canCreate = name.trim().length > 0 && !submitting;

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ""));
  };

  const createItem = async () => {
    if (!canCreate) return;

    setSubmitting(true);
    try {
      await addItem({
        name: name.trim(),
        category,
        priority,
        quantity: Math.max(1, Number(quantity) || 1),
      });

      setName("");
      setQuantity("1");
      setCategory("Produce");
      setPriority("medium");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      className="rounded-3xl border border-green-800/10 bg-white p-4"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
      }}
    >
      {/* NAME */}
      <Text className="text-sm font-semibold text-green-900">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-green-800/10 bg-green-50 px-3 py-2.5">
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Blueberries"
          className="ml-3 flex-1 text-base text-green-900"
          placeholderTextColor="#8aa397"
          returnKeyType="done"
        />
      </View>

      {/* QUANTITY */}
      <Text className="mt-4 text-sm font-semibold text-green-900">
        Quantity
      </Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-green-800/10 bg-green-50 px-3 py-2.5">
        <FontAwesome6 name="hashtag" size={13} color="#5b7567" />
        <TextInput
          value={quantity}
          onChangeText={handleQuantityChange}
          onBlur={() => {
            if (!quantity) setQuantity("1");
          }}
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#8aa397"
          className="ml-3 flex-1 text-base text-green-900"
        />
      </View>

      {/* CATEGORY */}
      <Text className="mt-4 text-sm font-semibold text-green-900">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;
          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-3 py-1.5 active:opacity-80 ${
                active ? "bg-green-800" : "bg-green-100"
              }`}
            >
              <FontAwesome6
                name={categoryIcons[option]}
                size={11}
                color={active ? "#f0fdf4" : "#486856"}
              />
              <Text
                className={`ml-1.5 text-xs font-semibold ${
                  active ? "text-green-50" : "text-green-700"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PRIORITY */}
      <Text className="mt-4 text-sm font-semibold text-green-900">
        Priority
      </Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl py-2 active:opacity-80 ${
                active ? "bg-green-800" : "bg-green-100"
              }`}
            >
              <FontAwesome6
                name={priorityIcons[option]}
                size={11}
                color={active ? "#f0fdf4" : "#486856"}
              />
              <Text
                className={`text-xs font-semibold capitalize ${
                  active ? "text-green-50" : "text-green-700"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* SUBMIT */}
      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 active:opacity-90 ${
          canCreate ? "bg-green-800" : "bg-green-800/20"
        }`}
        onPress={createItem}
        disabled={!canCreate}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#f0fdf4" />
        ) : (
          <>
            <FontAwesome6
              name="plus"
              size={14}
              color={canCreate ? "#f0fdf4" : "#7a9386"}
            />
            <Text
              className={`ml-2 text-base font-semibold ${
                canCreate ? "text-green-50" : "text-green-800/50"
              }`}
            >
              Add to Grocery List
            </Text>
          </>
        )}
      </Pressable>

      {error ? (
        <View className="mt-3 flex-row items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2.5">
          <FontAwesome6 name="triangle-exclamation" size={12} color="#dc2626" />
          <Text className="flex-1 text-sm font-medium text-red-600">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PlannerFormCard;
