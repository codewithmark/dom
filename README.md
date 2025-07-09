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

### Option 1: Copy the `Dom` class into your JavaScript file

```js
class Dom {
    constructor(dataOrKey) {
        if (typeof dataOrKey === 'string') {
            this.storageKey = dataOrKey;
            const saved = localStorage.getItem(dataOrKey);
            this.data = saved ? JSON.parse(saved) : [];
        } else {
            this.data = Array.isArray(dataOrKey) ? dataOrKey : [];
        }
    }

    _type(val) {
        if (Array.isArray(val)) return 'array';
        return typeof val;
    }

    _match(item, criteria) {
        return Object.entries(criteria).every(([k, v]) => item[k] === v);
    }

    add(item) {
        if (Array.isArray(item)) {
            this.data.push(...item);
        } else {
            this.data.push(item);
        }
        return this;
    }

    update(changes, where) {
        this.data.forEach(item => {
            if (this._match(item, where)) {
                Object.assign(item, changes);
            }
        });
        return this;
    }

    remove(where) {
        this.data = this.data.filter(item => !this._match(item, where));
        return this;
    }

    find(where) {
        return this.data.find(item => this._match(item, where)) || null;
    }

    filter(where) {
        return this.data.filter(item => this._match(item, where));
    }

    select(fields) {
        return this.data.map(item => {
            const picked = {};
            fields.forEach(f => picked[f] = item[f]);
            return picked;
        });
    }

    map(fn) {
        this.data = this.data.map(fn);
        return this;
    }

    sortBy(key) {
        this.data.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        return this;
    }

    clear() {
        this.data = [];
        return this;
    }

    save(key) {
        const storageKey = key || this.storageKey;
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(this.data));
        }
        return this;
    }

    load(key) {
        const storageKey = key || this.storageKey;
        if (storageKey) {
            const data = localStorage.getItem(storageKey);
            if (data) this.data = JSON.parse(data);
        }
        return this;
    }

    result() {
        return this.data;
    }

    log() {
        console.log(this.data);
        return this;
    }

    validate(schema) {
        this.data = this.data.filter(item =>
            Object.keys(schema).every(key =>
                typeof item[key] === schema[key]
            )
        );
        return this;
    }
}
```

---

## 🧪 Usage with Data, Functions & Output

### ➕ Add Records

```js
const users = new Dom();

users
  .add({ id: 1, name: "Alice", role: "admin" })
  .add([
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "guest" }
  ]);

console.log(users.result());
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "guest" }
]
```

---

### ✏️ Update Record

```js
users.update({ role: "editor" }, { id: 2 });
console.log(users.find({ id: 2 }));
```

📤 Output:

```js
{ id: 2, name: "Bob", role: "editor" }
```

---

### ❌ Remove Record

```js
users.remove({ role: "guest" });
console.log(users.result());
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" }
]
```

---

### 🔍 Find & Filter

```js
console.log(users.find({ name: "Alice" }));
console.log(users.filter({ role: "admin" }));
```

📤 Output:

```js
{ id: 1, name: "Alice", role: "admin" }

[
  { id: 1, name: "Alice", role: "admin" }
]
```

---

### 🧠 Select Fields

```js
console.log(users.select(["name"]));
```

📤 Output:

```js
[
  { name: "Alice" },
  { name: "Bob" }
]
```

---

### 📈 Sort by Name

```js
users
  .add({ id: 4, name: "Zara", role: "admin" })
  .sortBy("name");

console.log(users.result());
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "editor" },
  { id: 4, name: "Zara", role: "admin" }
]
```

---

### 🔄 Transform with `map()`

```js
users.map(u => ({
  ...u,
  email: `${u.name.toLowerCase()}@example.com`
}));

console.log(users.result());
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
```

---

### 💾 Save & Load from LocalStorage

```js
users.save("users");

const loaded = new Dom("users");
console.log(loaded.result());
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
```

---

### 🧹 Clear All Data

```js
users.clear();
console.log(users.result());
```

📤 Output:

```js
[]
```

---

### ✅ Validate Schema

```js
users
  .add({ id: "oops", name: null, role: 999 })
  .validate({ id: "number", name: "string", role: "string" })
  .log();
```

📤 Output:

```js
[
  { id: 1, name: "Alice", role: "admin", email: "alice@example.com" },
  { id: 2, name: "Bob", role: "editor", email: "bob@example.com" },
  { id: 4, name: "Zara", role: "admin", email: "zara@example.com" }
]
```

---

## 📄 License

MIT — Free for personal or commercial use.

---

## 🙋‍♂️ Author

Created by **[Your Name]**  
Contributions welcome! ⭐
