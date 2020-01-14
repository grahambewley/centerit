import mongoose from 'mongoose';

const { String } = mongoose.Schema.Types;

const ResultSchema = new mongoose.Schema({
    childElement: {
        type: String,
        required: true
    },
    parents: [
        {
            element: {
                type: String,
            },
            horizontally: [
                {
                    html: String,
                },
                {
                    css: String,
                }
            ],
            vertically: [
                {
                    html: String,
                },
                {
                    css: String,
                }
            ],
            both: [
                {
                    html: String,
                },
                {
                    css: String,
                }
            ]
        }
    ]
});

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);