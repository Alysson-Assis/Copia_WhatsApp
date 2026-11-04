import { View, Text, Image, StyleSheet } from "react-native";

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

export default Avatar;

const styles = StyleSheet.create({
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
});
