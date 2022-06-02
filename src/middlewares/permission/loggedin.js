async function loggedinPermission(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      success: false,
      message: "กรุณาเข้าสู่ระบบก่อนเข้าใช้งานในส่วนนี้",
    });
  }

  return next();
}

export default loggedinPermission;