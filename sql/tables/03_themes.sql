CREATE TABLE themes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    status NVARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'passive')),
    created_at DATETIME2 DEFAULT GETDATE()
);