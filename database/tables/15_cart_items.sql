CREATE TABLE cart_items (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  cart_id     BIGINT NOT NULL,
  product_id  BIGINT NOT NULL,
  variant_id  BIGINT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  UNIQUE KEY uq_cart_product_variant (cart_id, product_id, variant_id),
  INDEX idx_cart_items_cart (cart_id)
);
