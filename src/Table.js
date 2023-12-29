// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const Table = ({ setname, setAge, setgender, setSelectedInterests, setPhoto }) => {

//     const [users, setusers] = useState([])
//     const [editing, setEditing] = useState(false)
//     const [Editingvalue, setEditingvalue] = useState()

//     useEffect(() => {
//         // Fetch user data from your backend
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5050/getuser');
//                 const data = response?.data?.response
//                 console.log(response.data.response)
//                 setusers(data)

//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     console.log(users)


//     function handleEdit(user) {
//         setEditing(true)
//         setEditingvalue(user)
//         console.log(user);
//         setname(user.name)
//         setAge(user.age)
//         setgender(user.Gender)
//         setSelectedInterests(user.Interest)
//         setPhoto(user.photo)
//     }

//     return (
//         <table border="1" style={{ borderCollapse: 'collapse', margin: 'auto' }}>
//             <thead>
//                 <tr>
//                     <th>Photo</th>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Gender</th>
//                     <th>Interests</th>
//                     <th>Edit</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users && users?.map((user, index) => (
//                     <tr key={user._id}>
//                         <td>
//                             {user.photo && (
//                                 <img
//                                     src={`http://localhost:5050${user.photo}`}
//                                     alt={user.name}
//                                     style={{ width: '50px', height: '50px' }}
//                                 />
//                             )}
//                         </td>
//                         <td>{user.name}</td>
//                         <td>{user.age}</td>
//                         <td>{user.Gender}</td>
//                         <td>{user.Interest.join(', ')}</td>
//                         <td style={{ cursor: 'pointer' }} onClick={() => handleEdit(user)}>Edit</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     )
// }

// export default Table
