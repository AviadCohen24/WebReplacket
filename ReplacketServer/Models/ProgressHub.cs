using Microsoft.AspNetCore.SignalR;

namespace ReplacketServer.Models
{
    public class ProgressHub : Hub
    {
        public async Task SendMaxProgress(int maxProgress)
        {
            // Broadcast the progress to all connected clients
            await Clients.All.SendAsync("ReceiveMaxProgress", maxProgress);
        }

        public async Task SendCurrentProgress(int progress)
        {
            // Broadcast the progress to all connected clients
            await Clients.All.SendAsync("ReceiveProgress", progress);
            await Task.Delay(500);
        }
    }
}
