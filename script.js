// Todoアプリのメイン機能
class SimpleTodoApp {
    constructor() {
        this.todos = [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        
        this.init();
    }
    
    init() {
        // イベントリスナーの設定
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        // 初期表示
        this.renderTodos();
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        if (text === '') {
            alert('タスクを入力してください！');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };
        
        this.todos.push(todo);
        this.todoInput.value = '';
        this.renderTodos();
    }
    
    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.renderTodos();
    }
    
    deleteTodo(id) {
        if (confirm('このタスクを削除しますか？')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.renderTodos();
        }
    }
    
    renderTodos() {
        if (this.todos.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    📋 タスクがありません<br>
                    上の入力欄から新しいタスクを追加してみましょう！
                </div>
            `;
            return;
        }
        
        this.todoList.innerHTML = this.todos
            .map(todo => `
                <li class="todo-item ${todo.completed ? 'todo-completed' : ''}">
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <div class="todo-actions">
                        <button class="btn complete-btn" onclick="app.toggleTodo(${todo.id})">
                            ${todo.completed ? '✓' : '○'}
                        </button>
                        <button class="btn delete-btn" onclick="app.deleteTodo(${todo.id})">
                            🗑️
                        </button>
                    </div>
                </li>
            `)
            .join('');
    }
    
    // XSS対策
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// アプリケーションの開始
const app = new SimpleTodoApp();