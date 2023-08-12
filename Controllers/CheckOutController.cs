﻿using Microsoft.AspNetCore.Mvc;
using Shop.Services.OrderService.Contract;
using Shop.Services.ProductService.Contract;
using Shop.Services.ShoppingCartService.Contract;

namespace Shop.Controllers
{
    public class CheckOutController : BaseController
    {
        private readonly IOrderService orderService;
        private readonly IShoppingCartService shoppingCartService;

        public CheckOutController(IOrderService orderService, IShoppingCartService shoppingCartService)
        {
            this.orderService = orderService;
            this.shoppingCartService = shoppingCartService;
        }
       

        [HttpGet]
        public async Task<IActionResult> CheckOut()
        {

            var Id = Guid.Parse(GetUserId());
            var model = await orderService.GetOrderAdressAsync(Id);
            var model2 = shoppingCartService.GetUserShoppingCartPorductsAsync(Id);

            return View(model);
        }
    }
}