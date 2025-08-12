const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button
            type="button"
            data-testid={`${person.id}-delete`}
            onClick={() => handleDelete(person.id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons
