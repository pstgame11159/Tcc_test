using Backend.Interfaces;
using Backend.Models;

namespace Backend.DMLs;

public class DPerson : IPerson
{
    private readonly IDatabaseAccess _db;

    public DPerson(IDatabaseAccess db)
    {
        _db = db;
    }

    public async Task<int> CreatePersonAsync(PersonModel model)
    {
        const string sql = @"
            INSERT INTO persons (first_name, last_name, email, phone, birth_day, occupation_id, profile, sex)
            VALUES (@FirstName, @LastName, @Email, @Phone, @BirthDay, @OccupationId, @Profile, @Sex);
            SELECT LAST_INSERT_ID();";

        return await _db.QueryFirstOrDefaultAsync<int>(sql, model);
    }
}
