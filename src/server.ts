import app from "./app.js";

// Listener
app.listen(process.env.PORT || 3000, () => {
	console.log("App running");
});
