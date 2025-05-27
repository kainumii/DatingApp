using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(DataContext context) : ControllerBase
    {
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return Ok(users);
        }      

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            // Replace with actual user retrieval logic
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
                      
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<object>> CreateUser(object userDto)
        {
            // Replace with actual user creation logic
            var user = new object();

            return CreatedAtAction(nameof(GetUser), new { id = 1 }, user);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, object userDto)
        {
            // Replace with actual user update logic
            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Replace with actual user deletion logic
            return NoContent();
        }
    }
}