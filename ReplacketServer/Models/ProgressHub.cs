using Microsoft.AspNetCore.SignalR;

namespace ReplacketServer.Models
{
    public class ProgressHub : Hub
    {
        public async Task SendMessage(int progress)
        {
            // Broadcast the progress to all connected clients
            await Clients.All.SendAsync("ReceiveProgress", progress);
        }
    }
}
