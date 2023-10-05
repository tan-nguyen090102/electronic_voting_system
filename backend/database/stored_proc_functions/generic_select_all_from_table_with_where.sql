DROP PROCEDURE IF EXISTS select_all_from_table_with_where;
CREATE PROCEDURE select_all_from_table_with_where(
 IN table_name VARCHAR(255),
 IN where_clause TEXT
)
BEGIN
    SET @select_all_from_table_with_where_sql = CONCAT('SELECT * FROM ', table_name, ' WHERE ', where_clause,';');
    PREPARE select_all_from_table_with_where_stmt FROM @select_all_from_table_with_where_sql;
    EXECUTE select_all_from_table_with_where_stmt;
    DEALLOCATE PREPARE select_all_from_table_with_where_stmt;
END;