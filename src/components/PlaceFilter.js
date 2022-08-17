import { useSelector } from "react-redux";
import styled from "styled-components";

const Select = styled.select`
    margin:2em 0;
    width: 200px;
    border: ${(props) => props.themeState === 'light' ? '1px solid #77af9c': '1px solid grey'};
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


const PlaceFilter = (props) => {
    const themeState = useSelector((state) => state.themeReducer).theme
    return (
        <Select onChange={props.handleFilter} themeState={themeState}>
            {
                props.option.map((el, idx) => (
                    <option value={el} key={idx}>{el}</option>
                ))
            }
        </Select>
    )

}

export default PlaceFilter;