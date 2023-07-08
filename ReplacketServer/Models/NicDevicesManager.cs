using Newtonsoft.Json;
using SharpPcap;
using SharpPcap.LibPcap;
using System.Globalization;

namespace ReplacketServer.Models
{
    public class NicDevicesManager
    {
        #region Properties
        private static SendPacketsRequestHandler _requestHandler;

        public static List<LibPcapLiveDevice> Devices { get; set; }
        private static NicDevicesManager instance;
        public static NicDevicesManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new NicDevicesManager();
                }

                return instance;
            }
        }
        #endregion

        public NicDevicesManager()
        {
            Devices = new List<LibPcapLiveDevice>();
        }

        #region Get available nics functions
        public IEnumerable<string> GetAvailableNICs()
        {
            Devices.Clear();
            ExtractAvailableDevices();
            return Devices.Select(device => GetDeviceFriendlyName(device));
        }

        private static string GetDeviceFriendlyName(LibPcapLiveDevice device)
        {
            return device.Interface.FriendlyName == null ? device.Description : device.Interface.FriendlyName;
        }

        private static void ExtractAvailableDevices()
        {
            foreach (LibPcapLiveDevice device in CaptureDeviceList.Instance)
            {
                Devices.Add(device);
            }
        }
        #endregion

        #region Send packets functions
        public void SendPacketsRequestHandler(object requestParameters, ProgressHub progressHub)
        {
            if(requestParameters != null)
            {
                _requestHandler = JsonConvert.DeserializeObject<SendPacketsRequestHandler>(requestParameters.ToString());
                _requestHandler.StartSendPackets(progressHub);
            }
        }
        #endregion
    }
}
