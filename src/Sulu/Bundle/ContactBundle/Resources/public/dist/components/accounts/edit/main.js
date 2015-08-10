define(["services/sulucontact/account-manager","services/sulucontact/account-router","services/sulucontact/account-delete-dialog"],function(a,b,c){"use strict";return{header:function(){var a={tabs:{url:"/admin/content-navigations?alias=account",options:{disablerToggler:"husky.toggler.sulu-toolbar"}},toolbar:{buttons:{save:{parent:"saveWithOptions"}}}};return this.options.id&&(a.toolbar.buttons["delete"]={},a.toolbar.buttons.disabler={parent:"toggler",options:{title:"public.locked",hidden:!0}}),a},initialize:function(){this.bindCustomEvents()},bindCustomEvents:function(){this.sandbox.on("sulu.header.back",b.toList),this.sandbox.on("sulu.tab.dirty",this.enableSave.bind(this)),this.sandbox.on("sulu.router.navigate",this.disableSave.bind(this)),this.sandbox.on("sulu.toolbar.save",this.save.bind(this)),this.sandbox.on("sulu.tab.saving",this.loadingSave.bind(this)),this.sandbox.on("sulu.toolbar.delete",this.deleteAccount.bind(this))},deleteAccount:function(){c.showDialog([this.options.id],function(c){a["delete"](this.options.id,c).then(function(){b.toList()}.bind(this))}.bind(this))},save:function(a){this.saveTab().then(function(b){this.afterSave(a,b)}.bind(this))},saveTab:function(){var a=$.Deferred();return this.sandbox.once("sulu.tab.saved",function(b){a.resolve(b)}.bind(this)),this.sandbox.emit("sulu.tab.save"),a},enableSave:function(){this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)},disableSave:function(){this.sandbox.emit("sulu.header.toolbar.item.disable","save",!1)},loadingSave:function(){this.sandbox.emit("sulu.header.toolbar.item.loading","save")},afterSave:function(a,c){this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0),"back"===a?b.toList():"new"===a?b.toAdd():this.options.id||b.toEdit(c.id)}}});