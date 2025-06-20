using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = String.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    [Required]   
    public string? DateOfBirth { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? Country { get; set; }

    [Required]
    public  string? KnownAs { get; set; }
    
[Required]
    public  string? Gender { get; set; }
}
