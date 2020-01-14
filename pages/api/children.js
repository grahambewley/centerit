import Result from '../../models/Result';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    const results = await Result.find().sort({childElement: "desc"});
    res.status(200).json(results);
}