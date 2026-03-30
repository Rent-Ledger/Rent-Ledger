import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true,
    },
    
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    assigned_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Manager",
    },
    issue_type:
    {
        type: String,
        enum:["Water Problem","Electrical Problem","Furniture Problem","Other"],
        default:"Other"
    },
    assign_people:{
      type:String,
      enum:["Plumber","Electrician","Carpenture","Other"],
      default:"Other"  
    },
    discription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum:["low","medium","high"],
        default:"low"
    },
    maintenace_status: {
        type: String,
        enum:["pending","in-progress","completed"],
        default:"pending",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt: {
        type: Date,
        default: null
    },
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
export default Maintenance;