import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
    };
  },
});

export const pushNotification = () => {
  Notification.scheduleNotificationAsync({
    content: {
      title: "Заказ",
      body: "Заказ",
    },
    trigger: {
      seconds: 1,
    },
  });
};
