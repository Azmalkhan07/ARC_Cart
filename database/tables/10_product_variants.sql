CREATE TABLE product_variants (
  id               BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id       BIGINT NOT NULL,
  sku              VARCHAR(100) NOT NULL UNIQUE,
  price_modifier   DECIMAL(10,2) DEFAULT 0.00,
  selling_price    DECIMAL(10,2) NOT NULL,
  is_active        BOOLEAN DEFAULT TRUE,
  attribute_values JSON NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_variants_product (product_id),
  INDEX idx_variants_sku (sku)
);
