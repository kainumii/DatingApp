using System;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;

namespace API.Entities;

public class User  // table
{
    public int Id { get; set; }  // column

    public required string UserName { get; set; }

    public byte[] PasswordHash { get; set; } = [];

    public byte[] PasswordSalt { get; set; } = [];

    public DateOnly DateOfBirth { get; set; }

    public string KnownAs { get; set; } = string.Empty;

    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public required string Gender { get; set; }

    public string? Introduction { get; set; }

    public string? Interests { get; set; }

    public string? LookingFor { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public List<Photo> Photos { get; set; } = [];
    
    public int GetAge(DateOnly? referenceDate = null)
    {
        return DateOfBirth.CalculateAge(referenceDate);
    }
}

[Table("Photos")] // This attribute specifies the table name for the Photo entity
public class Photo
{
    public int Id { get; set; }

    public required string Url { get; set; } = string.Empty;

    public bool IsMain { get; set; }

    public string? PublicId { get; set; }

    // https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many#optional-one-to-many
    public int AppUserId { get; set; }
    public User AppUser { get; set; } = null!; // Navigation property to the User entity
}