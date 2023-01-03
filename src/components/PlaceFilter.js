import styled from "styled-components";

const PlaceFilter = (props) => {
    return (
        <Select onChange={props.handleFilter}>
            {
                props.option.map((el, idx) => (
                    <option value={el} key={idx}>{el}</option>
                ))
            }
        </Select>
    )
}

const Select = styled.select`
    margin:2em 0;
    width: 200px;
    border: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c': '1px solid grey'};
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 13px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    :focus{
        box-sizing: border-box;
        border-radius: 10px;
        outline: 3px solid #F8E4FF;
        border-radius: 10px;
    }
`

export default PlaceFilter;