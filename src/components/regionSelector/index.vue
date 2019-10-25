<template>
    <div class="region-selector" v-model="show" v-bind:class="{region__show:show}">

        <div class="region__overlay" @click="_region_toggleRegionSelect" />

        <div class="region-container  region__bottom">
            <div class="region-select">
                <div class="select-navs">

                    <div v-for="(item,index) in regionNavs" v-bind:class="{ active: regionActiveIndex ==index ,select:item!= regionTexts[index]}"
                        class="s-nav" @click="_region_switchregionNavs">
                        {{item}}
                    </div>

                </div>

                <div class="select-cts">

                    <div class="select-ct" v-bind:class="{active:regionActiveIndex ==0}">
                        <div class="items">

                            <div v-for="(item,index) in provinceData" class="item" v-bind:class="{hover:item.id == provinceHoverIndex}"
                                :data-id="item.id" :data-index="index" data-region="province" data-level="0" @click="_region_select"><span>{{item.name}}</span></div>

                        </div>
                    </div>

                    <div class="select-ct" v-bind:class="{active:regionActiveIndex ==1}">
                        <div class="items">

                            <div v-for="(item,index) in cityData" class="item" v-bind:class="{hover:item.id == cityHoverIndex}"
                                :data-id="item.id" :data-index="index" data-region="city" data-level="1" @click="_region_select"><text>{{item.name}}</text></div>

                        </div>
                    </div>

                    <div class="select-ct" v-bind:class="{active:regionActiveIndex ==2}">
                        <div class="items">

                            <div v-for="(item,index) in districtData" class="item" v-bind:class="{hover:item.id == districtHoverIndex}"
                                :data-id="item.id" :data-index="index" data-region="district" data-level="2" @click="_region_select"><text>{{item.name}}</text></div>

                        </div>
                    </div>


                    <div class="select-ct" v-bind:class="{active:regionActiveIndex ==3}">
                        <div class="items">
                            <div v-for="(item,index) in streetData" class="item" v-bind:class="{hover:item.id == streetHoverIndex }"
                                :data-id="item.id" :data-index="index" data-region="street" data-level="3" @click="_region_select"><text>{{item.name}}</text></div>
                        </div>
                    </div>



                    <div class="region-loading" v-if="regionLoading"><span class="loading-icon"></span><span class="loading-txt">载入中</span>
                    </div>




                </div>
                <div class="select-cancel" @click="_region_toggleRegionSelect">
                    取消
                </div>

            </div>





        </div>


    </div>

</template>
<script src='./regionSelector.js'></script>
<style lang="scss" scoped>
    @import "./index.scss"
</style>