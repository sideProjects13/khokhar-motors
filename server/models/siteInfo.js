const mongoose = require("mongoose");
const siteInfoSchema = new mongoose.Schema({
  contactPhone: { type: String, default: "+91 98765 43210" },
  contactEmail: { type: String, default: "contact@khokharmotors.com" },
  address: {
    type: String,
    default: "123, Auto Market, Gota, Ahmedabad, Gujarat 382481",
  },
  satisfiedClients: { type: Number, default: 1500 },
  yearsExperience: { type: Number, default: 15 },
  totalEmployees: { type: Number, default: 10 },
});
module.exports =
  mongoose.models.SiteInfo || mongoose.model("SiteInfo", siteInfoSchema);
