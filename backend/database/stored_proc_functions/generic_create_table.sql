DROP PROCEDURE IF EXISTS create_new_table;
CREATE PROCEDURE create_new_table (
    IN table_name VARCHAR(255),
    IN columns_definition TEXT
)
BEGIN
    SET @drop_table_sql = CONCAT('DROP TABLE IF EXISTS ', table_name, ';');
    PREPARE drop_table_stmt FROM @drop_table_sql;
    EXECUTE drop_table_stmt;
    DEALLOCATE PREPARE drop_table_stmt;

    SET @create_table_sql = CONCAT('CREATE TABLE IF NOT EXISTS ', table_name, ' (', columns_definition, ');');
    PREPARE create_table_stmt FROM @create_table_sql;
    EXECUTE create_table_stmt;
    DEALLOCATE PREPARE create_table_stmt;

    SELECT @create_table_sql;
END