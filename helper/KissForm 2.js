
module.exports =  function(){
  //  var fs  = require('fs');


   function KissForm(){
        
        var cssdir = app.locals.appDir + '/layout/css/';
        var jsdir  = app.locals.appDir + '/layout/js/';
        var helperDir = app.locals.appDir + '/helper/';

        this._id = ""
        this._formItems = "";
        this._footer = "</div>";
        this._header ="";
        this._submit = "";


        /* PRIVATE 
        ******************************/

            function createJS(_filename) {
                var tmpl = swig.compileFile(helperDir + "formEvent.js");
                var script = tmpl.render({
                        sender: this.id+'_form',
                    });
                try{
                    if(!fs.existsSync( jsdir +_filename)){
                        
                        l("Creating JS EventHandler:" + jsdir + _filename);
                        fs.writeFile( jsdir + _filename, script, function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("The file was saved!");
                            }
                        });
                    }     
                 }catch(e){}
            };

            function addCSSID(id){
                var newID = 
                "#"+id+"{ \n"+
                    "\t opacity : 1; \n"+
                "}\n";
                return newID;
            };
            
            function createCSS(_filename) {
                var fs  = require('fs');
                var css = addCSSID(_id+'_error');
                try{
                    if(!fs.existsSync( cssdir +_filename)){
                        l("Creating CSS STUB for Form:" + cssdir + _filename);
                        fs.writeFile( cssdir + _filename, css, function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("The file was saved!");
                            }
                        });
                    }     
                 }catch(e){}
            };

            function reset() {
                this._id = ""
                this._formItems= "";
                this._footer = "</div>";
                this._header ="";
                this._submit = "";
                console.log('formItems',this.formItems);
            }
        


        /* PUBLIC 
        ****************************/

            this.newForm = function(id){
               

                reset();
                this.id = id;
                createCSS(this._id+"_form.less");
                createJS( this._id+"_form.js");

                 console.log("ID: ",this.id);
            };

            this.addFormItem = function(label, id, type) 
            {
                var _item_error  =    "<div class='error' id='"+id+"_error'>errortext</div>";
                var _item_header =    "<div id='"+id+"_row'>";
                var _item_label  =       "<label for='"+id+"_input'>"+label+"</label>";
                var _item_input  =       "<input id='"+id+"_input' type='"+type+"' placeholder='"+label+"'>";
                var _item_footer =    "</div>";
                this.formItems +=  _item_header + _item_error +_item_label + _item_input + _item_footer;
            };


            this.getForm = function() {
                var result = this.header+ this.formItems + this.footer + this.submit;
                app.post('/eventbus',function(req,res)
                {
                    console.log(req)
            //    res.render(__dirname +'/view/chat.html', { foo: 'bar'});
                });
                return result;
            };

    }

    KissForm.prototype = 
    {   
        /*GETTER*/ 
        get id(){
            return this._id;
        },
        get formItems(){
            return this._formItems;
        },
        get footer(){
            return this._footer;
        },
        get header() {
            return "<div id='"+this._id+"_form'>";
        },
        get submit() {
            return "<button id='"+this._id+"_form_submit'>Submit</button>";
        },
        
        /*SETTER*/
        set id(value){
            this._id = value;
        },
        set formItems(value){
            l('SET formItems');
            this._formItems = value;
        },
        set footer(value){
            this._footer = value;
        },
        set header(value) {},
        set submit(value) {}

    }

   
   var t = new KissForm();
   return t; 

   /*=============================================================================================*/





    /*
    Constructor, executed on instantiation
    *************/
    // (function(){   
    //     l('KISSFORM constructor called');
        
        
    // })();

}();

