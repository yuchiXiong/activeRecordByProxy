
class BaseActiveRecord {
    constructor(record) {
        Object.keys(record).map(item => this[item] = record[item])
    }
    toJSON() {
        const res = {};
        Object.keys(this).map(item => res[item] = this[item]);
        return res;
    }
}

const ActiveRecord = new Proxy(BaseActiveRecord, {
    construct: function (target, args, newTarget) {
        const nativeObj = new target(args[0]);
        nativeObj.__proto__ = newTarget.prototype;

        return new Proxy(nativeObj, {
            get: function (obj, prop) {
                if (Reflect.has(obj, prop)) return Reflect.get(...arguments);
                if (prop !== 'save') throw new Error(`${prop} is not a function!`)

                return function () {
                    const tableName = obj.__proto__.constructor.name.toLowerCase() + 's';
                    ActiveRecord.db[tableName] = (ActiveRecord.db[tableName] || []);
                    ActiveRecord.db[tableName].push(this.toJSON());
                }
            },
        });
    },
    get: function (obj, prop, receiver) {
        if (Reflect.has(obj, prop)) return Reflect.get(...arguments);

        const tableName = receiver.prototype.constructor.name.toLowerCase() + 's';
        switch (prop) {
            case 'create':
                return function () {
                    ActiveRecord.db[tableName] = (ActiveRecord.db[tableName] || []);
                    ActiveRecord.db[tableName].push(arguments[0]);
                }
            default:
                if (prop.startsWith('findBy')) {
                    const attr = prop.slice(prop.indexOf('findBy') + 6, prop.length).toLowerCase();

                    return function () {
                        return ActiveRecord.db[tableName].filter(item => item[Object.keys(item).filter(item => item.toLowerCase() === attr)[0]] === arguments[0]);
                    }
                }
        }
    }
});

ActiveRecord.init = function (option) {
    ActiveRecord.db = option.db;
}

module.exports = ActiveRecord;