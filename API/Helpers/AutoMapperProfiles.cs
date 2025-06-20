using System;
using API.DTO;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, MemberDto>().ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();

        CreateMap<MemberUpdateDto, User>();

        CreateMap<RegisterDto, User>();
           
            CreateMap<string, DateOnly>()
                .ConvertUsing(dateString => DateOnly.Parse(dateString));
    }
}
