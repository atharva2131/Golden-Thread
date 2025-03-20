const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const sareeRoutes = require('./routes/sareeRoutes');
const lehengaRoutes = require('./routes/lehengaRoutes');// Added Lehenga routes
const blazerRoutes = require('./routes/blazerRoutes');
const kurtaRoutes = require('./routes/kurtaRoutes');
const sherwaniRoutes = require('./routes/sherwaniRoutes');
const jacketRoutes = require('./routes/jacketRoutes');
const bridalWearRoutes = require('./routes/bridalWearRoutes');
const coordSetRoutes = require('./routes/coordSetRoutes');
const userRoutes = require('./routes/userRoutes');
const CollectionRoutes = require('./routes/collectionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Ensure this path is correct




const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use the dashboard routes
app.use('/api/dashboard',dashboardRoutes);

// Use the orders routes
app.use('/api/orders', orderRoutes);  // Ensure correct endpoint


//Route For users 
app.use('/api/user',userRoutes);

// Existing routes
app.use('/api/products', productRoutes);
app.use('/api/sarees', sareeRoutes); // Existing Saree routes
app.use('/api/lehengas', lehengaRoutes); // Existing Lehenga routes

// New Bleazer routes
app.use('/api/blazers', blazerRoutes);

//Route for Kurtas 
app.use('/api/kurtas', kurtaRoutes);

//Route for Sherwanis
app.use('/api/sherwani',sherwaniRoutes);

//Route for Jackets
app.use('/api/jackets',jacketRoutes)

//Routes for Bridal Wear
app.use('/api/bridalwear',bridalWearRoutes);

//Routes for Coordsets
app.use('/api/coordset',coordSetRoutes);

//To get Collection from databse
app.use('/api/collections',CollectionRoutes);
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
