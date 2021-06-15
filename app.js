function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}


const app = Vue.createApp({
    data(){
        return{
            healthMonster:100,
            healthPlayer:100,
            currentRound:0,
            winner:null,
            messages:[]
        };
    },
    computed:{
        monsterBarStyle(){
            if(this.healthMonster<0){
                return{width:'0%'};
            }
            return {width:this.healthMonster+'%'};
        },
        playerBarStyle(){
            if(this.healthPlayer<0){
                return{width:'0%'};
            }
            return {width:this.healthPlayer+'%'};
        },
        useSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch:{
        healthMonster(value){
            if(value<=0 && this.healthPlayer<=0){
                this.winner='draw';
            }
            else if(value<=0){
                this.winner='player';
            }
        },
        healthPlayer(value){
            if(value<=0 && this.healthMonster<=0){
                this.winner='draw';
            }
            else if(value<=0){
                this.winner='monster';
            }
        }
    },
    methods:{
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.healthMonster -= attackValue;
            this.addMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.healthPlayer -= attackValue;
            this.addMessages('monster','attack',attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.healthMonster -= attackValue;
            this.addMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if(this.healthPlayer + healValue > 100){
                this.healthPlayer=100;
            }
            else{
                this.healthPlayer+=healValue;
            }
            this.addMessages('player','heal',healValue);
            this.attackPlayer();
        },
        newGame(){
            this.healthMonster=100;
            this.healthPlayer=100,
            this.currentRound=0,
            this.winner=null;
            this.messages=[];
        },
        surrender(){
            this.winner='monster';
        },
        addMessages(who,what,value){
            this.messages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
        }
    }
});

app.mount('#game');