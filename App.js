import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/Ionicons";

const statusBarHeight = StatusBar.currentHeight;
const KEY_GPT = "sua chave";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState("");
  const [city, setCity] = useState();
  const [days, setDays] = useState(3);

  async function handleGenerate() {
    if (city === "") {
      Alert.alert("Atenção", "Preencha o nome da cidade");
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Crie um roteiro para uma viagem de exatos ${days.toFixed(0)} dias na cidade de ${city},
    busque por lugares turisticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite
    o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1
      }),
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#f1f1f1" />
      <Text style={styles.heading}>Roteiro fácil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Qual cidade é o seu destino?</Text>
        <TextInput
          placeholder="Ex: Niteroi, Rj"
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Text style={styles.label}>
          Tempo de estadia: <Text>{days.toFixed(0)}</Text> dias
        </Text>
        <Slider
          minimumValue={1}
          maximumValue={7}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000"
          value={days}
          onValueChange={(value) => setDays(value)}
        />
      </View>
      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar roteiro</Text>
        <MaterialIcons name="search" size={24} color="#fff" />
      </Pressable>
      <ScrollView
        style={styles.scrollWrapped}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Carregando o roteiro</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}
        {travel && (
          <View style={styles.content}>
            <Text style={styles.title}>Roteiro da viagem</Text>
            <Text>{travel}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? statusBarHeight : 54,
  },
  form: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#94a3n8",
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff5656",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  scrollWrapped: {
    width: "90%",
    marginTop: 10,
  },
  content: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
});
