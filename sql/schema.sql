-- MS SQL Server için tablo oluşturma
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE operators (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    api_key NVARCHAR(255),
    api_secret NVARCHAR(255),
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE themes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE regions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE countries (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    region_id INT,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE cities (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    country_id INT,
    region_id INT,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE guides (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE guide_languages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    guide_id INT NOT NULL,
    language_code NVARCHAR(2) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE
);

CREATE TABLE tours (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    category_id INT,
    operator_id INT,
    start_date DATE,
    end_date DATE,
    status NVARCHAR(20) DEFAULT 'active',
    show_on_homepage BIT DEFAULT 0,
    price_double DECIMAL(10,2),
    price_single DECIMAL(10,2),
    price_triple DECIMAL(10,2),
    price_child1 DECIMAL(10,2),
    price_child2 DECIMAL(10,2),
    theme_id INT,
    region_id INT,
    country_id INT,
    city_id INT,
    guide_id INT,
    notes NVARCHAR(MAX),
    contract NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (operator_id) REFERENCES operators(id),
    FOREIGN KEY (theme_id) REFERENCES themes(id),
    FOREIGN KEY (region_id) REFERENCES regions(id),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (guide_id) REFERENCES guides(id)
);

CREATE TABLE tour_days (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tour_id INT NOT NULL,
    day_number INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

CREATE TABLE tour_services (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tour_id INT NOT NULL,
    service_name NVARCHAR(50) NOT NULL,
    is_included BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);