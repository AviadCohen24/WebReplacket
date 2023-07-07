using System.Net;
using System.Net.WebSockets;
using ReplacketServer.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.WebHost.UseUrls("http://localhost:7184");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("MyPolicy");

//app.UseWebSockets();
//app.Map("/ws", async context => {
//    if (context.WebSockets.IsWebSocketRequest)
//    {
//        using (var webSocket = await context.WebSockets.AcceptWebSocketAsync())
//        {
//            while (true)
//            {
//                int progressVal = SendPacketsRequestHandler.ProgressValue;
//                int maxProgressVal = SendPacketsRequestHandler.MaxProgressValue;
//                await webSocket.SendAsync(System.Text.Encoding.ASCII.GetBytes($"{{\"ProgressValue\":{progressVal},\"MaxProgressValue\":{maxProgressVal}}}"), WebSocketMessageType.Text, true, CancellationToken.None);
//                await Task.Delay(500);
//            }
//        }
//    }
//    else
//    {
//        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
//    }
//});

app.MapControllers();

app.RunAsync();
