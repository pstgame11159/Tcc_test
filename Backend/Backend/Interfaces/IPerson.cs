using Backend.Models;

namespace Backend.Interfaces;

public interface IPerson
{
    Task<int> CreatePersonAsync(PersonModel model);
}
