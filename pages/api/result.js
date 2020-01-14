import connectDb from '../../utils/connectDb';
import Result from '../../models/Result';

connectDb();

export default async (req, res) => {
    const { child, parent, horizontally, vertically } = req.query;
    console.log("Server got these params: ", child, parent, horizontally, vertically);

    const result = await Result.findOne({ childElement: child });
    const filteredParents = result.parents.filter((p) => {
        return p.element === parent;
    });
    console.log(filteredParents);

    // If user wants horizontal and NOT vertical
    if(horizontally == 'true' && vertically == 'false') {
        console.log(`Getting code for ${child} centered in ${parent} horizontally`);
        console.log("Returning ", filteredParents[0].horizontally);
        res.status(200).send(filteredParents[0].horizontally);
    }
    // If user wants vertical and NOT horizontal
    else if(vertically == 'true' && horizontally == 'false') {
        console.log(`Getting code for ${child} centered in ${parent} vertically`);
        console.log("Returning ", filteredParents[0].vertically);
        res.status(200).send(filteredParents[0].vertically);
    }
    // If user wants horizontal AND vertical
    else if (horizontally == 'true' && vertically == 'true') {
        console.log(`Getting code for ${child} centered in ${parent} horizontally AND vertically`);
        console.log("Returning ", filteredParents[0].both);
        res.status(200).send(filteredParents[0].both);
    }
}