/*
creates a input form DIV and created a less file for its selectors

DEPENDENCIES:
app.locals.appDir
l()
 
EXAMPLE USAGE
var k= new KissForm('test');
    k.addFormItem('Username','username','text')
    l('FORM ', k.getForm());
    app.locals.myform = k.getForm();

*/
// function KissForm(value) {

//     var _test = value;
    
//     this.test = function(){
//         return _test;
//     }
// }






module.exports = function () {

    var _id = "";
    var _header = "<div id='"+_id+"_form'>";
    var _body = "";
    var _footer = "</div>";
    var _submit = "<button id='"+_id+"_form_submit'>Submit</button>";


    this.newForm = function(id){
       _id = id;
       createCSS(_id+"_form.less");
    };

    this.test = function(){
        return _id;
    };

    this.addFormItem = function(label, id, type) 
    {
        var _item_error  =    "<div id='"+id+"_error'>errortext</div>";
        var _item_header =    "<div id='"+id+"_row'>";
        var _item_label  =       "<label for='"+id+"_input'>"+label+"</label>";
        var _item_input  =       "<input id='"+id+"_input' type='"+type+"' placeholder='"+label+"'>";
        var _item_footer =    "</div>";
        _body += _item_error + _item_header + _item_label + _item_input + _item_footer;
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
            if(!fs.existsSync(app.locals.appDir+'/layout/css/'+_filename)){
                l("Creating CSS STUB for Form:" + app.locals.appDir+'/layout/css/'+_filename);
                fs.writeFile(app.locals.appDir+'/layout/css/'+_filename, css, function(err) {
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

    this.getForm = function() {
        var result = _header + _body + _footer + _submit;
        return result;
    };

    /*
    Constructor, executed on instantiation
    *************/
    (function(){   
        l('KISSFORM constructor called')
        //createCSS(_id+"_form.less");
    })();


    return this;

}();

