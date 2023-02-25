import { useEffect, useState } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { featchPost } from "../api/index";
import * as Notification from "expo-notifications";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

let oldOrder = [];

const BACKGROUND_FETCH_TASK = "background-fetch";
Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
    };
  },
});

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const pushNotification = (post) => {
    Notification.scheduleNotificationAsync({
      content: {
        title: `Заказ ${post[0]["DeliveryNumber"]}`,
        body: `${post[0]["Address"]}`,
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  featchPost().then((newOrder) => {
    if (oldOrder.length === 0) {
      if ([...newOrder.filter((e) => e.Status === 12)].length !== 0) {
        pushNotification(newOrder);
        oldOrder = newOrder;
        console.log("Обновляем счетчик в ифе обновления счетчика");
      }
      oldOrder = newOrder;
      console.log(`Обновляем счетчик ${oldOrder.length}`);
    } else if (newOrder.length > oldOrder.length) {
      console.log(`${newOrder.length} ${oldOrder.length} true`);
      pushNotification(newOrder);
      oldOrder = newOrder;
    } else {
      console.log(`${newOrder.length} ${oldOrder.length} false`);
    }
  });

  //Old method
  // featchPost().then((newPosts) => {
  //   if ([...newPosts.filter((e) => e.Status === 12)].length !== 0) {
  //     pushNotification(newPosts);
  //   }
  // });
  const now = Date.now();
  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 1 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: false, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundNotification() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK,
      oldOrder
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={toggleFetchTask} style={styles.topButton}>
        {isRegistered ? (
          <Ionicons name="notifications-outline" size={24} color="#FAEBD7" />
        ) : (
          <Ionicons name="notifications-off-outline" size={24} color="red" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#17212b",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 2,
  },
  text: {
    color: "white",
  },
  topText: {
    paddingTop: 40,
    color: "white",
    alignSelf: "center",
  },
  button: {
    color: "white",
    height: 30,
    width: 190,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "green",
    bottom: 2,
    textAlignVertical: "center",
    textAlign: "center",
  },
  topButton: {
    backgroundColor: "rgba(62, 84, 106, 0.5)",
    borderColor: "#17312b",
    borderWidth: 2,
    borderRadius: 20,
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  },
});
