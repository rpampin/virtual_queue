using System;

namespace VirtualQueue.Models
{
    public class Client
    {
        public Guid Id { get; set; }
        public Queue Queue { get; set; }
        public int Number { get; set; }
        public string SecretCode { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? CallingDate { get; set; }
        public bool Cancelled { get; set; }
    }
}