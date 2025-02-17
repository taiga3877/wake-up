import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const Login = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'https://realauto.limsa.uz/api/auth/signin',
            data: {
                'phone_number': phone,
                'password': password
            }
        }).then(res=>{
            localStorage.setItem('accessToken',res.data.data.tokens.accessToken.token)
            navigate('/')

        }).catch(err=>{
            console.log(err)
        }
        )
        // const formData = new FormData();
        // formData.append('phone_number', phone)
        // formData.append('password', password)
        // axios({
        //     url: 'https://realauto.limsa.uz/api/auth/signin',
        //     method: 'POST',
        //     data: {
        //         'phone_number': phone,
        //         'password': password
        //     },
        // }).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    return (
        <div className="">

            <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md w-[1400px]">
                <h3 className="text-xl font-semibold mb-4">zat zfx</h3>
                <form action="/action_page.php" className="space-y-4">
                    <div>
                        <label htmlFor="fname" className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Your name.."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="lname" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="lname"
                            name="lastname"
                            placeholder="Your password.."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                        onClick={Login}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};



export default Form