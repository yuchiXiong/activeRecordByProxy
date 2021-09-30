const ActiveRecord = require('./ActiveRecord');

// 1. 初始化一个数据源（模拟数据库）
const DB = {};
ActiveRecord.init({
    db: DB,
});

class User extends ActiveRecord { // 2. 定义一个ORM实体类
}

// 3.1 创建一条数据方式1： 实例化并save
// const yuchi = new User({
//     userName: 'yuchi',
//     password: '123456',
//     nickName: '鱼翅'
// });

// yuchi.save();

// 3.2 创建一条数据方式2： 使用create方法
// User.create({
//     userName: 'xiaoming',
//     password: '11111',
//     nickName: '小明'
// });

// 4. 查看虚拟的数据库数据 
// console.log(DB);

// 5. 通过属性进行查询
// console.log(User.findByUserName('yuchi'));
// console.log(User.findByNickName('小明'));
// console.log(User.findByPassword('11111'));

class Book extends ActiveRecord { }

Book.create({ name: '《我们的土地》', author: '[墨西哥] 卡洛斯·富恩特斯', pageTotal: '1036', price: '168', ISBN: '9787521211542' });
Book.create({ name: '《戛纳往事》', author: '[法]吉尔·雅各布', pageTotal: '712', price: '148', ISBN: '9787308211208' });


console.log('查询结果：', Book.findByName('《戛纳往事》'));
console.log('查询结果：', Book.findByAuthor('[法]吉尔·雅各布'));
console.log('查询结果：', Book.findByPageTotal('712'));
console.log('查询结果：', Book.findByPrice('168'));
console.log('查询结果：', Book.findByISBN('9787308211208'));
