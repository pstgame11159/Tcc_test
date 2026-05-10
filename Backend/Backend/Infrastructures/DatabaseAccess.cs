using Dapper;
using MySqlConnector;
using Backend.Interfaces;

namespace Backend.Infrastructures;

public class DatabaseAccess : IDatabaseAccess
{
    private readonly IDatabaseConnection _dbConnection;

    public DatabaseAccess(IDatabaseConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? parameters = null)
    {
        await using var connection = new MySqlConnection(_dbConnection.GetConnectionString());
        return await connection.QueryAsync<T>(sql, parameters);
    }

    public async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? parameters = null)
    {
        await using var connection = new MySqlConnection(_dbConnection.GetConnectionString());
        return await connection.QueryFirstOrDefaultAsync<T>(sql, parameters);
    }

    public async Task<int> ExecuteAsync(string sql, object? parameters = null)
    {
        await using var connection = new MySqlConnection(_dbConnection.GetConnectionString());
        return await connection.ExecuteAsync(sql, parameters);
    }
}
