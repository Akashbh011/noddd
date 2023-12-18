const express = require("express");
const path = require("path"); 
const fs =require("fs");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// const MONGODB_URI='mongodb://192.168.89.109:27017/contactcp';


const dotenv = require('dotenv');


// Load environment variables from a .env file
dotenv.config();

// MongoDB Atlas connection string
const mongoDBAtlasURI = process.env.MONGODB_URI;

mongoose.connect(mongoDBAtlasURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error.message);
  // You might want to handle different types of errors here, such as authentication failures.
  process.exit(1); // Exit the application on connection error
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


// // Replace <password> with your actual MongoDB Atlas password
// const password = "pWNflWnrJu1MnbWS";

// // Replace <database-name> with your actual database name
// const databaseName = "contactcp";

// // MongoDB Atlas connection string
// const mongoDBAtlasURI = `mongodb+srv://akashbh011:xWfEuZPDJ1n249SA@cluster0.mvrnfos.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

// mongoose.connect(mongoDBAtlasURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB Atlas');
// });

// // Optionally, you can handle disconnection events
// db.on('disconnected', () => {
//   console.log('Disconnected from MongoDB Atlas');
// });


// const MONGODB_URI='mongodb://192.168.89.109:27017/contactcp';

// mongoose.connect(MONGODB_URI, (error) => {
//   if (error) {
//     console.error("Connection error:", error);
//   } else {
//     console.log("Connected to MongoDB");
//   }
// });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
    
  });

  const Contact = mongoose.model('Contact', contactSchema);


  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });
  //for login stuff credentials
  const UserModel = mongoose.model('User', userSchema);
  

  const anotherContactSchema = new mongoose.Schema({
    orderDate: Date,
    daysSelect: Number,
    panNumber: String,
    address: String,
    phone: String,
    amount:Number
    // Add other fields as needed
});

const AnotherContact = mongoose.model('AnotherContact', anotherContactSchema);


const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const AdminModel = mongoose.model('Admin', adminSchema);

const storageSchema = new mongoose.Schema({
  id: String,
  src: String,
  shirt: String,
  price: String,
  rating: String,
  flag: Boolean
});

// Create the "storage" model
const StorageModel = mongoose.model('Storage', storageSchema);
const StorageModel2 = mongoose.model('Storage2', storageSchema);
const StorageModel3 = mongoose.model('Storage3', storageSchema);


// Your storage data
const storageData = [{
  id:"div1",
  src:"https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  shirt:"Axians laptop",
  price:"89599",
  rating:"4.5",
  flag:false


}
,{    id:"div2",
  src:"https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  shirt:"Macbook Pro",
  price:"123499",
  rating:"4.2",
  flag:false
},{
      id:"div3",
  src:"https://images.herzindagi.info/image/2023/Oct/Nikon-Camera.jpg",
  shirt:"DSLR nikon",
  price:"22650",
  rating:"4.1",
  flag:false
},{
      id:"div4",
  src:"https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-pro-spring21_hero_04202021_big.jpg.large.jpg",
  shirt:"I-pad pro M1 ",
  price:"55489",
  rating:"4",
  flag:false
},{
      id:"div5",
  src:"https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1687810462/JBL_flip6_review_ty7olw",
  shirt:"JBL Flip-6",
  price:"4999",
  rating:"4.3",
  flag:false
},{
      id:"div6",
  src:"https://www.pcwelt.de/wp-content/uploads/2023/04/4351484_original.jpg?quality=50&strip=all&w=1024",
  shirt:"ASUS RT-AX53U Routers",
  price:"3000",
  rating:"4.2",
  flag:false
}];

var storageData2=[{
  id:"div1",
  src:"https://images-na.ssl-images-amazon.com/images/I/61nIXPBGGBL.jpg",
  shirt:"Hmcozy-Sports Cycling Bicycle",
  price:"39599",
  rating:"4.5",
  flag:false


}
,{    id:"div2",
  src:"https://cdn.shopify.com/s/files/1/0643/3210/3904/files/1_e3624c70-8b9d-42fc-a3a2-29de86335ab3_480x480.webp?v=1687015522",
  shirt:"4DRC V14",
  price:"123499",
  rating:"4.2",
  flag:false
},{
      id:"div3",
  src:"https://www.ferentino.co.uk/cdn/shop/products/men_sredblacktuxedo_flowereddesignshawllapel3piece_1.jpg?v=1641669924",
  shirt:"farentino suit limited edition",
  price:"52650",
  rating:"4.1",
  flag:false
},{
      id:"div4",
  src:"https://www.digitaltrends.com/wp-content/uploads/2016/02/2016-Ford-Mustang-GT-top-angle-v4.jpg?p=1",
  shirt:"FORD MUTANG GT 2018",
  price:"4548999",
  rating:"4",
  flag:false
},{
      id:"div5",
  src:"https://rukminim2.flixcart.com/image/850/1000/xif0q/rucksack/r/8/n/travel-bag-for-men-tourist-bag-backpack-for-hiking-trekking-original-imagtcmgqyqyghzn.jpeg?q=90",
  shirt:"Trunkit Trekking kit",
  price:"14999",
  rating:"4.3",
  flag:false
},{
      id:"div6",
  src:"https://i.pinimg.com/736x/08/da/52/08da5237b0370bc11fdf1c53c9002182.jpg",
  shirt:"Ducati 2023",
  price:"1723000",
  rating:"4.2",
  flag:false
}];


var storageData3=[{
  id:"div1",
  src:"https://pemmzchannel.com/wp-content/uploads/2021/02/06e3f32172a8d6d8b598415df72d21e9.jpg",
  shirt:"ASUS ROG gaming laptop",
  price:"1789599",
  rating:"4.5",
  flag:false


}
,{    id:"div2",
  src:"https://5.imimg.com/data5/SELLER/Default/2023/6/319453615/CW/VF/JZ/66085731/jbl-partybox-710-jbl-bluetooth-speaker.jpg",
  shirt:"JBL partyBox 710",
  price:"56499",
  rating:"4.2",
  flag:false
},{
      id:"div3",
  src:"https://pyxis.nymag.com/v1/imgs/5fd/22f/ef13ef86e91d9463acff0a6b821f6cbc8d.jpg",
  shirt:"metal detector ",
  price:"103255",
  rating:"4.1",
  flag:false
},{
      id:"div4",
  src:"https://i2.wp.com/www.karmanhealthcare.com/wp-content/uploads/2013/01/LT-980-BD-BD_MAIN-510x74-1.jpg",
  shirt:"Cosmocare echo Wheel-chair",
  price:"89489",
  rating:"4",
  flag:false
},{
      id:"div5",
  src:"https://st2.depositphotos.com/1970689/5988/i/450/depositphotos_59885005-stock-photo-projector-in-conference-room.jpg",
  shirt:"wireless 3D projector",
  price:"44999",
  rating:"4.3",
  flag:false
},{
      id:"div6",
  src:"https://motobike.in/wp-content/uploads/2021/03/TVS-Scooty-Pep-Plus-BS6-Princess-Pink.jpg",
  shirt:"TVS scooty",
  price:"120000",
  rating:"4.2",
  flag:false
}]
// Insert the "storage" data into the collection
StorageModel.insertMany(storageData, (error) => {
  if (error) {
    console.error('Error initializing the Storage collection:', error);
  } else {
    console.log('Storage collection initialized successfully');
  }
});
StorageModel2.insertMany(storageData2, (error) => {
  if (error) {
    console.error('Error initializing the Storage collection:', error);
  } else {
    console.log('Storage collection initialized successfully');
  }
});
StorageModel3.insertMany(storageData3, (error) => {
  if (error) {
    console.error('Error initializing the Storage collection:', error);
  } else {
    console.log('Storage collection initialized successfully');
  }
});




const app = express();
const port = 8001;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = {title:'pubg is the best game .' }
    res.status(200).render('home.pug', params);
})


app.get('/regular', (req, res) => {
  const shopingPath = path.join(__dirname, 'shoping.html');
  res.sendFile(shopingPath);
});

app.get('/another-category', (req, res) => {
  const shopingPath1 = path.join(__dirname, 'shoping2.html');
  res.sendFile(shopingPath1);
});

app.get('/long-term-category', (req, res) => {
  const shopingPath3 = path.join(__dirname, 'shoping3.html');
  res.sendFile(shopingPath3);
});
app.get('/afterpayment', (req, res) => {
  const shopingPath66 = path.join(__dirname, 'afterpayment.html');
  res.sendFile(shopingPath66);
});

app.get("/contact1", (req, res)=>{ 
    res.status(200).render('contact1.pug');
});
app.get("/contactstart", (req, res)=>{ 
  res.status(200).render('contactstart.pug');
});

app.get("/newd", (req, res)=>{ 
  res.status(200).render('newd.pug');
});

app.get("/newd1", (req, res)=>{ 
  res.status(200).render('newd1.pug');
});
app.get("/newd2", (req, res)=>{ 
  res.status(200).render('newd2.pug');
});

app.get("/newcity1options", (req, res)=>{ 
  res.status(200).render('newcity1options.pug');
});
app.get("/newcity2options", (req, res)=>{ 
  res.status(200).render('newcity2options.pug');
});
app.get("/newcity3options", (req, res)=>{ 
  res.status(200).render('newcity3options.pug');
});
app.get("/newcity4options", (req, res)=>{ 
  res.status(200).render('newcity4options.pug');
});
app.get("/newcity5options", (req, res)=>{ 
  res.status(200).render('newcity5options.pug');
});
app.get("/additem", (req, res)=>{ 
  res.status(200).render('additem.pug');
});
// app.get("/regular", (req, res)=>{ 
//   res.status(200).render('shoping.pug');
// });
app.get("/long-term-premium", (req, res)=>{ 
    res.status(200).render('services.pug');
});
app.get("/another-category", (req, res)=>{ 
    res.status(200).render('services.pug');
});




app.get("/services", (req, res)=>{ 
    res.status(200).render('services.pug');
});

app.get("/about", (req, res)=>{ 
    res.status(200).render('about.pug');
});
app.get("/city1", (req, res)=>{ 
    res.status(200).render('city1.pug');
});
app.get("/city2", (req, res)=>{ 
  res.status(200).render('city2.pug');
});
app.get("/city3", (req, res)=>{ 
  res.status(200).render('city3.pug');
});
app.get("/city4", (req, res)=>{ 
  res.status(200).render('city4.pug');
});
app.get("/city5", (req, res)=>{ 
  res.status(200).render('city5.pug');
});
app.get("/rent", (req, res)=>{ 
    res.status(200).render('rent.pug');
});
app.get("/login", (req, res)=>{ 
    res.status(200).render('login.hbs');
});
app.get("/signup", (req, res)=>{ 
    res.status(200).render('signup.hbs');
});
app.get("/joinus", (req, res)=>{ 
  res.status(200).render('addnew.pug');
});
app.get("/joinoptions", (req, res)=>{ 
  res.status(200).render('joinoptions.pug');
});
app.get("/newd1", (req, res)=>{ 
  res.status(200).render('newd1.pug');
});
app.get("/newd2", (req, res)=>{ 
  res.status(200).render('newd2.pug');
});

app.get('/confirmation', (req, res) => {
  // Fetch all order data from the database (replace with your database logic)
  AnotherContact.find({}, (error, orderData) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      return res.status(500).send("Order data could not be retrieved from the database");
    }

    res.status(200).render('confirmation.pug', {
      orderData: orderData,
    });
  });
});
app.get('/get-storage-data', (req, res) => {
  StorageModel.find({}, (err, data) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Error fetching data');
      } else {
          res.json(data); // Send the retrieved data as JSON
      }
  });
});


// app.get('/display-data', (req, res) => {
//   // Fetch data from the AnotherContact collection in the contactcp database
//   AnotherContact.find({}, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error fetching data');
//     } else {
//       // Render the Pug file and pass the data as a parameter
//       res.render('display-data.pug', { data });
//     }
//   });
// });


/*
app.get('/example/a', (req, res)=>{
    console.log('hello from A !');
    res.send("hello from A !");
});
    
 

app.get('/example/b', (req, res,next)=>{
   console.log('response will be sent by next function...');
   next();
},function(req,res){res.send("hello from B !");});
*/

app.get("/add-storage", (req, res) => {
  res.render("addstorage.pug");
});
app.get("/add-storage2", (req, res) => {
  res.render("addstorage2.pug");
});
app.get("/add-storage3", (req, res) => {
  res.render("addstorage3.pug");
});


app.get('/get-storage-data', async (req, res) => {
  try {
    const StorageModel = mongoose.model('Storage', storageSchema);
    const storageData = await StorageModel.find().lean(); // Convert Mongoose document to plain JavaScript object
    res.json(storageData);
  } catch (error) {
    console.error('Error fetching storage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/get-storage2-data', async (req, res) => {
  try {
    const StorageModel2 = mongoose.model('Storage2', storageSchema);
    const storageData2 = await StorageModel2.find().lean(); // Convert Mongoose document to plain JavaScript object
    res.json(storageData2);
  } catch (error) {
    console.error('Error fetching storage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-storage3-data', async (req, res) => {
  try {
    const StorageModel3 = mongoose.model('Storage3', storageSchema);
    const storageData3 = await StorageModel3.find().lean(); // Convert Mongoose document to plain JavaScript object
    res.json(storageData3);
  } catch (error) {
    console.error('Error fetching storage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/update-item-flag', async (req, res) => {
  try {
    const { id } = req.body;

    const StorageModel = mongoose.model('Storage', storageSchema);
    const updatedItem = await StorageModel.findOneAndUpdate({ id }, { flag: true }, { new: true });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item flag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post("/addstorage", (req, res) => {
  // Retrieve data from the form input fields
  const { id, src, shirt, price, rating, flag } = req.body;

  // Create a new document for the "storages" collection
  const newStorage = {
    id,
    src,
    shirt,
    price,
    rating,
    flag: flag === "on", // Convert the checkbox value to a boolean
  };

  // Connect to MongoDB and define the "Storage" model if not already defined
  const StorageModel = mongoose.models.Storage || mongoose.model("Storage", storageSchema);

  // Insert the new document into the "Storage" collection
  StorageModel.create(newStorage, (error, result) => {
    if (error) {
      console.error("Error adding storage:", error);
      res.status(500).send("Error adding storage");
    } else {
      console.log("Storage added successfully:", result);
      res.redirect("/city1"); // Redirect to the add storage form
    }
  });
});


app.post("/addstorage2", (req, res) => {
  // Retrieve data from the form input fields
  const { id, src, shirt, price, rating, flag } = req.body;

  // Create a new document for the "storages" collection
  const newStorage = {
    id,
    src,
    shirt,
    price,
    rating,
    flag: flag === "on", // Convert the checkbox value to a boolean
  };

  // Connect to MongoDB and define the "Storage" model if not already defined
  const StorageModel2 = mongoose.models.Storage2 || mongoose.model("Storage2", storageSchema);

  // Insert the new document into the "Storage" collection
  StorageModel2.create(newStorage, (error, result) => {
    if (error) {
      console.error("Error adding storage:", error);
      res.status(500).send("Error adding storage");
    } else {
      console.log("Storage added successfully:", result);
      res.redirect("/city1"); // Redirect to the add storage form
    }
  });
});

app.post("/addstorage3", (req, res) => {
  // Retrieve data from the form input fields
  const { id, src, shirt, price, rating, flag } = req.body;

  // Create a new document for the "storages" collection
  const newStorage = {
    id,
    src,
    shirt,
    price,
    rating,
    flag: flag === "on", // Convert the checkbox value to a boolean
  };

  // Connect to MongoDB and define the "Storage" model if not already defined
  const StorageModel3 = mongoose.models.Storage3 || mongoose.model("Storage3", storageSchema);

  // Insert the new document into the "Storage" collection
  StorageModel3.create(newStorage, (error, result) => {
    if (error) {
      console.error("Error adding storage:", error);
      res.status(500).send("Error adding storage");
    } else {
      console.log("Storage added successfully:", result);
      res.redirect("/city1"); // Redirect to the add storage form
    }
  });
});



app.post('/', (req, res) => {



    const myData = new Contact(req.body);

    myData.save()
        .then(() => {
            
            res.status(200).render('aftercontact.pug');
        })
        .catch((error) => {
            console.error("Error saving to the database:", error);
            res.status(500).send("Item was not saved to the database");
        });
});

// app.post('/mail', (req, res) => {
//   const { name, email, phone, message } = req.body;

//   // Compose email content
//   const emailContent = `Username: pavan \n Password: p123`;

//   // Create a nodemailer transporter with your email credentials
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'akashbhnadari163@gmail.com', // Replace with your email address
//       pass: 'qxqaufomilpmvxra', // Replace with your email password
//     },
//   });

//   // Setup email data
//   const mailOptions = {
//     from: 'akashbhnadari163@gmail.com', // Replace with your email address
//     to: email,
//     subject: 'USE THE FOLLOWING LOGIN CREDENTIALS TO ACCESS THE WEBSITE',
//     text: emailContent,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       console.log('Email sent: ' + info.response);
//       console.log('Email sent successfully!');
//       res.status(200).render('aftercontact.pug');
//     }
//   });
// });



app.post('/mail', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Search for the user in the database based on the provided name
    const user = await UserModel.findOne({ name });

    if (!user) {
      // User not found in the database
      return res.status(404).send('User not found ! TRY WITH CREATING NEW ACCOUNT <a href="/login">Login</a>');
      
    }

    // Retrieve the password from the user document
    const { password } = user;

    // Compose email content
    const emailContent = `HOPE THIS EMAIL FINDS YOU WELL \n following are your login credentials \n Username: ${name} \n Password: ${password}`;

    // Create a nodemailer transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'akashbhnadari163@gmail.com', // Replace with your email address
        pass: 'qxqaufomilpmvxra', // Replace with your email password
      },
    });

    // Setup email data
    const mailOptions = {
      from: 'akashbhnadari163@gmail.com', // Replace with your email address
      to: email,
      subject: 'HERE ARE YOUR LOGIN CREDENTIALS TO ACCESS THE WEBSITE',
      text: emailContent,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        console.log('Email sent successfully!');
        res.status(200).render('aftercontact.pug');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// app.post('/', (req, res)=>{
//     name = req.body.name
//     mail = req.body.email
//     phone = req.body.phone
//     message = req.body.message
//     // more = req.body.more

//     console.log(req.body);
    

//     let outputToWrite = `the name of the client is ${name},  emai is ${mail} , ${phone} is the phone number, transferred message is as follows - ${message}. `
//     fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('contact1.pug', params);

// })




app.post('/signup', async (req, res) => {
    const data = {
      name: req.body.name,
      password: req.body.password
    };
  
    const checking = await UserModel.findOne({ name: req.body.name });
  
    try {
      if (checking && checking.password === req.body.password) { // Check if user already exists
        res.send("User details already exist");
      } else {
        await UserModel.create(data); // Use create method to insert
        res.status(201).render("home", { naming: req.body.name });
      }
    } catch (error) {
      res.send("Wrong inputs");
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const check = await UserModel.findOne({ name: req.body.name });
      if (check && check.password === req.body.password) {
        res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
      } else {
        res.status(200).render('wrongcred.pug');
      }
    } catch (error) {
      res.send('wrongcred.html');
    }
  });
  
 
  
  // Define a new route for the loginadmin post request
  app.post('/adminlogin', async (req, res) => {
    const { name, password } = req.body;
  
    // Check if the provided credentials are correct
    const admin = await AdminModel.findOne({ name, password });
  
    if (admin) {
      // Credentials are correct, redirect to the addnew page
      res.redirect('/joinoptions');
    } else {
      // Credentials are incorrect, render an error page with an alert
      res.render('error', { message: 'Wrong Credentials' });
    }
  });
  
  
  

  app.post('/submit-order', (req, res) => {
    const formData = req.body;
  
    
    const anotherContactData = new AnotherContact(formData);
  
    anotherContactData.save()
      .then(() => {
        // Data saved successfully
  
        // Fetch all order data from the database (replace with your database logic)
        AnotherContact.find({}, (error, orderData) => {
          if (error) {
            console.error("Error fetching data from the database:", error);
            return res.status(500).send("Order data could not be retrieved from the database");
          }
  
          // res.status(200).render('payment.html', {
          //   orderData: orderData,
          // });
          res.sendFile(path.join(__dirname,"payment.html"));
        });
      })
      .catch((error) => {
        // Error handling
        console.error("Error saving to the database:", error);
        res.status(500).send("Order could not be saved to the database");
      });
  });

  app.use(express.json());





  
  



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

