﻿namespace JPGPizza.Models
{   
    public class OrderProduct
    {
        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public int OrderId { get; set; }

        public virtual Product Product { get; set; }

        public virtual Order Order { get; set; }
       
    }
}
