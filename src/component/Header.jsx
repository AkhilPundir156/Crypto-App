import {  Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
  <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
    {/* <HStack w={'full'}> */}
      
    <Button variant={'unstyled'} color={'white'}>
        <Link to='/'>Home</Link>
    </Button>
    <Button variant={'unstyled'} color={'white'}>
        <Link to='/exchange'>Exchange</Link>
    </Button>
    <Button variant={'unstyled'} color={'white'}>
        <Link to='/coin'>Coin</Link>
    </Button>
    {/* </HStack> */}
    {/* <HStack w={'full'} justifyContent={'flex-end'}>
      <Avatar />
    </HStack> */}
    
  </HStack>
  );
}

export default Header
