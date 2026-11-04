import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
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
const CHATS = [
  {
    id: "1",
    name: "Lucas Ferreira",
    message: "Beleza! Até mais tarde.",
    time: "09:24",
    unread: 0,
    sent: true,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "2",
    name: "Família",
    message: "Mãe: Já chegou em casa?",
    time: "08:52",
    unread: 2,
    group: true,
  },
  {
    id: "3",
    name: "Ana Clara",
    message: "Vamos no cinema hoje?",
    time: "08:37",
    unread: 0,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: "4",
    name: "Trabalho",
    message: "Carlos: O relatório já foi enviado.",
    time: "07:56",
    unread: 0,
    group: true,
  },
  {
    id: "5",
    name: "Mariana Silva",
    message: "📷 Foto",
    time: "Ontem",
    unread: 0,
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: "6",
    name: "Amigos da faculdade",
    message: "Rafael: Bora no próximo sábado?",
    time: "Ontem",
    unread: 0,
    group: true,
  },
  {
    id: "7",
    name: "Pedro Santos",
    message: "Show! 👍",
    time: "Ontem",
    unread: 0,
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: "8",
    name: "Juliana Costa",
    message: "Tudo bem? Qualquer coisa me chama.",
    time: "Seg",
    unread: 0,
    avatar: "https://i.pravatar.cc/100?img=49",
  },
];

const FILTERS = ["Todas", "Não lidas", "Favoritos", "Grupos"];

function Avatar({ chat }) {
  if (chat.avatar) {
    return <Image source={{ uri: chat.avatar }} style={styles.avatar} />;
  }

  // Avatar simples para conversas em grupo.
  return (
    <View style={[styles.avatar, styles.groupAvatar]}>
      <Text style={styles.groupAvatarText}>👥</Text>
    </View>
  );
}

function ChatItem({ chat }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.chatRow, pressed && styles.pressedRow]}
      onPress={() => {
        // Somente demonstração: não abre uma conversa real.
      }}
    >
      <Avatar chat={chat} />

      <View style={styles.chatContent}>
        <View style={styles.chatTopLine}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={[styles.chatTime, chat.unread > 0 && styles.unreadTime]}>
            {chat.time}
          </Text>
        </View>

        <View style={styles.chatBottomLine}>
          <View style={styles.messagePreview}>
            {chat.sent && <Text style={styles.readTicks}>✓✓ </Text>}
            <Text style={styles.chatMessage} numberOfLines={1}>
              {chat.message}
            </Text>
          </View>

          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{chat.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
  chatRow: {
    minHeight: 88,
    paddingLeft: 16,
    paddingRight: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  pressedRow: {
    backgroundColor: "#F5F6F6",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#DDE2E5",
  },
  groupAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AAB4BE",
  },
  groupAvatarText: {
    fontSize: 27,
  },
  chatContent: {
    flex: 1,
    minHeight: 76,
    marginLeft: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7E9",
    justifyContent: "center",
  },
  chatTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  chatName: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#111B21",
  },
  chatTime: {
    fontSize: 12,
    color: "#667781",
  },
  unreadTime: {
    color: "#008F6C",
  },
  chatBottomLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messagePreview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  readTicks: {
    color: "#29A8E2",
    fontSize: 13,
    fontWeight: "700",
  },
  chatMessage: {
    flexShrink: 1,
    color: "#667781",
    fontSize: 14,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00A884",
  },
  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
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
