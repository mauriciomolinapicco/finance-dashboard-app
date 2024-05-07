import mongoose from "mongoose";
import {loadType} from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const daySchema = new Schema(
    {
        date: String,
        revenue:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
        expenses:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        }
    },
    {toJSON: {getters: true}}
)

const monthSchema = new Schema(
    {
        month: String,
        revenue:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
        expenses:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
        operationalExpenses:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },

        nonOperationaExpenses:{ 
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
    },
    {toJSON: {getters: true}} //by default so i can use the get in the schema
)


const KPISchema = new Schema(
    {
        totalProfit: {
            type: mongoose.Types.Currency,
            currency: "USD",
            //Currency is always multiplied by 100 so i divide it to get the real value
            get: (v) => v/100
        },
        totalRevenue: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
         totalExpenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v/100
        },
        totalExpensesByCategory: {
            type: Map,
            of: {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v/100
            }
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema]
    },
    {timestamps:true, toJSON:{ getters: true}}
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;