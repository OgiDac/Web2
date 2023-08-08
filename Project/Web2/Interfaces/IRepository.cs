using System.Linq.Expressions;
using Web2.Models;

namespace Web2.Interfaces
{
    public interface IRepository<T> where T : BaseClass
    {
        Task<IList<T>> GetAll(Expression<Func<T, bool>>? expression = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, List<string>? includes = null);
        Task<T> Get(Expression<Func<T, bool>> expression, List<string>? includes = null);
        Task Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task Save();
    }
}
