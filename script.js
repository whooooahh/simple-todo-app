// Todoアプリのメイン機能（優先度機能付き）
class SimpleTodoApp {
    constructor() {
        this.todos = [];
        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
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
            priority: this.prioritySelect.value,
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
    
    // 優先度の表示アイコンを取得
    getPriorityIcon(priority) {
        const icons = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };
        return icons[priority] || '⚪';
    }
    
    // 優先度順でソート
    sortTodosByPriority(todos) {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...todos].sort((a, b) => {
            // 完了状態で分ける（未完了が上）
            if (a.completed !== b.completed) {
                return a.completed - b.completed;
            }
            // 優先度でソート（高い方が上）
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
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
        
        const sortedTodos = this.sortTodosByPriority(this.todos);
        
        this.todoList.innerHTML = sortedTodos
            .map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}" data-priority="${todo.priority}">
                    <div class="todo-content">
                        <span class="priority-icon">${this.getPriorityIcon(todo.priority)}</span>
                        <span class="todo-text">${todo.text}</span>
                        <span class="todo-date">${todo.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div class="todo-actions">
                        <button class="toggle-btn" onclick="app.toggleTodo(${todo.id})">
                            ${todo.completed ? '↩️ 戻す' : '✅ 完了'}
                        </button>
                        <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">
                            🗑️ 削除
                        </button>
                    </div>
                </li>
            `).join('');
    }
}

// アプリケーションの初期化
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SimpleTodoApp();
});