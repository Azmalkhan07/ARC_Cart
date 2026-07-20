CREATE TABLE variant_attributes (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  product_id  BIGINT NOT NULL,
  name        VARCHAR(50) NOT NULL,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_attr_product_name (product_id, name),
  INDEX idx_variant_attrs_product (product_id)
);
