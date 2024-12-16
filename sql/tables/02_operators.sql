CREATE TABLE operators (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    api_key NVARCHAR(255),
    api_secret NVARCHAR(255),
    status NVARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'passive')),
    created_at DATETIME2 DEFAULT GETDATE()
);