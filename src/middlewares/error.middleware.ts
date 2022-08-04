export default function errorMiddleware(req, res) {
	res.status(400).send("Error 404");
}
