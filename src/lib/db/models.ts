import mongoose from "mongoose";

// PayPal Account Model
const PaypalAccountSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  quota: { type: Number, required: true },
  todayReceived: { type: Number, default: 0 },
  lastReset: { type: Date, default: () => new Date() },
  status: { type: String, enum: ["active", "paused"], default: "active" },
}, { timestamps: true });

export const PaypalAccount = mongoose.models.PaypalAccount || mongoose.model("PaypalAccount", PaypalAccountSchema);

// Store Model
const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  installedAt: { type: Date, default: () => new Date() }
}, { timestamps: true });

export const Store = mongoose.models.Store || mongoose.model("Store", StoreSchema);

// Transaction Model
const TransactionSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  paypalAccountId: { type: String, required: true },
  authorizationId: { type: String, required: true },
  captureId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  raw: { type: Object }
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

// Rule Model
const RuleSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  type: { type: String, enum: ["tax", "shipping", "insurance"], required: true },
  country: { type: String },
  formula: { type: String, required: true }
}, { timestamps: true });

export const Rule = mongoose.models.Rule || mongoose.model("Rule", RuleSchema);