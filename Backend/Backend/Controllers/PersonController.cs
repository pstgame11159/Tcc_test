using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IPerson _person;

    public PersonController(IPerson person)
    {
        _person = person;
    }
    [HttpPost]
    public async Task<IActionResult> CreatePerson([FromBody] PersonModel model)
    {
        var id = await _person.CreatePersonAsync(model);
        return Ok(new { id, message = "save data success" });
    }
}
