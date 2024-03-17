const productSchema = new Schema({
	name: { type: String, required: true },
	category: { type: String, enum: ["children", "adult"], required: true },
	price: { type: Number, required: true },
	description: { type: String },
});
const Product = mongoose.model("Product", productSchema);
