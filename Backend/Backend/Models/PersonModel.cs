namespace Backend.Models;

public class PersonModel
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string BirthDay { get; set; } = string.Empty;
    public int OccupationId { get; set; }
    public string Profile { get; set; } = string.Empty;
    public string Sex { get; set; } = string.Empty;
}
