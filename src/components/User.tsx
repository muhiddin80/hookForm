// import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


interface User {
  name: string;
  age: string;
  email: string;
}

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

const Userpage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { register, handleSubmit, reset,setValue } = useForm<User>();
  const [editId,setEditId] = useState<number|null>(null)
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const onSubmit = (data: User) => {
    if(editId != null){
        let updated = [...users]
        updated[editId] = data;
        setUsers(updated)
        setEditId(null)
    }
    else{
        setUsers([...users, data]);
    }
    reset();
  };

  const handleDelete = (id:number) =>{
    let newUser = users.filter((_,index)=>(
        index != id
    ))
    setUsers(newUser)
  }

  const handleEdit = (id:number) =>{
    setValue('name',users[id].name)
    setValue('email',users[id].email)
    setValue('age',users[id].age)
    setEditId(id)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-md mb-10 w-[40%] mx-auto"
      >
        <input
          type="text" {...register('name')} placeholder="Name"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <input type="email" {...register('email')}
          placeholder="Email"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          {...register('age')}
          placeholder="Age"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition"
        >
          Submit
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="shadow-md">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th  className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th   className="py-3 px-4 text-left">Age</th>
              <th></th>
              <th></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="even:bg-gray-100 hover:bg-gray-200 transition">
                <td  className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className= "py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.age}</td>
                <td className="py-2 px-4"><button className='bg-red-700 text-white p-2 rounded' onClick={()=>handleDelete(index)}>Delete</button></td>
                <td className='py-2 px-4'><button className='bg-amber-500 text-white p-2 rounded' onClick={()=>handleEdit(index)}>Edit</button></td>
                {/* <td className='py-2 px-4'><Button>View</Button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userpage;
