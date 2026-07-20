CREATE TABLE recently_viewed (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id     BIGINT NOT NULL,
  product_id  BIGINT NOT NULL,
  viewed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_recently_viewed (user_id, product_id),
  INDEX idx_recently_viewed_user_time (user_id, viewed_at DESC)
);
