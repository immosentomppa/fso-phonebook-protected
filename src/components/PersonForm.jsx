const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
      <div>
        name:{" "}
        <input
          data-testid="name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          data-testid="number"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button data-testid="submit-btn" type="submit">
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
