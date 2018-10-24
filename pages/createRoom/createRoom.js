// pages/createRoom/createRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dungeons: [],
    index1: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getClipboardData({
      success: function (e) {
        var roomNum = e.data
        console.log(typeof (e.data)) 
        console.log(e.data == 0) 
        if ((roomNum >= 0 && roomNum <= 99999999) && roomNum.length == 8) {
          that.setData({
            roomNum: e.data
          })
        }
      }
    })
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/findDungeon',
      data: {
        index: this.data.index1
      },
      success: function (res) {
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
    wx.getClipboardData({
      success: function (e) {
        var roomNum = e.data
        console.log(typeof (e.data))
        console.log(roomNum.length) 
        if((roomNum >= 0 && roomNum <= 99999999) && roomNum.length == 8){
          that.setData({
            roomNum: e.data
          })
        }
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
  getRoomNum: function(e){
    var val = e.detail.value;
    this.setData({
      roomNum: val
    });
  },
  getLeader: function (e) {
    var val = e.detail.value;
    this.setData({
      leader: val
    });
  },
  getRemark: function (e) {
    var val = e.detail.value;
    this.setData({
      remark: val
    });
  },
  createRoom: function(){
    var roomNum = this.data.roomNum
    var leader = this.data.leader
    var remark = this.data.remark
    var dungeonName = this.data.dungeons[this.data.index1].name
    wx.request({
      url: 'https://www.puzzleanddragon.cn/pad/dungeon/match-two',
      data: {
        roomNum: roomNum,
        leader: leader,
        remark: remark,
        dungeonName: dungeonName
      },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function(res){
        if(res.data.result == 'success'){
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
        }else{
          wx.showModal({
            title: '错误',
            content: '创建失败',
            showCancel: false,
          })
        }
      }
    })
  },
  changeDungeon: function (e) {
    console.log('dungeon发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    console.log(this.data.dungeons[e.detail.value].id)
  }
})