

const checkValidateData =(email,password,phoneNo,FullName)=>{
    
    const isEmailValid= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isPhoneNoValid = phoneNo === '' || /^\+?[1-9][0-9]{7,14}$/.test(phoneNo); // Optional for Sign In
    const isFullName = FullName === '' || /^[a-zA-ZÀ-ÿ\s]+$/.test(FullName); // Optional for Sign In

    if(!isFullName) return "Please enter valid name";
    if(!isEmailValid) return "Email id is not valid";
    if(!isPhoneNoValid) return "Phone no is not valid";
    if(!isPasswordValid) return "password id is not valid";
    
    

    return null;
}

export default checkValidateData;