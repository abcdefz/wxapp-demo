Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    console.log("xia la shua xin");
  },

  bindKeyInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value
    })
  },

  setInput: function (e) {
    console.log("添加", this.data.inputValue);
    var inputValue = this.data.inputValue;
    if (inputValue) {
      this.data.items.push({ "event": this.data.inputValue });
      this.setData({
        items: this.data.items
      });
      wx.setStorage({
        key: "input",
        data: this.data.items
      });
      wx.getStorage({
        key: 'input',
        success: function (res) {
          console.log(res.data)
        },
        fail: function (res) {
          console.log(res.data)
        }
      })
    }
  },

  deleteIt: function (e) {
    var index = e.target.id;
    var item = this.data.items[index];
    this.data.items.splice(index, 1);
    this.setData({
      items: this.data.items
    })
  },

  // ----- 滑动 ----- 
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    console.log("touchstart");
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    console.log("touchmove");
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          console.log("左滑")
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
 * 计算滑动角度
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  }
})