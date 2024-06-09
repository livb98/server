import jwt from "jsonwebtoken"


const currentDate = new Date();

currentDate.setHours(23, 59, 59, 999);
console.log(currentDate);

const expTime = Math.floor(currentDate / 60 * 1000 ) 

const token = jwt.sign(
    {id: 12, email: "jjj@gmail.com", name: "John" },
    "123456",
    {
        expiresIn: expTime
    }
)

const mytoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiampqQGdtYWlsLmNvbSIsIm5hbWUiOiJKb2huIiwiaWF0IjoxNzE3MDUxMjk4LCJleHAiOjM0MzQxMDI1OTZ9.pc-eW_JLA_7xOxIZzBvvRvuaUsyzR8pJEdSCG7czMnQ'

jwt.verify(mytoken, "123456", (err, decode) => {
    if (err) return console.log(err.message);
    console.log(new Date(expTime))

})
