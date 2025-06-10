using System.Text.Json;
using API.Entities;

namespace API.Data;

class SeedData
{
    public static async Task SeedUsers(DataContext context)
    {
        if (context.Users.Any()) return;

        var data = await File.ReadAllTextAsync("Data/SeedData.json");

        var users = JsonSerializer.Deserialize<List<User>>(data, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (users != null)
        {
            foreach (var user in users)
            {
                var hmac = new System.Security.Cryptography.HMACSHA512();
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("salasana")); // Placeholder password
                user.UserName = user.UserName.ToLower();

                context.Users.Add(user);
            }
        }
        
        await context.SaveChangesAsync();
        Console.WriteLine("Seeded users data");
    }
}