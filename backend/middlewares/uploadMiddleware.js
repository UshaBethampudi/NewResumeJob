// middlewares/uploadMiddleware.js (ES6 module version)

import multer from "multer";

// Use memoryStorage to handle the file buffer directly
const storage = multer.memoryStorage();

// File filter to allow PDF and DOCX for the ATS scorer
const fileFilter = (req, file, cb) => {
    // For the ATS route, allow PDF and DOCX
    if (req.baseUrl.includes('/api/ats')) {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .pdf and .docx formats are allowed for the ATS scorer"), false);
        }
    } else { // For other routes, assume image uploads
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
        }
    }
};

const upload = multer({ storage, fileFilter });

export default upload;