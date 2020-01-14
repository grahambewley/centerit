import Result from '../../models/Result';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    // De-structure child from the payload sent with this request
    const { child } = req.query; 
    // Search results array based on child
    const childResult = await Result.findOne({ childElement: child });
    res.status(200).json(childResult.parents);
}