using Backend.DMLs;
using Backend.Infrastructures;
using Backend.Interfaces;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IDatabaseConnection, DatabaseConnection>();
builder.Services.AddSingleton<IResponseHelper, ResponseHelper>();

builder.Services.AddTransient<IDatabaseAccess, DatabaseAccess>();

builder.Services.AddScoped<IPerson, DPerson>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("applicationCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("applicationCors");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();

