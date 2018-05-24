using System;
using System.Text;
using DotNetify;
using DotNetify.Security;
using dotnetify_react_template;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace t
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add OpenID Connect server to produce JWT access tokens.
            services.AddAuthenticationServer();

            services.AddMemoryCache();
            services.AddSignalR();
            services.AddDotNetify();

            services.AddTransient<ILiveDataService, MockLiveDataService>();
            services.AddSingleton<IEmployeeService, EmployeeService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseWebSockets();
            app.UseSignalR(routes => routes.MapDotNetifyHub());
            app.UseDotNetify(config =>
            {
                // Middleware to do authenticate token in incoming request headers.
                config.UseJwtBearerAuthentication(new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(AuthServer.SecretKey)),
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromSeconds(0)
                });

                // Filter to check whether user has permission to access view models with [Authorize] attribute.
                config.UseFilter<AuthorizeFilter>();
                app.UseHttpsRedirection();
                app.UseStaticFiles();
                app.UseSpaStaticFiles();


                app.UseSpa(spa =>
             {
                 spa.Options.SourcePath = "ClientApp";

                 if (env.IsDevelopment())
                 {
                     spa.UseReactDevelopmentServer(npmScript: "start");
                 }
             });
            });
        }
    }
}
