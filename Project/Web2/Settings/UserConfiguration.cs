using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using Web2.Models;

namespace Web2.Settings
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Username).HasMaxLength(100).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();
            builder.Property(x => x.Email).HasMaxLength(100).IsRequired();
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.FullName).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Password).HasMaxLength(300).IsRequired();
            builder.Property(x => x.Address).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Type).HasConversion(new EnumToStringConverter<UserType>()).IsRequired();
            builder.Property(x => x.Birthday).IsRequired();
            builder.Property(x => x.VerificationStatus).HasConversion(new EnumToStringConverter<VerificationStatus>()).IsRequired();

            builder.HasData(new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@luka.com",
                FullName = "Admin Admin",
                Password = BCrypt.Net.BCrypt.HashPassword("123"),
                Address = "Admin 123",
                Type = UserType.Administrator,
                Birthday = new DateTime(1978, 12, 11)
            },
            new User
            {
                Id = 2,
                Username = "seller",
                Email = "luka.ciric2000@gmail.com",
                FullName = "Seller Seller",
                Password = BCrypt.Net.BCrypt.HashPassword("123"),
                Address = "Seller 123",
                Type = UserType.Seller,
                Birthday = new DateTime(1978, 12, 11),
                VerificationStatus = VerificationStatus.Waiting,
            },
            new User
            {
                Id = 3,
                Username = "buyer",
                Email = "buyer@luka.com",
                FullName = "Buyer Buyer",
                Password = BCrypt.Net.BCrypt.HashPassword("123"),
                Address = "Buyer 123",
                Type = UserType.Buyer,
                Birthday = new DateTime(1978, 12, 11)
            });
        }
    }
}
