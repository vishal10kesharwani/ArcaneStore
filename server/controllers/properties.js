import properties from "../models/properties.js";

// route /api/v1/properties/fetch
export const getProperties = async (req,res) => {
    try {
        const fetchProp = await properties.find({});
        res.status(200).json({
            success:true,
            fetchProp
        })
    } catch (error) {
        res.status(404).json({
            success:true,
            Message:"Unable to get properties"
        })
    }
}

// /api/v1/properties/fetch/:status 
export const getPropertiesByStatus = async (req,res) => {
    try {
        const fetchProp = await properties.find({status:req.params.status});
        res.status(200).json({
            success:true,
            fetchProp
        })
    } catch (error) {
        res.status(404).json({
            success:true,
            Message:"Unable to get properties"
        })
    }
}

// route /api/v1/properties/Add (PROTECTED)
export const addProperty = async (req,res) => {
    const {title , image , description, price ,location, size, status, blockchainId} = req.body;
    const userId = req.userId;
    try {
        const addedProp = await properties.create({
            title, image , description, price ,location, size, status, blockchainId, user:userId
        })
        res.status(200).json({
            success:true,
            message:"Property Added Sucessfully",
            addedProp
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

//  /api/v1/properties/update/:id  (PROTECTED)
export const updateProperty = async (req,res) => {

    const id = req.params.id;
   
    try {
       const updatedProperty = await properties.findByIdAndUpdate(id, req.body, { new: true });
        res.json({
            success:true,
            message:"Property updated",
            updatedProperty
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

// /api/v1/properties/delete/:id (PROTECTED)
export const deleteProperty = async (req,res) => {
    try {
        const id = req.params.id;
        await properties.findByIdAndDelete({_id:id});
        res.json({
            success:true,
            message:"Property deleted"
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}