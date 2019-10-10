<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"/>
    <Scroller v-else>
      <ul>
        <li v-for="item in cinemas" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <!--  <div v-if="item.tag.snack ===1">小吃</div>
              <div v-show="item.tag.vipTag">折扣卡</div>-->
            <div v-for="(num,key) in item.tag" v-if="num ===1" :key="key" :class="key | classFilter">{{key |
              formatCard}}
            </div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
  export default {
    name: "CinemaList",
    data() {
      return {
        cinemas: [],
        isLoading: true,
        prevCityId: -1
      }
    },
    activated() {
      const cityId = this.$store.state.city.id;
      if (cityId === this.prevCityId) {
        return
      }
      this.isLoading = true
      this.axios.get('/api/cinemaList?cityId='+cityId).then((res) => {
        const msg = res.data.msg;
        if (msg === 'ok') {
          this.cinemas = res.data.data.cinemas;
          this.isLoading = false;
          this.prevCityId = cityId
        }
      })
    },
    filters: {
      formatCard(key) {
        let card = [
          {key: 'allowRefund', value: '允许退款'},
          {key: 'buyout', value: '包场'},
          {key: 'cityCardTag', value: '影城卡'},
          {key: 'snack', value: '小吃'},
          {key: 'vipTag', value: '折扣卡'},
          {key: 'deal', value: '头给打爆'},
          {key: 'endorse', value: '白给'},
          {key: 'sell', value: '改签'}
        ]
        for (let i = 0; i < card.length; i++) {
          if (card[i].key === key) {
            return card[i].value
          }
        }
        return ''
      },
      classFilter(key) {
        let card = [
          {key: 'allowRefund', value: 'or'},
          {key: 'buyout', value: 'or'},
          {key: 'cityCardTag', value: 'or'},
          {key: 'snack', value: 'or'},
          {key: 'vipTag', value: 'bl'},
          {key: 'deal', value: 'bl'},
          {key: 'endorse', value: 'bl'},
          {key: 'sell', value: 'bl'}
        ]
        for (let i = 0; i < card.length; i++) {
          if (card[i].key === key) {
            return card[i].value
          }
        }
        return ''
      }
    }

  }
</script>

<style scoped>
  #content .cinema_body {
    flex: 1;
    overflow: auto;
  }

  .cinema_body ul {
    padding: 20px;
  }

  .cinema_body li {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .cinema_body div {
    margin-bottom: 10px;
  }

  .cinema_body .q {
    font-size: 11px;
    color: #f03d37;
  }

  .cinema_body .price {
    font-size: 18px;
  }

  .cinema_body .address {
    font-size: 13px;
    color: #666;
  }

  .cinema_body .address span:nth-of-type(2) {
    float: right;
  }

  .cinema_body .card {
    display: flex;
  }

  .cinema_body .card div {
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    color: #f90;
    border: 1px solid #f90;
    font-size: 13px;
    margin-right: 5px;
  }

  .cinema_body .card div.or {
    color: #f90;
    border: 1px solid #f90;
  }

  .cinema_body .card div.bl {
    color: #589daf;
    border: 1px solid #589daf;
  }
</style>
