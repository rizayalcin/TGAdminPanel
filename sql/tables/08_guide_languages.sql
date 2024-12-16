CREATE TABLE guide_languages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    guide_id INT NOT NULL,
    language_code NVARCHAR(2) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE
);