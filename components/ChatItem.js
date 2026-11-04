import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import Avatar from "./Avatar";

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

export default ChatItem;

const styles = StyleSheet.create({
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
    chatMessage: {
    flexShrink: 1,
    color: "#667781",
    fontSize: 14,
  },
   readTicks: {
    color: "#29A8E2",
    fontSize: 13,
    fontWeight: "700",
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
})