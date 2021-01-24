using System;
using System.Collections.Generic;

namespace VirtualQueue.Models
{
    public class Queue
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public ICollection<Client> Clients { get; set; }
    }
}