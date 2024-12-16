CREATE TABLE tour_services (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tour_id INT NOT NULL,
    service_name NVARCHAR(50) NOT NULL,
    is_included BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);