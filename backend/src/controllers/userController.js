export async function getProfile(req, res) {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      created_at: req.user.created_at
    }
  });
}

