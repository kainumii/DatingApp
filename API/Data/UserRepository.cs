using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(int id)
    {
        var user = await context.Users.FindAsync(id);
        return user;            
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
       return await context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == username.ToLower());
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await context.Users.Include(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        int count = await context.SaveChangesAsync();
        if(count > 0)
        {
            return true;
        }
        return false;
    }

    public void Upadate(User user)
    {
        context.Entry(user).State = EntityState.Modified;       
    }
}
