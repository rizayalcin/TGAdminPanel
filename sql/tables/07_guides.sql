CREATE TABLE guides (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    status NVARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'passive')),
    created_at DATETIME2 DEFAULT GETDATE()
);