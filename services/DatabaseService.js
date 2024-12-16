import sql from 'mssql';
import dbConfig from '../config/database.js';

class DatabaseService {
    static pool = null;

    static async getPool() {
        if (!this.pool) {
            this.pool = await sql.connect(dbConfig);
        }
        return this.pool;
    }

    static async query(queryText, params = []) {
        const pool = await this.getPool();
        const request = pool.request();
        
        // Add parameters if any
        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });
        
        try {
            const result = await request.query(queryText);
            return result.recordset;
        } catch (err) {
            console.error('Database query error:', err);
            throw err;
        }
    }

    static async execute(procedureName, params = {}) {
        const pool = await this.getPool();
        const request = pool.request();
        
        // Add parameters if any
        Object.entries(params).forEach(([key, value]) => {
            request.input(key, value);
        });
        
        try {
            const result = await request.execute(procedureName);
            return result;
        } catch (err) {
            console.error('Stored procedure execution error:', err);
            throw err;
        }
    }

    static async transaction(callback) {
        const pool = await this.getPool();
        const transaction = pool.transaction();
        
        try {
            await transaction.begin();
            await callback(transaction);
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
export default DatabaseService; // Bu satırı ekleyin
