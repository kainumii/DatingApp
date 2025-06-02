using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config): ITokenService
{
    public string CreateToken(User user)
    {
        // Here you would typically create a JWT token for the user
        // For now, we will just return a placeholder string

        var tokenKey = config["TokenKey"] ?? throw new Exception("TokenKey is not configured");
        if(tokenKey.Length < 64)
        {
            throw new ArgumentException("TokenKey must be at least 64 characters long");
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserName),            
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);  


        return tokenHandler.WriteToken(token);
    }
}
