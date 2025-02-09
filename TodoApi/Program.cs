using ToDoDbContext = TodoApi.ToDoDbContext;
using Item = TodoApi.Item;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ToDoDbContext>();
var connectionString = Environment.GetEnvironmentVariable("ToDoDB");
builder.Services.AddCors(options =>
{
            options.AddPolicy("AllowAllOrigins",
            builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Environment.EnvironmentName = "Development";
var app = builder.Build();
app.UseCors("AllowAllOrigins");
// if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapGet("/",  () =>"hello");
app.MapGet("/items", async (ToDoDbContext db) =>
{
    var items = await db.Items.ToListAsync();
    return Results.Ok(items);
});

app.MapPost("/items", async (ToDoDbContext db, Item item) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});



app.MapDelete("/items/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null)
    {
        return Results.NotFound();
    }
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPut("/items/{id}", async (ToDoDbContext db, int id, Item item) =>
{
    if (id != item.Id)
    {
        return Results.BadRequest("Id mismatch");
    }
    db.Items.Update(item);
    await db.SaveChangesAsync();
    return Results.Ok(item);
}); 

app.Run();
