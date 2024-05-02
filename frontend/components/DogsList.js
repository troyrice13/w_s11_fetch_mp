import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({ dogs, setCurrentDog, getDogs }) {
  const navigate = useNavigate()
  const editDog = id => {
    setCurrentDog(id)
    navigate('form')
  }

  const deleteDog = id => {
    fetch(`api/dogs/${id}`, { method: 'DELETE' })
    .then(() => getDogs())
    .then(() => setCurrentDog(null))
    .catch(err => console.error('Failed to delete dog', err))
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {
          dogs.map(dog => (
        
        <li key={dog.id}>
          {dog.name}, {dog.breed}, {dog.adopted ? '' : 'NOT '}adopted
          <div>
            <button onClick={() => editDog(dog.id)}>Edit</button>
            <button onClick={() => deleteDog(dog.id)}>Delete</button>
          </div>
        </li>
        ))
      }
      </ul>
    </div>
  )
}
