# Active Record by Proxy

**这是一个并没有什么卵用的玩具。**

在 `Ruby On Rails` 中，定义一个 `Modal` 以后，`Active Record` 可以自动通过数据表的字段名生成查询方法，例如：
`users` 表拥有 `username` 和 `nickname` 两个字段，则可以直接使用 `find_by_username` 和 `find_by_nickname` 两个方法进行数据库查询。

这是通过 `元编程` 的技巧在程序运行过程中动态定义实现的。

`ECMAScript6` 中的 `Proxy/Reflect API` 也能实现类似的效果。

**Example**
```javascript
const ActiveRecord = require('./ActiveRecord');

// 1. 初始化一个数据源（假装自己是数据库）
const DB = {};
ActiveRecord.init({
    db: DB,
});

class User extends ActiveRecord { // 2. 定义一个 ORM 实体类，只需要继承 ActiveRecord 即可
}

// 3.1 创建一条数据方式1： 实例化并save
const yuchi = new User({
    userName: 'yuchi',
    password: '123456',
    nickName: '鱼翅'
});

yuchi.save();

// 3.2 创建一条数据方式2： 使用create方法
User.create({
    userName: 'xiaoming',
    password: '11111',
    nickName: '小明'
});

// 4. 查看一下虚拟的数据库数据 
console.log(DB);

// 5. 通过属性进行查询
console.log(User.findByUserName('yuchi'));
console.log(User.findByNickName('小明'));
console.log(User.findByPassword('11111'));

// 在创建一个实体类……
class Book extends ActiveRecord { }

Book.create({ name: '《我们的土地》', author: '[墨西哥] 卡洛斯·富恩特斯', pageTotal: '1036', price: '168', ISBN: '9787521211542' });
Book.create({ name: '《戛纳往事》', author: '[法]吉尔·雅各布', pageTotal: '712', price: '148', ISBN: '9787308211208' });


console.log('查询结果：', Book.findByName('《戛纳往事》'));
console.log('查询结果：', Book.findByAuthor('[法]吉尔·雅各布'));
console.log('查询结果：', Book.findByPageTotal('712'));
console.log('查询结果：', Book.findByPrice('168'));
console.log('查询结果：', Book.findByISBN('9787308211208'));

```