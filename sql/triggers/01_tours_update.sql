CREATE TRIGGER trg_tours_update
ON tours
AFTER UPDATE
AS
BEGIN
    UPDATE tours
    SET updated_at = GETDATE()
    FROM tours t
    INNER JOIN inserted i ON t.id = i.id;
END;