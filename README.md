# Dom.js 🧩  
A lightweight, chainable JavaScript class for managing object arrays — like a tiny in-memory database with filtering, transforming, and localStorage support.

---

## 📦 Features

- ✅ Fully **chainable** API (`add`, `update`, `remove`, etc.)
- ✅ Works with **arrays of objects**
- ✅ Filter, find, sort, map, and transform data
- ✅ Easily **save/load** from `localStorage`
- ✅ Schema-based **data validation**
- ✅ Useful for state management, frontend tools, or browser apps

---

## ⚙️ Installation

### Option 1: Copy directly

Copy the `Dom` class into your JavaScript file (see below).

### Option 2: Load via `<script>`

```html
<script src="dom-lite.js"></script>

🧪 Usage with Data, Functions & Output
➕ Add Records
js
Copy
Edit
const users = new Dom();

users
  .add({ id: 1, name: "Alice", role: "admin" })
  .add([
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "guest" }
  ]);

console.log(users.result());
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "guest" }
]

✏️ Update Record
js
Copy
Edit
users.update({ role: "editor" }, { id: 2 });
console.log(users.find({ id: 2 }));
📤 Output:

js
Copy
Edit
{ id: 2, name: "Bob", role: "editor" }
❌ Remove Record
js
Copy
Edit
users.remove({ role: "guest" });
console.log(users.result());
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" }
]
🔍 Find & Filter
js
Copy
Edit
console.log(users.find({ name: "Alice" }));
console.log(users.filter({ role: "admin" }));
📤 Output:

js
Copy
Edit
{ id: 1, name: "Alice", role: "admin" }

[
  { id: 1, name: "Alice", role: "admin" }
]
🧠 Select Fields
js
Copy
Edit
console.log(users.select(["name"]));
📤 Output:

js
Copy
Edit
[
  { name: "Alice" },
  { name: "Bob" }
]
📈 Sort by Name
js
Copy
Edit
users
  .add({ id: 4, name: "Zara", role: "admin" })
  .sortBy("name");

console.log(users.result());
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" },
  { id: 4, name: "Zara", role: "admin" }
]
🔄 Transform with map()
js
Copy
Edit
users.map(u => ({
  ...u,
  email: `${u.name.toLowerCase()}@example.com`
}));

console.log(users.result());
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
💾 Save & Load from LocalStorage
js
Copy
Edit
users.save("users");

const loaded = new Dom("users");
console.log(loaded.result());
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
🧹 Clear All Data
js
Copy
Edit
users.clear();
console.log(users.result());
📤 Output:

js
Copy
Edit
[]
✅ Validate Schema
js
Copy
Edit
users
  .add({ id: "oops", name: null, role: 999 })
  .validate({ id: "number", name: "string", role: "string" })
  .log();
📤 Output:

js
Copy
Edit
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
📄 License
MIT — Free for personal or commercial use.
