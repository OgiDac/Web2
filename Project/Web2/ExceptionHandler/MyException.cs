using System.Net;

namespace Web2.ExceptionHandler
{
    public class MyException : Exception
    {
        public MyException(string message, List<string>? messages = default, HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError) : base(message)
        {
            ErrorMessages = messages;
            ErrorCode = httpStatusCode;
        }
        public List<string>? ErrorMessages { get; set; }
        public HttpStatusCode ErrorCode { get; set; }
    }
}
