// pages/searchRoom/searchRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['技术', '降临', '紧急', '三人协力'],
    index: 0,
    dungeons: [''],
    index1: 0,
    name: 'aa',
    roomNum: '12331234',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/findDungeon',
      data: {
        index: this.data.index1
      },
      success: function(res){
        console.log(res.data.dungeons)
        that.setData({
          dungeons: res.data.dungeons,
          index1: 0
        })
      }
    })
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
    var that = this
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/searchRooms',
      success: function (res) {
        var roomList = res.data.roomList
        that.setData({
          roomList: roomList
        })
      }
    })
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
  bindPickerChange: function (e) {
    var that = this
    console.log('type发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/findDungeon',
      data: {
        index: e.detail.value
      },
      success: function(res){
        var dungeons = res.data.dungeons
        console.log(dungeons)
        that.setData({
          dungeons: dungeons,
          index1: 0
        })
      }
    })
  },
  changeDungeon: function(e){
    console.log('dungeon发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    console.log(this.data.dungeons[e.detail.value].id)
  },
  toSearch: function(){
    var that = this
    console.log(this.data.array[this.data.index])
    console.log(this.data.dungeons[this.data.index1].id)
    var id = this.data.dungeons[this.data.index1].id
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/searchRoom',
      data: {
        id, id
      },
      success: function(res){
        var roomList = res.data.roomList
        that.setData({
          roomList: roomList
        })
      }
    })
  },
  copyRoom: function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.roomNum,
      success: function(){
        console.log('copy success!')
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})