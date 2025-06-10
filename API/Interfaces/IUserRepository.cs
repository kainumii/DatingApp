using System;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Upadate(User user);
    Task<bool> SaveAllAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<IEnumerable<User>> GetUsersAsync();
}
