-- Örnek veriler
INSERT INTO categories (name, description) VALUES
('Yurtiçi Turlar', 'Türkiye içindeki turistik yerler için düzenlenen turlar'),
('Yurtdışı Turlar', 'Yurtdışı destinasyonlarına düzenlenen turlar'),
('Kültür Turları', 'Tarihi ve kültürel değerleri keşfetmek için düzenlenen turlar'),
('Fuar Turları', 'Ulusal ve uluslararası fuarlar için düzenlenen turlar');

INSERT INTO operators (name, api_key, api_secret, status) VALUES
('İstya Tur', 'istya_api_key_123', 'istya_secret_456', 'active'),
('Pronto Tour', 'pronto_api_key_789', 'pronto_secret_012', 'active');

-- Diğer örnek veriler...