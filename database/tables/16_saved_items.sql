CREATE TABLE saved_items (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id     BIGINT NOT NULL,
  product_id  BIGINT NOT NULL,
  variant_id  BIGINT NULL,
  saved_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  UNIQUE KEY uq_saved_user_product_variant (user_id, product_id, variant_id),
  INDEX idx_saved_items_user (user_id)
);
