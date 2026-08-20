import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  // Request permissions
  async requestPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Rappels',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#AB7058',
      });
    }

    return true;
  }

  // Schedule a daily reminder (e.g., vitamin D)
  async scheduleDailyReminder({ id, title, body, hour, minute }) {
    // Cancel existing reminder with same ID first
    await this.cancelReminder(id);

    const trigger = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'daily_reminder', id },
        sound: true,
      },
      trigger,
      identifier: id,
    });

    return notificationId;
  }

  // Schedule a one-time reminder (e.g., vaccine)
  async scheduleOneTimeReminder({ id, title, body, date }) {
    // Cancel existing reminder with same ID first
    await this.cancelReminder(id);

    const triggerDate = new Date(date);

    // Don't schedule if date is in the past
    if (triggerDate <= new Date()) {
      return null;
    }

    const trigger = {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'one_time_reminder', id },
        sound: true,
      },
      trigger,
      identifier: id,
    });

    return notificationId;
  }

  // Schedule vaccine reminder (3 days before due date)
  async scheduleVaccineReminder({ vaccineId, vaccineName, dueDate }) {
    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 3); // 3 days before
    reminderDate.setHours(9, 0, 0, 0); // At 9 AM

    return this.scheduleOneTimeReminder({
      id: `vaccine_${vaccineId}`,
      title: 'Rappel vaccin',
      body: `Le vaccin "${vaccineName}" est prévu dans 3 jours. Pensez à prendre RDV !`,
      date: reminderDate,
    });
  }

  // Cancel a specific reminder
  async cancelReminder(id) {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
    } catch (e) {
      // Notification might not exist, that's OK
    }
  }

  // Cancel all reminders
  async cancelAllReminders() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get all scheduled notifications
  async getScheduledReminders() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  // Check if a specific reminder is scheduled
  async isReminderScheduled(id) {
    const scheduled = await this.getScheduledReminders();
    return scheduled.some((n) => n.identifier === id);
  }
}

export const notificationService = new NotificationService();

// Predefined reminder types for the app
export const REMINDER_TYPES = {
  VITAMIN_D: {
    id: 'vitamin_d_daily',
    title: 'Vitamine D',
    body: 'C\'est l\'heure de la vitamine D pour bébé !',
    icon: 'sunny',
    color: '#FF9800',
  },
  MEDICATION: {
    id: 'medication',
    title: 'Médicament',
    body: 'Rappel de médicament',
    icon: 'medkit',
    color: '#4CAF50',
  },
  VACCINE: {
    id: 'vaccine',
    title: 'Vaccin',
    body: 'Rappel de vaccin',
    icon: 'fitness',
    color: '#2196F3',
  },
};
