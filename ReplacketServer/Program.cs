using System.Net;
using System.Net.WebSockets;
using ReplacketServer.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.FileSystemGlobbing.Internal;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});

builder.Services.AddSignalR();
builder.Services.AddSingleton<ProgressHub>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("MyPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ProgressHub>("/progresshub");
    endpoints.MapControllers();
});

app.Run();
