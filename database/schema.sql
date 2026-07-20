-- ============================================================
-- ARC CART  –  Full Database Schema  (MySQL 8.0+)
-- Run this once against a fresh `arccart_db` database.
-- JPA ddl-auto=update will maintain the schema during dev.
-- ============================================================

CREATE DATABASE IF NOT EXISTS arccart_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE arccart_db;

-- ─── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  phone        VARCHAR(20),
  role         VARCHAR(20)  NOT NULL DEFAULT 'CUSTOMER',  -- CUSTOMER | SELLER | ADMIN
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  avatar_url   VARCHAR(500),
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Addresses ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS addresses (
  id             BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id        BIGINT       NOT NULL,
  full_name      VARCHAR(100) NOT NULL,
  phone          VARCHAR(20)  NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  landmark       VARCHAR(100),
  city           VARCHAR(100) NOT NULL,
  state          VARCHAR(100) NOT NULL,
  pincode        VARCHAR(20)  NOT NULL,
  address_type   VARCHAR(20)  DEFAULT 'HOME',
  is_default     BOOLEAN      DEFAULT FALSE,
  is_deleted     BOOLEAN      DEFAULT FALSE,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_addresses_user (user_id)
);

-- ─── Categories ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  image_url   VARCHAR(500),
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Sub-Categories ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sub_categories (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT       NOT NULL,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(120) NOT NULL UNIQUE,
  image_url   VARCHAR(500),
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_subcats_category (category_id)
);

-- ─── Brands ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL UNIQUE,
  slug       VARCHAR(120) NOT NULL UNIQUE,
  logo_url   VARCHAR(500),
  is_active  BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Sellers ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sellers (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id      BIGINT       NOT NULL UNIQUE,
  store_name   VARCHAR(150) NOT NULL,
  gstin        VARCHAR(20),
  is_verified  BOOLEAN      NOT NULL DEFAULT FALSE,
  is_active    BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  seller_id        BIGINT       NOT NULL,
  category_id      BIGINT       NOT NULL,
  sub_category_id  BIGINT,
  brand_id         BIGINT,
  name             VARCHAR(255) NOT NULL,
  slug             VARCHAR(280) NOT NULL UNIQUE,
  description      TEXT,
  short_description VARCHAR(500),
  mrp              DECIMAL(12,2) NOT NULL,
  selling_price    DECIMAL(12,2) NOT NULL,
  tax_percent      DECIMAL(5,2)  DEFAULT 18.00,
  is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
  is_featured      BOOLEAN       NOT NULL DEFAULT FALSE,
  has_variants     BOOLEAN       NOT NULL DEFAULT FALSE,
  quantity         INT           NOT NULL DEFAULT 0,
  reserved         INT           NOT NULL DEFAULT 0,
  created_at       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_seller   (seller_id),
  INDEX idx_products_category (category_id),
  INDEX idx_products_brand    (brand_id),
  FULLTEXT INDEX ft_products_search (name, description, short_description)
);

-- ─── Product Images ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id  BIGINT       NOT NULL,
  image_url   VARCHAR(500) NOT NULL,
  alt_text    VARCHAR(255),
  sort_order  INT          NOT NULL DEFAULT 0,
  is_primary  BOOLEAN      NOT NULL DEFAULT FALSE,
  INDEX idx_pimages_product (product_id)
);

-- ─── Product Variants ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variants (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id   BIGINT        NOT NULL,
  sku          VARCHAR(100)  NOT NULL UNIQUE,
  selling_price DECIMAL(12,2) NOT NULL,
  mrp          DECIMAL(12,2) NOT NULL,
  quantity     INT           NOT NULL DEFAULT 0,
  reserved     INT           NOT NULL DEFAULT 0,
  image_url    VARCHAR(500),
  attributes   JSON,           -- e.g. {"Size":"M","Color":"White"}
  is_active    BOOLEAN       NOT NULL DEFAULT TRUE,
  INDEX idx_variants_product (product_id)
);

-- ─── Variant Attribute Definitions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS variant_attributes (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  variant_id BIGINT       NOT NULL,
  name       VARCHAR(50)  NOT NULL,
  value      VARCHAR(100) NOT NULL,
  INDEX idx_vattrs_variant (variant_id)
);

-- ─── Banners ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(200),
  image_url     VARCHAR(500) NOT NULL,
  target_url    VARCHAR(500),
  sort_order    INT          NOT NULL DEFAULT 0,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  start_date    DATETIME,
  end_date      DATETIME,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Coupons ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
  code                  VARCHAR(50)   NOT NULL UNIQUE,
  description           VARCHAR(500)  NOT NULL,
  discount_type         VARCHAR(20)   NOT NULL,  -- PERCENTAGE | FIXED
  discount_value        DECIMAL(10,2) NOT NULL,
  min_order_amount      DECIMAL(10,2),
  max_discount_amount   DECIMAL(10,2),
  applicable_category_id BIGINT,
  start_date            DATETIME      NOT NULL,
  end_date              DATETIME      NOT NULL,
  usage_limit           INT,
  times_used            INT           NOT NULL DEFAULT 0,
  is_active             BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Cart Items ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id           BIGINT   NOT NULL,
  product_id        BIGINT   NOT NULL,
  variant_id        BIGINT,
  quantity          INT      NOT NULL DEFAULT 1,
  is_saved_for_later BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cart_user_product_variant_saved (user_id, product_id, variant_id, is_saved_for_later),
  INDEX idx_cart_user (user_id)
);

-- ─── Wishlists ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT   NOT NULL,
  product_id BIGINT   NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_wishlist_user_product (user_id, product_id),
  INDEX idx_wishlist_user (user_id)
);

-- ─── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_number    VARCHAR(100)  NOT NULL UNIQUE,
  user_id         BIGINT        NOT NULL,
  address_id      BIGINT        NOT NULL,
  total_amount    DECIMAL(12,2) NOT NULL,
  discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount      DECIMAL(12,2) NOT NULL,
  shipping_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  final_amount    DECIMAL(12,2) NOT NULL,
  order_status    VARCHAR(30)   NOT NULL DEFAULT 'PENDING',
  payment_status  VARCHAR(30)   NOT NULL DEFAULT 'PENDING',
  payment_method  VARCHAR(30),
  payment_id      VARCHAR(255),
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_orders_user   (user_id),
  INDEX idx_orders_status (order_status)
);

-- ─── Order Items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id    BIGINT        NOT NULL,
  product_id  BIGINT        NOT NULL,
  variant_id  BIGINT,
  quantity    INT           NOT NULL,
  unit_price  DECIMAL(12,2) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  INDEX idx_order_items_order   (order_id),
  INDEX idx_order_items_product (product_id)
);

-- ─── Notifications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT       NOT NULL,
  title      VARCHAR(100) NOT NULL,
  message    TEXT         NOT NULL,
  type       VARCHAR(30)  NOT NULL,
  is_read    BOOLEAN      NOT NULL DEFAULT FALSE,
  action_url VARCHAR(500),
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_notifications_user (user_id)
);

-- ─── Seed: Categories ─────────────────────────────────────────────────────────
INSERT IGNORE INTO categories (name, slug, description, is_active) VALUES
  ('Electronics',   'electronics',   'Gadgets, devices and accessories',         TRUE),
  ('Fashion',       'fashion',       'Clothing, footwear and accessories',        TRUE),
  ('Home & Kitchen','home-kitchen',  'Home décor, appliances and kitchenware',    TRUE),
  ('Beauty',        'beauty',        'Skincare, makeup and personal care',        TRUE),
  ('Sports',        'sports',        'Fitness equipment and sportswear',          TRUE),
  ('Books',         'books',         'Fiction, non-fiction and educational books',TRUE);

-- ─── Seed: Banners ────────────────────────────────────────────────────────────
INSERT IGNORE INTO banners (title, image_url, target_url, sort_order, is_active) VALUES
  ('Summer Sale', 'https://placehold.co/1200x400/4F46E5/FFFFFF?text=Summer+Sale', '/products', 1, TRUE),
  ('New Arrivals','https://placehold.co/1200x400/06B6D4/FFFFFF?text=New+Arrivals', '/products', 2, TRUE);

-- ─── Seed: Sample Coupons ─────────────────────────────────────────────────────
INSERT IGNORE INTO coupons (code, description, discount_type, discount_value, min_order_amount, start_date, end_date, usage_limit, is_active) VALUES
  ('WELCOME10', '10% off on your first order', 'PERCENTAGE', 10.00, 299.00, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 1000, TRUE),
  ('FESTIVE500', 'Flat ₹500 off on orders above ₹2000', 'FIXED', 500.00, 2000.00, NOW(), DATE_ADD(NOW(), INTERVAL 6 MONTH), 500, TRUE);
