import transporter from "../config/nodemailer.js";

export const sendComplaint = async (req,res) =>{
    try {
        const {firstName,lastName,email,message} = req.body;

        if(!firstName || !lastName || !email || !message){
            return res
            .status(400)
            .json({
                success:false,
                message:"All fields are required !",
            });
        }

        const fullName = `${firstName} ${lastName}`

        await transporter.sendMail({
            from:`"${fullName}" <${process.env.SMTP_SENDER_EMAIL}>`,
            replyTo:email,
            to:process.env.SMTP_SENDER_EMAIL,
            subject:`New Complaint from ${fullName}`,
            text:`
                Name:${fullName}
                Email:${email}
                Complaint:${message}
            `,
            html: `
                <h3>New Complaint</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Complaint:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200)
        .json({
            success:true,
            message:"Complaint sent SuccessFully !"
        });
    } catch (error) {
        console.error("Error Sending Complaint : ",error);
        res.status(500)
        .json({
            success:false,
            message:"Failed to sent Complaint",
        });
    }
};