
namespace INTEGRATEDAPI.Shared
{
    public class ServiceResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public dynamic? Data { get; set; }


    }
}