﻿namespace JPGPizza.Models
{
    using System;

    public class Feedback
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CustomerId { get; set; }

        public DateTime CreatedOn { get; set; }

        public int ProductId { get; set; }

        public virtual ApplicationUser Customer { get; set; }

        public virtual Product Product { get; set; }
    }
}
