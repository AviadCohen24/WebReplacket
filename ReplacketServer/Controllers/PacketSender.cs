using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReplacketServer.Models;
using System.Runtime.Serialization.Json;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReplacketServer.Controllers
{
    [Route("[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class PacketSender : ControllerBase
    {
        JsonSerializerSettings jsonSetting;
        private readonly ILogger<PacketSender> _logger;

        public PacketSender(ILogger<PacketSender> Logger)
        {
            _logger = Logger;
            jsonSetting = new JsonSerializerSettings()
            {
                Formatting = Formatting.None
            };
        }


        // GET api/<PacketSender>/5
        [HttpGet("getAvailableNIC")]
        public string Get()
        {
            return JsonConvert.SerializeObject(NicDevicesManager.Instance.GetAvailableNICs(), jsonSetting);
        }

        // POST api/<PacketSender>
        [HttpPost("{data}")]
        public void Post(string data, [FromBody] string value)
        {
            Console.WriteLine(data);
            Console.WriteLine(value);
        }

        // PUT api/<PacketSender>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PacketSender>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
