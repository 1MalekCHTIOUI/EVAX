const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
mongoose.Schema.Types.Boolean.convertToFalse.add('');

const patientSchema = new Schema({
    cin :  {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_nais: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ills: {
        type: Array
    },
    status: {
        type: Object,
        stats: Boolean,
    },
    call_date: {
        type: String
    },
    created_at: { 
        type: Date, 
    },
    updated_at: { 
        type: Date, 
    }

})

patientSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});

const Patient = mongoose.model('patient', patientSchema)
module.exports = Patient