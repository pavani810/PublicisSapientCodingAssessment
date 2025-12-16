using PharmacyAPI.Models;
using PharmacyAPI.Services;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

var medicinesPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "medicines.json");
builder.Services.AddSingleton(new JsonFileService<Medicine>(medicinesPath));
builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();
app.MapControllers();
app.Run();
