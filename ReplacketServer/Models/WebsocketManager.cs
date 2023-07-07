using System.Net.WebSockets;

namespace ReplacketServer.Models
{
    public class WebsocketManager 
    {
        #region Properties
        private static WebsocketManager? instance = null;
        public static WebsocketManager Instance {
            get {
                if(instance == null)
                    instance = new WebsocketManager();
                return instance;
            }
        }

        private const string wsAddress = "ws://\"192.168.1.165\":7185";
        #endregion

        public void OpenWebsocketPort(){
            
        }
    }
}