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

const MAX_QUANTITY = 99;

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");
  const [submitting, setSubmitting] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  const quantityNum = Math.max(1, Number(quantity) || 1);
  const canCreate = name.trim().length > 0 && !submitting;

  const handleQuantityChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, "");
    if (digits === "") {
      setQuantity("");
      return;
    }
    setQuantity(String(Math.min(MAX_QUANTITY, Number(digits))));
  };

  const step = (delta: number) => {
    setQuantity((prev) => {
      const next = Math.max(
        1,
        Math.min(MAX_QUANTITY, (Number(prev) || 1) + delta),
      );
      return String(next);
    });
  };

  const createItem = async () => {
    if (!canCreate) return;

    setSubmitting(true);
    try {
      await addItem({
        name: name.trim(),
        category,
        priority,
        quantity: quantityNum,
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
      className="rounded-3xl border border-green-800/10 bg-white p-4 mb-4"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-1.5">
        <FontAwesome6 name="tag" size={11} color="#166534" />
        <Text className="text-sm font-semibold text-green-900">Item name</Text>
      </View>
      <View
        className={`mt-2 flex-row items-center rounded-2xl border bg-green-50 px-4 py-3 ${
          nameFocused ? "border-green-700" : "border-green-800/10"
        }`}
      >
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
        <TextInput
          value={name}
          onChangeText={setName}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          placeholder="Ex: Blueberries"
          className="ml-3 flex-1 text-base text-green-900"
          placeholderTextColor="#8aa397"
          returnKeyType="done"
        />
      </View>

      <View className="mt-4 flex-row items-center gap-1.5">
        <FontAwesome6 name="hashtag" size={11} color="#166534" />
        <Text className="text-sm font-semibold text-green-900">Quantity</Text>
      </View>
      <View className="mt-2 flex-row items-center gap-2">
        <Pressable
          onPress={() => step(-1)}
          disabled={quantityNum <= 1}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-2xl border border-green-800/10 bg-green-50 active:opacity-70"
        >
          <FontAwesome6
            name="minus"
            size={12}
            color={quantityNum <= 1 ? "#a9bfb1" : "#166534"}
          />
        </Pressable>

        <View className="flex-1 items-center justify-center rounded-2xl border border-green-800/10 bg-green-50 py-3">
          <TextInput
            value={quantity}
            onChangeText={handleQuantityChange}
            onBlur={() => {
              if (!quantity) setQuantity("1");
            }}
            keyboardType="number-pad"
            placeholder="1"
            placeholderTextColor="#8aa397"
            className="w-full text-center text-base font-semibold text-green-900"
          />
        </View>

        <Pressable
          onPress={() => step(1)}
          disabled={quantityNum >= MAX_QUANTITY}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-2xl border border-green-800/10 bg-green-50 active:opacity-70"
        >
          <FontAwesome6
            name="plus"
            size={12}
            color={quantityNum >= MAX_QUANTITY ? "#a9bfb1" : "#166534"}
          />
        </Pressable>
      </View>

      <View className="mt-4 flex-row items-center gap-1.5">
        <FontAwesome6 name="layer-group" size={11} color="#166534" />
        <Text className="text-sm font-semibold text-green-900">Category</Text>
      </View>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;
          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-4 py-2 active:opacity-80 ${
                active
                  ? "bg-green-800"
                  : "border border-green-800/15 bg-green-50"
              }`}
            >
              <FontAwesome6
                name={categoryIcons[option]}
                size={12}
                color={active ? "#f0fdf4" : "#486856"}
              />
              <Text
                className={`ml-2 text-sm font-semibold ${
                  active ? "text-green-50" : "text-green-800"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center gap-1.5">
        <FontAwesome6 name="signal" size={11} color="#166534" />
        <Text className="text-sm font-semibold text-green-900">Priority</Text>
      </View>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2.5 active:opacity-80 ${
                active
                  ? "bg-green-800"
                  : "border border-green-800/15 bg-green-50"
              }`}
            >
              <FontAwesome6
                name={priorityIcons[option]}
                size={12}
                color={active ? "#f0fdf4" : "#486856"}
              />
              <Text
                className={`text-sm font-semibold capitalize ${
                  active ? "text-green-50" : "text-green-800"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3.5 active:opacity-90 ${
          canCreate ? "bg-green-800" : "bg-green-800/20"
        }`}
        style={
          canCreate
            ? {
                shadowColor: "#14532d",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              }
            : undefined
        }
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

      {!canCreate && !submitting && name.trim().length === 0 ? (
        <Text className="mt-2 text-center text-xs text-green-800/40">
          Enter an item name to continue
        </Text>
      ) : null}

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
