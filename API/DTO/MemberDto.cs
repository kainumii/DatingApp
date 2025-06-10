using System;

namespace API.DTO;

public class MemberDto
{
    public int Id { get; set; }  // column

    public string? Username { get; set; }

    public int  Age { get; set; }

    public string? PhotoUrl { get; set; }

    public string? KnownAs { get; set; } = string.Empty;

    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }

    public string? Gender { get; set; }

    public string? Introduction { get; set; }

    public string? Interests { get; set; }

    public string? LookingFor { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public List<PhotoDto>? Photos { get; set; } 
}

public class PhotoDto
{
    public int Id { get; set; }

    public required string Url { get; set; } = string.Empty;

    public bool IsMain { get; set; }

    public string? PublicId { get; set; }
}