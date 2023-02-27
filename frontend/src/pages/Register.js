import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import "../styles/mix.css"
import apiMethods from '../services/ApiMethods';
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import { auth } from '../firebase';

const Register = () => {

  const navigate = useNavigate();





  // async componentDidMount() {
  //   try {
  //     await instance({
  //       // url of the api endpoint (can be changed)
  //       url: "home/",
  //       method: "GET",
  //     }).then((res) => {
  //       // handle success
  //       console.log(res);
  //     });
  //   } catch (e) {
  //     // handle error
  //     console.error(e);
  //   }
  // }

  // const [passhow,setPassShow] = useState(false);

  const [state, setState] = useState({
    companyname: "",
    name: "",
    userrole: "Admin",
    email: "",
    phone: "",
    otp: "",
    pass: "",
    status: false,
    statusmail: false,
    verifymsg: "",
  });
  const [errors, setErrors] = useState({
    companyname: "",
    name: "",
    userrole: "Admin",
    email: "",
    phone: "",
    // otp: "",
    pass: ""
  });


  console.log("USER_NAME", state.companyname);
  console.log("USER_ROLE", state.userrole);
  console.log("USER_PHONE", state.phone);
  console.log("USER_EMAIL", state.email);
  console.log("USER_USERNAME", state.name);
  console.log("USER_PASS", state.pass);


  const [errorMsg, setErrorMsg] = useState("");
  const [checkemail, setcheckEmail] = useState(1);
  const [errorMsgemail, setErrorMsgemail] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);


  // const [status, setStatus] = useState(0);
  // const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");




  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);


  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const submitEmail = async (e) => {
    console.log("email clicked")
    let methods = await fetchSignInMethodsForEmail(auth, state.email).then(async (res) => {
      
      console.log("response",res.length)
      console.log("response",res)
      if (res[0] == "password") {
        setcheckEmail(1)
        setErrorMsgemail("email already exist")
      } else {
        setErrorMsgemail("This email is valid")
        setcheckEmail(0)
      }
    }).catch((err) => {
      console.log(err)
    })
    // console.log(checkemail, "my method")
    if (checkemail == 0 ) {
      const otpData = new FormData();
      otpData.append("email", state.email);
      const resotp = await apiMethods.sendOtp(otpData)
      console.log(resotp)
      setState({ ...state, statusmail: resotp.success, otp: "", status: false })
      setTimeLeft(60);
    }
  }

  console.log(checkemail, "checkmail")

  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpverifyData = new FormData();
    otpverifyData.append("email", state.email);
    otpverifyData.append("otp", state.otp);
    const resotp = await apiMethods.verifyOtp(otpverifyData)
    console.log(resotp, "verify")
    console.log(state.otp)
    setState({ ...state, status: resotp.success, verifymsg: resotp.message })
  }

  console.log(state.statusmail, "email status");
  console.log(state.status, "verify otp status")


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked via submit")

    console.log("USER", state.pass);
    console.log("USER", state.email);
    console.log("USER", state.status);
    console.log("USER", state.statusmail);
    console.log("USER", checkemail);



    if (state.email && state.pass && state.status == true && state.statusmail == true  && checkemail == 0) {
      // debugger;
      // const url = "http://44.203.89.214:3001/create_user";
      const formData = new FormData();
      formData.append("USER_USERNAME", state.companyname);
      formData.append("USER_ROLE", state.userrole);
      formData.append("USER_PHONE", state.phone);
      formData.append("USER_EMAIL", state.email);
      formData.append("USER_NAME", state.name);

      console.log("USER_NAME", state.companyname);
      console.log("USER_ROLE", state.userrole);
      console.log("USER_PHONE", state.phone);
      console.log("USER_EMAIL", state.email);
      console.log("USER_USERNAME", state.name);



      // const otpdata = new FormData();




      // setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, state.email, state.pass)
        .then(async (res) => {
          // setSubmitButtonDisabled(false);
          if (state.status == true) {
            const user = res.user;
            await updateProfile(user, {
              displayName: state.companyname,
            });

            const resp = await apiMethods.createUser(formData)
            console.log("response1", resp)
            if (typeof res.operation !== undefined) {
              setSubmissionMessage(res.operation);
              setState({
                companyname: "",
                userrole: "",
                email: "",
                phone: "",
              });
            } else {
              alert("please try again");
            }
            navigate("/dashboard");
          }

        })
        .catch((err) => {
          // setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });



      }

    // } else {
    //   let error = errors;
    //   if (state.companyname === "") {
    //     // debugger;
    //     error = {
    //       ...error,
    //       companyname: "This is required",
    //     };
    //   }
    //   if (state.userrole === "") {
    //     // debugger;
    //     error = {
    //       ...error,
    //       userrole: "This is required",
    //     };
    //   }
    //   if (state.email === "") {
    //     // debugger;
    //     error = {
    //       ...error,
    //       email: "This is required",
    //     };
    //   }
    //   if (state.phone === "") {
    //     // debugger;
    //     error = {
    //       ...error,
    //       phone: "This is required",
    //     };
    //   }
    //   if (state.name === "") {
    //     // debugger;
    //     error = {
    //       ...error,
    //       name: "This is required",
    //     };
    //   }
    //   setErrors(error);
    // }


  };

  const ResetEmail = () => {
    // state.statusmail == true
    setState({ ...state, statusmail: false })


  }

  console.log(state.statusmail)


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
          </div>
          <div className='form'>
            <div className="form_input">
              <input type="text" name="companyname" id="" onChange={handleChange} placeholder='Company Name' style={{ border: `${!errors.companyname ? "" : "1px solid red"}` }} />
              <small style={{ color: "red" }}>{errors.companyname}</small>
            </div>
            {/* <div className="form_input">
              <input type="text" name="name" id="" onChange={handleChange} placeholder='Company Name' style={{ border: `${!errors.name ? "" : "1px solid red"}` }} />
              <small style={{ color: "red" }}>{errors.name}</small>
            </div> */}
            {/* <div className="form_input">
              <input type="text" name="userrole" id="" onChange={handleChange} value="Admin" placeholder='Admin' disabled />
            </div> */}
            <div className="form_input" >
              <input className='form-control' type="number" name="phone" id="" onChange={handleChange} placeholder='Phone Number' style={{ border: `${!errors.email ? "" : "1px solid red"}` }} />
              <small style={{ color: "red" }}>{errors.phone}</small>
            </div>

            <div className="form_input" >
              <input className='form-control' type="password" name="pass" id="" onChange={handleChange} placeholder='Password' style={{ border: `${!errors.email ? "" : "1px solid red"}` }} />
            </div>
            {/* / */}
            <div className="form_input">
              <input type="email" name="email" id="" onChange={handleChange} placeholder='Email Address*' style={{ border: `${!errors.email ? "" : "1px solid red"}` }} />

              {/* <small style={{ color: "red" }}>{errors.email}{errorMsg}</small> */}
              <small style={{ color: "red" }}>{errors.email}<span> {errorMsgemail}</span></small>
              <small style={{ color: "green" }}>{state.verifymsg}</small>
            </div>


            {state.email && state.statusmail == true && checkemail === 0 ? <>
              <div class="col-auto">
                <div class="input-group mb-2">
                  {state.status == false ? <>
                    <input type="number" class="form-control" name="otp" id="" value={state.otp} onChange={handleChange} placeholder='Enter OTP*' />
                    {state.statusmail == true && timeLeft != 0 && <div class="input-group-prepend">
                      <div class="input-group-text">{timeLeft}s</div>
                    </div>}</>
                    : ""}

                </div>

              </div>
              {state.status == false ?
                <>{timeLeft == 0 && state.statusmail == true && <><span role="button" className="" style={{ textAlign: "right", width: "fit-content" }} onClick={(e) => submitEmail(e)}>Resend OTP </span>or<span role="button" onClick={(e) => ResetEmail(e)}> Use another Email</span></>}</>
                : ""}
              {state.status == false ?
                <>{state.otp.length >= 6 && <button className="btn btn-primary" onClick={(e) => verifyOtp(e)}>Verify OTP</button>}</>
                : ""}
            </>
              : <>{<><button className="btn btn-primary" onClick={(e) => submitEmail(e)}>SEND OTP TO EMAIL</button></>}</>}


            {/* <button className="btn btn-primary" onClick={(e) => submitEmail(e, 2)}>SEND OTP TO EMAIL</button> */}




            <div className="form_input" >
            </div>
            {state.companyname && state.userrole && state.email && state.phone && state.otp && state.status == true ? <button className='btn btn-primary' onClick={handleSubmit}>Sign Up</button> : ""}
            {submissionMessage == "successfull" &&
              <small style={{ color: "green" }}>Account Created Successfully</small>
            }
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Register