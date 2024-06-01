import React from 'react'

const Signup = () => {
  return (
    <form action="">
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name'/>
            </div>
            <div>
                <input type="file" accept='image/*'/>
            </div>
            {/* <div>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name'/>
            </div> */}
        </div>
    </form>
  )
}

export default Signup ; 