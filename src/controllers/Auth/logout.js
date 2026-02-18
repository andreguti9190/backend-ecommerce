
export const logout = (req,res)=>{
    res.clearCookie("token")
    .status(200).json({ logout:true })
}