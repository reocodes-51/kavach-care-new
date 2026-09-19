import api from './api';

export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get<{ success: boolean; count: number; unreadCount: number; notifications: NotificationItem[] }>('/notifications');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await api.put<{ success: boolean; notification: NotificationItem }>(`/notifications/${id}/read`);
    return response.data;
  }
};
