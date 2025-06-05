using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"] ?? throw new InvalidOperationException("TokenKey is not configured"))),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200")); // Adjust the origin as needed;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Authentication vs Authorization
// Authentication
// Authentication is about identity verification - confirming that users are who they claim to be.

// Answers the question: "Who are you?"
// Verifies a user's credentials and identity
// Occurs before authorization
// Examples: login with username/password, JWT tokens, biometrics, 2FA
// In your code, app.UseAuthentication() activates the JWT authentication middleware that validates tokens to confirm user identity.

// Authorization
// Authorization is about permission management - determining what an authenticated user is allowed to do.

// Answers the question: "What are you allowed to do?"
// Determines if a user has permission to access a resource or perform an action
// Always happens after authentication
// Examples: role-based access control, claims-based permissions, policies
// In your code, app.UseAuthorization() sets up the middleware that enforces these access controls.

// Key Distinction
// The simplest way to remember:

// Authentication: Proves who someone is
// Authorization: Determines what they can access
// Note how your middleware is correctly ordered in the pipeline - authentication must come before authorization since you need to know who someone is before you can determine what they're allowed to do.

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
