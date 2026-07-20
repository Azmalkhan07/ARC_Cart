package com.arccart.service;

import com.arccart.entity.Notification;
import com.arccart.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Map<String, Object> getNotificationSummary(Long userId) {
        long unreadCount = notificationRepository.countByUserIdAndIsReadFalse(userId);
        List<Notification> recent = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().limit(5).toList();
        return Map.of("unreadCount", unreadCount, "recent", recent);
    }

    @Transactional
    public void markAsRead(Long userId, Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(n -> {
            if (n.getUserId().equals(userId)) {
                n.setIsRead(true);
                notificationRepository.save(n);
            }
        });
    }

    @Transactional
    public void markAllRead(Long userId) {
        notificationRepository.markAllReadForUser(userId);
    }

    // Used by other services (e.g. OrderService) to push notifications
    public void pushNotification(Long userId, String title, String message, String type, String actionUrl) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setTitle(title);
        n.setMessage(message);
        n.setType(type);
        n.setActionUrl(actionUrl);
        notificationRepository.save(n);
    }
}
