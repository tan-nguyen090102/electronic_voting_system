DROP PROCEDURE IF EXISTS insert_into_table;
CREATE PROCEDURE insert_into_table (
    IN table_name VARCHAR(255),
    IN insert_proto TEXT,
    IN insert_values TEXT
)
BEGIN
    SET @insert_values_sql = CONCAT('INSERT INTO ', table_name, ' ', insert_proto ,' VALUES ', insert_values, ';');
    PREPARE insert_values_stmt FROM @insert_values_sql;
    EXECUTE insert_values_stmt;
    DEALLOCATE PREPARE insert_values_stmt;
END

