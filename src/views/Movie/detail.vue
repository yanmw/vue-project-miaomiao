<template>
  <div id="detailContrainer" class="slide-enter-active">
    <!-- <header id="header">

       <h1>影片详情</h1>
     </header>-->
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading"/>
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"
             :style="{'background-image': 'url('+detailMovie.img.replace(/w\.h/,'/148.208/')+')'}"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | setWH('/148.208/')" alt="">
          </div>
          <div class="detail_list_info">
            <h2>{{detailMovie.nm}}</h2>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.sc}}</p>
            <p>{{detailMovie.cat}}</p>
            <p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
            <p>{{detailMovie.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{detailMovie.dra}}
        </p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">
            <div>
              <img :src="item | setWH('/170.147/')" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    name: "detail",
    components: {
      Header
    },
    props: ['movieId'],
    methods: {
      handleToBack() {
        this.$router.back()
      }
    },
    data() {
      return {
        detailMovie: {},
        isLoading: true
      }
    },
    mounted() {
      // console.log(this.movieId)
      //  http://39.97.33.178/api/detailmovie?movieId=345808
      this.axios.get('/api/detailmovie?movieId=' + this.movieId).then((res) => {
        // console.log(res)
        const msg = res.data.msg;
        if (msg === 'ok') {
          this.isLoading = false
          this.detailMovie = res.data.data.detailMovie;
          this.$nextTick(() => {
            new Swiper(this.$refs.detail_player, {
              slidesPerView: 'auto',
              freeMode: true,
              freeModeSticky: true
            })
          });
        }
      });
    }
  }
</script>

<style scoped>
  #detailContrainer {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    min-height: 100%;
    background: white;
  }

  #detailContrainer.slide-enter-active {
    animation: .3s slideMove;
  }

  @keyframes slideMove {
    0% {
      transform: translateX(100%)
    }
    100% {
      transform: translateX(0%)
    }
  }

  #content.contentDetail {
    display: block;
    margin-bottom: 0;
  }

  #content .detail_list {
    height: 200px;
    width: 100%;
    position: relative;/*相对位置*/
    overflow: hidden;/*该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位。*/
    text-overflow: ellipsis;	/*当对象内文本溢出时显示省略标记（...）*/
  }

  .detail_list .detail_list_bg {
    width: 100%;
    height: 100%;
    /*background: url(../../../static/images/movie_1.jpg) 0 40%;*/
    /* 设置高斯模糊 */
    filter: blur(20px);
    /*
    background-size：100% 100%;---按容器比例撑满，图片变形；
    background-size：cover;---把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉。
    */
    background-size: cover;
    position: absolute;/*绝对位置*/
    left: 0;
    top: 0;
  }

  .detail_list .detail_list_filter {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #40454d;
    opacity: .55;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .detail_list .detail_list_content {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

  .detail_list .detail_list_img {
    width: 108px;
    height: 150px;
    border: solid 1px #f0f2f3;
    margin: 20px;
  }

  .detail_list .detail_list_img img {
    width: 100%;
    height: 100%;
  }

  .detail_list .detail_list_info {
    margin-top: 20px;
  }

  .detail_list .detail_list_info h2 {
    font-size: 20px;
    color: white;
    font-weight: normal;
    line-height: 40px;
  }

  .detail_list .detail_list_info p {
    line-height: 20px;
    font-size: 14px;
    color: #ccc;
  }

  #content .detail_intro {
    padding: 10px;
  }

  #content .detail_player {
    margin: 20px;
  }

  .detail_player .swiper-slide {
    width: 70px;
    margin-right: 20px;
    text-align: center;
    font-size: 14px;
  }

  .detail_player .swiper-slide img {
    width: 100%;
    margin-bottom: 5px;
  }

  .detail_player .swiper-slide p:nth-of-type(2) {
    color: #999;
  }

</style>
