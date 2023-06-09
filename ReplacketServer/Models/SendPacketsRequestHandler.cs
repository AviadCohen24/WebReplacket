using SharpPcap;
using SharpPcap.LibPcap;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace ReplacketServer.Models
{
    public class SendPacketsRequestHandler
    {
        [JsonPropertyName("fileName")]
        public string FileName { get; set; }

        [JsonPropertyName("nic")]
        public string nic { get; set; }

        [JsonIgnore]
        private string filePath;

        [JsonIgnore]
        private LibPcapLiveDevice _device;

        [JsonIgnore]
        private CaptureFileReaderDevice _fileReader;

        public void StartSendPackets()
        {
            GetSelectedPcapDevice();
            FindFileInDrives();
            PacketCapture _packet;
            _fileReader = new CaptureFileReaderDevice(filePath);
            _fileReader.Open();
            _device.Open();
            while(_fileReader.GetNextPacket(out _packet) == GetPacketStatus.PacketRead)
            {
                try
                {
                    _device.SendPacket(_packet.GetPacket());
                }
                catch(Exception e) { }
            }
            _fileReader.Close();
            _device.Close();
        }

        #region Get selected nic and file path functions
        private void GetSelectedPcapDevice()
        {
            foreach (LibPcapLiveDevice device in CaptureDeviceList.Instance)
            {
                if(device.Interface.FriendlyName == nic || device.Description == nic)
                {
                    _device = device;
                    break;
                }
            }
        }

        private void FindFileInDrives()
        {
            filePath = "";
            foreach(DriveInfo drive in DriveInfo.GetDrives())
            {
                SearchFileInDrive(drive.RootDirectory);
                
                if (filePath != "")
                    break;
            }
        }

        private void SearchFileInDrive(DirectoryInfo directory) 
        {
            try
            {
                FileInfo[] files = directory.GetFiles(FileName, SearchOption.TopDirectoryOnly);
                foreach (FileInfo file in files)
                {
                    if (file.Name.Equals(FileName, StringComparison.OrdinalIgnoreCase))
                    {
                        filePath = file.FullName;
                        break;
                    }
                }
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException ||
                                       ex is DirectoryNotFoundException)
            {
                return;
            }

            try
            {
                DirectoryInfo[] subDirectories = directory.GetDirectories();
                foreach (DirectoryInfo subDirectory in subDirectories)
                {
                    SearchFileInDrive(subDirectory);
                }
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException || 
                                       ex is DirectoryNotFoundException)
            {
                return;
            }
        }
        #endregion
    }
}
