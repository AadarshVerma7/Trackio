const asyncHandler = (requestHandler) => (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            console.log("Async Error : ",err.message);
            if(!res.headersSent){
                res.status(500).json({
                    success:false,
                    message:err.message || "Internal Server Error",
                });
            }
    });
};

export {asyncHandler};