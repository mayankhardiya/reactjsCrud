import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Signin = () => {

    let history = useHistory();

    const [user, setUser] = useState({

        username: "",

        phone: ""

    });

    const { username, phone } = user;

    const onInputChange = e => {

        setUser({ ...user, [e.target.name]: e.target.value });

    };

    const onSubmit = async e => {

        e.preventDefault();

        var username = user.username;

        loadUser(username);

        // history.push("/");
    };

    const loadUser = async (username) => {

        axios.get(`http://localhost:3003/users/?username=${username}`)
            .then(function (response) {

                localStorage.setItem('login', response.data[0].email)

            })
            .catch(function (error) {
                // handle error
                console.log("error ", error);
            })
            .then(function () {

                console.log("this is always executed");
                // always executed
            });

        // var test = await axios.get(`http://localhost:3003/users/?username=${username}`);

        // console.log(test.data[0].email);

        // fetch("http://localhost:3003/users?username=" + username).then((err, data) => {

        //     if (err) {

        //         console.log(" err ", err);

        //     } else {

        //         console.log("data ", data);

        //     }
        // });

    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add A User</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Username"
                            name="username"
                            value={username}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Phone Number"
                            name="phone"
                            value={phone}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-primary btn-block">Signin</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;