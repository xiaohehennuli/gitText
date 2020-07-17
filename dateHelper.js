"use strict";
// 本地数据操作类的封装
var DateHelper = /** @class */ (function () {
    function DateHelper(key, dateIndex) {
        this.key = key;
        this.dateIndex = dateIndex;
    }
    // 保存数据的方法
    DateHelper.prototype.saveDate = function (arrDate) {
        // 1.将数组对象转为字符串类型
        var str = JSON.stringify(arrDate);
        localStorage.setItem(this.key, str);
        // localStorage.setItem(this.key,arrDate)
    };
    // 读数据的方法
    DateHelper.prototype.readDate = function () {
        var str = localStorage.getItem(this.key);
        var arrDate = [];
        if (str != null) {
            arrDate = JSON.parse(str);
        }
        return arrDate;
    };
    // 删除数据的方法
    DateHelper.prototype.deleteDate = function (index) {
        var _this = this;
        // 根据传入的index 删除
        var arrDate = this.readDate();
        var delIndex = arrDate.findIndex(function (ele) {
            return ele[_this.dateIndex] == index;
        });
        if (delIndex > -1) {
            arrDate.splice(delIndex, 1);
            // 保存到本地
            this.saveDate(arrDate);
            return true;
        }
        return false;
    };
    // 新增数据 
    DateHelper.prototype.addDate = function (conStr) {
        var arrDate = this.readDate();
        var newId = arrDate.length > 0 ? arrDate[arrDate.length - 1][this.dateIndex] + 1 : 1;
        conStr[this.dateIndex] = newId;
        this.saveDate(conStr);
        return newId;
    };
    return DateHelper;
}());
