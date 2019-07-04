import React from 'react';
import Downshift from 'downshift';
import { Menu, Item, css } from './shared';
import Axios from './axios';
import { FilledInput, FormControl, InputLabel } from '@material-ui/core';

const baseEndpoint = 'https://ticker-2e1ica8b9.now.sh/keyword/';

class AxiosExample extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleStockSelection } = this.props;
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50
        })}
      >
        <Downshift
          itemToString={item => (item ? item.name : '')}
          onChange={handleStockSelection}
        >
          {({
            inputValue,
            getInputProps,
            getMenuProps,
            getItemProps,
            selectedItem,
            highlightedIndex,
            isOpen
          }) => {
            return (
              <div
                {...css({
                  width: '100%',
                  margin: 'auto',
                  position: 'relative'
                })}
              >
                <FormControl
                  fullWidth
                  onChange={e => handleStockSelection(e)}
                >
                  <InputLabel htmlFor="stock-name">Stock Name</InputLabel>
                  <FilledInput
                    {...getInputProps({
                      isOpen
                    })}
                    fullWidth
                    name="stock"
                    Í
                  />
                </FormControl>
                <Menu
                  {...getMenuProps({ isOpen })}
                  style={{ zIndex: '1200' }}
                >
                  {(() => {
                    if (!isOpen) {
                      return null;
                    }

                    if (!inputValue) {
                      return (
                        <Item disabled>You have to enter a search query</Item>
                      );
                    }

                    return (
                      <Axios url={`${baseEndpoint}${inputValue}`}>
                        {({ loading, error, data = [] }) => {
                          if (loading) {
                            return <Item disabled>Loading...</Item>;
                          }

                          if (error) {
                            return <Item disabled>Error! ${error}</Item>;
                          }

                          if (!data.length) {
                            return <Item disabled>No repositories found</Item>;
                          }

                          return data.map((item, index) => {
                            return (
                              <Item
                                key={item.symbol}
                                {...getItemProps({
                                  item,
                                  index,
                                  isActive: highlightedIndex === index,
                                  isSelected: selectedItem === item
                                })}
                              >
                                {item && item.name}
                              </Item>
                            );
                          });
                        }}
                      </Axios>
                    );
                  })()}
                </Menu>
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

export default AxiosExample;
