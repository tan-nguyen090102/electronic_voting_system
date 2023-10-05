DROP PROCEDURE IF EXISTS update_table;
CREATE PROCEDURE update_table(
 IN table_name VARCHAR(255),
 IN set_clause text,
 IN where_clause TEXT
)
BEGIN
    SET @update_table_sql = CONCAT('UPDATE ', table_name,' SET ',set_clause,' WHERE ', where_clause,';');
    PREPARE update_table_stmt FROM @update_table_sql;
    EXECUTE update_table_stmt;
    DEALLOCATE PREPARE update_table_stmt;
END;