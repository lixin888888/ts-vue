<template>
    <div class="example">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reverseMessgae }}"</p>
        <el-button @click="changeMessage"> 改变MESSAGE </el-button>

        <div ref="hello">
            <p>hello world</p>
        </div>

        <el-button @click="testRefAndEl"> 测试ref el </el-button>

    </div>
</template>

<script lang = 'ts'>
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {genUpToken} from "@/utils/qiniuToken";


    @Component({
        name:"computer-test"
    })
    export default class extends Vue{
         private message: string =  "hello";
         get reverseMessgae() {
             return this.message.split('').reverse().join('')
         }

        // @Watch(path: string, options: WatchOptions = {})
        // options包含两个属性 immediate?:boolean  侦听开始之后是否立即调用该回调函数 / deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数
        // @Watch('arr', { immediate: true, deep: true })
        // onArrChanged(newValue: number[], oldValue: number[]) {}
        //@Watch(path: string, options: WatchOptions = {})
        //options 包含两个属性 immediate?:boolean 侦听开始之后是否立即调用该回调函数 / deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数
        /**
         *
         computed 计算属性
         public get allname() {
  return 'computed ' + this.name;
}
         */


        @Watch('message')
        private watchReverseMessgae(value: string) {
            console.log(value)
        }

        public changeMessage(): void {
            this.message = "lixin"
        }

        created() {
            let policy = {};
            console.log("token========>" + genUpToken("qEjtRsk220SrirJdrxY6UxBpFW-sbRaLOGzscjT1", "qEjtRsk220SrirJdrxY6UxBpFW-sbRaLOGzscjT1", policy))
        }


    }

</script>

<style scoped>

    .example{
        background: #97a8be;
        width: 100%;
        height: 100%;
    }

</style>
