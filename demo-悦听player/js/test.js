var app= new Vue({
    el:'#player',
    data:{
        //查询关键词
        query:"",
        musicList:[],
        musicUrl:"",
        picUrl:"",
        hotComments:[],
        isPlay:false,
        isShow:false,
        mvUrl:""
    },
    methods: {
        searchMusic() {
            if (this.query == 0) {
              return
            }
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(response => {
              // 保存内容
              this.musicList = response.data.result.songs;
              //console.log(response.data.result.songs);
            })
  
            // 清空搜索
            this.query = ''
          },
        playMusic:function (musicId) {
            //console.log(musicId);
            var that=this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function (response) {
              //console.log(response);
              //console.log(response.data.data[0].url);
              that.musicUrl=response.data.data[0].url;
            },function(err){

            });
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
              //console.log(response);
             // console.log(response.data.songs[0].al.picUrl);
             that.picUrl=response.data.songs[0].al.picUrl;
            },function(err){

            });
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
              console.log(response.data.hotComments);
              that.hotComments=response.data.hotComments;
            },function(err){
              console.log(err);
            })
        },
        play:function(){
          console.log("play");
          this.isPlay=true;
        },
        pause:function(){
          console.log("pause");s
          this.isPlay=false;
        },
        playMv:function(mvid){
          var that=this;
          axios.get("https://autumnfish.cn/mv/url?id="+mvid)
          .then(function(response){
            //console.log(response);
            console.log(response.data.data.url);
            that.mvUrl=response.data.data.url;
            that.isShow=true;
          },function(err){})
        },

        hideMv:function(){
          this.isShow=false;
          this.mvUrl='';
        }
    }
})
