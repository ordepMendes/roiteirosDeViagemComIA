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
} from "react-native";
import MaterialIcons from "@expo/vector-icons/Ionicons";

const statusBarHeight = StatusBar.currentHeight;

export default function App() {
  const [] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#f1f1f1" />
      <Text style={styles.heading}>Roteiro fácil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Qual cidade é o seu destino?</Text>
        <TextInput placeholder="Ex: Niteroi, Rj" style={styles.input} />
        <Text style={styles.label}>
          Tempo de estadia: <Text>10</Text> dias
        </Text>
        <Slider
          minimumValue={1}
          maximumValue={7}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000"
        />
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Gerar roteiro</Text>
        <MaterialIcons name="search" size={24} color="#fff" />
      </Pressable>
      <ScrollView style={styles.scrollWrapped} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 24}}>
        <View style={styles.content}>
          <Text style={styles.title}>Roteiro da viagem</Text>
          <Text>Aqui vai ser o roteiro completo...</Text>
        </View>
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
    width: '90%',
    marginTop: 10
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
    textAlign: 'center',
    marginBottom: 14
  },
});
