import { VILLAGE_FILLTER_OPTION } from "../util/constValue"
import { useDropDown } from "../hook/useDropDown";
import styled from 'styled-components';
import DropDownIcon from '../assets/DropDownIcon'
const DropDown = ({ handleFilter, init }) => {
  const { isDropDownShow, selectedValue, handleDropDown, handleCurrntIndex } = useDropDown(
    VILLAGE_FILLTER_OPTION,
    init,
    handleFilter
  );
  return (
    <DropDownWrapper>
      <DropDownBtn onClick={handleDropDown}>
        <span>{selectedValue}</span>
        <DropDownIcon className={'icon'} />
      </DropDownBtn>
      {isDropDownShow && (
        <ul>
          {VILLAGE_FILLTER_OPTION.map(item => (
            <li key={item.id}>
              <DropDownBtn type="button" onClick={handleCurrntIndex} value={item}>
                {item}
              </DropDownBtn>
            </li>
          ))}
        </ul>
      )}
    </DropDownWrapper>
  )
}

const DropDownWrapper = styled.div`
  position: relative;
  margin:1% 0;
  .icon {
    position: absolute;
  }
  ul {
    position: absolute;
  }
  li {
    transition: 0.2s;
    list-style: none;
  }
`;

export const DropDownBtn = styled.button`
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    background: #ffffff;
    border: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c' : '1px solid grey'};
    color: ${(props) => props.theme.theme === 'light' ? '1px solid #77af9c' : '1px solid grey'};
    border-radius: 10px;
    width: 200px;
    padding: 12px 13px;
    :focus{
        box-sizing: border-box;
        outline: 3px solid #F8E4FF;
    }
    @media screen and (max-width: 1024px) {
      padding: 5px 7px;
    }
`;

export default DropDown