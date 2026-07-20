CREATE TABLE product_tags (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id  BIGINT NOT NULL,
  tag         VARCHAR(100) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_tags_product (product_id),
  INDEX idx_product_tags_tag (tag)
);
