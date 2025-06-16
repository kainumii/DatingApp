using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.Data;
using API.DTO;
using API.Interfaces;
using API.Services;
using AutoMapper;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService, IMapper mapper) : BaseApiController
{
    [HttpPost("register")] // Route: api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {

        // Here you would typically add logic to register a user
        // For now, we will just return a success message

        if (await UserExists(registerDto.Username))
        {
            return BadRequest("Username is already taken");
        }
       

        using var hmac = new System.Security.Cryptography.HMACSHA512();

        var user = mapper.Map<User>(registerDto);
        user.UserName = registerDto.Username.ToLower();
        user.PasswordSalt = hmac.Key;         
        user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password));

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user),
            KnownAs = user.KnownAs
        };
    }

    [HttpPost("login")] // Route: api/account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    { 
        // Here you would typically add logic to log in a user
        var user = await context.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
        if (user == null)
        {
            return Unauthorized("Invalid username");
        }

        using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password!");
        }

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user), KnownAs = user.KnownAs
        };
    }

    private async Task<bool> UserExists(string username)
    {
        // Check if the user already exists in the database
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}
