import connectToDatabase from './database.js';
import sql from 'mssql';

const executeQuery = async (query) => {
    try {
        console.log(query)
        let pool = await connectToDatabase();
        let result = await pool.request()
            .query(query);
        return result.recordset
    } catch (err) {
        console.error('Query failed! Error:', err);
    } finally {
        sql.close();
    }
};
const getQuery = async (table_name, limit, start, sort ="", whereIsActive = "") => {
    let query = `SELECT * FROM ${table_name} `;
    let result = await executeQuery(query)
    console.log(result);
    return result;
}

const getQueryByField = async (table_name,field,value,limit, start, sort ="", whereIsActive = "") => {
    let query = `SELECT * FROM ${table_name} WHERE ${field}=${value}`;
    let result = await executeQuery(query)
    return result;
}
const getQuery2 = async (table_name, field,field1,field2, value1,value2 ,limit, start, sort, whereIsActive = "") => {
    console.log("in get query sort: " + sort);
    let query = `SELECT ${field}  FROM ${table_name} WHERE ${field1}=${value1} AND ${field2}=${value2}`;
    let result = await executeQuery(query)
    console.log(result);
    return result;
} 

const insertQuery = async (table_name, valuesName, values) => {
    console.log("valu",valuesName)

    const query = `INSERT INTO [dbo].${table_name}(${valuesName}) OUTPUT INSERTED.* VALUES (${values})`
    console.log(query,"---------------------------------");
    const result = await executeQuery(query)
    return result;
}
const updateQuery = async (tableName, updateValues, namefiled, valueFiled) => {
    try {

        const query = `UPDATE ${tableName} SET ${updateValues} WHERE ${namefiled} = ${valueFiled}`;
        const result = await executeQuery(query)
        return { success: true };
    } catch (error) {
        console.error('Error executing update query:', error);
        throw error;
    }
};

const deleteQuery = async (tableName, nameFiled, valueFiled) => {
    try {
        const query = `DELETE FROM ${tableName} WHERE ${nameFiled} = ${valueFiled}`;
        console.log(query);
        const result = await executeQuery(query);
        return { success: true };
    } catch (error) {
        console.error('Error executing delete query:', error);
        throw error;
    }
};


export {
    getQuery,getQueryByField,getQuery2, insertQuery, updateQuery, deleteQuery
}
