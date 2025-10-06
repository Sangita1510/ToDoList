using ToDoList.Server.Models;

namespace ToDoList.Server.Services
{
    public class TodoService
    {
        private static List<TodoItem> _todos = new();
        private static int _idCounter = 1;

        public List<TodoItem> GetAll() => _todos;

        public TodoItem? Get(int id) => _todos.FirstOrDefault(t => t.Id == id);

        public TodoItem Add(TodoItem item)
        {
            item.Id = _idCounter++;
            _todos.Add(item);
            return item;
        }

        public void Delete(int id) => _todos.RemoveAll(t => t.Id == id);

        public void Update(TodoItem item)
        {
            var index = _todos.FindIndex(t => t.Id == item.Id);
            if (index != -1)
                _todos[index] = item;
        }
    }
}
