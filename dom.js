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
