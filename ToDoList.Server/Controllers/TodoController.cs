using Microsoft.AspNetCore.Mvc;
using ToDoList.Server.Models;
using ToDoList.Server.Services;

namespace ToDoList.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _service;

        public TodoController(TodoService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<TodoItem>> GetAll() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<TodoItem> Get(int id)
        {
            var item = _service.Get(id);
            return item == null ? NotFound() : item;
        }

        [HttpPost]
        public ActionResult<TodoItem> Create(TodoItem item)
        {
            var created = _service.Add(item);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TodoItem item)
        {
            if (id != item.Id) return BadRequest();
            _service.Update(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }
    }
}
