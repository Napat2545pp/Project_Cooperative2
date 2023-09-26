  
var express = require('express');
var router = express.Router();
var mysql=require('../connect');

// admin // 
router.get('/adminform', function (req, res, next) {
  var name = req.session.name; 
  res.render('adminform', { title: 'adminform', name: name });
});


// แสดงข้อมุล member (admin)
router.get('/navuser',(req,res)=>{
  var name = req.session.name; 
  var sql = 'SELECT * FROM member';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('navuser', { items:result,title: 'navuser', name: name });
    }
  })
});

// หน้า adduser (admin)
router.get('/adduser', function(req, res, next) {
  var name = req.session.name; 
  res.render('adduser', { title: 'adduser', name: name  })
});

// เพิ่ม member (admin)
router.post('/adduser',(req, res)=>{
  var sql = 'INSERT INTO member SET?';
  var data = req.body;
  mysql.query(sql,data,(err,result)=>{
    if(err){
      res.send(err);
  } else{
    res.redirect('/navuser');
  }
  })
});

//แก้ไข member (admin)
router.get('/updateuser/:id',(req, res) => {
  var name = req.session.name; 
  var sql = 'SELECT * FROM member WHERE memberID =?';
  mysql.query(sql,req.params.id, (err, result) => {
      if(err){
          res.send(err);
      }else{
          res.render('updateuser',{data:result[0] ,title: 'updateuser', name: name});
      }
  })
})
//แก้ไข member (admin)
router.post('/updateuser/:id',(req,response)=>{
  var sql = 'UPDATE member SET? WHERE memberID  =?';
  var params=[req.body,req.params.id];
  mysql.query(sql,params,(err,result)=>{
      if(err){
          response.send(err);
      }else{
          response.redirect('/admin/navuser');
      }
      response.end();
  })
})

//ลบ member (admin)
router.get('/navuser/:id',(req, response) => {
var sql = 'DELETE FROM member WHERE memberID = ?';
var id=req.params.id;
console.log(id);

mysql.query(sql, id, (err, result) => {
    if(err) {
     response.send(err);
        console.log('OK');
    }else{
     console.log('OK');
        response.redirect('/admin/navuser');
    }
    response.end();
    
});
});

// แสดงข้อมุล department (admin)
router.get('/department',(req,res)=>{
  var name = req.session.name; 
  var sql = 'SELECT * FROM department';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('department', { items:result,title: 'department', name: name });
    }
  })
});

//adddepartment (admin)
router.get('/adddepartment', function(req, res, next) {
  var name = req.session.name; 
  res.render('adddepartment', { title: 'adddepartment', name: name })
});
// เพิ่ม department (admin)
  router.post('/adddepartment',(req, res)=>{
    var sql = 'INSERT INTO department SET?';
    var data = req.body;
    mysql.query(sql,data,(err,result)=>{
      if(err){
        res.send(err);
    } else{
      res.redirect('/department');
    }
    })
  });
//แก้ไข department (admin)
  router.get('/updatedepartment/:id',(req, res) => {
    var name = req.session.name; 
    var sql = 'SELECT * FROM department WHERE departmentID  =?';
    mysql.query(sql,req.params.id, (err, result) => {
      if(err){
          res.send(err);
      }else{
          res.render('updatedepartment',{data:result[0] , name: name });
      }
  })
})
router.post('/updatedepartment/:id',(req,response)=>{
  var sql = 'UPDATE department SET? WHERE departmentID   =?';
  var params=[req.body,req.params.id];
  mysql.query(sql,params,(err,result)=>{
      if(err){
          response.send(err);
      }else{
          response.redirect('/admin/department');
      }
      response.end();
  })
})
//ลบ department
router.get('/department/:id',(req, response) => {
  var sql = 'DELETE FROM department WHERE departmentID = ?';
  var id=req.params.id;
  console.log(id);

  mysql.query(sql, id, (err, result) => {
      if(err) {
       response.send(err);
          console.log('OK');
      }else{
       console.log('OK');
          response.redirect('/admin/department');
      }
      response.end();
  });
});

// แสดงข้อมุล room (admin)
  router.get('/roomadmin',(req,res)=>{
    var name = req.session.name; 
    var sql = 'SELECT * FROM room';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('roomadmin', { items:result , name: name });
    }
  })
});

//เพิ่มห้องประชุม (admin)
router.get('/addroom', function(req, res, next) {
  var name = req.session.name; 
  res.render('addroom', { title: 'addroom', name: name })
});

// เพิ่ม room (admin)
router.post('/addroom',(req, res)=>{
  var sql = 'INSERT INTO room SET?';
  var data = req.body;
  mysql.query(sql,data,(err,result)=>{
    if(err){
        res.send(err);
    } else{
      res.redirect('/admin/roomadmin');
    }
    })
  });

//แก้ไข room
router.get('/updateroom/:id',(req, res) => {
  var name = req.session.name; 
  var sql = 'SELECT * FROM room WHERE roomid  =?';
  mysql.query(sql,req.params.id, (err, result) => {
      if(err){
          res.send(err);
      }else{
          res.render('updateroom',{
              data:result[0] , name: name
          });
      }
  })
})

router.post('/updateroom/:id',(req,response)=>{
  var sql = 'UPDATE room SET? WHERE roomid   =?';
  var params=[req.body,req.params.id];
  mysql.query(sql,params,(err,result)=>{
      if(err){
          response.send(err);
      }else{
          response.redirect('/admin/roomadmin');
      }
      response.end();
  })
})


// booking (admin)
router.get('/Bookingadmin',(req,res)=>{
  var name = req.session.name; 
  var sql = 'SELECT * FROM booking';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('Bookingadmin', { items:result,title: 'Bookingadmin', name: name });
    }
  })
});

//แก้ไข member (admin)
router.get('/updatebooking/:id',(req, res) => {
  var name = req.session.name; 
  var sql = 'SELECT * FROM booking WHERE id =?';
  mysql.query(sql,req.params.id, (err, result) => {
      if(err){
          res.send(err);
      }else{
          res.render('updatebooking',{data:result[0] ,title: 'updatebooking', name: name});
      }
  })
})

// datebooking (admin)
router.post('/updatebooking/:id',(req,response)=>{
  var sql = 'UPDATE booking SET? WHERE id   =?';
  var params=[req.body,req.params.id];
  mysql.query(sql,params,(err,result)=>{
      if(err){
          response.send(err);
      }else{
          response.redirect('/admin/Bookingadmin');
      }
      response.end();
  })
})





//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


// user //
router.get('/userform', function(req, res, next) {
  var name = req.session.name; 
  res.render('userform', { title: 'userform', name: name });
});

// แสดงข้อมุล room (user)
router.get('/roomorder',(req,res)=>{
  var name = req.session.name; 
  var sql = 'SELECT * FROM room';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('roomorder', { items:result,title: 'roomorder', name: name });
    }
  })
});

//detail room (user)
router.get('/roomdetail/:id',(req, res) => {
  var name = req.session.name; 
  var sql = 'SELECT * FROM room WHERE roomid =?';
  mysql.query(sql,req.params.id, (err, result) => {
      if(err){
          res.send(err);
      }else{
          res.render('roomdetail',{data:result[0] , name: name });
      }
  })
})


//reseverroom (user)
router.get('/reseveroom', (req, res) => {
  var name = req.session.name; 
  mysql.query('SELECT departmentname FROM department', (err, results) => {
    if (err) throw err;
    const departments = results;

    mysql.query('SELECT * FROM room', (err, results) => {
      if (err) throw err;
      const rooms = results;
      res.render('reseveroom', { departments, rooms , name: name });
    });
  });
});


// เพิ่ม member (admin)
router.post('/reseveroom',(req, res)=>{
  var sql = 'INSERT INTO booking SET?';
  var data = req.body;
  mysql.query(sql,data,(err,result)=>{
    if(err){
      res.send(err);
  } else{
    res.redirect('/roomorder');
  }
  })
});

// แสดงข้อมุล room (user)
router.get('/Bookinginuser',(req,res)=>{
  var name = req.session.name; 
  var sql = 'SELECT * FROM booking';
  mysql.query(sql,(err, result)=>{
    if(err){
      res.send(err);
    }else{
      res.render('Bookinginuser', { items:result,title: 'Bookinginuser', name: name });
    }
  })
});


// router.post('/reseveroom', (req, res) => {
//   const departmentname = req.body.departmentname;
//   const roomname = req.body.roomname;
//   // ใส่โค้ดที่มึงจะบันทึกว่าบันทึกไว้ที่ไหนอะไอสัส
//   res.send(`คุณเลือกแผนก: ${departmentname} , คุณเลือกห้อง: ${roomname}`);
// });




































router.get('/failuser', function(req, res, next) {
  res.render('failuser', { title: 'failuser' })
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


  module.exports = router;