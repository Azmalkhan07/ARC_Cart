CREATE TABLE sub_categories (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  category_id   INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(120) NOT NULL UNIQUE,
  is_active     BOOLEAN DEFAULT TRUE,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by    BIGINT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_sub_categories_category (category_id),
  INDEX idx_sub_categories_slug (slug)
);
