import { useEffect, useState } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { featchPost } from "../api/index";
import * as Notification from "expo-notifications";
import { StyleSheet, View, Button } from "react-native";

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
      <View style={styles.textContainer}>
        {/* <Text style={styles.text}>
          Статус Push-уведомления:{" "}
          <Text style={styles.text}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text style={styles.text}>
          Фоновая задача:{" "}
          <Text style={styles.text}>
            {isRegistered ? BACKGROUND_FETCH_TASK : "Not registered yet!"}
          </Text>
        </Text> */}
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={
          isRegistered
            ? `Выключить Push-уведомления `
            : `Включить Push-уведомления ${
                status && BackgroundFetch.BackgroundFetchStatus[status]
              }`
        }
        onPress={toggleFetchTask}
      />
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
});
