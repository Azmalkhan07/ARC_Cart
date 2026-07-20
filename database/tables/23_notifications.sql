CREATE TABLE notifications (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id     BIGINT NOT NULL,
  type        ENUM('ORDER','PAYMENT','PROMO','SYSTEM','REVIEW','SELLER') NOT NULL,
  title       VARCHAR(150) NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  link        VARCHAR(300),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_notifications_user_read (user_id, is_read),
  INDEX idx_notifications_user_created (user_id, created_at DESC)
);
