'use strict';

//dummy content
var y = [
    {
        'master' : 'first headline',
        'details'  : 'this is content'
    },
    {
        'master' : 'second headline',
        'details'  : 'this is another content'
    }

];



var pages = [
    ,{name:'home'}
    ,{name:'chat'}
    ,{name:'about'}
    ,{name:'contact'}
];

module.exports = function()
{
    //app.log('home');
    app.get('/',function(req,res)
    {
        res.redirect('/news/1');
    });

    app.get('/news/:id',function(req,res)
    {
        res.render(__dirname +'/view/home.html', { foo: 'welcome', y : y, details:y[req.params.id-1].details });
    });

}();

/*
[ 'upload',

  { domain: null,
    _events: {},
    _maxListeners: 10,
    size: 64348,
    path: '/Users/daslicht/node/swig/uploads/d2e1de2703d610c4dd6c7f3b95d9cdd9.jpg',
    name: '255469_10150859787544039_1931365586_n.jpg',
    type: 'image/jpeg',
    hash: null,
    lastModifiedDate: Wed Jul 10 2013 01:51:58 GMT+0200 (CEST),
    _writeStream: 
        { 
            _writableState: [Object],
            writable: true,
            domain: null,
            _events: [Object],
            _maxListeners: 10,
            path: '/Users/daslicht/node/swig/uploads/d2e1de2703d610c4dd6c7f3b95d9cdd9.jpg',
            fd: null,
            flags: 'w',
            mode: 438,
            start: undefined,
            pos: undefined,
            bytesWritten: 64348,
            closed: true 
        } 
   } 
]
*/
