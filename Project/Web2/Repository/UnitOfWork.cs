using Web2.Interfaces;
using Web2.Models;
using Web2.Settings;

namespace Web2.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreDbContext _context;

        public IRepository<Item> Items { get; }
        public IRepository<Order> Orders { get; }
        public IRepository<Product> Products { get; }
        public IRepository<User> Users { get; }

        public UnitOfWork(StoreDbContext context, IRepository<Item> items, IRepository<Order> orders, IRepository<Product> products, IRepository<User> users)
        {
            _context = context;
            Items = items;
            Orders = orders;
            Products = products;
            Users = users;
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();                            
        }
    }
}
