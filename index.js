// class foo {
//   constructor(){
//       bar=function(){
//           console.log(1);
//       }
//   }
// }
// foo.bar=function(){
//   console.log(4)
// }
// foo.prototype.bar=function(){
//   console.log(3)
// }

// var bar=function(){
//   console.log(4)
// }

// function bar(){
//   console.log(5)
// }

// foo.bar();
// bar();
// new foo().bar();
// bar()
// new foo.bar()
// new new foo().bar()
// function a(b) {
//   console.log(b)
// }
// setTimeout('a(2)', 3000)

/*
* fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
*/
// function debounce(fn, delay) {
//   let timer = null    //借助闭包
//   return function () {
//     if (timer) {
//       clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
//       timer = setTimeOut(fn, delay)
//     } else {
//       timer = setTimeOut(fn, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
//     }
//   }
// }
// 闭包的封装
// const person = (function(){
//   let name = '何男杰';
//   let age = 18;
//   let sex = 9 ;
//   return {
//     getName:function(){
//       return name
//     },
//     getAge:function(){
//       return age
//     },
//     getSex:function(){
//       return sex
//     },
//     setName:function(newName){
//       name = newName
//       return name
//     }
//   }
// })()
// console.log(person.getName())
// console.log(person.setName('哈哈哈'))
// console.log(person.getSex())
// console.log(person.getName())

//  JS继承的6种方式

// 1.ES6继承
// class Person{
//   constructor(name,age){
//     this.name = name;
//     this.age = age
//   }
//   getName(){
//     return this.name
//   }
// }

// class Per extends Person{

// }

// const per1 = new Per('何男接',18)

// console.log(per1)

// 2.原型链继承
// function PerSon(name,sex){
//   this.name= name;
//   this.sex = sex;
//   this.getName=function(){
//     alert(this.name)
//   }
// }

// function Per(){

// }

// Per.prototype = new PerSon('王玉',20)在这里已经把per里的属性值确定好了


// const per2 = new Per('何男接',18)王玉,20 没有意义这种方式不能传递参数，在继承原型时已经固定死了
// const per3 = new Per('嘿嘿',30)王玉,20 没有意义这种方式不能传递参数，在继承原型时已经固定死了

// console.log(per2.name)'王玉'
// console.log(per3.name)'王玉

// 3.构造函数继承(call、apply)
// function Person(name,sex){
//   this.name = name;
//   this.sex = sex;
//   this.getName = function(){
//     alert(this.name)
//   }
// }

// function Sun(name,sex){
//   Person.call(this,name,sex)
// }
// const per1 = new Sun('何男杰',18)
// 这里per1调用Sun 那么 Per.call里的this指向per1
// Person.call(per1,name,sex) == per1.Person(name,sex)
// const per2 = new Sun('王宇',20)
// console.log(per1,per2)
// console.log(per1 instanceof Person) // false 只是借用了父类的构造函数，并没有继承父类的原型

// 4.组合继承（常用）
// 直接融合两种继承方式
// function Person(name,sex){
//   this.name = name;
//   this.sex = sex;
//   this.getName = function(){
//     console.log(this)
//   }
// }

// function Sun(name,sex){
//   Person.call(this,name,sex)
// }
// Sun.prototype = new Person()
// Person.prototype.shcool = '武昌首义学院'
// const per1 = new Sun('何男杰',18)
// const per2 = new Sun('王玉',20)
// console.log(per1,per2)
// console.log(per1.shcool)//武昌首义学院 成功继承了原型

// 5.原型式继承
// function Person(name, sex) {
//   this.name = name;
//   this.sex = sex;
//   this.getName = function () {
//     console.log(this)
//   }
// }

// // 封装一个函数容器，用来输出对象
// function content(obj){
//   function F(){}
//   F.prototype = obj//继承了传入的参数
//   return new F() //反会函数对象
// }
// // 类似于原型链继承
// const sup = new Person()
// const sup1 = content(sup);
// console.log(sup1)

// 6.寄生式继承

// function Person(name, sex) {
//   this.name = name;
//   this.sex = sex;
//   this.getName = function () {
//     console.log(this)
//   }
// }

// 封装一个函数容器，用来输出对象
// function content(obj){
//   function F(){}
//   F.prototype = obj//继承了传入的参数
//   return new F() //反会函数对象
// }
// // 在封装一个壳子，使其可以传递参数
// function subObject(obj,name){
//   let sub = content(obj)
//   sub.name = name
//   return sub
// }
// var sup = new Person();
// var sup2 = subObject(sup,'何男杰')
// console.log(sup2)//{name:'何男杰} 

// 7.寄生组合式继承（常用）
function Person(name,age){
  this.name = name
  this.age = age
}

// 构造函数继承
// 此时son调用了PerSon的构造函数，但是没有继承其原型
function Son(sex,name,age){
  this.sex = sex
  // call和apply的区别
  // Person.call(this,name,age)
  Person.apply(this,[name,age])
}

// 
function myExtends(son,fatehr){
  // 拿到父亲的原型
  let myObj = Object.create(fatehr.prototype)
  // Object.create会把现有的对象挂在到新对象的_proto_下
  // 又因为prototype下有两个属性一个_proto_一个constructor
  // 此时咱们新建的对象构造函数的constructor还没有指向子类构造函数
  // 所以现在这一步是使新建的对象的constructor指向自己的构造函数
  myObj.constructor = son
  // 最后一步把myobj这个对象给子类的原型对象
  // 此时子类的prototype下constructor属性和_proto_属性都配置好了
  son.prototype = myObj
}
// 此时完成继承，解决了构造函数调用两次父类原型的毛病
myExtends(Son,Person)

const a = new Son('男','何男杰',19)
console.log(a)






