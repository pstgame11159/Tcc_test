namespace Backend.Interfaces;

public interface IResponseHelper
{
    object Success<T>(T data, string message = "success");
    object Error(string message);
}
