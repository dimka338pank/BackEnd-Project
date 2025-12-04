import { ZodError } from 'zod'; 

export const validateSchema = (schema) => 
    (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const extractedErrors = error.issues.map(issue => {
                return issue.message; 
            });
            return res.status(400).json({ 
                errors: extractedErrors
            });
        }
        console.error("Unknown Validation Error:", error);
        return res.status(500).json({ error: "Internal validation error" });
    }
};