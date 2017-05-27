Page({

  /**
   * 页面的初始数据
   */
  data: {
    testText: []
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
    console.log(this.data.inputValue);
    var inputValue = this.data.inputValue;
    if (inputValue) {
      this.data.testText.push({ "event": this.data.inputValue });
      this.setData({
        testText: this.data.testText
      })
    }
  },

  deleteIt: function (e) {
    var index = e.target.id;
    var item = this.data.testText[index];
    this.data.testText.splice(index, 1);
    this.setData({
      testText: this.data.testText
    })
  },
})