
function authenticateInternal(req, res, next) {
	const secret = req.get('X-Internal-API-Key');
	if (secret !== process.env.INTERNAL_SECRET) {
		return res.status(403).json({ error: 'Forbidden' });
	}
	next();
}

export { authenticateInternal };
