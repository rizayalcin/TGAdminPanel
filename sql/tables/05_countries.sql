CREATE TABLE countries (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    region_id INT,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (region_id) REFERENCES regions(id)
);