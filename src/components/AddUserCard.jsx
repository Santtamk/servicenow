import React from 'react'

const AddUserCard = ({ addUser }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        addUser(e.target.name.value, e.target.email.value, e.target.company.value)
        e.target.name.value = '';
        e.target.email.value = '';
        e.target.company.value = '';
    }


  return (
    <div>
        <form onSubmit={handleOnSubmit}>
          <br/>
            <input placeholder='Name' name='name' />
            <input placeholder='Email' name='email' />
            <input placeholder='Company' name='company' />
            <button onSubmit={handleOnSubmit} className='btn btn-info'>Add User</button>
        </form>
        
    </div>
  )
}

export default AddUserCard