"use strict";(self.webpackChunkcritical_web=self.webpackChunkcritical_web||[]).push([[181],{6181:(z,f,s)=>{s.d(f,{O:()=>q});var u=s(5861),d=s(3830),l=s(3633),a=s(2433),t=s(9212),h=s(7586),_=s(2119),b=s(9680),m=s(2425),g=s(6814),C=s(2596),k=s(7007);let v=(()=>{class n{transform(e){return e instanceof Date}static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275pipe=t.Yjl({name:"isDate",type:n,pure:!0})}return n})();function A(n,c){if(1&n&&(t.TgZ(0,"div",29)(1,"span"),t._uU(2,"Last Saved: "),t.qZA(),t._uU(3),t.ALo(4,"date"),t.qZA()),2&n){const e=t.oxw();t.xp6(3),t.Oqu(t.xi3(4,1,e.timestamp,"long"))}}function Z(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"i",30),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.redo())}),t.qZA()}}function P(n,c){1&n&&t._UZ(0,"i",31)}function T(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"i",32),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.undo())}),t.qZA()}}function x(n,c){1&n&&t._UZ(0,"i",33)}function M(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"i",34),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.showPeek=!1)}),t.qZA()}}function w(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"i",35),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.peekStorage())}),t.qZA()}}function y(n,c){if(1&n&&(t.TgZ(0,"div",36),t._UZ(1,"cp-arrow-snapshot",37),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("project",e.peekProj)("width",390)("height",250)}}const O=n=>["grid",n],U=n=>({sidebar:n}),j=n=>({outlets:n}),S=n=>["/profile",n];let q=(()=>{class n{constructor(e,i,o,r,p,B,N,J,D){this.router=e,this.dashboard=i,this.eventService=o,this.serializer=r,this.sanitizer=p,this.toastr=B,this.storageApi=N,this.projectApi=J,this.ngZone=D,this.isParentProject=!1,this.saveTooltip=a.Fs,this.canUndo=!1,this.canRedo=!1,this.showHelp=!1,this.actionText="",this.alertMessage=""}ngOnInit(){this.subscription=this.dashboard.activeProject$.subscribe(e=>{this.project=e,this.timestamp=e.profile.timestamp?new Date(e.profile.timestamp):null,this.disableButtons=!e.profile.permissions.writable||!!e.profile.parentProject,this.isParentProject=!!e.profile.parentProject,this.saveTooltip=this.isParentProject?a.xn:a.Fs}),this.canUndoRedoSub=this.dashboard.canUndoRedo$.subscribe(e=>{this.canUndo=e.canUndo,this.canRedo=e.canRedo}),this.showPeek=!1,this.dashboard.allowUndoRedo=!0}peekStorage(){var e=this;return(0,u.Z)(function*(){if(!e.peekProj||e.showPeek){if(!e.peekProj){const i=yield e.storageApi.get(d.H3);e.ngZone.run(()=>{i&&(e.peekProj=i,e.showPeek=!0)}),e.showPeek=!0}}else e.showPeek=!0})()}stash(){this.showPeek=!1;try{this.storageApi.set(d.H3,this.project)}catch(e){return this.toastr.error("Stash Chart","Error occured."),void console.error(e)}this.toastr.success("Stash Chart","Success!")}unstash(){var e=this;return(0,u.Z)(function*(){e.showPeek=!1;try{const i=yield e.storageApi.get(d.H3);i&&e.dashboard.activeProject$.next(i)}catch(i){return e.toastr.error("Unstash Chart","Error occured."),void console.error(i)}e.toastr.success("Unstash Chart","Success!")})()}save(){const e=this.serializer.fromJson(this.project);this.sanitizer.sanatizeForSave(e),e.profile.id||(e.profile.id=a.O0),this.setSaveState("Saving","",!0),this.projectApi.post(e).subscribe(i=>{this.eventService.get(a.CK).next(!0),null!==i&&(this.project.profile.timestamp=i.profile.timestamp,this.sanitizer.updateIds(this.project,i),this.dashboard.resetUndoRedo(),this.dashboard.updateProject(this.project,!1)),this.setSaveState("","",!1,!0),this.toastr.success("Save Project","Success!")},i=>{this.setSaveState("","",!1,!0),this.toastr.error("Save Project","Error"),console.error(i)})}saveAsNew(){const e=this.serializer.fromJson(this.project);this.sanitizer.sanatizeForSave(e),e.profile.id=a.O0,this.setSaveState("Saving","",!0),this.projectApi.post(e).subscribe(i=>{this.eventService.get(a.CK).next(!0),this.router.navigateByUrl(a.uB),null!==i&&(this.sanitizer.updateIds(this.project,i),this.dashboard.resetUndoRedo(),this.dashboard.updateProject(this.project,!1)),this.setSaveState("","",!1,!0),this.toastr.success("Save Copy","Success!")},i=>{this.setSaveState("","",!1,!0),this.toastr.error("Save Copy","Error"),console.error(i)})}delete(){this.disableButtons=!0,this.actionText="Deleting Project",this.eventService.get(a.CK).next(!0),this.projectApi.delete(this.id).subscribe(e=>{this.toastr.success("Delete Project","Success!"),this.router.navigateByUrl(a.uB)},e=>{this.toastr.error("Delete Project","Error"),console.error(e)})}undo(){this.dashboard.undo()}redo(){this.dashboard.redo()}handleKeyDown(e){e.ctrlKey&&"z"===e.key&&this.dashboard.undo(),e.ctrlKey&&"y"===e.key&&this.dashboard.redo()}setSaveState(e,i,o,r=!1){this.actionText=e,this.alertMessage=i,this.disableButtons=o,r&&setTimeout(()=>this.alertMessage="",2e3)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe(),this.canUndoRedoSub?.unsubscribe(),this.dashboard.resetUndoRedo()}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(h.F0),t.Y36(l.Ou),t.Y36(l.WO),t.Y36(_.z),t.Y36(b.B),t.Y36(m._W),t.Y36(l.$y),t.Y36(l.$6),t.Y36(t.R0b))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["cp-action-buttons"]],hostBindings:function(i,o){1&i&&t.NdJ("keydown",function(p){return o.handleKeyDown(p)},!1,t.Jf7)},inputs:{id:"id"},decls:99,vars:40,consts:[[1,"btn-row"],[1,"btn","btn-secondary",3,"routerLink"],["class","pt-1",4,"ngIf"],[1,"undo-redo"],["class","fas fa-redo",3,"click",4,"ngIf"],["class","fas fa-redo disabled",4,"ngIf"],["class","fas fa-undo",3,"click",4,"ngIf"],["class","fas fa-undo disabled",4,"ngIf"],[1,"stash"],["href","javascript:void(0)",1,"btn","border-right",3,"click"],["href","javascript:void(0)",1,"btn",3,"click"],["href","javascript:void(0)",1,"btn"],["class","fas fa-chevron-up",3,"click",4,"ngIf"],["class","fas fa-chevron-down",3,"click",4,"ngIf"],["class","peek",4,"ngIf"],[1,"btn","btn-secondary",3,"click"],[1,"right"],[3,"matTooltip","matTooltipDisabled"],["tooltip","matTooltip"],[1,"btn","btn-primary",3,"click"],[1,"btns"],[1,"fas","fa-times"],[1,"fas","fa-question-circle","help-btn",3,"click"],[1,"help",3,"hidden"],[1,"fa","fa-times","help-close",3,"click"],[1,"help-list"],[1,"alert-msg",3,"hidden"],[1,"overlay",3,"hidden"],[1,"overlay-txt"],[1,"pt-1"],[1,"fas","fa-redo",3,"click"],[1,"fas","fa-redo","disabled"],[1,"fas","fa-undo",3,"click"],[1,"fas","fa-undo","disabled"],[1,"fas","fa-chevron-up",3,"click"],[1,"fas","fa-chevron-down",3,"click"],[1,"peek"],[3,"project","width","height"]],template:function(i,o){1&i&&(t.TgZ(0,"div",0)(1,"div")(2,"button",1),t._uU(3,"Activity Grid"),t.qZA(),t.YNc(4,A,5,4,"div",2),t.ALo(5,"isDate"),t.qZA(),t.TgZ(6,"div",3),t.YNc(7,Z,1,0,"i",4)(8,P,1,0,"i",5)(9,T,1,0,"i",6)(10,x,1,0,"i",7),t.qZA(),t.TgZ(11,"div")(12,"div",8)(13,"a",9),t.NdJ("click",function(){return!o.disableButtons&&o.stash()}),t._uU(14,"Stash"),t.qZA(),t.TgZ(15,"a",10),t.NdJ("click",function(){return!o.disableButtons&&o.unstash()}),t._uU(16," Unstash"),t.qZA(),t.TgZ(17,"a",11),t.YNc(18,M,1,0,"i",12)(19,w,1,0,"i",13),t.qZA(),t.YNc(20,y,2,3,"div",14),t.qZA(),t.TgZ(21,"button",15),t.NdJ("click",function(){return!o.disableButtons&&o.delete()}),t._uU(22,"Delete Project"),t.qZA(),t.TgZ(23,"button",15),t.NdJ("click",function(){return!o.isParentProject&&o.saveAsNew()}),t._uU(24,"Save Copy"),t.qZA(),t.TgZ(25,"div",16)(26,"div",17,18)(28,"button",19),t.NdJ("click",function(){return!o.disableButtons&&o.save()}),t._uU(29,"Save Project"),t.qZA()(),t.TgZ(30,"div",20),t._UZ(31,"i",21),t.TgZ(32,"i",22),t.NdJ("click",function(){return o.showHelp=!o.showHelp}),t.qZA(),t.TgZ(33,"div",23)(34,"i",24),t.NdJ("click",function(){return o.showHelp=!o.showHelp}),t.qZA(),t.TgZ(35,"h4"),t._uU(36,"Help"),t.qZA(),t.TgZ(37,"ol",25)(38,"li")(39,"b"),t._uU(40,"Create Node:"),t.qZA(),t._uU(41," Double click on arrow diagram background"),t.qZA(),t.TgZ(42,"li")(43,"b"),t._uU(44,"Move Node:"),t.qZA(),t._uU(45," Hold Ctrl key + drag node. (On Mac: Hold Command key + drag node)"),t.qZA(),t.TgZ(46,"li")(47,"b"),t._uU(48,"Create Arrow:"),t.qZA(),t._uU(49," Single click on one node and drag to another"),t.qZA(),t.TgZ(50,"li")(51,"b"),t._uU(52,"Select / Deselect Node:"),t.qZA(),t._uU(53," Click on node"),t.qZA(),t.TgZ(54,"li")(55,"b"),t._uU(56,"Select / Deselect Arrow:"),t.qZA(),t._uU(57," Click on Arrow body or Click on Text above arrow."),t.qZA(),t.TgZ(58,"li")(59,"b"),t._uU(60,"Delete Node / Arrow:"),t.qZA(),t._uU(61," Click to select node / arrow, press Delete (Command + Delete on Mac)"),t.qZA(),t.TgZ(62,"li")(63,"b"),t._uU(64,"Join two Nodes:"),t.qZA(),t._uU(65," Drag one Node over another and release."),t.qZA(),t.TgZ(66,"li")(67,"b"),t._uU(68,"Split Node:"),t.qZA(),t._uU(69," Click to select a Node with multiple in / out arrows then press Ctrl + X keys (Command + X keys on Mac)"),t.qZA(),t.TgZ(70,"li")(71,"b"),t._uU(72,"Make Node Dummy:"),t.qZA(),t._uU(73," Click to select Node and press Ctrl + D keys.(Command + D keys on Mac)"),t.qZA(),t.TgZ(74,"li")(75,"b"),t._uU(76,"Make Node Milestone:"),t.qZA(),t._uU(77," Click to select Node and press Ctrl + M keys.(Command + M keys on Mac)"),t.qZA(),t.TgZ(78,"li")(79,"b"),t._uU(80,"Load Sub Project:"),t.qZA(),t._uU(81," Click to select an Arrow with a '*' in the text above arrow. Click on 'Load Sub Graph' button in selected Activity info on left hand side "),t.qZA(),t.TgZ(82,"li")(83,"b"),t._uU(84,"Pan the arrow chart:"),t.qZA(),t._uU(85," Single click and drag background"),t.qZA(),t.TgZ(86,"li")(87,"b"),t._uU(88,"Initalize Risk:"),t.qZA(),t._uU(89," To calculate the arrow diagram risk, add start / end nodes in the lower right hand corner. To auto set the start and end nodes click 'Calculate Risk' "),t.qZA(),t.TgZ(90,"li")(91,"b"),t._uU(92,"Arrange Nodes:"),t.qZA(),t._uU(93," To arrange the nodes in a readable format click the 'Arrange Nodes' button to the bottom left of the arrow diagram "),t.qZA()()()()()()(),t.TgZ(94,"div",26),t._uU(95),t.qZA(),t.TgZ(96,"div",27)(97,"div",28),t._uU(98),t.qZA()()),2&i&&(t.xp6(2),t.Q6J("routerLink",t.VKq(38,S,t.VKq(36,j,t.VKq(34,U,t.VKq(32,O,o.id))))),t.xp6(2),t.Q6J("ngIf",!!o.timestamp&&t.lcZ(5,30,o.timestamp)),t.xp6(3),t.Q6J("ngIf",o.canRedo),t.xp6(1),t.Q6J("ngIf",!o.canRedo),t.xp6(1),t.Q6J("ngIf",o.canUndo),t.xp6(1),t.Q6J("ngIf",!o.canUndo),t.xp6(3),t.ekj("disabled",o.disableButtons),t.xp6(2),t.ekj("disabled",o.disableButtons),t.xp6(3),t.Q6J("ngIf",o.showPeek),t.xp6(1),t.Q6J("ngIf",!o.showPeek),t.xp6(1),t.Q6J("ngIf",o.showPeek),t.xp6(1),t.ekj("disabled",o.disableButtons),t.xp6(2),t.ekj("disabled",o.isParentProject),t.xp6(3),t.Q6J("matTooltip",o.saveTooltip)("matTooltipDisabled",!o.isParentProject&&!o.disableButtons),t.xp6(2),t.ekj("disabled",o.disableButtons),t.xp6(5),t.Q6J("hidden",!o.showHelp),t.xp6(61),t.ekj("success","Saved"==o.alertMessage)("error","Error"==o.alertMessage),t.Q6J("hidden",""==o.alertMessage),t.xp6(1),t.Oqu(o.alertMessage),t.xp6(1),t.Q6J("hidden",""===o.actionText),t.xp6(2),t.Oqu(o.actionText))},dependencies:[g.O5,C.gM,k.J,h.rH,g.uU,v],styles:[".btn-secondary[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:2px;background-color:#f9f9f9;color:#666}.btn-secondary[_ngcontent-%COMP%]:hover{color:#fff;background-color:#5a6268;border-color:#545b62}.btn[_ngcontent-%COMP%]{font-size:.87rem}.border-right[_ngcontent-%COMP%]{border-right:1px solid #333}.stash[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{color:#45f}.btn-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}.btn-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:row}.btn-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0 7px}.btn-row[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0 5px}.btn-row[_ngcontent-%COMP%]   .stash[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0}.btn-row[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.btn-row[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{padding-top:3px}.help-btn[_ngcontent-%COMP%]{color:#999;cursor:pointer}.peek[_ngcontent-%COMP%]{width:410px;height:270px;position:absolute;border:1px solid #e9e9e9;z-index:1;background-color:#f9f9f9;top:38px;display:flex;align-items:center;justify-content:center}.stash[_ngcontent-%COMP%]{position:relative}.help[_ngcontent-%COMP%]{position:absolute;top:18px;right:0;width:400px;height:auto;background-color:#fff;border-radius:5px;z-index:1000;padding:20px;box-shadow:1px 3px 5px #0000006b}.help[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{position:absolute;padding-top:10px}.help-container[_ngcontent-%COMP%]{position:relative}.help-close[_ngcontent-%COMP%]{position:absolute;right:13px;cursor:pointer;top:13px}.help-pointer[_ngcontent-%COMP%]{cursor:pointer;color:#999}.help-list[_ngcontent-%COMP%]{padding:55px 49px 35px}.alert-msg[_ngcontent-%COMP%]{background:#4a4;border:1px solid #ddd;position:fixed;height:70px;width:102px;text-align:center;vertical-align:center;padding-top:19px;left:50%;color:#fff;top:50%;font-size:18px;border-radius:15px;z-index:2000}.saved[_ngcontent-%COMP%]{background:#4a4;border:1px solid #ddd}.error[_ngcontent-%COMP%]{background:#a44;border:1px solid #ddd}.save-proj[_ngcontent-%COMP%]{display:inline}a.btn-primary[_ngcontent-%COMP%]{color:#fff}.top-buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.overlay[_ngcontent-%COMP%]{position:fixed;width:100vw;height:100vh;inset:0;color:#fff;background-color:#00000080;z-index:100000;cursor:pointer}.overlay-txt[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px;font-weight:700}.btn-secondary.disabled[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%]:disabled{color:#fff;background-color:#6c757d;border-color:#6c757d}.undo-redo[_ngcontent-%COMP%]{align-items:center;gap:7px}.undo-redo[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{cursor:pointer}.undo-redo[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]{color:#999;cursor:not-allowed}"]})}return n})()}}]);