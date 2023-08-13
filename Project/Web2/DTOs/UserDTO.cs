﻿using Web2.Models;

namespace Web2.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string? Address { get; set; }
        public UserType Type { get; set; }
        public byte[]? Image { get; set; }
    }
}
