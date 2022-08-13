const PlaceFilter = (props) => {
    return (
        <select onChange={props.handleFilter}>
            {
                props.option.map((el, idx) => (
                    <option value={el} key={idx}>{el}</option>
                ))
            }
        </select>
    )

}

export default PlaceFilter;