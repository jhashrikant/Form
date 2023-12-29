import React, { useEffect, useState } from 'react'
import styles from './Form.module.css'
import axios from 'axios'
const Form = () => {

    const [name, setname] = useState('')
    const [age, setAge] = useState('')
    const [gender, setgender] = useState('')
    const [photo, setPhoto] = useState(null)
    const [selectedInterests, setSelectedInterests] = useState([]);

    // const [showtabledata, setshowtabledata] = useState(false)
    const [users, setusers] = useState([])
    const [editing, setEditing] = useState(false)
    const [Editingvalue, setEditingvalue] = useState()


    useEffect(() => {
        // Fetch user data from  backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5050/getuser');
                const data = response?.data?.response
                console.log(response.data.response)
                setusers(data)

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);



    const sortedArray = users && [...users]?.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    console.log(sortedArray)


    function handleEdit(user) {
        setEditing(true)
        setEditingvalue(user)
        console.log(user);
        setname(user.name)
        setAge(user.age)
        setgender(user.Gender)
        setSelectedInterests(user.Interest)
        setPhoto(user.photo)
    }

    function handlecheckboxChange(event) {
        const interest = event.target.name;

        setSelectedInterests((prevInterests) => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter((item) => item !== interest);
            } else {
                return [...prevInterests, interest];
            }
        });
    }


    function handleFileChange(event) {
        const file = event.target.files[0]
        setPhoto(file)
    }
    // console.log(name, age, gender, selectedInterests);

    async function handlesubmit(event) {
        event.preventDefault();
        // setshowtabledata(true)

        if (editing) {
            // Handle update logic for an existing entry
            try {
                const response = await axios.put(`http://localhost:5050/user/${Editingvalue._id}`, {
                    name,
                    age,
                    Gender: gender,
                    Interest: selectedInterests,
                    photo: photo
                });

                if (response.data.res) {
                    console.log('Data updated successfully');
                    // Fetch updated user data after update
                    const updatedResponse = await axios.get('http://localhost:5050/getuser');
                    const updatedData = updatedResponse?.data?.response;
                    setusers(updatedData);
                } else {
                    console.error('Error updating data in the backend');
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
            // Reset editing state and form fields
            setEditing(false);
            setname('');
            setAge(0);
            setgender('');
            setSelectedInterests([]);
            setPhoto(null);
        } else {
            // Handle logic for a new entry
            try {
                const response = await axios.post('http://localhost:5050/user', {
                    name: name,
                    age: age,
                    Gender: gender,
                    Interest: selectedInterests,
                    photo: photo
                });

                if (response.data.res) {
                    console.log('Data sent successfully');
                    // Fetch updated user data after creating a new entry
                    const updatedResponse = await axios.get('http://localhost:5050/getuser');
                    const updatedData = updatedResponse?.data?.response;
                    setusers(updatedData);
                } else {
                    console.error('Error sending data to the backend');
                }
            } catch (error) {
                console.error('Error:', error);
            }
            setEditing(false);
            setname('');
            setAge(0);
            setgender('');
            setSelectedInterests([]);
            setPhoto(null);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={handlesubmit} className={styles.formContainer}>
                    {/* name */}
                    <div className={styles.name}>
                        <label htmlFor="name">Name: </label>
                        <input className={styles.input}  type="text" id="name" name="name" value={name} onChange={(event) =>  setname(event.target.value.replace(/[^A-Za-z]/g, ''))} placeholder='John Doe' />
                    </div>

                    {/* age */}
                    <div className={styles.age}>
                        <label htmlFor="age">Age:</label>
                        <input className={styles.input} type='number' id='age' name='age' value={age} onChange={(event) => setAge(parseInt(event.target.value))} placeholder='32' />
                    </div>

                    {/* gender */}
                    <div className={styles.gender}>Gender:
                        <div className={styles.genderContainer}>
                            <div>
                                <input type='radio' id='male' name='male' value="Male" checked={gender === 'Male'} onChange={(event) => setgender(event.target.value)} />
                                <label htmlFor="male">Male</label>
                            </div>

                            <div>
                                <input type='radio' id='female' name='female' value="Female" checked={gender === 'Female'} onChange={(event) => setgender(event.target.value)} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>

                    {/* Intereset */}
                    <div className={styles.Interest}>Interest:
                        <div className={styles.InterestContainer}>
                            <div>
                                <input type='checkbox' id='comicbooks' name='comicbooks' checked={selectedInterests.includes('comicbooks')} onChange={handlecheckboxChange} />
                                <label htmlFor="comicbooks">Comic books</label>
                            </div>

                            <div>
                                <input type='checkbox' id='techbooks' name='techbooks' checked={selectedInterests.includes('techbooks')} onChange={handlecheckboxChange} />
                                <label htmlFor="techbooks">Tech Books </label>
                            </div>

                            <div>
                                <input type='checkbox' id='historybooks' name='historybooks' checked={selectedInterests.includes('historybooks')} onChange={handlecheckboxChange} />
                                <label htmlFor="historybooks">History Books</label>
                            </div>
                        </div>
                    </div>

                    {/* photo */}
                    <div className={styles.photo}>
                        <label htmlFor="file">Photo:</label>
                        <input id='file' type='file' name='file' onChange={handleFileChange} />
                        {/* <button type='button' ></button> */}
                    </div>

                    <div className={styles.btnContainer}>
                        <button className={styles.btn} type='submit'>{editing ? 'Save changes' : 'submit'}</button>
                    </div>
                </form>


            </div>
            {/* <Table setname={setname} setAge={setAge} setgender={setgender} setSelectedInterests={setSelectedInterests} setPhoto={setPhoto} /> */}

            <table border="1" style={{ borderCollapse: 'collapse', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Interests</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedArray && sortedArray?.map((user, index) => (
                        <tr key={user._id}>
                            <td>
                                {user.photo && (
                                    <img
                                        src={`http://localhost:5050${user.photo}`}
                                        alt={user.name}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.Gender}</td>
                            <td>{user.Interest.join(', ')}</td>
                            <td style={{ cursor: 'pointer' }} onClick={() => handleEdit(user)}>Edit</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Form
