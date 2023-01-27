export default function errorMiddleware(req, res) {
	res.status(404).send("Error 404");
}
