
import Maintenance from "../model/Maintenance.js";

export const submitMaintenanceRequest = async (req, res) => {
    try {
        const { tenant, unit, property, issue_type, assign_people, assigned_to, discription, priority } = req.body;
        if (!property || !assigned_to || !issue_type) {
            return res.status(400).json({ message: "Select the required Fields" });
        }
        const newRequest = new Maintenance({ tenant, unit, property, issue_type, assign_people, discription, priority, maintenace_status: "pending" });

        const savedRequest = await newRequest.save();

        res.status(201).json({ message: "Maintenance request submitted successfully", data: savedRequest });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const handleMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const { assigned_to, maintenace_status, assign_people, priority } = req.body;

        const updated = await Maintenance.findByIdAndUpdate(id, { assigned_to, maintenace_status, assign_people, priority, updatedAt: Date.now() },
            { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Maintenance not found" });
        }

        res.status(200).json({ message: "Maintenance updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await Maintenance.findById(id).populate("tenant").populate("unit").populate("property").populate("assigned_to");

        if (!request || request.deletedAt) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(request);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Maintenance.findByIdandDelete(
            id,
            { deletedAt: new Date() },
            { new: true }
        );

        if (!deleted) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({
            message: "Maintenance deleted successfully",
            data: deleted
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};