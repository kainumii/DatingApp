using System;

namespace API.DTO;

public class UserDto
{
    public required string Username { get; set; }
    public required string Token { get; set; }

    public required string KnownAs { get; set; }
}
