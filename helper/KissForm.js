'use strict'
var KissForm = {};

var cssdir = app.locals.appDir + '/layout/css/';
var jsdir  = app.locals.appDir + '/layout/js/forms/';
var helperDir = app.locals.appDir + '/helper/';

var formHeader = '';
var formItems = '';
var formSubmit = '';
var formFooter = "</div>";
var id = '';

/* PRIVATE 
******************************/
    function createJS( filename) {
        var tmpl = swig.compileFile(helperDir + "formEvent.js");
        var script = tmpl.render({
                sender: id+'_form',
            });
        try{
            if(!fs.existsSync( jsdir + filename)) {           
                l("Creating JS EventHandler:" + jsdir + filename);
                fs.writeFile( jsdir + filename, script, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
            }     
         }catch(e){}
    };

    function createCSS( filename) {
        var fs  = require('fs');
        var css = addCSSID( id +'_error');
        try{
            if( !fs.existsSync( cssdir + filename)) {
                l("Creating CSS STUB for Form:" + cssdir + filename);
                fs.writeFile( cssdir + filename, css, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
            }     
         }catch(e){}
    };

    function addCSSID( id){
        var newID = 
        "#"+id+"{ \n"+
            "\t opacity : 1; \n"+
        "}\n";
        return newID;
    };
             
/* PUBLIC 
****************************/

    KissForm.newForm = function( _id) {    
        formItems= "";
        console.log('INIT');
        id = _id;
        console.log( "ID: ", id );
        createCSS( id + "_form.less" );
        createJS( id + "_form.js" );
        formHeader = "<div id='"+ id +"_form'>";
        formSubmit = "<button id='"+ id +"_form_submit'>Submit</button>";
       
    } 

    KissForm.addItem = function( label, id, type) {
        var _item_error  =    "<div class='error' id='"+id+"_error'>errortext</div>";
        var _item_header =    "<div id='"+id+"_row'>";
        var _item_label  =       "<label for='"+id+"_input'>"+label+"</label>";
        var _item_input  =       "<input id='"+id+"_input' name="+id+" type='"+type+"' placeholder='"+label+"'>";
        var _item_footer =    "</div>";
        formItems +=  _item_header + _item_error +_item_label + _item_input + _item_footer;
    }

    KissForm.getForm = function() {
 
        return formHeader + formItems + formSubmit + formFooter;
    }

module.exports =  KissForm;
/* EOF ===============================================================================================*/