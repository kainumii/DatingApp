using System;

namespace API.Entities;

public class User  // table
{
    public int Id { get; set; }  // column
    
    public required string UserName { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }
}
