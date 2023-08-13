using Newtonsoft.Json;
using System;
using System.Net;

namespace Web2.ExceptionHandler
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                string errorId = Guid.NewGuid().ToString();
                var errorResult = new ErrorResult
                {
                    Source = ex.TargetSite?.DeclaringType?.FullName,
                    Exception = ex.Message.Trim(),
                    ErrorId = errorId,
                    SupportMessage = $"Error Id: {errorId}."
                };
                errorResult.Messages.Add(ex.Message);
                if(ex is not MyException && ex.InnerException != null)
                {
                    while (ex.InnerException != null)
                    {
                        ex = ex.InnerException;
                    }
                }
                switch (ex)
                {
                    case MyException e:
                        errorResult.StatusCode = (int)e.ErrorCode;
                        if (e.ErrorMessages is not null)
                        {
                            errorResult.Messages = e.ErrorMessages;
                        }

                        break;

                    case KeyNotFoundException:
                        errorResult.StatusCode = (int)HttpStatusCode.NotFound;
                        break;

                    default:
                        errorResult.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }
                var response = context.Response;
                if (!response.HasStarted)
                {
                    response.ContentType = "application/json";
                    response.StatusCode = errorResult.StatusCode;
                    await response.WriteAsync(JsonConvert.SerializeObject(errorResult));
                }
            }
        }
    }
}
