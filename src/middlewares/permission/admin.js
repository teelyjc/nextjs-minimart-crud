import getUser from "@utils/getUser";

async function adminPermission(req, res, next) {
  const user = getUser(req.user.id);
  
  if (user.role !== 1) {
    return res.status(200).json({
      success: false,
      message: "คุณไม่ได้รับอณุญาติให้เข้าถึงการทำงานนี้",
    });
  }

  return next();
}

export default adminPermission;