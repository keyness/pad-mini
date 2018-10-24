// pages/createfriend/createfriend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLeader: function (e) {
    var val = e.detail.value;
    this.setData({
      leader: val
    });
  },
  getId: function (e) {
    var val = e.detail.value;
    this.setData({
      id: val
    });
  },
  getRemark: function (e) {
    var val = e.detail.value;
    this.setData({
      remark: val
    });
  },
  createFriend: function () {
    var leader = this.data.leader
    var id = this.data.id
    var remark = this.data.remark
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/create-friend',
      data: {
        leader: leader,
        id: id,
        remark: remark
      },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.data.result == 'success') {
          wx.showToast({
            title: '创建成功',
            success: function () {
              setTimeout(function () {
                console.log('创建成功')
                wx.navigateBack({
                  delta: 2
                })
              }, 1500) //延迟时间 这里是1秒

            }
          })
        } else {
          wx.showModal({
            title: '错误',
            content: '创建失败',
            showCancel: false,
          })
        }
      }
    })
  }
})