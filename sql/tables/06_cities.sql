CREATE TABLE cities (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    country_id INT,
    region_id INT,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (region_id) REFERENCES regions(id)
);