import React from 'react'
import { styled } from '@mui/system'
import { topBarHeight } from 'app/utils/constant'

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 25,
    left: 1135,
    zIndex: 9,
    width: '24.5%',
    // display: 'flex',
    paddingRight: '90px',
    alignItems: 'center',
    height: topBarHeight,
}))

const SearchContainer2 = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 25,
    left: 435,
    zIndex: 9,
    width: '24.5%',
    // display: 'flex',
    paddingRight: '90px',
    alignItems: 'center',
    height: topBarHeight,
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',

    fontSize: '1rem',
    paddingLeft: '10px',
    height: 'calc(100% - 25px)',
}))

const SearchBox = ({ onSearch, onSearchValueChange, second }) => {
    const onSearchProps = (value) => {
        onSearch(value)
    }

    return (
        <div>
            {/* {open && ( */}
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={onSearchValueChange}
                    placeholder="Search here..."
                    // autoFocus
                    onChange={(e) => onSearchProps(e.target.value)}
                />
            </SearchContainer>
            {second && (
                <SearchContainer2>
                    <SearchInput
                        type="text"
                        value={onSearchValueChange}
                        placeholder="Search here..."
                        // autoFocus
                        onChange={(e) => onSearchProps(e.target.value)}
                    />
                </SearchContainer2>
            )}
        </div>
    )
}

export { SearchBox }
