import { CoinsList } from "@/constants/coins";
import { api } from "@/config/api";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { createNumberMask } from "react-native-mask-input";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as S from "./styles";

type CoinsListType = {
  label: string;
  value: string;
  icon: any;
};

const coinsListTypeInitialState = {
  label: "",
  value: "",
  icon: undefined,
};

const currencyMask = createNumberMask({
  delimiter: ".",
  separator: ",",
  precision: 2,
});

export default function Home() {
  const [fromInputIsFocus, setFromInputIsFocus] = useState(false);
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputIsFocus, setToInputIsFocus] = useState(false);
  const [toInputValue, setToInputValue] = useState("");
  const insets = useSafeAreaInsets();
  const [fromItem, setFromItem] = useState<CoinsListType>(
    coinsListTypeInitialState
  );
  const [toItem, setToItem] = useState<CoinsListType>(
    coinsListTypeInitialState
  );

  const getLocale = () => {
    switch (toItem.label) {
      case "BRL":
        return "pt-BR";
      case "USD":
        return "en-US";
      default:
        "pt-BR";
    }
  };

  const formatAmount = (amount: number) => {
    const result = amount.toLocaleString(getLocale(), {
      style: "currency",
      currency: toItem.label,
    });

    return result;
  };

  const doConversion = async () => {
    const { data } = await api.get(`/${fromItem.label}-${toItem.label}`);
    const rateKey = `${fromItem.label}${toItem.label}`;
    const rate = parseFloat(data[rateKey].bid);
    const amount = parseFloat(fromInputValue) * rate;
    const formattedAmount = formatAmount(amount);
    setToInputValue(formattedAmount);
  };

  const renderItem = (item: CoinsListType) => {
    return (
      <View
        style={{
          padding: 17,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image source={item.icon} />
        <Text style={{ flex: 1, fontSize: 16 }}>{item.label}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#f3f1f9", "#e7e1ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 2 }}
    >
      <SafeAreaView style={{ flexDirection: "column", alignItems: "center" }}>
        <S.Header>
          <Image
            style={{ width: 160 }}
            source={require("../assets/images/exchange-logo.png")}
          />
        </S.Header>
        <S.Body>
          <S.TextWrapper>
            <S.Title>Conversor de moedas</S.Title>
            <S.Description>
              Digite o valor escolha as moedas de conversão
            </S.Description>
          </S.TextWrapper>
          <S.InputWrapper>
            <S.InputBox>
              <S.FromInput
                value={fromInputValue}
                placeholder={fromItem.value}
                mask={currencyMask}
                onChangeText={(unmasked) => {
                  setFromInputValue(unmasked);
                }}
                keyboardType="numeric"
              />
              <View
                style={{
                  width: 2,
                  height: 25,
                  backgroundColor: "#94a3b8",
                  alignSelf: "center",
                }}
              ></View>
              <Dropdown
                style={{ width: 110, paddingHorizontal: 5 }}
                data={CoinsList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholderStyle={{ fontSize: 14 }}
                placeholder={!fromInputIsFocus ? "Selecione" : "..."}
                searchPlaceholder="Search..."
                value={fromItem.value}
                showsVerticalScrollIndicator={true}
                onFocus={() => setFromInputIsFocus(true)}
                onBlur={() => setFromInputIsFocus(false)}
                activeColor="#EDE9FE"
                onChange={(item) => {
                  setFromItem(item);
                }}
                onChangeText={() => setToInputValue("")}
                renderItem={renderItem}
                renderLeftIcon={() => (
                  <Image style={{ marginRight: 10 }} source={fromItem.icon} />
                )}
              />
            </S.InputBox>
            <Image source={require("../assets/images/arrows-exchange.png")} />
            <S.InputBox>
              <S.ToInput>{toInputValue}</S.ToInput>
              <View
                style={{
                  width: 2,
                  height: 25,
                  backgroundColor: "#94a3b8",
                  alignSelf: "center",
                }}
              ></View>
              <Dropdown
                style={{ width: 110, paddingHorizontal: 5 }}
                data={CoinsList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!toInputIsFocus ? "Selecione" : "..."}
                searchPlaceholder="Search..."
                placeholderStyle={{ fontSize: 14 }}
                value={toItem.value}
                onFocus={() => setToInputIsFocus(true)}
                onBlur={() => setToInputIsFocus(false)}
                showsVerticalScrollIndicator={true}
                activeColor="#EDE9FE"
                confirmSelectItem
                closeModalWhenSelectedItem
                onConfirmSelectItem={(item) => {
                  if (item.value === fromItem.value) {
                    Alert.alert("Não é possível comparar mesmas moedas");
                    return;
                  } else {
                    setToItem(item);
                  }
                }}
                onChange={(item) => {
                  setToItem(item);
                }}
                renderItem={renderItem}
                renderLeftIcon={() => (
                  <Image style={{ marginRight: 10 }} source={toItem.icon} />
                )}
              />
            </S.InputBox>
          </S.InputWrapper>
        </S.Body>
      </SafeAreaView>
      <S.ConvertButton
        onPress={doConversion}
        style={{
          marginTop: "auto",
          height: insets.bottom + 50,
          alignSelf: "center",
          backgroundColor: "#cabff5",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <S.ConvertText>Converter</S.ConvertText>
      </S.ConvertButton>
    </LinearGradient>
  );
}
