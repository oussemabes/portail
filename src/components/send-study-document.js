import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { toast } from "react-hot-toast";

export default function Sendstudydocument() {
    let { id } = useParams();
    const [userInformation, SetUserInformation] = useState([]);

    console.log(id)
    const [studies, setStudies] = useState([]);
    const [error, setError] = useState(null);
    const [study, setStudy] = React.useState("");
    const [idstudy, setIdtsudy] = React.useState("");

    const [productFile, setProductFile] = React.useState();
    const [productFilename, setProductFilename] = React.useState("");
    const [productFileBack, setProductFileBack] = React.useState("");

    const [requestDate, setRequestDate] = React.useState("");
    const hiddenFileInput = React.useRef(null);
    const handleClick = (event) => {
        event.preventDefault();
        hiddenFileInput.current?.click();
    };
    const handleChange = (event) => {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        setProductFile(URL.createObjectURL(fileUploaded));
        setProductFilename(event.target.files[0].name);
        setProductFileBack(event.target.files[0]);
    };
    useEffect(() => {
        const token = localStorage.getItem('token'); //

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
            'Content-Type': 'application/json',
        };

        axios
            .get(
                `http://localhost:3001/backend/studies/displayall`
                , { headers })
            .then((res) => { setStudies(res.data); console.log(res.data) })
            .catch((err) => setError(err));

        axios.get(`http://localhost:3001/backend/user/displaybyid/${id}`, { headers })
            .then((res) => {
                delete res.data[0].password;
                SetUserInformation(res.data[0])
            })
            .catch((err) => setError(err));

    }, []);

    async function addParticipants(e) {
        const token = localStorage.getItem('token'); //

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        console.log(currentDate)
        const formData = new FormData();
        await formData.append("ref", userInformation.ref);

        await formData.append("user_id", id);
        await formData.append("study_id", idstudy);
        await formData.append("state", "pending");

        await formData.append("document", productFileBack);
        await formData.append("date", formattedDate);

        e.preventDefault();



        //foncti
        try {

        const resp=await axios.post(
            `http://localhost:3001/backend/participants/create`,

            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",

                },
            }
        );
        if (resp.data) {
            toast.success("Request created successfully");

            // Redirect after a short delay (e.g., 1 second)
            setTimeout(() => {
                window.location.href = "/";
              }, 1000);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          // Request returned a 400 error status code
          // You can access the error response data using error.response.data
          // For example, to get the error message from the server:
          const errorMessage = error.response.data.message;
          // Now you can show the error message to the user or handle it as needed
          toast.error("There is a request that was accepted in this study / The user has not yet answered the last request.");

          // Show the error message to the user or perform any other error handling
        } else {
          // Other errors occurred (e.g., network errors, server errors with different status codes, etc.)
          // You can handle other errors here, if needed
          console.error("An error occurred:", error);
          // Show a generic error message to the user or perform any other error handling
        }
      }
        console.log(formData)

        if (error) {
            return <div>Error: {error.message}</div>;
        }
    }

    return (
        <>

            <section className="home mt-4 mt-3 pt-3 pb-3" style={{ height: "450px" }}>

                <nav aria-label="breadcrumb" class="main-breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>

                        <li class="breadcrumb-item active" aria-current="page">Send study document</li>

                    </ol>
                </nav>
                <div class="row">
                    <div class="col-md-6">
                        <div className="  py-3 ms-auto px-3">

                            <h1>Send study document</h1>
                        </div>

                        <form class="px-4 py-3 needs-validation" >
                            <div className=' mb-3 '>
                                <div class="mb-3 row pl-5 pr-5'">
                                    <label for="staticEmail" class="col-sm-2 col-form-label pl-4 pr-4 ml-2">Ref</label>
                                    <div class="col-sm-10">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={userInformation.ref} />
                                    </div>
                                </div>
                                <label>Select study</label>

                                <select
                                    name="productCategory"
                                    value={study}
                                    onChange={(event) => {
                                        setStudy(event.target.value);
                                        const selectedId = event.target.options[event.target.selectedIndex].id;
                                        setIdtsudy(selectedId)

                                    }}
                                >
                                    <option value="" disabled>
                                        Select study
                                    </option>
                                    {studies.map((study) => (
                                        <option key={study.id} value={study.name} id={study.id}>
                                            {study.name}
                                        </option>
                                    ))}
                                </select>
                                <div class="mb-3 row mt-3 pt-3 ">
                                    <label for="formFile" class="form-label">Select study document</label>
                                    <input class="form-control " type="file" id="formFile" style={{ width: "50%" }} onChange={handleChange} ref={hiddenFileInput}
                                    />
                                </div>

                            </div>
                            <button type="submit" class="btn btn-primary" style={{ width: '50%' }} onClick={addParticipants}>Send</button>
                        </form>
                        <div class="dropdown-divider"></div>
                    </div>
                    <div class="col-md-6 mt-6  pt-5">
                    </div>
                </div>
            </section>
        </>

    )
}
