<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"/>
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li v-show="this.pullDownMsg" class="pullDown">{{this.pullDownMsg}}</li>
        <li v-for="movie in movieList" :key="movie.id">
          <div class="pic_show" @tap="handleToDetail(movie.id)"><img :src="movie.img | setWH('/128.180/')"></div>
          <div class="info_list">
            <h2 @tap="handleToDetail(movie.id)">{{movie.nm}} <img src="@/assets/maxs.png" alt="" v-if="movie.version === 'v3d'"></h2>
            <p>观众评 <span class="grade">{{movie.sc}}</span></p>
            <p>主演: {{movie.star}}</p>
            <p>{{movie.showInfo}}</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
  // import BetterScroll from 'better-scroll';

  export default {
    name: "NowPlaying",
    activated() {

      const cityId = this.$store.state.city.id;
      if (cityId === this.prevCityId) {
        return
      }
      this.isLoading = true

      this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
        // console.log(res);
        const msg = res.data.msg;
        if (msg === 'ok') {
          this.movieList = res.data.data.movieList
          this.isLoading = false
          this.prevCityId = cityId


          //注释掉的为 手机端的滑动效果
          /*          this.$nextTick(() => {//页面渲染完毕后触发
                      const scroll = new BetterScroll(this.$refs.movie_body, {
                        tap: true,
                        probeType: 1
                      });
                      //滑动触发
                      scroll.on('scroll', (pos) => {
                        // console.log("aaaaa")
                        if (pos.y > 30) {
                          this.pullDownMsg = '更新中...'
                        }
                      })
                      //滑动结束触发
                      scroll.on('touchEnd', (pos) => {
                        if (pos.y > 30) {
                          this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                            const msg = res.data.msg;
                            if (msg === 'ok') {
                              this.pullDownMsg = '更新成功！';
                              setTimeout(() => {
                                this.movieList = res.data.data.movieList
                                this.pullDownMsg = ''
                              }, 500)
                            }
                          })
                        }
                      })

                    })*/
        }
      });
    },
    data() {
      return {
        movieList: [],
        pullDownMsg: '',
        isLoading: true,
        prevCityId: -1
      }
    },
    methods: {
      handleToDetail(movieId) {
        // console.log(movieId)
        this.$router.push('/movie/detail/1/'+movieId)

      },
      handleToScroll(pos) {
        if (pos.y > 30) {
          this.pullDownMsg = '更新中...'
        }
      },
      handleToTouchEnd(pos) {
        if (pos.y > 30) {
          this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
            const msg = res.data.msg;
            if (msg === 'ok') {
              this.pullDownMsg = '更新成功！';
              setTimeout(() => {
                this.movieList = res.data.data.movieList
                this.pullDownMsg = ''
              }, 500)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #content .movie_body {
    flex: 1;
    overflow: auto;
  }

  .movie_body ul {
    margin: 0 12px;
    overflow: hidden;
  }

  .movie_body ul li {
    margin-top: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px #e6e6e6 solid;
    padding-bottom: 10px;
  }

  .movie_body .pic_show {
    width: 64px;
    height: 90px;
  }

  .movie_body .pic_show img {
    width: 100%;
  }

  .movie_body .info_list {
    margin-left: 10px;
    flex: 1;
    position: relative;
  }

  .movie_body .info_list h2 {
    font-size: 17px;
    line-height: 24px;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .movie_body .info_list p {
    font-size: 13px;
    color: #666;
    line-height: 22px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .movie_body .info_list .grade {
    font-weight: 700;
    color: #faaf00;
    font-size: 15px;
  }

  .movie_body .info_list img {
    width: 50px;
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .movie_body .btn_mall, .movie_body .btn_mall {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .movie_body .btn_mall {
    background-color: red;
  }

  .movie_body .pullDown {
    margin: 0;
    padding: 0;
    border: none;
  }
</style>
