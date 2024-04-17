import React, { useState } from 'react'

const initialForm = { name: '', breed: '', adopted: false }

export default function DogForm() {
  const [values, setValues] = useState(initialForm)
  const onSubmit = (event) => {
    event.preventDefault()
  }
  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div>
      <h2>
        Create Dog
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
        >
          <option value="">---Select Breed---</option>
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
          />
        </label>
        <div>
          <button type="submit">
            Create Dog
          </button>
          <button>Reset</button>
        </div>
      </form>
    </div>
  )
}
