import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

interface NotificationAction {
  actionId: string;
  notificationId: number;
}

interface TaskNotificationMapping {
  taskId: string;
  notificationId: number;
}

// 存储通知 ID 到任务 ID 的映射
const notificationTaskMap = new Map<number, string>();

export function mapNotificationToTask(notificationId: number, taskId: string): void {
  notificationTaskMap.set(notificationId, taskId);
}

export function initWakeupNotificationListener(): void {
  // 监听通知动作事件
  listen<NotificationAction>('notification://action', async (event) => {
    const { actionId, notificationId } = event.payload;

    const taskId = notificationTaskMap.get(notificationId);
    if (!taskId) {
      console.warn(`No task found for notification ${notificationId}`);
      return;
    }

    // 清理映射
    notificationTaskMap.delete(notificationId);

    if (actionId === 'confirm') {
      try {
        await invoke('confirm_wakeup_task', { taskId });
        console.log(`Wakeup task ${taskId} confirmed and executed`);
      } catch (error) {
        console.error(`Failed to confirm wakeup task: ${error}`);
      }
    } else if (actionId === 'cancel') {
      try {
        await invoke('cancel_wakeup_task', { taskId });
        console.log(`Wakeup task ${taskId} cancelled`);
      } catch (error) {
        console.error(`Failed to cancel wakeup task: ${error}`);
      }
    }
  });

  // 监听后端发送的通知映射事件
  listen<TaskNotificationMapping>('wakeup://notification-mapping', (event) => {
    const { taskId, notificationId } = event.payload;
    mapNotificationToTask(notificationId, taskId);
  });

  // 定期检查超时
  setInterval(async () => {
    try {
      await invoke('check_wakeup_timeouts');
    } catch (error) {
      console.error('Failed to check timeouts:', error);
    }
  }, 30000); // 每 30 秒检查一次
}
