<template>
<div>
    <img class="body" :src="logoList[num].bgSrc" alt="" @click="kong" />
    <div class="center">
        <div class="anime">
            <img :src="logoList[num].imgSrc" :alt="logoList[num].name" />
            <span class="arrow"></span>
            <ul class="logolist">
                <li v-for="(item,index) in logoList" @click="flashed(index)">
                    <img :src="item.imgSrc" :alt="item.name" />
                </li>
            </ul>
        </div>
        <div id="search">
            <div class="search">
                <input v-model="text" @keyup="get($event)" type="text" class="text" @keydown.down="changeDown" @keydown.up.prevent="changeUp" />
                <transition name="in-out-translate-fade" mode="in-out">
                    <ul class="results" v-show="myData.length!=0">
                        <li v-for="(item,index) in myData"  :class="{gray:index==now}" @click="changeGo(item)" :data-name="item">{{ item }}</li>
                    </ul>
                </transition>
            </div>
            <input type="button" class="button" :style="logoList[num].styles" :class="logoList[num].className" :value="logoList[num].name" @click="searchGo">
        </div>
    </div>
</div>
</template>
<script>
export default{
    data () {
        return {
            num: 0,
            now: -1,
            text: '',
            myData: [],
            logoList: [{
                styles:{
                    backgroundColor:'#3385ff'
                },
                className: 'baidu',
                name:'百度一下',
                imgSrc:'http://cs003.m2828.com/demo/360Search/images/baidu_logo.png',
                bgSrc:'https://ss1.bdstatic.com/kvoZeXSm1A5BphGlnYG/skin/832.jpg?2',
                searchSrc:'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
            },{
                styles:{
                    backgroundColor:'#19b955',
                },
                name:'搜一下',
                imgSrc:'https://p.ssl.qhimg.com/t015c3fa94dfe66b82b.jpg',
                bgSrc:'https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/829.jpg?2',
                searchSrc:'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
            },{
                styles:{
                    backgroundColor:'#fd6853',
                },
                name:'搜狗',
                imgSrc:'http://cs003.m2828.com/demo/360Search/images/sougou_logo.png',
                bgSrc:'https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/827.jpg?2',
                searchSrc:'https://www.sogou.com/web?query='
            }]
        }
    },
    created(){
    },
    methods: {
        // ajax
        get:function(ev){
            // 上下键
            if(ev.keyCode==38 || ev.keyCode==40)return;
            // 回车键调用
            if(ev.keyCode==13){
                this.searchGo();
            }
            this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.text,{jsonp:'cb'}).then(function(res){
                var data = JSON.parse(res.bodyText);
                this.myData = data.s;
            },function(){

            });
        },
        // logo切换
        flashed:function(ev){
            this.num = ev;
        },
        // 下键调用
        changeDown:function(){
            this.now++;
            if(this.now==this.myData.length)this.now=-1;
            this.text=this.myData[this.now];
        },
        // 上键调用
        changeUp:function(){
            this.now--;
            if(this.now==-2)this.now=this.myData.length-1;
            this.text=this.myData[this.now];
        },
        // 点击调用
        searchGo:function(){
            if(this.text == ''){
                alert('请输入搜索内容');
                return false;
            }
            window.open(this.logoList[this.num].searchSrc+this.text);
            this.text='';
            this.myData='';
        },
        changeGo:function(ev){
            window.open(this.logoList[this.num].searchSrc+ev);
            this.text='';
            this.myData='';
        },
        kong:function(){
            this.text='';
            this.myData='';
            console.log('sdfsd');
        }
    }
}
</script>
<style type="text/css">
@import './../css/search.css';
</style>