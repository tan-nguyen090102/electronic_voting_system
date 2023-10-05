DROP PROCEDURE IF EXISTS select_all_from_table;
CREATE PROCEDURE select_all_from_table(
 IN table_name VARCHAR(255)
)
BEGIN
    SET @select_all_from_table_sql = CONCAT('SELECT * FROM ', table_name, ';');
    PREPARE select_all_from_table_stmt FROM @select_all_from_table_sql;
    EXECUTE select_all_from_table_stmt;
    DEALLOCATE PREPARE select_all_from_table_stmt;
END;