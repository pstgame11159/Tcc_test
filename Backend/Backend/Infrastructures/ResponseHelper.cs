using Backend.Interfaces;

namespace Backend.Infrastructures;

public class ResponseHelper : IResponseHelper
{
    public object Success<T>(T data, string message = "success")
        => new { success = true, message, data };

    public object Error(string message)
        => new { success = false, message };
}
