import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import expoPushTokenApi from '../api/expoPushToken';

function useNotification(notificationListener) {
  // const notificationListener = useRef();
  // const responseListener = useRef();
  useEffect(() => {
    registerForPushNotifications();

    Notifications.addNotificationReceivedListener(notificationListener);

    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        };
      },
    });
  }, []);

  const requestPermissions = async () => {
    const permissions = await Notifications.requestPermissionsAsync();
    return permissions.granted;
  };

  const registerForPushNotifications = async () => {
    const token = await getToken();
    if (token) expoPushTokenApi.register(token);
  };

  const getToken = async () => {
    const granted = await requestPermissions();
    if (!granted) return null;

    const result = await Notifications.getExpoPushTokenAsync();
    return result.data;
  };
  return { getToken };
}

export default useNotification;
