(function(){"use strict";var e={9034:function(e,t,s){var i=s(3751),n=s(641),a=s(33);const o={id:"app"},r={class:"content"},p={class:"language-switcher"},l=["title"],h=["title"],c={key:1,class:"grids"},d={class:"phase"},u={key:2,class:"modal"},y={class:"modal-content"};function S(e,t,s,i,S,k){const g=(0,n.g2)("Header"),m=(0,n.g2)("Menu"),f=(0,n.g2)("OpponentGrid"),b=(0,n.g2)("UserGrid"),v=(0,n.g2)("Help");return(0,n.uX)(),(0,n.CE)("div",o,[(0,n.bF)(g),(0,n.Lk)("div",r,[(0,n.Lk)("div",p,[(0,n.Lk)("span",{onClick:t[0]||(t[0]=e=>k.changeLanguage("en")),class:"fi fi-gb",title:e.$t("englishLanguage")},null,8,l),(0,n.Lk)("span",{onClick:t[1]||(t[1]=e=>k.changeLanguage("pl")),class:"fi fi-pl",title:e.$t("polishLanguage")},null,8,h)]),S.gameStarted?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.Wv)(m,{key:0,onStartGame:k.startGame},null,8,["onStartGame"])),S.gameStarted?((0,n.uX)(),(0,n.CE)("div",c,[(0,n.Lk)("div",d,(0,a.v_)(e.$t(k.gamePhaseText)),1),(0,n.bF)(f,{ships:S.opponentShips,showShips:!1,shots:S.playerShots,onCellSelected:k.handleUserShot,disabled:S.currentPlayer!==S.user,feedbackMessage:e.$t(S.opponentGridFeedbackMessage)},null,8,["ships","shots","onCellSelected","disabled","feedbackMessage"]),(0,n.bF)(b,{ships:S.playerShips,shots:S.opponentShots,onShipPlaced:k.onShipPlaced,feedbackMessage:e.$t(S.playerGridFeedbackMessage),shipsCanTouch:S.shipsCanTouch},null,8,["ships","shots","onShipPlaced","feedbackMessage","shipsCanTouch"])])):(0,n.Q3)("",!0),(0,n.bF)(v),S.winner?((0,n.uX)(),(0,n.CE)("div",u,[(0,n.Lk)("div",y,[(0,n.Lk)("p",null,(0,a.v_)(e.$t(k.winnerMessage)),1),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>k.resetGame&&k.resetGame(...e))},(0,a.v_)(e.$t("playAgain")),1)])])):(0,n.Q3)("",!0)])])}var k=s(4526);function g(e,t,s,i,o,r){return(0,n.uX)(),(0,n.CE)("header",null,[(0,n.Lk)("h1",null,(0,a.v_)(e.$t("headerTitle")),1)])}var m={name:"Header"},f=s(6262);const b=(0,f.A)(m,[["render",g],["__scopeId","data-v-8a06aec2"]]);var v=b;const w=e=>((0,n.Qi)("data-v-a879d946"),e=e(),(0,n.jt)(),e),C={class:"grid"},T={key:0,class:"feedback"},P={class:"row"},A=w((()=>(0,n.Lk)("div",{class:"corner"},null,-1))),L={class:"row-label"},O={key:0,class:"miss-marker"},z={class:"controls"},x={class:"control-row"},M={class:"control-row"},G={class:"control-row"};function F(e,t,s,i,o,r){return(0,n.uX)(),(0,n.CE)("div",C,[(0,n.Lk)("h2",null,(0,a.v_)(e.$t("playersGrid")),1),s.feedbackMessage?((0,n.uX)(),(0,n.CE)("div",T,(0,a.v_)(s.feedbackMessage),1)):(0,n.Q3)("",!0),(0,n.Lk)("div",{class:"grid-container",onKeydown:t[0]||(t[0]=(...e)=>r.handleKeydown&&r.handleKeydown(...e)),tabindex:"0",ref:"gridContainer"},[(0,n.Lk)("div",P,[A,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.columnLabels,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e,class:"column-label"},(0,a.v_)(e),1)))),128))]),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.rows,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:t,class:"row"},[(0,n.Lk)("div",L,(0,a.v_)(o.rowLabels[t]),1),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e.id,class:(0,a.C4)(["cell",r.getCellClass(t,e.id)])},[r.isMissCell(t,e.id)?((0,n.uX)(),(0,n.CE)("span",O,"X")):(0,n.Q3)("",!0)],2)))),128))])))),128))],544),(0,n.Lk)("div",z,[(0,n.Lk)("div",x,[(0,n.Lk)("button",{onClick:t[1]||(t[1]=e=>r.handleKeydown({key:"ArrowUp"}))},"↑")]),(0,n.Lk)("div",M,[(0,n.Lk)("button",{onClick:t[2]||(t[2]=e=>r.handleKeydown({key:"ArrowLeft"}))},"←"),(0,n.Lk)("button",{onClick:t[3]||(t[3]=e=>r.handleKeydown({key:"ArrowDown"}))},"↓"),(0,n.Lk)("button",{onClick:t[4]||(t[4]=e=>r.handleKeydown({key:"ArrowRight"}))},"→")]),(0,n.Lk)("div",G,[(0,n.Lk)("button",{onClick:t[5]||(t[5]=e=>r.handleKeydown({key:"r"}))},(0,a.v_)(e.$t("rotateButton")),1),(0,n.Lk)("button",{onClick:t[6]||(t[6]=e=>r.handleKeydown({key:"Enter"}))},(0,a.v_)(e.$t("deployButton")),1)])])])}s(4114);var E={name:"UserGrid",props:{ships:{type:Array,default:()=>[]},shots:{type:Array,default:()=>[]},feedbackMessage:{type:String,default:""},shipsCanTouch:{type:Boolean,default:!1}},data(){return{rows:Array.from({length:10},((e,t)=>Array.from({length:10},((e,t)=>({id:t,label:""}))))),rowLabels:"ABCDEFGHIJ".split(""),columnLabels:Array.from({length:10},((e,t)=>t+1)),placedShips:[],currentShip:{size:5,coordinates:[]},currentShipDirection:"horizontal",currentShipPosition:{x:5,y:5}}},mounted(){this.initCurrentShip(),window.addEventListener("keydown",this.handleKeydown)},beforeUnmount(){window.removeEventListener("keydown",this.handleKeydown)},methods:{initCurrentShip(){this.updateCurrentShipCoordinates()},handleKeydown(e){if(0===this.currentShip.size)return;const t=e.key;switch(t){case"ArrowUp":this.moveShip(-1,0);break;case"ArrowDown":this.moveShip(1,0);break;case"ArrowLeft":this.moveShip(0,-1);break;case"ArrowRight":this.moveShip(0,1);break;case"r":case"R":this.rotateShip();break;case"Enter":this.placeShip();break}},moveShip(e,t){const s={x:this.currentShipPosition.x+e,y:this.currentShipPosition.y+t};this.currentShipPosition=s,this.updateCurrentShipCoordinates()},rotateShip(){const e="horizontal"===this.currentShipDirection?"vertical":"horizontal";this.currentShipDirection=e,this.updateCurrentShipCoordinates()},isValidPosition(e,t,s){for(let i=0;i<t;i++){const t="horizontal"===s?e.x:e.x+i,n="horizontal"===s?e.y+i:e.y;if(t<0||t>=10||n<0||n>=10||this.isOccupied(t,n)||!this.shipsCanTouch&&this.isAdjacentOccupied(t,n))return!1}return!0},isOccupied(e,t){return this.placedShips.some((s=>s.coordinates.some((s=>s.x===e&&s.y===t))))},isAdjacentOccupied(e,t){const s=[{dx:-1,dy:-1},{dx:-1,dy:0},{dx:-1,dy:1},{dx:0,dy:-1},{dx:0,dy:1},{dx:1,dy:-1},{dx:1,dy:0},{dx:1,dy:1}];return s.some((s=>{const i=e+s.dx,n=t+s.dy;return i>=0&&i<10&&n>=0&&n<10&&this.isOccupied(i,n)}))},updateCurrentShipCoordinates(){this.currentShip.coordinates=Array.from({length:this.currentShip.size},((e,t)=>"horizontal"===this.currentShipDirection?{x:this.currentShipPosition.x,y:this.currentShipPosition.y+t}:{x:this.currentShipPosition.x+t,y:this.currentShipPosition.y}))},placeShip(){this.isValidPosition(this.currentShipPosition,this.currentShip.size,this.currentShipDirection)&&(this.placedShips.push({...this.currentShip}),this.$emit("shipPlaced",this.placedShips,this.currentShip.size),this.updateNextShip())},updateNextShip(){this.currentShip.size>1?this.currentShip.size--:this.currentShip={size:0,coordinates:[]},this.currentShipPosition={x:5,y:5},this.updateCurrentShipCoordinates()},getCellClass(e,t){return this.isShotCell(e,t)?this.isHitCell(e,t)?"hit-cell":"miss-cell":this.isShipCell(e,t)?"ship-cell":this.isCurrentShipCell(e,t)?this.isValidPosition(this.currentShipPosition,this.currentShip.size,this.currentShipDirection)?"valid-ship":"invalid-ship":""},isShotCell(e,t){return this.shots.some((s=>s.x===e&&s.y===t))},isHitCell(e,t){return this.shots.some((s=>s.x===e&&s.y===t&&s.isHit))},isMissCell(e,t){const s=this.shots.find((s=>s.x===e&&s.y===t));return s&&!s.isHit},isShipCell(e,t){return this.placedShips.some((s=>s.coordinates.some((s=>s.x===e&&s.y===t))))},isCurrentShipCell(e,t){return this.currentShip.coordinates.some((s=>s.x===e&&s.y===t))}}};const _=(0,f.A)(E,[["render",F],["__scopeId","data-v-a879d946"]]);var I=_;const H=e=>((0,n.Qi)("data-v-3beb8620"),e=e(),(0,n.jt)(),e),U={class:"grid"},X={key:0,class:"feedback"},j={class:"grid-container"},$={class:"row"},W=H((()=>(0,n.Lk)("div",{class:"corner"},null,-1))),D={class:"row-label"},K=["onClick"],R={key:0,class:"miss-marker"};function B(e,t,s,i,o,r){return(0,n.uX)(),(0,n.CE)("div",U,[(0,n.Lk)("h2",null,(0,a.v_)(e.$t("opponentsGrid")),1),s.feedbackMessage?((0,n.uX)(),(0,n.CE)("div",X,(0,a.v_)(s.feedbackMessage),1)):(0,n.Q3)("",!0),(0,n.Lk)("div",j,[(0,n.Lk)("div",$,[W,((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.columnLabels,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e,class:"column-label"},(0,a.v_)(e),1)))),128))]),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(o.rows,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:t,class:"row"},[(0,n.Lk)("div",D,(0,a.v_)(o.rowLabels[t]),1),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e.id,class:(0,a.C4)(["cell",r.getCellClass(t,e.id)]),onClick:s=>r.selectCell(t,e.id)},[r.isMissCell(t,e.id)?((0,n.uX)(),(0,n.CE)("span",R,"X")):(0,n.Q3)("",!0)],10,K)))),128))])))),128))])])}var Q={name:"OpponentGrid",props:{ships:{type:Array,default:()=>[]},showShips:{type:Boolean,default:!1},shots:{type:Array,default:()=>[]},disabled:{type:Boolean,default:!1},feedbackMessage:{type:String,default:""}},data(){return{rows:Array.from({length:10},((e,t)=>Array.from({length:10},((e,t)=>({id:t,label:""}))))),rowLabels:"ABCDEFGHIJ".split(""),columnLabels:Array.from({length:10},((e,t)=>t+1))}},methods:{isShipCell(e,t){return!!this.showShips&&this.ships.some((s=>s.coordinates.some((s=>s.x===e&&s.y===t))))},getCellClass(e,t){const s=this.shots.find((s=>s.x===e&&s.y===t));return s?s.isHit?"hit-cell":"miss-cell":this.isShipCell(e,t)&&this.showShips?"ship-cell":""},isHitCell(e,t){return this.shots.some((s=>s.x===e&&s.y===t&&s.isHit))},isMissCell(e,t){const s=this.shots.find((s=>s.x===e&&s.y===t));return s&&!s.isHit},selectCell(e,t){this.disabled||this.shots.some((s=>s.x===e&&s.y===t))||this.$emit("cellSelected",e,t)}}};const V=(0,f.A)(Q,[["render",B],["__scopeId","data-v-3beb8620"]]);var Y=V;const J={class:"help"};function N(e,t,s,i,o,r){return(0,n.uX)(),(0,n.CE)("div",J,[(0,n.Lk)("h2",null,(0,a.v_)(e.$t("helpHeader")),1),(0,n.Lk)("p",null,(0,a.v_)(e.$t("helpMessage")),1)])}var Z={name:"Help"};const q=(0,f.A)(Z,[["render",N],["__scopeId","data-v-229b0a56"]]);var ee=q;const te=e=>((0,n.Qi)("data-v-117b0ae9"),e=e(),(0,n.jt)(),e),se={class:"menu"},ie={key:0},ne={key:0},ae=["value"],oe=["value"],re=te((()=>(0,n.Lk)("h2",null,null,-1)));function pe(e,t,s,o,r,p){return(0,n.uX)(),(0,n.CE)("div",se,[p.isLocalEnvironment?((0,n.uX)(),(0,n.CE)("div",ie,[(0,n.Lk)("h2",null,(0,a.v_)(e.$t("selectAiTypeHeader")),1),r.aiTypes.length?((0,n.uX)(),(0,n.CE)("div",ne,[(0,n.bo)((0,n.Lk)("select",{id:"ai-select","onUpdate:modelValue":t[0]||(t[0]=e=>r.selectedAiType=e),class:"responsive-select"},[(0,n.Lk)("option",{value:r.chooseRandomAlgorithm},(0,a.v_)(e.$t("chooseRandomAlgorithm")),9,ae),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.aiTypes,(e=>((0,n.uX)(),(0,n.CE)("option",{key:e.type,value:e.type},(0,a.v_)(p.getDescription(e)),9,oe)))),128))],512),[[i.u1,r.selectedAiType]])])):(0,n.Q3)("",!0)])):(0,n.Q3)("",!0),(0,n.Lk)("h2",null,(0,a.v_)(e.$t("ShipsCanTouchText")),1),(0,n.bo)((0,n.Lk)("input",{type:"checkbox",id:"shipsCanTouch","onUpdate:modelValue":t[1]||(t[1]=e=>r.shipsCanTouch=e),onChange:t[2]||(t[2]=(...e)=>p.onCheckboxChange&&p.onCheckboxChange(...e))},null,544),[[i.lH,r.shipsCanTouch]]),re,(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>p.startGame&&p.startGame(...e))},(0,a.v_)(e.$t("startGame")),1)])}var le=s(4335);const he=le.A.create({baseURL:"https://battleshipswebapi.azurewebsites.net/api/",withCredentials:!0,headers:{"Content-Type":"application/json"}});let ce=null;function de(e){ce=e}he.interceptors.request.use((e=>(ce&&(e.headers["X-Session-Id"]=ce),e)));var ue={setSessionId:de,async getAiTypes(e){const t=await he.post("/AiType/list",e);return t.data},async selectAiType(e){await he.post("/AiType/select",e)},async updateRules(e){await he.post("/Rules/update",e)},async getOpponentShips(){const e=await he.get("/ShipLocations/opponent");return e.data},async setUserShips(e){await he.post("/ShipLocations/user",e)},async userShot(e){const t=await he.post("shot/user",e);return t.data},async opponentShot(){const e=await he.get("shot/opponent");return e.data},async getGameState(){const e=await he.get("gamestate/get");return e.data},async clearGameState(){await he.get("gamestate/clear")}};const ye=-1;var Se={name:"Menu",data(){return{aiTypes:[],ruleTypes:[],selectedAiType:ye,shipsCanTouch:!1,environment:"production",chooseRandomAlgorithm:ye}},computed:{isLocalEnvironment(){return console.log("env "+this.environment),"development"===this.environment}},async created(){this.loadAiTypes()},methods:{async startGame(){try{var e=this.selectedAiType;if(e==ye){var t=Math.floor(Math.random()*this.aiTypes.length);e=this.aiTypes[t].type,console.log("Randomly selected "+e)}await ue.clearGameState(),await ue.selectAiType(e),await ue.updateRules(this.shipsCanTouch),this.$emit("startGame",this.shipsCanTouch)}catch(s){console.error("Failed to start the game",s)}},async onCheckboxChange(){this.loadAiTypes()},async loadAiTypes(){try{this.aiTypes=await ue.getAiTypes(this.shipsCanTouch),this.isSelectedAiTypeValid()||(this.selectedAiType=-1)}catch(e){console.error("Failed to load AI types:",e)}},getDescription(e){const t=this.$i18n.locale;return e.description[t]||e.description["en"]},isSelectedAiTypeValid(){return this.aiTypes.some((e=>e.type===this.selectedAiType))}}};const ke=(0,f.A)(Se,[["render",pe],["__scopeId","data-v-117b0ae9"]]);var ge=ke;const me="feedbackOpponentPlaceholder",fe="feedbackPlayerPlaceholder",be="feedbackPlayerSink",ve="feedbackPlayerHit",we="feedbackPlayerMiss",Ce="feedbackOpponentSink",Te="feedbackOpponentHit",Pe="feedbackOpponentMiss",Ae="waitingForOpponentToDeployShips",Le="waitingForUserToDeployShips",Oe="yourTurn",ze="opponentsTurn",xe=Object.freeze({WaitingForOpponentShips:1,WaitingForPlayerShips:2,PlayerTurn:3,OpponentTurn:4}),Me=Object.freeze({User:1,Opponent:2});var Ge={name:"App",components:{Header:v,UserGrid:I,OpponentGrid:Y,Help:ee,Menu:ge},data(){return{gameStarted:!1,gamePhase:xe.WaitingForPlayerShips,playerShips:[],opponentShips:[],playerShipsSet:!1,opponentShipsSet:!1,currentPlayer:null,opponentShots:[],playerShots:[],winner:null,opponentGridFeedbackMessage:me,playerGridFeedbackMessage:fe,sessionId:null,shipsCanTouch:!1,user:Me.User}},computed:{gamePhaseText(){switch(this.gamePhase){case xe.WaitingForPlayerShips:return Le;case xe.WaitingForOpponentShips:return Ae;case xe.PlayerTurn:return Oe;case xe.OpponentTurn:return ze;default:return""}},winnerMessage(){return this.winner===Me.User?"userWon":"aiWon"}},methods:{changeLanguage(e){this.$i18n.locale=e},generateOrRetrieveSessionId(){let e=this.getCookie("sessionId");e||(e=(0,k.A)(),this.setCookie("sessionId",e,365)),this.sessionId=e,ue.setSessionId(this.sessionId)},getCookie(e){const t=`; ${document.cookie}`,s=t.split(`; ${e}=`);if(2===s.length)return s.pop().split(";").shift()},setCookie(e,t,s){const i=new Date(Date.now()+864e5*s).toUTCString();document.cookie=`${e}=${t}; expires=${i}; path=/`},async startGame(e){this.gameStarted=!0;try{this.opponentShips=await ue.getOpponentShips(),this.opponentShipsSet=!0,this.shipsCanTouch=e,this.checkPhaseTransition()}catch(t){console.error("Failed to get opponent ships:",t)}},async onShipPlaced(e){if(this.playerShips=e,this.playerShipsSet=5===this.playerShips.length,this.playerShipsSet)try{await ue.setUserShips(e),this.checkPhaseTransition()}catch(t){console.error("Failed to set user ships:",t)}else this.checkPhaseTransition()},checkPhaseTransition(){this.playerShipsSet&&this.opponentShipsSet?this.determineStartingPlayer():this.playerShipsSet?this.gamePhase=xe.WaitingForOpponentShips:this.opponentShipsSet&&(this.gamePhase=xe.WaitingForPlayerShips)},determineStartingPlayer(){const e=Math.random()<.5;this.currentPlayer=e?Me.User:Me.Opponent,this.gamePhase=e?xe.PlayerTurn:xe.OpponentTurn,e||this.opponentMove()},async opponentMove(){if(this.currentPlayer===Me.Opponent)try{const e=await ue.opponentShot();await this.updateGameState(),this.playerGridFeedbackMessage=e.isHit?e.isSunk?Ce:Te:Pe,this.checkIfWinner(e,Me.Opponent)}catch(e){console.error("Failed to get opponent move:",e)}},async handleUserShot(e,t){if(this.currentPlayer===Me.User)try{const s=await ue.userShot({x:e,y:t});await this.updateGameState(),this.opponentGridFeedbackMessage=s.isHit?s.isSunk?be:ve:we,this.checkIfWinner(s,Me.User)}catch(s){console.error("Failed to handle user shot:",s)}},async checkIfWinner(e,t){1==e.win?this.winner=t:this.switchTurn()},async updateGameState(){try{const e=await ue.getGameState();this.playerShips.splice(0,this.playerShips.length,...e.userShips),this.opponentShips.splice(0,this.opponentShips.length,...e.opponentShips),this.playerShots.splice(0,this.playerShots.length,...e.playerShots),this.opponentShots.splice(0,this.opponentShots.length,...e.opponentShots),this.shipsCanTouch=e.shipsCanTouch}catch(e){console.error("Failed to update game state:",e)}},switchTurn(){this.currentPlayer=this.currentPlayer===Me.User?Me.Opponent:Me.User,this.gamePhase=this.currentPlayer===Me.User?xe.PlayerTurn:xe.OpponentTurn,this.currentPlayer===Me.Opponent&&setTimeout((()=>{this.opponentMove()}),1e3)},resetGame(){this.gameStarted=!1,this.gamePhase=xe.WaitingForPlayerShips,this.playerShips=[],this.opponentShips=[],this.playerShipsSet=!1,this.opponentShipsSet=!1,this.currentPlayer=null,this.opponentShots=[],this.playerShots=[],this.winner=null,this.opponentGridFeedbackMessage="",this.playerGridFeedbackMessage=""}},mounted(){this.generateOrRetrieveSessionId()}};const Fe=(0,f.A)(Ge,[["render",S]]);var Ee=Fe,_e=s(6992),Ie=JSON.parse('{"polishLanguage":"Polish","englishLanguage":"English","headerTitle":"Battleships","selectAiTypeHeader":"Select AI Type","chooseRandomAlgorithm":"Select random algorithm","ShipsCanTouchText":"Ships can touch each other","startGame":"Start game","selectAiTypeWarning":"You have to choose an AI type to proceed","helpHeader":"Help","helpMessage":"Use arrows to place your ships. You can rotate them using \'Rotate\' key. Click on opponent\'s grid to select the cell you want to shoot at.","rotateButton":"Rotate","deployButton":"Deploy","waitingForUserToDeployShips":"Waiting for user to deploy ships","waitingForOpponentToDeployShips":"Waiting for opponent to deploy ships","yourTurn":"Your turn","opponentsTurn":"Opponent\'s turn","feedbackOpponentPlaceholder":"...","feedbackOpponentMiss":"Opponent missed!","feedbackOpponentHit":"Opponent hit!","feedbackOpponentSink":"Opponent sunk your ship!","feedbackPlayerPlaceholder":"...","feedbackPlayerMiss":"You missed!","feedbackPlayerHit":"You hit!","feedbackPlayerSink":"You sunk a ship!","userWon":"User won!","aiWon":"AI won!","playAgain":"Play Again","playersGrid":"Player\'s Grid","opponentsGrid":"Opponent\'s Grid"}'),He=JSON.parse('{"polishLanguage":"Polski","englishLanguage":"Angielski","headerTitle":"Statki","selectAiTypeHeader":"Wybierz rodzaj AI","chooseRandomAlgorithm":"Wybierz losowy algorytm","ShipsCanTouchText":"Statki mogą się stykać","startGame":"Rozpocznij grę","selectAiTypeWarning":"Musisz wybrać jakiś rodzaj AI, aby kontynuować","helpHeader":"Pomoc","helpMessage":"Użyj strzałek aby ustawić swoje statki. Możesz je obracać używając przycisku \'Obróć\'. Kliknij na planszę przeciwnika, aby wybrać gdzie chcesz oddać strzał.","rotateButton":"Obróć","deployButton":"Ustaw","waitingForUserToDeployShips":"Czekanie na rozmieszczenie statków przez użytkownika","waitingForOpponentToDeployShips":"Czekanie na rozmieszczenie statków przez przeciwnika","yourTurn":"Twoja tura","opponentsTurn":"Tura przeciwnika","feedbackOpponentPlaceholder":"...","feedbackOpponentMiss":"Przeciwnik spudłował!","feedbackOpponentHit":"Przeciwnik trafił!","feedbackOpponentSink":"Przeciwnik zatopił Twój statek!","feedbackPlayerPlaceholder":"...","feedbackPlayerMiss":"Spudłowałeś!","feedbackPlayerHit":"Trafiłeś!","feedbackPlayerSink":"Zatopiłeś statek!","userWon":"Użytkownik wygrał!","aiWon":"AI wygrało!","playAgain":"Zagraj ponownie","playersGrid":"Plansza gracza","opponentsGrid":"Plansza przeciwnika"}');const Ue=(0,_e.hU)({locale:"pl",fallbackLocale:"en",messages:{en:Ie,pl:He}}),Xe=(0,i.Ef)(Ee);Xe.use(Ue),Xe.mount("#app")}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,i,n,a){if(!i){var o=1/0;for(h=0;h<e.length;h++){i=e[h][0],n=e[h][1],a=e[h][2];for(var r=!0,p=0;p<i.length;p++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](i[p])}))?i.splice(p--,1):(r=!1,a<o&&(o=a));if(r){e.splice(h--,1);var l=n();void 0!==l&&(t=l)}}return t}a=a||0;for(var h=e.length;h>0&&e[h-1][2]>a;h--)e[h]=e[h-1];e[h]=[i,n,a]}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,a,o=i[0],r=i[1],p=i[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(p)var h=p(s)}for(t&&t(i);l<o.length;l++)a=o[l],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(h)},i=self["webpackChunkbattleships_game"]=self["webpackChunkbattleships_game"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[504],(function(){return s(9034)}));i=s.O(i)})();
//# sourceMappingURL=app.efce487a.js.map