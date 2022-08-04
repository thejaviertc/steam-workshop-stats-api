import app from "./app.js";

// Listener
app.listen(process.env.PORT || 3001, () => {
	console.log("App running");
});
