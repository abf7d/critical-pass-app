"use strict";(self.webpackChunkcritical_web=self.webpackChunkcritical_web||[]).push([[181],{6181:(B,g,s)=>{s.d(g,{O:()=>O});var p=s(5861),l=s(3830),c=s(3633),r=s(2433),t=s(9212),u=s(7586),f=s(2119),b=s(9680),_=s(2425),h=s(6814),v=s(2596),m=s(7007);let C=(()=>{class i{transform(e){return e instanceof Date}static#t=this.\u0275fac=function(n){return new(n||i)};static#e=this.\u0275pipe=t.Yjl({name:"isDate",type:i,pure:!0})}return i})();function k(i,d){if(1&i&&(t.TgZ(0,"div",24)(1,"span"),t._uU(2,"Last Saved: "),t.qZA(),t._uU(3),t.ALo(4,"date"),t.qZA()),2&i){const e=t.oxw();t.xp6(3),t.Oqu(t.xi3(4,1,e.timestamp,"long"))}}function Z(i,d){if(1&i){const e=t.EpF();t.TgZ(0,"i",25),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.showPeek=!1)}),t.qZA()}}function A(i,d){if(1&i){const e=t.EpF();t.TgZ(0,"i",26),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.peekStorage())}),t.qZA()}}function P(i,d){if(1&i&&(t.TgZ(0,"div",27),t._UZ(1,"cp-arrow-snapshot",28),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Q6J("project",e.peekProj)("width",390)("height",250)}}const M=i=>["grid",i],T=i=>({sidebar:i}),x=i=>({outlets:i}),w=i=>["/profile",i];let O=(()=>{class i{constructor(e,n,o,a,y,j,S,U,q){this.router=e,this.dashboard=n,this.eventService=o,this.serializer=a,this.sanitizer=y,this.toastr=j,this.storageApi=S,this.projectApi=U,this.ngZone=q,this.isParentProject=!1,this.saveTooltip=r.Fs,this.showHelp=!1,this.actionText="",this.alertMessage=""}ngOnInit(){this.subscription=this.dashboard.activeProject$.subscribe(e=>{this.project=e,this.timestamp=e.profile.timestamp?new Date(e.profile.timestamp):null,this.disableButtons=!e.profile.permissions.writable||!!e.profile.parentProject,this.isParentProject=!!e.profile.parentProject,this.saveTooltip=this.isParentProject?r.xn:r.Fs}),this.showPeek=!1}peekStorage(){var e=this;return(0,p.Z)(function*(){if(!e.peekProj){const n=yield e.storageApi.get(l.H3);e.ngZone.run(()=>{n&&(e.peekProj=n,e.showPeek=!0)}),e.showPeek=!0}})()}stash(){this.showPeek=!1;try{this.storageApi.set(l.H3,this.project)}catch(e){return this.toastr.error("Stash Chart","Error occured."),void console.error(e)}this.toastr.success("Stash Chart","Success!")}unstash(){var e=this;return(0,p.Z)(function*(){e.showPeek=!1;try{const n=yield e.storageApi.get(l.H3);n&&e.dashboard.activeProject$.next(n)}catch(n){return e.toastr.error("Unstash Chart","Error occured."),void console.error(n)}e.toastr.success("Unstash Chart","Success!")})()}save(){const e=this.serializer.fromJson(this.project);this.sanitizer.sanatizeForSave(e),e.profile.id||(e.profile.id=r.O0),this.setSaveState("Saving","",!0),this.projectApi.post(e).subscribe(n=>{this.eventService.get(r.CK).next(!0),null!==n&&(this.project.profile.timestamp=n.profile.timestamp,this.sanitizer.updateIds(this.project,n),this.dashboard.updateProject(this.project,!1)),this.setSaveState("","",!1,!0),this.toastr.success("Save Project","Success!")},n=>{this.setSaveState("","",!1,!0),this.toastr.error("Save Project","Error"),console.error(n)})}saveAsNew(){const e=this.serializer.fromJson(this.project);this.sanitizer.sanatizeForSave(e),e.profile.id=r.O0,this.setSaveState("Saving","",!0),this.projectApi.post(e).subscribe(n=>{this.eventService.get(r.CK).next(!0),this.router.navigateByUrl(r.uB),null!==n&&(this.sanitizer.updateIds(this.project,n),this.dashboard.updateProject(this.project,!1)),this.setSaveState("","",!1,!0),this.toastr.success("Save Copy","Success!")},n=>{this.setSaveState("","",!1,!0),this.toastr.error("Save Copy","Error"),console.error(n)})}delete(){this.disableButtons=!0,this.actionText="Deleting Project",this.eventService.get(r.CK).next(!0),this.projectApi.delete(this.id).subscribe(e=>{this.toastr.success("Delete Project","Success!"),this.router.navigateByUrl(r.uB)},e=>{this.toastr.error("Delete Project","Error"),console.error(e)})}setSaveState(e,n,o,a=!1){this.actionText=e,this.alertMessage=n,this.disableButtons=o,a&&setTimeout(()=>this.alertMessage="",2e3)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||i)(t.Y36(u.F0),t.Y36(c.Ou),t.Y36(c.WO),t.Y36(f.z),t.Y36(b.B),t.Y36(_._W),t.Y36(c.$y),t.Y36(c.$6),t.Y36(t.R0b))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["cp-action-buttons"]],inputs:{id:"id"},decls:94,vars:36,consts:[[1,"btn-row"],[1,"btn","btn-secondary",3,"routerLink"],["class","pt-1",4,"ngIf"],[1,"stash"],["href","javascript:void(0)",1,"btn","border-right",3,"click"],["href","javascript:void(0)",1,"btn",3,"click"],["href","javascript:void(0)",1,"btn"],["class","fas fa-chevron-up",3,"click",4,"ngIf"],["class","fas fa-chevron-down",3,"click",4,"ngIf"],["class","peek",4,"ngIf"],[1,"btn","btn-secondary",3,"click"],[1,"right"],[3,"matTooltip","matTooltipDisabled"],["tooltip","matTooltip"],[1,"btn","btn-primary",3,"click"],[1,"btns"],[1,"fas","fa-times"],[1,"fas","fa-question-circle","help-btn",3,"click"],[1,"help",3,"hidden"],[1,"fa","fa-times","help-close",3,"click"],[1,"help-list"],[1,"alert-msg",3,"hidden"],[1,"overlay",3,"hidden"],[1,"overlay-txt"],[1,"pt-1"],[1,"fas","fa-chevron-up",3,"click"],[1,"fas","fa-chevron-down",3,"click"],[1,"peek"],[3,"project","width","height"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div")(2,"button",1),t._uU(3,"Activity Grid"),t.qZA(),t.YNc(4,k,5,4,"div",2),t.ALo(5,"isDate"),t.qZA(),t.TgZ(6,"div")(7,"div",3)(8,"a",4),t.NdJ("click",function(){return!o.disableButtons&&o.stash()}),t._uU(9,"Stash"),t.qZA(),t.TgZ(10,"a",5),t.NdJ("click",function(){return!o.disableButtons&&o.unstash()}),t._uU(11," Unstash"),t.qZA(),t.TgZ(12,"a",6),t.YNc(13,Z,1,0,"i",7)(14,A,1,0,"i",8),t.qZA(),t.YNc(15,P,2,3,"div",9),t.qZA(),t.TgZ(16,"button",10),t.NdJ("click",function(){return!o.disableButtons&&o.delete()}),t._uU(17,"Delete Project"),t.qZA(),t.TgZ(18,"button",10),t.NdJ("click",function(){return!o.isParentProject&&o.saveAsNew()}),t._uU(19,"Save Copy"),t.qZA(),t.TgZ(20,"div",11)(21,"div",12,13)(23,"button",14),t.NdJ("click",function(){return!o.disableButtons&&o.save()}),t._uU(24,"Save Project"),t.qZA()(),t.TgZ(25,"div",15),t._UZ(26,"i",16),t.TgZ(27,"i",17),t.NdJ("click",function(){return o.showHelp=!o.showHelp}),t.qZA(),t.TgZ(28,"div",18)(29,"i",19),t.NdJ("click",function(){return o.showHelp=!o.showHelp}),t.qZA(),t.TgZ(30,"h4"),t._uU(31,"Help"),t.qZA(),t.TgZ(32,"ol",20)(33,"li")(34,"b"),t._uU(35,"Create Node:"),t.qZA(),t._uU(36," Double click on arrow diagram background"),t.qZA(),t.TgZ(37,"li")(38,"b"),t._uU(39,"Move Node:"),t.qZA(),t._uU(40," Hold Ctrl key + drag node. (On Mac: Hold Command key + drag node)"),t.qZA(),t.TgZ(41,"li")(42,"b"),t._uU(43,"Create Arrow:"),t.qZA(),t._uU(44," Single click on one node and drag to another"),t.qZA(),t.TgZ(45,"li")(46,"b"),t._uU(47,"Select / Deselect Node:"),t.qZA(),t._uU(48," Click on node"),t.qZA(),t.TgZ(49,"li")(50,"b"),t._uU(51,"Select / Deselect Arrow:"),t.qZA(),t._uU(52," Click on Arrow body or Click on Text above arrow."),t.qZA(),t.TgZ(53,"li")(54,"b"),t._uU(55,"Delete Node / Arrow:"),t.qZA(),t._uU(56," Click to select node / arrow, press Delete (Command + Delete on Mac)"),t.qZA(),t.TgZ(57,"li")(58,"b"),t._uU(59,"Join two Nodes:"),t.qZA(),t._uU(60," Drag one Node over another and release."),t.qZA(),t.TgZ(61,"li")(62,"b"),t._uU(63,"Split Node:"),t.qZA(),t._uU(64," Click to select a Node with multiple in / out arrows then press Ctrl + X keys (Command + X keys on Mac)"),t.qZA(),t.TgZ(65,"li")(66,"b"),t._uU(67,"Make Node Dummy:"),t.qZA(),t._uU(68," Click to select Node and press Ctrl + D keys.(Command + D keys on Mac)"),t.qZA(),t.TgZ(69,"li")(70,"b"),t._uU(71,"Make Node Milestone:"),t.qZA(),t._uU(72," Click to select Node and press Ctrl + M keys.(Command + M keys on Mac)"),t.qZA(),t.TgZ(73,"li")(74,"b"),t._uU(75,"Load Sub Project:"),t.qZA(),t._uU(76," Click to select an Arrow with a '*' in the text above arrow. Click on 'Load Sub Graph' button in selected Activity info on left hand side "),t.qZA(),t.TgZ(77,"li")(78,"b"),t._uU(79,"Pan the arrow chart:"),t.qZA(),t._uU(80," Single click and drag background"),t.qZA(),t.TgZ(81,"li")(82,"b"),t._uU(83,"Initalize Risk:"),t.qZA(),t._uU(84," To calculate the arrow diagram risk, add start / end nodes in the lower right hand corner. To auto set the start and end nodes click 'Calculate Risk' "),t.qZA(),t.TgZ(85,"li")(86,"b"),t._uU(87,"Arrange Nodes:"),t.qZA(),t._uU(88," To arrange the nodes in a readable format click the 'Arrange Nodes' button to the bottom left of the arrow diagram "),t.qZA()()()()()()(),t.TgZ(89,"div",21),t._uU(90),t.qZA(),t.TgZ(91,"div",22)(92,"div",23),t._uU(93),t.qZA()()),2&n&&(t.xp6(2),t.Q6J("routerLink",t.VKq(34,w,t.VKq(32,x,t.VKq(30,T,t.VKq(28,M,o.id))))),t.xp6(2),t.Q6J("ngIf",!!o.timestamp&&t.lcZ(5,26,o.timestamp)),t.xp6(4),t.ekj("disabled",o.disableButtons),t.xp6(2),t.ekj("disabled",o.disableButtons),t.xp6(3),t.Q6J("ngIf",o.showPeek),t.xp6(1),t.Q6J("ngIf",!o.showPeek),t.xp6(1),t.Q6J("ngIf",o.showPeek),t.xp6(1),t.ekj("disabled",o.disableButtons),t.xp6(2),t.ekj("disabled",o.isParentProject),t.xp6(3),t.Q6J("matTooltip",o.saveTooltip)("matTooltipDisabled",!o.isParentProject&&!o.disableButtons),t.xp6(2),t.ekj("disabled",o.disableButtons),t.xp6(5),t.Q6J("hidden",!o.showHelp),t.xp6(61),t.ekj("success","Saved"==o.alertMessage)("error","Error"==o.alertMessage),t.Q6J("hidden",""==o.alertMessage),t.xp6(1),t.Oqu(o.alertMessage),t.xp6(1),t.Q6J("hidden",""===o.actionText),t.xp6(2),t.Oqu(o.actionText))},dependencies:[h.O5,v.gM,m.J,u.rH,h.uU,C],styles:[".btn-secondary[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:2px;background-color:#f9f9f9;color:#666}.btn-secondary[_ngcontent-%COMP%]:hover{color:#fff;background-color:#5a6268;border-color:#545b62}.btn[_ngcontent-%COMP%]{font-size:.87rem}.border-right[_ngcontent-%COMP%]{border-right:1px solid #333}.stash[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{color:#45f}.btn-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}.btn-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:row}.btn-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0 7px}.btn-row[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0 5px}.btn-row[_ngcontent-%COMP%]   .stash[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0}.btn-row[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.btn-row[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{padding-top:3px}.help-btn[_ngcontent-%COMP%]{color:#999;cursor:pointer}.peek[_ngcontent-%COMP%]{width:410px;height:270px;position:absolute;border:1px solid #e9e9e9;z-index:1;background-color:#f9f9f9;top:38px;display:flex;align-items:center;justify-content:center}.stash[_ngcontent-%COMP%]{position:relative}.help[_ngcontent-%COMP%]{position:absolute;top:18px;right:0;width:400px;height:auto;background-color:#fff;border-radius:5px;z-index:1000;padding:20px;box-shadow:1px 3px 5px #0000006b}.help[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{position:absolute;padding-top:10px}.help-container[_ngcontent-%COMP%]{position:relative}.help-close[_ngcontent-%COMP%]{position:absolute;right:13px;cursor:pointer;top:13px}.help-pointer[_ngcontent-%COMP%]{cursor:pointer;color:#999}.help-list[_ngcontent-%COMP%]{padding:55px 49px 35px}.alert-msg[_ngcontent-%COMP%]{background:#4a4;border:1px solid #ddd;position:fixed;height:70px;width:102px;text-align:center;vertical-align:center;padding-top:19px;left:50%;color:#fff;top:50%;font-size:18px;border-radius:15px;z-index:2000}.saved[_ngcontent-%COMP%]{background:#4a4;border:1px solid #ddd}.error[_ngcontent-%COMP%]{background:#a44;border:1px solid #ddd}.save-proj[_ngcontent-%COMP%]{display:inline}a.btn-primary[_ngcontent-%COMP%]{color:#fff}.top-buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.overlay[_ngcontent-%COMP%]{position:fixed;width:100vw;height:100vh;inset:0;color:#fff;background-color:#00000080;z-index:100000;cursor:pointer}.overlay-txt[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px;font-weight:700}.btn-secondary.disabled[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%]:disabled{color:#fff;background-color:#6c757d;border-color:#6c757d}"]})}return i})()}}]);