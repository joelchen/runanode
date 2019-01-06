import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';
// import styledMixins from '../../../styledMixins';
import themeObj from '../../theme';

const StyledSelect = styled(ReactSelect)`
  margin-top: ${p => p.marginTop || '0.5rem'};
  min-width: ${p => p.minWidth || '0'};

  .react-select__control {
    box-shadow: none;
    color: ${p => p.color || p.theme.colors.N500};
    border-color: ${p => p.borderColor || p.theme.colors.N100};

    &:hover {
      border-color: ${p => p.borderHoverColor || p.theme.colors.N100};
    }
  }

  .react-select__control--is-disabled {
    background-color: ${p => p.theme.colors.N100};
  }

  .react-select__menu {
    background-color: ${p => p.backgroundColor || p.theme.colors.N0};
  }

  .react-select__option--is-focused {
    background-color: ${p => p.theme.colors.N0};
  }

  .react-select__indicator-separator {
    background-color: ${p => p.theme.colors.N100};
  }

  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.N100};
    color: ${p => p.theme.colors.N700};
  }
`;

StyledSelect.defaultProps = {
  theme: themeObj,
  themeSpace: 'select',
};

const Select = ({ disabled, ...props }) => (
  <StyledSelect classNamePrefix="react-select" isDisabled={disabled} {...props} />
);

export default Select;
