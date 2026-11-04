import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";



// Dados fictícios: nenhuma conversa é carregada de um servidor.
import { CHATS } from "./data/data";
import ChatItem from "./components/ChatItem";

const FILTERS = ["Todas", "Não lidas", "Favoritos", "Grupos"];


export default function App() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedTab, setSelectedTab] = useState("Conversas");

  // Atualiza a lista quando a pessoa digita ou escolhe um filtro.
  const filteredChats = useMemo(() => {
    const query = search.trim().toLowerCase();

    return CHATS.filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(query) ||
        chat.message.toLowerCase().includes(query);

      let matchesFilter = true;
      if (selectedFilter === "Não lidas") matchesFilter = chat.unread > 0;
      if (selectedFilter === "Grupos") matchesFilter = Boolean(chat.group);
      // "Favoritos" é apenas visual nesta demonstração; não há favoritos cadastrados.

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content"/>

      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerActions}>
          <Pressable accessibilityLabel="Câmera" style={styles.headerButton}>
            <Text style={styles.headerIcon}>▣</Text>
          </Pressable>
          <Pressable accessibilityLabel="Mais opções" style={styles.headerButton}>
            <Text style={styles.headerIcon}>⋮</Text>
          </Pressable>
        </View>
      </View>

      {/* Campo de pesquisa */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar"
          placeholderTextColor="#667781"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {/* Filtros horizontais */}
      <View style={styles.filters}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipSelected,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextSelected,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista rolável de conversas */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma conversa encontrada.</Text>
        }
      />

      {/* Botão flutuante: visual, sem criar uma conversa real */}
      <Pressable
        accessibilityLabel="Nova conversa"
        style={({ pressed }) => [styles.newChatButton, pressed && styles.pressedButton]}
      >
        <Text style={styles.newChatIcon}>＋</Text>
      </Pressable>

      {/* Navegação inferior visual */}
      <View style={styles.bottomNav}>
        {[
          { label: "Conversas", icon: "●" },
          { label: "Status", icon: "◉" },
          { label: "Comunidades", icon: "♧" },
          { label: "Chamadas", icon: "☎" },
        ].map((tab) => (
          <Pressable
            key={tab.label}
            style={styles.navItem}
            onPress={() => setSelectedTab(tab.label)}
          >
            <Text
              style={[
                styles.navIcon,
                selectedTab === tab.label && styles.navSelected,
              ]}
            >
              {tab.icon}
            </Text>
            <Text
              style={[
                styles.navLabel,
                selectedTab === tab.label && styles.navSelected,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginTop: 10,
    minHeight: 62,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: "700",
    color: "#008F6C",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    minWidth: 42,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    color: "#17232B",
    fontSize: 28,
  },
  searchContainer: {
    height: 46,
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 24,
    backgroundColor: "#F0F2F5",
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    color: "#667781",
    fontSize: 27,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    color: "#111B21",
    fontSize: 16,
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: "#F0F2F5",
  },
  filterChipSelected: {
    backgroundColor: "#D9FDD3",
  },
  filterText: {
    fontSize: 14,
    color: "#54656F",
    fontWeight: "600",
  },
  filterTextSelected: {
    color: "#087F5B",
  },
  chatList: {
    paddingBottom: 10,
  },
 
  emptyText: {
    padding: 28,
    textAlign: "center",
    color: "#667781",
  },
  newChatButton: {
    position: "absolute",
    right: 20,
    bottom: 86,
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#00A884",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  pressedButton: {
    opacity: 0.8,
  },
  newChatIcon: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 34,
  },
  bottomNav: {
    minHeight: 66,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7E9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 21,
    color: "#667781",
    marginBottom: 3,
  },
  navLabel: {
    fontSize: 11,
    color: "#667781",
  },
  navSelected: {
    color: "#008F6C",
    fontWeight: "700",
  },
});
