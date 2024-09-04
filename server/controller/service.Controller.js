import ServiceDB from "../models/service.models.js";

// Image upload
export const ServiceAccountInsert = async (req, res) => {
    // Extract fields from the request
    const { userid, service_heading, service_type, service_dec, service_Amount, service_time_houre, service_buy_Amount, service_Staus } = req.body;

    try {
        // Optional: Add field validation here

        // Check if a service with the same heading or another unique identifier exists
        const existingService = await ServiceDB.findOne({ service_heading }); // Update this field based on your schema
        if (existingService) {
            return res.status(400).json({ error: "A service with this heading already exists." });
        }

        // Create a new document with the data
        const newServiceAccount = new ServiceDB({
            userid,
            service_heading,
            service_type,
            service_dec,
            service_Amount,
            service_time_houre,
            service_buy_Amount,
            service_Staus
        });

        // Save the document to the database
        await newServiceAccount.save();
        res.status(200).json({ message: "Service account successfully created", userData: newServiceAccount });
    } catch (error) {
        console.error("Error in ServiceAccountInsert:", error);
        res.status(500).json({ error: "An error occurred while creating the service account." });
    }
};



// All Account View 
export const ServiceIndex = async (req, res) => {
    try {
        // Fetch all game registrations from the database
        const seriviceRegisters = await ServiceDB.find();

        // Send the data as JSON response
        res.json(seriviceRegisters);
    } catch (error) {
        // Log the error for debugging purposes
        logger.error('Error fetching game registrations:', { message: error.message, stack: error.stack });

        // Send a 500 status code and error message
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// single Acccount View 

export const ServiceSingleDetails = async (req, res) => {
    try {
        const ServiceRegister = await ServiceDB.findById(req.params.id);
        if (ServiceRegister == null) {
            return res.status(404).json({ message: "Cannot Find Acoount" });
        }
        else {
            res.json(ServiceRegister);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// All Acccount Delete

export const ServiceDelete = async (req, res) => {
    const AccountId =  req.params.id;
    
    try {
         await ServiceDB.deleteOne({_id: AccountId})
         res.json({message:"Acoount deleted!"});
    } catch (error) {
     res.status(500).json({message:error.message})
    }
 };
 
 
 // All Acccount Update
 
 export const ServiceUpdate  = async (req, res) => {
 
     const { id } = req.params;
     const { service_heading } = req.body;
     const { service_type } = req.body;
     const { service_dec } = req.body;
     const { service_Amount } = req.body;
     const { service_time_houre } = req.body;
     const { service_buy_Amount} = req.body;

 
     try {
         // Find the user by ID
         const user = await ServiceDB.findById(id);
 
         if (!user) {
             return res.status(404).json({ status: 404, message: "User not found" });
         }
 
         // Update user details
         if (service_heading) {
             user.service_heading = service_heading;
         }
         if (service_type) {
             user.service_type = service_type;
         }
         if (service_dec) {
             user.service_dec = service_dec;
         }
         if (service_Amount) {
             user.service_Amount = service_Amount;
         }
         if (service_time_houre) {
             user.service_time_houre = service_time_houre;
         }
         if (service_buy_Amount) {
             user.service_buy_Amount = service_buy_Amount;
         }
 
         // Save the updated user data
         const updatedUser = await user.save();
 
         res.status(200).json({ status: 200, updatedUser });
     } catch (error) {
         res.status(401).json({ status: 401, error });
     }
 };

 
 
 
 