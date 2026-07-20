CREATE TABLE inventory (
  id           BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id   BIGINT NOT NULL,
  variant_id   BIGINT NULL,
  quantity     INT NOT NULL DEFAULT 0,
  reserved     INT NOT NULL DEFAULT 0,
  low_stock_at INT DEFAULT 5,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by   BIGINT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  UNIQUE KEY uq_inventory (product_id, variant_id),
  INDEX idx_inventory_product (product_id),
  INDEX idx_inventory_variant (variant_id),
  INDEX idx_inventory_low_stock (quantity, low_stock_at)
);
