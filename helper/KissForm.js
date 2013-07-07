
module.exports = function () {
  //  var fs  = require('fs');
    var cssdir = app.locals.appDir + '/layout/css/';
    var jsdir  = app.locals.appDir + '/layout/js/';
    var helperDir = app.locals.appDir + '/helper/';

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
                fs.writeFile(+ cssdir + _filename, css, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
            }     
         }catch(e){
           console.log(e);
         }
    };


    function createJS(_filename) {
     
        
        var tmpl = swig.compileFile(helperDir + "formEvent.js");
        var script = tmpl.render({
                sender: k.id+'_form',
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
         }catch(e){
           
         }
    };
 

   function KissForm(){
        this._id = ""
        this._body = "";
        this._footer = "</div>";
        this._header ="";
        this._submit = "";
    }

    KissForm.prototype = 
    {   
        /*GETTER*/ 
        get id(){
            return this._id;
        },
        get body(){
            return this._body;
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
        set body(value){
            this._body = value;
        },
        set footer(value){
            this._footer = value;
        },
        set header(value) {
           
        },
        set submit(value) {
            
        }


    }
    var k = new KissForm();
     

   /*=============================================================================================*/

    this.newForm = function(id){
       //this._id = id;
       k.id = id;
      // createCSS(this._id+"_form.less");
       createJS(k.id+"_form.js");
    };


    this.addFormItem = function(label, id, type) 
    {
        var _item_error  =    "<div class='error' id='"+id+"_error'>errortext</div>";
        var _item_header =    "<div id='"+id+"_row'>";
        var _item_label  =       "<label for='"+id+"_input'>"+label+"</label>";
        var _item_input  =       "<input id='"+id+"_input' type='"+type+"' placeholder='"+label+"'>";
        var _item_footer =    "</div>";
        k.body +=  _item_header + _item_error +_item_label + _item_input + _item_footer;
    };


    this.getForm = function() {
        var result = k.header+ k.body + k.footer + k.submit;
        app.post('/eventbus',function(req,res)
        {
            console.log(req)
    //    res.render(__dirname +'/view/chat.html', { foo: 'bar'});
        });
        return result;
    };

    /*
    Constructor, executed on instantiation
    *************/
    //(function(){   
        //l('KISSFORM constructor called')
    //})();

    return this;

}();

