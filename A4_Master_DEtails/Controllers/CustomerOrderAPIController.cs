using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using A4_Master_DEtails.Models;

namespace A4_Master_DEtails.Controllers
{
    public class CustomerOrderAPIController : ApiController
    {
        ApplicationsEntities ctx;
        public CustomerOrderAPIController()
        {
            ctx = new ApplicationsEntities(); 
        }

        [Route("Customers")]
        public List<Customer> GetCustomers()
        {
            var Res = (from c in ctx.Customers.ToList()
                      select new Customer()
                      {
                           CustomerId = c.CustomerId,
                           CustomerName = c.CustomerName,
                           Email = c.Email,
                           ContactNo = c.ContactNo
                      }).ToList();
            return Res;
        }

        [Route("Customer/Orders/{id}")]
        public List<Order> GetOrders(int id)
        {
            var Res = (from o in ctx.Orders.ToList()
                       where o.CustomerId == id
                       select new Order()
                       {
                            OrderId = o.OrderId,
                            OrderedItem = o.OrderedItem,
                            OrderedQuantity = o.OrderedQuantity,
                            OrderedDate = o.OrderedDate
                       }).ToList();

            return Res;
        }
    }
}
