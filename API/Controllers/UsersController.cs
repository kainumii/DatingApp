using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepo, IMapper mapper) : BaseApiController
    {
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepo.GetUsersAsync();

            var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);
        }

        // GET: api/users/5
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            // Map User to MemberDto (assuming you have a mapping logic in place)
            // var memberDto = new MemberDto
            // {
            //     Id = user.Id,
            //     UserName = user.UserName,
            //     PhotoUrl = user.Photos?.Count > 0 ? user.Photos[0].Url : null,
            //     // Add other properties as needed
            // };

            var userToReturn = mapper.Map<MemberDto>(user);

            return Ok(userToReturn);
        }

        public async Task<ActionResult<User>> GetUser(int id)
        {
            // Replace with actual user retrieval logic
            var user = await userRepo.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}