import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm({ dog, reset, getDogs }) {
  const navigate = useNavigate()

  const [values, setValues] = useState(initialForm)
  const [breeds, setBreeds] = useState([])


  useEffect(() => {
    fetch('api/dogs/breeds')
    .then(res => res.json())
    .then(breeds => setBreeds(breeds.toSorted()))
    .catch(err => console.error(err))
  }, [])

  useEffect(() => {
  if (dog) setValues(dog)
  else setValues(initialForm)
}, [dog])

const putDog = () => {
  fetch(`/api/dogs/${values.id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
  .then(res => {
    if (!res.ok) throw new Error('Trouble PUTing dog...')
    getDogs()
    reset()
    navigate('/')
  })
}

const postDog = () => {
  fetch('api/dogs', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
  .then(res => {
    if (!res.ok) throw new Error('Trouble POSTing dog...')
    getDogs()
    reset()
    navigate('/')
  })
}

const onReset = event => {
  event.preventDefault();
  setValues(initialForm)
  reset()
}


  const onSubmit = (event) => {
    event.preventDefault()
    const action = dog ? putDog : postDog
    action()
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
      {dog ? 'Update ' : 'Create '}Dog
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {
            breeds.map(breed => (
              <option key={breed}>{breed}</option>
            ))
          }
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {dog ? 'Update ' : 'Create '}Dog
          </button>
          <button onClick={onReset} aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  )
}
