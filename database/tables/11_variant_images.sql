CREATE TABLE variant_images (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  variant_id  BIGINT NOT NULL,
  image_url   VARCHAR(500) NOT NULL,
  public_id   VARCHAR(200),
  is_primary  BOOLEAN DEFAULT FALSE,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  INDEX idx_variant_images_variant (variant_id)
);
