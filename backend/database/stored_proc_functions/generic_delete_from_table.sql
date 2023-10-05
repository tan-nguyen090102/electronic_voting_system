DROP PROCEDURE IF EXISTS delete_from_table;
CREATE PROCEDURE delete_from_table(
 IN table_name VARCHAR(255),
 IN where_clause TEXT
)
BEGIN
    SET @delete_from_table_sql = CONCAT('DELETE FROM ', table_name, ' WHERE ', where_clause,';');
    PREPARE delete_from_table_with_where_stmt FROM @delete_from_table_sql;
    EXECUTE delete_from_table_with_where_stmt;
    DEALLOCATE PREPARE delete_from_table_with_where_stmt;
END;