<template>
  <div class="city_body">
    <Scroller ref="city_list">
      <div class="city_dev">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="city in topTen" :key="city.id">{{city.nm}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="city in cityList" :key="city.index">
          <h2>{{city.index}}</h2>
          <ul>
            <li v-for="cities in city.list" :key="cities.id">{{cities.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
      </div>
    </Scroller>
    <div class="city_index">
      <ul>
        <li v-for="(city,index) in cityList" :key="city.index" @touchstart="handleToIndex(index)">{{city.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "City",
    data() {
      return {
        cityList: [],
        topTen: []
      }
    },
    mounted() {
      this.axios.get('/api/cityList').then((res) => {
        const msg = res.data.msg;
        // console.log(msg)
        if (msg === 'ok') {
          const cities = res.data.data.cities;
          // console.log(cityList)
          const {cityList, topTen} = this.formatCities(cities);
          this.cityList = cityList
          this.topTen = topTen
        }
      })
    },
    methods: {
      formatCities(cities) {
        //cityList : [{index:'A',list:[{cityInfo}]},{index:'B',list:[{cityInfo}]}]
        let cityList = [];
        let topTen = [];

        for (let i = 0; i < cities.length; i++) {
          if (cities[i].isHot === 1) {
            topTen.push(cities[i])
          }
        }

        for (let i = 0; i < cities.length; i++) {
          let firstLetter = cities[i].py.substring(0, 1).toUpperCase();
          if (isExist(firstLetter)) {
            for (let j = 0; j < cityList.length; j++) {
              if (cityList[j].index === firstLetter) {
                cityList[j].list.push(cities[i])
              }
            }
          } else {
            cityList.push({index: firstLetter, list: [cities[i]]})
          }
        }

        cityList.sort((n1, n2) => {
          if (n1.index > n2.index) {
            return 1;
          } else if (n1.index < n2.index) {
            return -1;
          } else {
            return 0;
          }
        });

        function isExist(firstLetter) {
          for (let i = 0; i < cityList.length; i++) {
            if (cityList[i].index === firstLetter) {
              return true;
            }
          }
          return false;
        }

        return {
          cityList, topTen
        }
      },
      handleToIndex(index) {
        const h2 = this.$refs.city_sort.getElementsByTagName('h2')
        // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
        this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
      }
    }
  }
</script>

<style scoped>
  #content .city_body {
    margin-top: 45px;
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .city_body .city_list {
    flex: 1;
    overflow: auto;
    background: #FFF5F0;
  }

  .city_body .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
  }

  .city_body .city_hot {
    margin-top: 20px;
  }

  .city_body .city_hot h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #F0F0F0;
    font-weight: normal;
  }

  .city_body .city_hot ul {
  }

  .city_body .city_hot ul li {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 3%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
  }

  .city_body .city_sort {
  }

  .city_body .city_sort div {
    margin-top: 20px;
  }

  .city_body .city_sort h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #F0F0F0;
    font-weight: normal;
  }

  .city_body .city_sort ul {
    padding-left: 10px;
    margin-top: 10px;
  }

  .city_body .city_sort ul li {
    line-height: 30px;
    line-height: 30px;
  }

  .city_body .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
  }

  .city_body .city_dev {
    width: 375px;
  }

</style>
